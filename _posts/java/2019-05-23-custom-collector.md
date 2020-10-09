---
title: Java 8 - Creating a Custom Collector for Streams
date: 2019-05-23
description: We all have used Collectors provided by java api, its time to write our own.
categories:
  - java
  - Streams
author_staff_member: rohit
---

Java Streams provide a wide range of collectors which is generally sufficient for most of the day to day use. But sometimes you need to perform some special operations, which is not provided out of the box.

We can create our own custom collectors to suit our requirement.

We have a requirement, we want to collect only distinct items from a list.

# Create Custom Collector



If we look the at the Collector interface, it provided 5 methods which we need to implement.

```java
public interface Collector<T, A, R> {

    Supplier<A> supplier();

    BiConsumer<A, T> accumulator();

    BinaryOperator<A> combiner();

    Function<A, R> finisher();

    Set<Characteristics> characteristics();
}
```

Here the collector interface comprises of 3 generic data types, T, A, R.
- T: Type of the data stream, for e.g. if we have List<Integer> over which we are streaming, then Integer will be the type.
- A: Accumulation type, this is the hidden store where we want to store the intermediate results.
- R: Return type, this is return type.

## Supplier
We need to provide a supplier that creates a result container. This is where the accumulated value will be stored.

{% include ad %}

In our case we need a _Set_ to hold unique items. 

```java
() -> new HashSet<>();
```

## Accumulator
Now we need to create a function which defines how to add element to the result container. In this case we add elements to the set.

```java
(result, item) -> result.add(item)
``` 

## Combiner
In a sequential reduction the supplier and accumulator above would be sufficient. But to be able to support a parallel implementation we need to provide a combiner.

The combiner is a function that defines how two result containers could be combined.

Why?

{% include ad %}

In parallel processing the stream is broken into multiple processing units, each unit processed and is accumulated independently, so we need to merge all this units to get the final result using the combiner.

```java
(result1, result2) -> {
    result1.addAll(result2);
    return result1;
}
```
In our case we will have two sets, so we will merge them and return a combined result.

## Finisher
There are times when your result container and your final output is of different types, and you want to adapt the result container.

Like in our example, we are storing the items in a set but we want output to be a list, so we will leverage the finisher to adapt into a list.

```java
c -> new ArrayList<Integer>(c)
``` 

## Characteristics
Finally we need to tell the collector framework, what is the properties of our collector, this can be used to optimize reduction implementation.

There are 3 types of Characteristics available:
- **CONCURRENT**: Indicates that this collector is concurrent, meaning that the result container can support the accumulator function being called concurrently with the same result container from multiple threads.
- **IDENTITY_FINISH**: Indicates that the finisher function is the identity function and can be elided
- **UNORDERED**: Indicates that the collection operation does not commit to preserving the encounter order of input elements.

{% include ad %}

So in our case it will have both CONCURRENT & UNORDERED characteristics.

# Complete Code

```java
package in.kuros.blog.code.java.streams;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collector;

public class CustomCollector {
    
    public static <T> Collector<T, Set<T>, List<T>> unique() {
        return Collector.of(
                () -> new HashSet<T>(),
                (result, item) -> result.add(item),
                (result1, result2) -> {
                    result1.addAll(result2);
                    return result1;
                },
                c -> new ArrayList<T>(c),
                Collector.Characteristics.CONCURRENT,
                Collector.Characteristics.UNORDERED);
    }
}
```

We can also replace lamda with method reference.
so the new code will become:
```java
package in.kuros.blog.code.java.streams;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collector;

public class CustomCollector {

    public static <T> Collector<T, Set<T>, List<T>> unique() {
        return Collector.of(
                HashSet::new,
                Set::add,
                (result1, result2) -> {
                    result1.addAll(result2);
                    return result1;
                },
                ArrayList::new,
                Collector.Characteristics.CONCURRENT,
                Collector.Characteristics.UNORDERED);
    }
}
```

Finally lets test it:

```java
public static void main(String[] args) {
    final List<Integer> result = IntStream.of(1, 2, 3, 4, 3, 4, 5)
            .boxed()
            .collect(CustomCollector.unique());

    System.out.println(result);
}
```
```bash
[1, 2, 3, 4, 5]
```

You can find [the complete code here](https://github.com/kuros/blog-code/tree/master/java/src/main/java/in/kuros/blog/code/java/streams)

    