---
title: Java - final variable, method and final class
date: 2019-01-09
description: The keyword "final" in Java is used in different ways depending on the context
categories:
  - java
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
---

We can have final methods, final classes, final data members, final local variables and final parameters. A final class implicitly has all the methods as final, but not necessarily the data members. A final class may not be extended; neither may a final method be overridden.

**Final primitive data members cannot be changed once they are assigned, neither may final object handle data members** (Vector, String, JFrame, etc.) be reassigned to new instances, but if they are mutable (meaning they've got methods that allow us to change their state), their contents may be changed.

## Final Methods

You can declare some or all of a class's methods final. You use the final keyword in a method declaration to indicate that the method cannot be overridden by subclasses. The Object class does this—a number of its methods are _final_.

```java
public class FinalBase {
	public final void method (){
		System.out.println(" This the final method");
	}
}

``` 
<img alt="this impl" src="/images/java/j-18.webp" lazyload width="400px"/>

In this code area we wrote a FinalBase class and a FinalInherit Class but when we try to access the list of methods which we could override we did not get to see the method which we have declared as final in FinalBase class.

## Final classes

When you did not wanted the class to be inherited by any other class you use the final keyword.

```java
public final class FinalClass{
	...
	...
}
```






