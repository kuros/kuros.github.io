---
title: gRPC Authentication in Java
date: 2019-01-26
description: what about the security?
categories:
  - gRPC
author_staff_member: rohit
---

Setting up gRPC is great and simple but what about its security. how hard it is? Lets see.

# Generating Certificates & Keys
Similar to http server, you can configure gRPC server communication to be encrypted, Since we are developing a local example, we will generate our own certificate(you will need certificate from Certificate Authority if you want to make your api's public).

For this tutorial, we will use openssl to generate our certificate & keys.

```bash
$ openssl req -x509 -newkey rsa:4096 -keyout src/main/resources/my-private-key.pem -out src/main/resources/my-public-key-cert.pem -days 365 -nodes -subj '/CN=localhost'
```

Our keys will be generated in resources folder, this key has expiration of 365 days, algorithm detail (RSA: 4096), format standard (X.509) and our server's common name (CN) which is just a localhost in our case. 

# Adding certificates to gRPC server

To enable TLS on a server, a certificate chain and private key need to be specified in PEM format, which we have generated in earlier.

**Private key should not be using a password**

(When you are generating chain certificates, remember, the order of certificates in the chain matters: more specifically, the certificate at the top has to be the host CA, while the one at the very bottom has to be the root CA.)

{% include ad %}

For this tutorial's purpose, we will use 8443 below to avoid needing extra permissions from the OS.

```java
import io.grpc.Server;
import io.grpc.ServerBuilder;

import java.io.File;

public class GrpcServer {

    public static void main(String[] args) throws Exception {

        final Server server = ServerBuilder.forPort(8443)
                .addService(new CalculatorImpl())

                //enable TLS
                .useTransportSecurity(
                        getFile("/my-public-key-cert.pem"), //public Key
                        getFile("/my-private-key.pem")) // private key
                .build();

        server.start();
        server.awaitTermination();
    }

    private static File getFile(final String fileName) {
        return new File(GrpcServer.class.getResource(fileName).getFile());
    }
}
```

Let's start the server, oops!!! we got an error:
```text
Jan 27, 2019 4:08:22 PM io.grpc.netty.GrpcSslContexts defaultSslProvider
INFO: netty-tcnative unavailable (this may be normal)
java.lang.ClassNotFoundException: io.netty.internal.tcnative.SSL
	at java.net.URLClassLoader.findClass(URLClassLoader.java:381)
	at java.lang.ClassLoader.loadClass(ClassLoader.java:424)
	at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:331)
	at java.lang.ClassLoader.loadClass(ClassLoader.java:357)
	at java.lang.Class.forName0(Native Method)
	at java.lang.Class.forName(Class.java:348)
	at io.netty.handler.ssl.OpenSsl.<clinit>(OpenSsl.java:81)
	at io.grpc.netty.GrpcSslContexts.defaultSslProvider(GrpcSslContexts.java:244)
	at io.grpc.netty.GrpcSslContexts.configure(GrpcSslContexts.java:171)
	at io.grpc.netty.GrpcSslContexts.forServer(GrpcSslContexts.java:130)
	at io.grpc.netty.NettyServerBuilder.useTransportSecurity(NettyServerBuilder.java:460)
	at io.grpc.netty.NettyServerBuilder.useTransportSecurity(NettyServerBuilder.java:53)
	at in.kuros.blog.grpc.GrpcServer.main(GrpcServer.java:16)

Jan 27, 2019 4:08:22 PM io.grpc.netty.GrpcSslContexts defaultSslProvider
INFO: Conscrypt not found (this may be normal)
Jan 27, 2019 4:08:22 PM io.grpc.netty.GrpcSslContexts defaultSslProvider
INFO: Jetty ALPN unavailable (this may be normal)
java.lang.ClassNotFoundException: org/eclipse/jetty/alpn/ALPN
	at java.lang.Class.forName0(Native Method)
	at java.lang.Class.forName(Class.java:348)
	at io.grpc.netty.JettyTlsUtil.isJettyAlpnConfigured(JettyTlsUtil.java:64)
	at io.grpc.netty.GrpcSslContexts.findJdkProvider(GrpcSslContexts.java:266)
	at io.grpc.netty.GrpcSslContexts.defaultSslProvider(GrpcSslContexts.java:248)
	at io.grpc.netty.GrpcSslContexts.configure(GrpcSslContexts.java:171)
	at io.grpc.netty.GrpcSslContexts.forServer(GrpcSslContexts.java:130)
	at io.grpc.netty.NettyServerBuilder.useTransportSecurity(NettyServerBuilder.java:460)
	at io.grpc.netty.NettyServerBuilder.useTransportSecurity(NettyServerBuilder.java:53)
	at in.kuros.blog.grpc.GrpcServer.main(GrpcServer.java:16)

Exception in thread "main" java.lang.IllegalStateException: Could not find TLS ALPN provider; no working netty-tcnative, Conscrypt, or Jetty NPN/ALPN available
	at io.grpc.netty.GrpcSslContexts.defaultSslProvider(GrpcSslContexts.java:258)
	at io.grpc.netty.GrpcSslContexts.configure(GrpcSslContexts.java:171)
	at io.grpc.netty.GrpcSslContexts.forServer(GrpcSslContexts.java:130)
	at io.grpc.netty.NettyServerBuilder.useTransportSecurity(NettyServerBuilder.java:460)
	at io.grpc.netty.NettyServerBuilder.useTransportSecurity(NettyServerBuilder.java:53)
	at in.kuros.blog.grpc.GrpcServer.main(GrpcServer.java:16)
```

Time to fix it by providing below maven dependency in your pom file:

```xml
<dependency>
    <groupId>io.netty</groupId>
    <artifactId>netty-tcnative-boringssl-static</artifactId>
    <version>2.0.20.Final</version>
</dependency>
```

The Server Starts.

{% include ad %}

Now let try to use our old client to execute our add method.

### Old Client

```java
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;

public class GrpcOldClient {

    public static void main(String[] args) {
        ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 8443)
                .usePlaintext()
                .build();

        final CalculatorGrpc.CalculatorBlockingStub blockingStub = CalculatorGrpc.newBlockingStub(channel);

        final AddResponse blockResponse = blockingStub.add(OperandRequest.newBuilder().setX(10).setY(20).build());
        System.out.println("call result: " + blockResponse.getResult());

        channel.shutdown();
    }
}
```

Notice we have configured ManagedChannel as _.usePlaintext()_, which specifies we do not want any authentication.

When we execute the program we get an error response like: 

```text
Exception in thread "main" io.grpc.StatusRuntimeException: UNAVAILABLE: Network closed for unknown reason
	at io.grpc.stub.ClientCalls.toStatusRuntimeException(ClientCalls.java:233)
	at io.grpc.stub.ClientCalls.getUnchecked(ClientCalls.java:214)
	at io.grpc.stub.ClientCalls.blockingUnaryCall(ClientCalls.java:139)
	at in.kuros.blog.grpc.CalculatorGrpc$CalculatorBlockingStub.add(CalculatorGrpc.java:157)
	at in.kuros.blog.grpc.GrpcOldClient.main(GrpcOldClient.java:15)
```

{% include ad-h %}

# SSL enabled clients

When you are using ssl certificate with the issuing authority known to the client, simply create a ManagedChannel by

```java
// With server authentication SSL/TLS
ManagedChannel channel = ManagedChannelBuilder.forAddress("localhost", 443)
    .build();
CalculatorGrpc.CalculatorBlockingStub blockingStub = CalculatorGrpc.newBlockingStub(channel);
```

But in our case we are using our custom certificates, so we need to provide SSL context to channel builder, for this we will use **NettyChannelBuilder**.

We will be providing our public certificate only to the client.

```java
import io.grpc.ManagedChannel;
import io.grpc.netty.GrpcSslContexts;
import io.grpc.netty.NettyChannelBuilder;

import javax.net.ssl.SSLException;
import java.io.File;

public class GrpcNewClient {

    public static void main(String[] args) throws SSLException {

        final ManagedChannel channel = NettyChannelBuilder.forAddress("localhost", 8443)
                .sslContext(GrpcSslContexts
                        .forClient()
                        .trustManager(getFile("/my-public-key-cert.pem")) // public key
                        .build())
                .build();

        final CalculatorGrpc.CalculatorBlockingStub blockingStub = CalculatorGrpc.newBlockingStub(channel);

        System.out.println("Making call");
        final AddResponse blockResponse = blockingStub.add(OperandRequest.newBuilder().setX(10).setY(20).build());
        System.out.println("call result: " + blockResponse.getResult());

        channel.shutdown();

    }

    private static File getFile(final String fileName) {
        return new File(GrpcNewClient
                .class
                .getResource(fileName)
                .getFile());
    }
}
```

Now when we run the new client, we are able to make calls.

# Conclusion

So till now we have seen, how to secure our server-client communication over gRPC. Find the [code here](https://github.com/kuros/grpc/tree/master/grpc-authentication).










