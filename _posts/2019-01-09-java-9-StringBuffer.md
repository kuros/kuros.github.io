---
title: Java - StringBuffer
date: 2019-01-09
description: Manage Strings using StringBuffer.
categories:
  - java
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
---

The java.lang.StringBuffer class should be used when you have to make a lot of modifications to strings of characters. String objects are immutable, so if you choose to do a lot of manipulations with String objects, you will end up with a lot of abandoned String objects in the String pool. On the other hand, objects of type StringBuffer can be modified over and over again without leaving behind a great effluence of discarded String objects, i.e. StringBuffer is mutable as compared to String Class which is immutable. There is one more important difference,  that is the StringBuffer is synchronised.

## Constructors
```java
StringBuffer()
StringBuffer(int length)
StringBuffer(String str)
```
Every string buffer has a capacity. As long as the length of the character sequence contained in the string buffer does not exceed the capacity, it is not necessary to allocate a new internal buffer array. If the internal buffer overflows, it is automatically made larger. The default Buffer size is 16 characters.

```java
String x = "abc";
x = x.concat("def");
System.out.println("x = " + x); // output is "x = abcdef"

StringBuffer sb = new StringBuffer("abc");
sb.append("def");
System.out.println("sb = " + sb); // output is "sb = abcdef"
```

## Important Methods in the StringBuffer Class
### public StringBuffer append(String s)

This method will take many different arguments, including boolean, char, double, float, int, long, and others, but the most likely use on the exam will be a String argument.

```java
StringBuffer sb = new StringBuffer("set ");
sb.append("point");
System.out.println(sb); // output is "set point"
StringBuffer sb2 = new StringBuffer("pi = ");
sb2.append(3.14159f);
System.out.println(sb2); // output is "pi = 3.14159"
```

### public StringBuffer delete(int start, int end)
This method returns a StringBuffer object and updates the value of the StringBuffer object that invoked the method call. In both cases, a substring is removed from the original object. The starting index of the substring to be removed is defined by the first argument (which is zero-based), and the ending index of the substring to be removed is defined by the second argument.
```java
StringBuffer sb = new StringBuffer("0123456789");
System.out.println(sb.delete(4,6)); // output is "01236789"
```

### public StringBuilder insert(int offset, String s)
This method returns a StringBuffer object and updates the value of the StringBuffer object that invoked the method call. In both cases, the String passed in to the second argument is inserted into the original StringBuffer starting at the offset location represented by the first argument (the offset is zero-based). Again, other types of data can be passed in through the second argument (boolean, char, double, float, int, long, and so on)

```java
StringBuilder sb = new StringBuilder("01234567");
sb.insert(4, "---");
System.out.println( sb ); // output is "0123---4567"
```

### public synchronized StringBuffer reverse()
This method returns a StringBuffer object and updates the value of the StringBuffer object that invoked the method call. In both cases, the characters in the StringBuffer are reversed, the first character becoming the last, the second becoming the second to the last, and so on.

```java
StringBuffer s = new StringBuffer("A man a plan a canal Panama");
sb.reverse();
System.out.println(sb); // output: "amanaP lanac a nalp a nam A"
```

### public String toString()
This method returns the value of the StringBuffer object that invoked the method call as a String.
```java
StringBuffer sb = new StringBuffer("test string");
System.out.println( sb.toString() ); // output is "test string"
```

```java
public class Main {

	public static void main(String[] args) {
		StringBuffer sb = new StringBuffer();
		StringBuffer sb2 = sb;
		sb.append(true);
		sb.append('A');

		char[] carray = { 'a', 'b', 'c' };
		sb.append(carray);
		sb.append(carray, 0, 1);
		sb.append(3.5d);

		sb2.append(2.4f);
		sb2.append(45);
		sb2.append(90000l);

		sb2.append("That's all!");

		System.out.println(sb);
	}
}
```
```bash
trueAabca3.52.44590000That's all!
```















