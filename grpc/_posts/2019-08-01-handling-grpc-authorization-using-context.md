---
title: Handling gRPC Authorization using Context in Java
date: 2019-08-01
description: Once we have authenticated the users, let's see how to restrict the access by roles.
categories:
  - gRPC
author_staff_member: rohit
---

In the Grpc world, we have secured our application by [encrypting the channel]({% link grpc/_posts/2019-01-26-grpc-authentication.md %}) and authenticating the requests using [interceptors]({% link grpc/_posts/2019-01-27-grpc-interceptors.md %}). So we have secured our application but we still do have control over which service can be accessed by whom.

To handle authorization, we will leverage _Context_ provided by grpc to pass UserInfo into services.

Time to setup our project.
# Pom
We will create a maven project add the following dependencies:

```xml
    <dependencies>
        <dependency>
            <groupId>io.grpc</groupId>
            <artifactId>grpc-all</artifactId>
            <version>1.18.0</version>
        </dependency>

        <!-- https://mvnrepository.com/artifact/io.netty/netty-tcnative-boringssl-static -->
        <dependency>
            <groupId>io.netty</groupId>
            <artifactId>netty-tcnative-boringssl-static</artifactId>
            <version>2.0.20.Final</version>
        </dependency>
    </dependencies>
``` 

We also need to add plugin to build protobuf files during compile time.

```xml
    <build>
        <extensions>
            <extension>
                <groupId>kr.motd.maven</groupId>
                <artifactId>os-maven-plugin</artifactId>
                <version>1.6.1</version>
            </extension>
        </extensions>
        <plugins>
            <plugin>
                <groupId>org.xolstice.maven.plugins</groupId>
                <artifactId>protobuf-maven-plugin</artifactId>
                <version>0.6.1</version>
                <configuration>
                    <protocArtifact>
                        com.google.protobuf:protoc:3.5.1:exe:${os.detected.classifier}
                    </protocArtifact>
                    <pluginId>grpc-java</pluginId>
                    <pluginArtifact>
                        io.grpc:protoc-gen-grpc-java:1.18.0:exe:${os.detected.classifier}
                    </pluginArtifact>
                </configuration>
                <executions>
                    <execution>
                        <goals>
                            <goal>compile</goal>
                            <goal>compile-custom</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
``` 

# Grpc client

We will add an interceptor to add provide auth token in request:

```java

package in.kuros.blog.grpc.client;

import io.grpc.CallOptions;
import io.grpc.Channel;
import io.grpc.ClientCall;
import io.grpc.ClientInterceptor;
import io.grpc.ForwardingClientCall;
import io.grpc.Metadata;
import io.grpc.Metadata.Key;
import io.grpc.MethodDescriptor;

public class AuthTokenProvideInterceptor implements ClientInterceptor {

    private final String authToken;

    public AuthTokenProvideInterceptor(final String authToken) {
        this.authToken = authToken;
    }


    public <ReqT, RespT> ClientCall<ReqT, RespT> interceptCall(final MethodDescriptor<ReqT, RespT> methodDescriptor, final CallOptions callOptions, final Channel channel) {
        return new ForwardingClientCall.SimpleForwardingClientCall<ReqT, RespT>(channel.newCall(methodDescriptor, callOptions)) {
            @Override
            public void start(final Listener<RespT> responseListener, final Metadata headers) {

                headers.put(Key.of("auth_token", Metadata.ASCII_STRING_MARSHALLER), authToken);
                super.start(responseListener, headers);
            }
        };
    }
}
``` 
{% include ad-h %}

Now we will create two different clients, one with admin role and other with user role.

```java

// Client with admin role & user role

package in.kuros.blog.grpc.client;

import in.kuros.blog.grpc.AddResponse;
import in.kuros.blog.grpc.CalculatorGrpc;
import in.kuros.blog.grpc.CalculatorGrpc.CalculatorBlockingStub;
import in.kuros.blog.grpc.OperandRequest;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;

public class GrpcClient {

    public static void main(String[] args) {

        System.out.println("****** Admin Role ******");
        execute("admin_token");

        System.out.println("****** User Role ******");
        execute("user_token");

    }

    private static void execute(final String authToken) {

        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 8080)
                .usePlaintext()
                .intercept(new AuthTokenProvideInterceptor(authToken))
                .build();

        final CalculatorBlockingStub blockingStub = CalculatorGrpc.newBlockingStub(channel);

        final AddResponse blockResponse = blockingStub.add(OperandRequest.newBuilder().setX(10).setY(20).build());

        System.out.println("blocking call result: " + blockResponse.getResult());

        channel.shutdown();
    }
}

```

Here we have created two message channels with different authentication roles, one with admin role & other with user, a typical, application requirement.


# User Service (Server Side)

Now that we have our client ready, lets focus on creating a server.

We will create a service to validate token and return a UserInfo model will username & roles:

```java
package in.kuros.blog.grpc.server.users;

import in.kuros.blog.grpc.server.users.model.UserInfo;

public interface UserService {

    UserInfo validate(String authToken);
}
```

```java
package in.kuros.blog.grpc.server.users;

import in.kuros.blog.grpc.server.users.model.UserInfo;
import io.grpc.Status;
import io.grpc.StatusRuntimeException;

import java.util.ArrayList;
import java.util.List;

public class UserServiceImpl implements UserService {
    @Override
    public UserInfo validate(final String authToken) {

        if (authToken == null) {
            throw new StatusRuntimeException(Status.UNAUTHENTICATED);
        }

        return loadUserByAuthToken(authToken);
    }

    private UserInfo loadUserByAuthToken(final String authToken) {
        // Fetch from DB, here I am validating in line

        if (authToken.equals("admin_token")) {
            List<String> roles = new ArrayList<>();
            roles.add("ADMIN");
            roles.add("USER");

            return new UserInfo("Rohit", roles);
        }

        List<String> roles = new ArrayList<>();
        roles.add("USER");

        return new UserInfo("John", roles);
    }
}
```

