---
title: Kafka Messaging with Spring Boot
date: 2020-05-02
description: We will focus on integrating kafka with spring boot 
categories:
  - messaging
author_staff_member: rohit
---

In my previous article we looked at [setting up Kafka]({% link _posts/messaging/2020-05-01-getting-started-with-kafka-install-and-messaging.md %}) on our local machine. Now we will write a spring boot application and integrate Kafka messaging.

Let's start with a simple spring boot application. Below is the pom file for this application.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.2.4.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>in.kuros.blog-code</groupId>
    <artifactId>messaging-kafka</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>messaging-kafka</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>11</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

To enable Kafka we will just add dependency for it. It would download the compatible version for kafka, out of the box. 

```xml
        <dependency>
            <groupId>org.springframework.kafka</groupId>
            <artifactId>spring-kafka</artifactId>
        </dependency>
```

# Configuration

We are going to initialize our application with kafka spring configuration for both producer & consumer.

```yaml
spring:
  kafka:
    consumer:
      bootstrap-servers: localhost:9092
      auto-offset-reset: earliest
      key-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      value-deserializer: org.apache.kafka.common.serialization.StringDeserializer
      group-id: myApp
    producer:
      bootstrap-servers: localhost:9092
      key-serializer: org.apache.kafka.common.serialization.StringSerializer
      value-serializer: org.apache.kafka.common.serialization.StringSerializer
```
So we are initializing consumer properties with:
1. spring.kafka.consumer.bootstrap-servers: To let our application know how to connect to kafka server.
2. spring.kafka.consumer.auto-offset-reset: This ensures the new consumer group gets the messages we sent, because the container might start after the sends have completed (not applicable explicitly in our case, since both producer and consumer reside in the same application).
3. spring.kafka.consumer.key-deserializer: Kafka provides a number of ways to deserialize, and we are using the StringDeserializer. 
3. spring.kafka.consumer.value-deserializer: Similarly, for value also we will use StringDeserializer.

In the same way, we have provided bootstrap-servers, key-serializer & value-serializer for producer.

# Producer
Spring boot provides a wrapper over KafkaProducer and simplifies the usage. All we need to do is to inject ``KafkaTemplate`` and we are ready to publish message.
Below is a very simple producer.

```java
package in.kuros.blogcode.messaging.kafka.producer;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class MessageProducer {
    
    private final KafkaTemplate<String, String> producer;

    public void publishMessage(String message) {
        producer.send("user-name", message);
    }
}

```

# Consumer
We are going to create a consumer which will accept the message and will print it in the console.

```java
package in.kuros.blogcode.messaging.kafka.consumer;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class MessageConsumer {

    @KafkaListener(topics = "user-name")
    public void consume(final String message) {
        System.out.println("Received: " + message);
    }
}

```

We have annotated our method with ``KafkaListener``. It does all the heavy lifting of connecting to topic, parsing the message and giving it to you.
That's it.

To test our application, we will create a controller to send the message.

# Controller

```java
package in.kuros.blogcode.messaging.kafka.controller;

import in.kuros.blogcode.messaging.kafka.producer.MessageProducer;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/kafka")
@RequiredArgsConstructor
public class KafkaController {

    private final MessageProducer messageProducer;

    @PostMapping(value = "/publish")
    public void sendMessageToKafkaTopic(@RequestParam("message") String message) {
        this.messageProducer.publishMessage(message);
    }
}

```
We have created a controller which takes in message and publishes it to Kafka topic `user-name`.

Time to start our application, just execute the below command run spring boot application from the terminal.
```bash
$ mvn spring-boot:run
```

Once the application starts, we will make a curl request to our endpoint to publish the message.

```bash
$  curl -X POST -F 'message=test' http://localhost:8080/kafka/publish
```

We got an error which would be something like this:
```text
Caused by: java.lang.IllegalStateException: Topic(s) [user-name] is/are not present and missingTopicsFatal is true
	at org.springframework.kafka.listener.AbstractMessageListenerContainer.checkTopics(AbstractMessageListenerContainer.java:383) ~[spring-kafka-2.3.5.RELEASE.jar:2.3.5.RELEASE]
	at org.springframework.kafka.listener.ConcurrentMessageListenerContainer.doStart(ConcurrentMessageListenerContainer.java:136) ~[spring-kafka-2.3.5.RELEASE.jar:2.3.5.RELEASE]
	at org.springframework.kafka.listener.AbstractMessageListenerContainer.start(AbstractMessageListenerContainer.java:340) ~[spring-kafka-2.3.5.RELEASE.jar:2.3.5.RELEASE]
	at org.springframework.kafka.config.KafkaListenerEndpointRegistry.startIfNecessary(KafkaListenerEndpointRegistry.java:312) ~[spring-kafka-2.3.5.RELEASE.jar:2.3.5.RELEASE]
	at org.springframework.kafka.config.KafkaListenerEndpointRegistry.start(KafkaListenerEndpointRegistry.java:257) ~[spring-kafka-2.3.5.RELEASE.jar:2.3.5.RELEASE]
	at org.springframework.context.support.DefaultLifecycleProcessor.doStart(DefaultLifecycleProcessor.java:182) ~[spring-context-5.2.3.RELEASE.jar:5.2.3.RELEASE]
	... 14 common frames omitted
```

We forgot to create a topic on kafka server. Todo that we will execute below command in kafka's bin folder.

```bash
./kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic user-name
```

Let's try again, and now we can successfully receive the message sent via Kafka, it would be something like this:

```text
2020-05-03 02:13:23.524  INFO 5256 --- [nio-8080-exec-1] o.a.kafka.common.utils.AppInfoParser     : Kafka version: 2.3.1
2020-05-03 02:13:23.524  INFO 5256 --- [nio-8080-exec-1] o.a.kafka.common.utils.AppInfoParser     : Kafka commitId: 18a913733fb71c01
2020-05-03 02:13:23.524  INFO 5256 --- [nio-8080-exec-1] o.a.kafka.common.utils.AppInfoParser     : Kafka startTimeMs: 1588452203524
2020-05-03 02:13:23.529  INFO 5256 --- [ad | producer-1] org.apache.kafka.clients.Metadata        : [Producer clientId=producer-1] Cluster ID: y9U_vx0HRk6xe-fcDTKlmg
Received: test

```

You can find the complete code at [github](https://github.com/kuros/blog-code/tree/master/messaging/messaging-kafka).