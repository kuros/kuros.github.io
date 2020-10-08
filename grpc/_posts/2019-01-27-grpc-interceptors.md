---
title: gRPC Authorization using Interceptors in Java
date: 2019-01-26
description: Time to look at authorization of clients connected.
categories:
  - gRPC
author_staff_member: rohit
---

We have secured our application with by using ssl configuration, that's great. But its hard to authenticate which client is making the request, after all the certificate will be shared amongst all the client.

In order to recognize who is using our service, we need to store some type of authentication token. Normally, you will be validating tokens using IAM/Authentication services, but for this tutorial, I will use a simple token mechanism.

Time to take care of the authorization mechanism, provided in gRPC. We wil be using Interceptors.

# Interceptors

By using Interceptors, you can intercept the execution of RPC methods on both the client and the server. 

There are two types of interceptors:
- Server Interceptors
- Client Interceptors

# Server Interceptors

As the name suggest, we are going to implement ServerInterceptor. We need to implementation interceptCall method.

```java
import io.grpc.Metadata;
import io.grpc.Metadata.Key;
import io.grpc.ServerCall;
import io.grpc.ServerCall.Listener;
import io.grpc.ServerCallHandler;
import io.grpc.ServerInterceptor;
import io.grpc.Status;
import io.grpc.StatusRuntimeException;

public class AuthorizationInterceptor implements ServerInterceptor {

    public <ReqT, RespT> Listener<ReqT> interceptCall(final ServerCall<ReqT, RespT> serverCall, final Metadata metadata, final ServerCallHandler<ReqT, RespT> serverCallHandler) {

        final String auth_token = metadata.get(Key.of("auth_token", Metadata.ASCII_STRING_MARSHALLER));

        if (auth_token == null || !auth_token.equals("valid_token")) {
            throw new StatusRuntimeException(Status.FAILED_PRECONDITION);
        }

        return serverCallHandler.startCall(serverCall, metadata);
    }
}
```  
Its a simple validation, which expects auth_token to be present and it should be equal to 'valid_token'

{% include ad %}

Add to our server configuration. 

```java
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

Now if we run the client, we will get an error:

```text
Exception in thread "main" io.grpc.StatusRuntimeException: FAILED_PRECONDITION
	at io.grpc.stub.ClientCalls.toStatusRuntimeException(ClientCalls.java:233)
	at io.grpc.stub.ClientCalls.getUnchecked(ClientCalls.java:214)
	at io.grpc.stub.ClientCalls.blockingUnaryCall(ClientCalls.java:139)
	at in.kuros.blog.grpc.CalculatorGrpc$CalculatorBlockingStub.add(CalculatorGrpc.java:157)
	at in.kuros.blog.grpc.client.GrpcClient.main(GrpcClient.java:19)
```

Now to setup our client.

# Client Interceptors

We will create a client interceptor. Add auth_token.

```java
import io.grpc.CallOptions;
import io.grpc.Channel;
import io.grpc.ClientCall;
import io.grpc.ClientInterceptor;
import io.grpc.ForwardingClientCall;
import io.grpc.Metadata;
import io.grpc.Metadata.Key;
import io.grpc.MethodDescriptor;

public class AuthTokenProvideInterceptor implements ClientInterceptor {

    public <ReqT, RespT> ClientCall<ReqT, RespT> interceptCall(final MethodDescriptor<ReqT, RespT> methodDescriptor, final CallOptions callOptions, final Channel channel) {
        return new ForwardingClientCall.SimpleForwardingClientCall<ReqT, RespT>(channel.newCall(methodDescriptor, callOptions)) {
            @Override
            public void start(final Listener<RespT> responseListener, final Metadata headers) {
                headers.put(Key.of("auth_token", Metadata.ASCII_STRING_MARSHALLER), "valid_token");
                super.start(responseListener, headers);
            }
        };
    }
}
```

Run the client and you are done. Find the [code here](https://github.com/kuros/grpc/tree/master/grpc-interceptors).