Here we have two users _Rohit_ with _ADMIN_ access & John with only _USER_ access.
 
# Authentication Interceptor (Server Side)

As explained in my previous article, we will first add interceptor on server side to validate auth token. But in this case once the user is validated we will setup the user info into **Context** 
```java
package in.kuros.blog.grpc.server;

import in.kuros.blog.grpc.server.users.UserService;
import in.kuros.blog.grpc.server.users.UserServiceImpl;
import in.kuros.blog.grpc.server.users.model.UserInfo;
import io.grpc.Context;
import io.grpc.Contexts;
import io.grpc.Metadata;
import io.grpc.Metadata.Key;
import io.grpc.ServerCall;
import io.grpc.ServerCall.Listener;
import io.grpc.ServerCallHandler;
import io.grpc.ServerInterceptor;

public class AuthorizationInterceptor implements ServerInterceptor {

    public static final Context.Key<Object> USER_DETAILS = Context.key("user_details");

    private UserService userService;

    public AuthorizationInterceptor() {
        this.userService = new UserServiceImpl();
    }

    public <ReqT, RespT> Listener<ReqT> interceptCall(final ServerCall<ReqT, RespT> serverCall, final Metadata metadata, final ServerCallHandler<ReqT, RespT> serverCallHandler) {

        final String auth_token = metadata.get(Key.of("auth_token", Metadata.ASCII_STRING_MARSHALLER));

        final UserInfo userInfo = userService.validate(auth_token);

        Context context = Context.current()
                .withValue(USER_DETAILS, userInfo);

        return Contexts.interceptCall(context, serverCall, metadata, serverCallHandler);

    }
}
``` 

At line 17, we created a **ContextKey**, at line 31, we are getting context, this context is created per request, and we will set our user info within this context.
{% include ad-h %}
# The Service 
Next we have our Calculator service, at line 17 we are getting UserInfo using the key. 

**Note:** The key/value stored in the Context are mapped by reference key, so if you create another key object with same value, it would be treated as two different keys.


```java
package in.kuros.blog.grpc.server;

import in.kuros.blog.grpc.AddResponse;
import in.kuros.blog.grpc.CalculatorGrpc.CalculatorImplBase;
import in.kuros.blog.grpc.OperandRequest;
import in.kuros.blog.grpc.server.users.model.UserInfo;
import io.grpc.Status;
import io.grpc.StatusRuntimeException;
import io.grpc.stub.StreamObserver;

public class CalculatorImpl extends CalculatorImplBase {

    @Override
    public void add(final OperandRequest request, final StreamObserver<AddResponse> responseObserver) {
        final long sum = request.getX() + request.getY();

        final UserInfo userInfo = (UserInfo) AuthorizationInterceptor.USER_DETAILS.get();

        System.out.println(Thread.currentThread().getName() + " --- " + userInfo);

        if (userInfo.getRoles().contains("ADMIN")) {
            final AddResponse addResponse = AddResponse
                    .newBuilder()
                    .setResult(sum)
                    .build();

            responseObserver.onNext(addResponse);
            responseObserver.onCompleted();
        } else {
            responseObserver.onError(new StatusRuntimeException(Status.PERMISSION_DENIED));
        }

    }
}
```

Here we are saying that add operation will only be authorised to ADMIN users, else a permission denied exception is thrown.

# gRPC Server
Finally, you assemple the server:

```java
package in.kuros.blog.grpc.server;

import io.grpc.Server;
import io.grpc.ServerBuilder;

public class GrpcServer {

    public static void main(String[] args) throws Exception {
        final Server server = ServerBuilder.forPort(8080)
                .addService(new CalculatorImpl())
                .intercept(new AuthorizationInterceptor())
                .build();

        server.start();
        server.awaitTermination();
    }
}
``` 

Now lets run our server/client applications, and see how it works.

```bash
# Server logs

grpc-default-executor-0 --- UserInfo{userName='Rohit', roles=[ADMIN, USER]}
grpc-default-executor-0 --- UserInfo{userName='John', roles=[USER]}
```

```bash
# Client logs

****** Admin Role ******
blocking call result: 30
****** User Role ******
Exception in thread "main" io.grpc.StatusRuntimeException: PERMISSION_DENIED
	at io.grpc.stub.ClientCalls.toStatusRuntimeException(ClientCalls.java:233)
	at io.grpc.stub.ClientCalls.getUnchecked(ClientCalls.java:214)
	at io.grpc.stub.ClientCalls.blockingUnaryCall(ClientCalls.java:139)
	at in.kuros.blog.grpc.CalculatorGrpc$CalculatorBlockingStub.add(CalculatorGrpc.java:157)
	at in.kuros.blog.grpc.client.GrpcClient.execute(GrpcClient.java:31)
	at in.kuros.blog.grpc.client.GrpcClient.main(GrpcClient.java:18)
```

As we can see request made my admin channel can successfully access the api but got PERMISSION_DENIED when we tried to access with normal user.

Hurray!!! we have added one more layer to our security. [Find the code here.](https://github.com/kuros/grpc/tree/master/grpc-context)