---
title: Java - Assertions
date: 2019-01-08
description: Help the programmer to debug the application
categories:
  - java
image: https://source.unsplash.com/random/1500x1000
author_staff_member: rohit
---

Assertions are used to stop execution when "impossible" situations are detected. Assertions were introduced mainly to help the programmer to debug the application. We use assertion for the below mentioned conditions.

- Impossible conditions. Program debugging is filled with "impossible" problems ("But that parameter can't possibly be null"). If you're lucky, the problem is detected immediately in some way you can easily diagnose. If not, the error may propagate thru the program, finally crashing, but so far from the original bug that diagnosis is difficult. Even worse, the bug may not produce visible symptoms until after it has altered permanent data. Assert statements provide an easy means to check for impossible conditions, with little or no runtime cost.

- Programmer, not user problems. The purpose or asserts is to detect programming errors, and they should not be used in the case of erroneous user input or actions.

- Crash as quickly as possible. Discovering bugs as early as possible is good. Every program starts with bugs, and the debugging process is faster and simpler when the bugs are detected early. It's better to discover a problem at compile time than at run time, and it's better to discover a run-time bug as early as possible. Often a run-time bug doesn't cause an immediate, visible, disaster. Instead, the consequences of the bug distort the following execution, and the bad effects may not become visible for a long time. The crippled program may corrupt files or have other bad consequences. Tracing symptoms back to the original cause can be a long, tedious process. The goal is to detect bugs as early as possible. Assertions provide a relatively painless way to stop many bugs before they go too far.

There are two forms of the assert statement:-

- Usual form
- Abbreviated form

## Usual form

An assert statement has two parts separated by a colon. The boolean condition must be true for execution to continue. If it is false, an AssertionError is thrown, which terminates execution and display the message string. Some examples

```java
assert accountNumber <= 1 : "Account number cannot be less than 1";

assert connector != null : "merge: Connector null for " + rel;
```

When asserts are enabled, the assert statement checks the condition (account number < 1, connector is not null, etc) which must be true for the program to function correctly. If it's true, execution continues. If connector is null (expression is false), an exception containing the message is thrown. This message is for the programmer, so it doesn't have to be user friendly.

## Abbreviated form

The simplest form the assert statement specifies only a boolean expression that must be true. This is ok when there's not much to say, or the likelyhood of failing seems so remote it isn't worth the extra typing:

```java
assert n > 0;
```

## Enabling Assertion
Assertion checking defaults to off at runtime. 
Let us see an example:-

```java
public class Test {

	public static void main(String[] args){
		assert (args[0].equals("Hi")) : "show me the message";
		System.out.println("Hello Assert");
	}
}
```

When we compile and run this program we get the output as 

```bash
$ javac Test.java

$ java Test
Hello Assert
```
So we see that the assert statement is not executing, so in order to run the program with assert statement we will use the following way.

```bash
$ java -ea Test
```
Now we could see that program ends on the assert statement. And hence letting us know that program is now working fine at this condition.

```text
Exception in thread "main" java.lang.ArrayIndexOutOfBoundsException: 0
	at Scratch.main(scratch_1.java:4)
```

## Disabling Assertion
Similarly we can also disable assertion using the following way to run the program

```bash
$ java -da Test
```

## When to use

There are many condition in which you can use assertion:-
- To indicate their assumptions concerning a program's behavior
- Place an assertion at any location you assume will not be reached
- Use an assertion to test a nonpublic method's precondition that you believe will be true no matter what a client does with the class.
- You can test post condition with assertions in both public and nonpublic methods.

## When not to use
You should always take care of using assertion, some points to take care of are:-
- Do not use assertions for argument checking in public methods.
- Do not use assertions to do any work that your application requires for correct operation.

























