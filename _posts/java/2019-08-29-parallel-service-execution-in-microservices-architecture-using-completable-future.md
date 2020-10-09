---
title: Making parallel service calls in microservice architecture.
date: 2019-08-20
description: Let's explore how to speed up response times in micro service design.
categories:
  - java
  - microservices
author_staff_member: rohit
---

Not so long ago, when I started my development journey, we use to work with single monolith project. The work culture was pretty different compared to current times, we used to get change requests (CR's) from our client. Then there use to be huge round discussion, finally we use to create delivery schedule, design documents, test schedules and many more even before starting any work.
And then we(developers) use to give estimates, which was generally reduced to half(because the client demand the feature early). Our day to day job.

<img alt="monolith" src="/images/loader.svg" data-src="/images/2019/java/microservice-monlith.png" class="lazy img-center img-half"/>

But even for a very small change there used to huge dev, qa, deployment cycle and a simple feature like adding a text box use to take up months. Why!!! because we had go through an end to end validation of complete system, even if the changes were not related to each other distantly.

So what we did, we decided to break up the system into smaller services, each service had clear demarcation and role. 

# Challenges with microservices
There were numerous things we tried, we failed, we re-designed, and after few failed attempts we could see the silver lining. We had created over 20 deployable against a single monolith. We spend some decent time is creating full test suite ie. unit/integration/acceptance and even diagnostic test. All the product was 100% automated. Finally we moved from releasing 2 builds/month to over 600 builds/month. It was great achievement by our team. Still we are stuck.

<img alt="monolith" src="/images/loader.svg" data-src="/images/2019/java/microservice-phase-1.png" class="lazy img-center img-half"/>
   
There was only one piece of the puzzle which was giving us nightmares - **The DATABASE**.

We still have all the services connecting to same schema. The reason was simple, its a legacy application broken into multiple services, and each system was having queries which was reading data from tables which it did not own's. So!!! we tried to split the schema.

<img alt="monolith" src="/images/loader.svg" data-src="/images/2019/java/microservice-phase-2.png" class="lazy img-center img-half"/>

Every thing looked nice, it was time to celebrate, we were feeling proud of our achieved, and soon the joy turned into a deep sorrow, we all got a call from **one who must not be named** ... 

{% include ad %}

The performance has dropped, simple request were taking too long, our system has slowed down. So we went back to the design board, again documented the process flow, and as we drilled down we located the monster lurking behind - too many service to service calls.

<img alt="monolith" src="/images/loader.svg" data-src="/images/2019/java/microservice-sync-call.png" class="lazy img-center img-half"/> 

Assuming each service took only 300ms to complete, but the overall response time was exceeding 1200ms.

# Async calls to rescue.
Obviously we wanted to make async calls, collate the data at the end send the response back. We tried implementing different solutions using executor service, it worked but the usage was complicated, we wanted something simpler.

> Soon we found out, CompletableFuture was introduced in Java 8. We tried using it.

```java
package in.kuros.blog.code.java.parallel;

import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class CompletableFutureExample {

    public static void main(final String[] args) throws ExecutionException, InterruptedException {
        
        final CompletableFuture<Integer> service1 = CompletableFuture.supplyAsync(() -> slowService(1));
        final CompletableFuture<Integer> service2 = CompletableFuture.supplyAsync(() -> slowService(2));
        final CompletableFuture<Integer> service3 = CompletableFuture.supplyAsync(() -> slowService(3));

        CompletableFuture.allOf(service1, service2, service3).get();

        final int value1 = service1.get();
        final int value2 = service1.get();
        final int value3 = service1.get();

        System.out.println(value1 + value2 + value3);
    }

    private static Integer slowService(final int i) {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return i;
    }
}
```

It served the purpose.

# Wrapper over CompletableFuture
I still wanted it to be simpler to use. So I created a wrapper over it. Here is my solution, I created a class ParallelExecution.

```java
package in.kuros.blog.code.java.parallel;

import java.util.concurrent.CompletableFuture;
import java.util.function.BiFunction;
import java.util.function.Supplier;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public final class ParallelExecution {

    private Stream<CompletableFuture> futureStream;

    private ParallelExecution(final CompletableFuture<?> completableFuture) {
        this(Stream.of(completableFuture));
    }

    private ParallelExecution(final Stream<CompletableFuture> futureStream) {
        this.futureStream = futureStream;
    }

    public static <V> ParallelExecution of(final Supplier<V> supplier) {
        return new ParallelExecution(CompletableFuture.supplyAsync(supplier));
    }

    public static <V> ParallelExecution of(final Supplier<V> supplier, final BiFunction<V, Throwable, V> errorHandler) {
        return new ParallelExecution(CompletableFuture.supplyAsync(supplier).handle(errorHandler));
    }

    public <T> ParallelExecution and(final Supplier<T> supplier) {
        final Stream<CompletableFuture> stream = Stream.of(CompletableFuture.supplyAsync(supplier));
        return new ParallelExecution(Stream.concat(futureStream, stream));
    }

    public <T> ParallelExecution and(final Supplier<T> supplier, final BiFunction<T, Throwable, T> errorHandler) {
        final Stream<CompletableFuture> stream = Stream.of(CompletableFuture.supplyAsync(supplier).handle(errorHandler));
        return new ParallelExecution(Stream.concat(futureStream, stream));
    }

    public ExecutionResult close() {
        return  new ExecutionResult(futureStream
                .map(CompletableFuture::join)
                .collect(Collectors.toList()));
    }
}
```

{% include ad-h %}

And collected the results in a new class:
```java
package in.kuros.blog.code.java.parallel;

import java.util.List;

public class ExecutionResult {

    private List<?> result;

    ExecutionResult(final List<?> result) {
        this.result = result;
    }

    @SuppressWarnings("unchecked")
    public <T> T get(final int index) {
        return (T) result.get(index);
    }
}
```
Finally, we can execute service in parallel.
```java
package in.kuros.blog.code.java.parallel;

public class ParallelExecutionExample {

    public static void main(String[] args) {
        final ExecutionResult executionResult = ParallelExecution.of(() -> slowService(1))
                .and(() -> slowService(2))
                .and(() -> slowService(3))
                .close();

        int val = executionResult.get(0);
        int val2 = executionResult.get(1);
        int val3 = executionResult.get(2);

        System.out.println(val + val2 + val3);
    }

    private static Integer slowService(final int i) {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return i;
    }
}
```



The beauty of the solution is that in case of any service failure we get proper exception in the handling class.

```java
package in.kuros.blog.code.java.parallel;

public class ParallelExecutionExceptionExample {

    public static void main(String[] args) {
        final ExecutionResult executionResult = ParallelExecution.of(() -> slowService(1))
                .and(() -> {
                    throw new RuntimeException("Bam!!");
                })
                .and(() -> slowService(3))
                .close();

        executionResult.get(0);
    }

    private static Integer slowService(final int i) {
        try {
            Thread.sleep(1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        return i;
    }
}
```
```bash
Exception in thread "main" java.util.concurrent.CompletionException: java.lang.RuntimeException: Bam!!
	at java.util.concurrent.CompletableFuture.encodeThrowable(CompletableFuture.java:273)
	at java.util.concurrent.CompletableFuture.completeThrowable(CompletableFuture.java:280)
	at java.util.concurrent.CompletableFuture$AsyncSupply.run(CompletableFuture.java:1592)
	at java.util.concurrent.CompletableFuture$AsyncSupply.exec(CompletableFuture.java:1582)
	at java.util.concurrent.ForkJoinTask.doExec(ForkJoinTask.java:289)
	at java.util.concurrent.ForkJoinPool$WorkQueue.runTask(ForkJoinPool.java:1056)
	at java.util.concurrent.ForkJoinPool.runWorker(ForkJoinPool.java:1692)
	at java.util.concurrent.ForkJoinWorkerThread.run(ForkJoinWorkerThread.java:157)
Caused by: java.lang.RuntimeException: Bam!!
	at in.kuros.blog.code.java.parallel.ParallelExecutionExceptionExample.lambda$main$1(ParallelExecutionExceptionExample.java:8)
	at java.util.concurrent.CompletableFuture$AsyncSupply.run(CompletableFuture.java:1590)
	... 5 more

Process finished with exit code 1
```

Now, we have cleaner way to make service to service calls and then use the results at the end.

[Find the code here](https://github.com/kuros/blog-code/tree/master/java/src/main/java/in/kuros/blog/code/java/parallel).


    