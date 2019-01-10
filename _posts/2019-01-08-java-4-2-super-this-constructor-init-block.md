---
title: Java - Super, this, constructor calling, initialization blocks
date: 2019-01-08
description: Let look into initialization of objects
categories:
  - java
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
---

Time to take a deep dive into creation of objects.

## super
Often, you'll want to take advantage of some of the code in the superclass version of a method, yet still override it to provide some additional specific behavior. It's like saying, "Run the superclass version of the method, then come back down here and finish with my subclass additional method code."

```java
public class Animal {
	public void eat() { }
	public void printYourself() {
	// Useful printing code goes here
	}
}

class Monkey extends Animal {
	public void printYourself() {
	// Take advantage of Animal code, then add some more
		super.printYourself(); // Invoke the superclass
		// (Animal) code
		// Then do Monkey-specific
		// print work here
	}
}
```

In this code we use **super** keyword to call the Animal version of the method.

## this

The keyword this is used to reference the current working object, suppose for the given code.

<img alt="this impl" src="/images/java/j-16.webp" lazyload width="400px"/>

Here we have kept the name of instance and local variable same (val) but in the method setVal() we need to assign the value of local variable to the instance variable so to distinguish between the local and instance variable we use this key word. The Key word this refers to the current working object of a in this case.

## Constructor Calling

When we are working with inheritance we have to take care how the constructor is being called.
Every class, including abstract classes, MUST have a constructor. Few important points:-

-	Constructors use access modifier as that of the class.
-	The constructor name must match the name of the class.
-	Constructors must not have a return type.
-	It's legal (but stupid) to have a method with the same name as the class, but that doesn't make it a constructor.
-	Every constructor has, as its first statement, either a call to an overloaded constructor (this()) or a call to the superclass constructor (super())
-	A call to super() can be either a no-arg call or can include arguments passed to the super constructor.
-	Compiler inserts a default constructor if there is no constructor defined by the programmer.

Let us take a simple example to understand this concept.

```java
public class Animal {
	
	public Animal() {
		System.out.println("In the Animal constructor");
	}
	
}

public class Monkey extends Animal{
	
	public Monkey() {
		System.out.println("In the Monkey Constructor");
	}

	public Monkey(String args) {
		System.out.println("In the Monkey overloaded Constructor " );
	}
}

public class RunProgram {

	public static void main(String[] args) {
		
		Monkey monkey = new Monkey();
		System.out.println("************************");
		Monkey monkey2 = new Monkey("Gorilla");

	}
}
```

```text
In the Animal constructor
In the Monkey Constructor
************************
In the Animal constructor
In the Monkey overloaded Constructor
```

Note: - we have never called Animal constructor but still we could see that Animal constructor is being executed, how?
Let us see how it works

<img alt="this impl" src="/images/java/j-17.webp" lazyload width="600px"/>

1. Moneky constructor is invoked. Every constructor invokes the constructor of its superclass with an (implicit) call to super().

2. Animal constructor is invoked

3. Object constructor is invoked (Object is the ultimate superclass of all classes)

4. Object instance variables are given their explicit values.

5. Object constructor completes.

6. Animal instance variables are given their explicit values (if any).

7. Animal constructor completes.

8. Monkey instance variables are given their explicit values (if any).

9. Monkey constructor completes.

## Using **super** and **this** with constructors

You can use the super and this keyword to call the constructors of super class or to call other overloaded constructor of the same class.

```java
class ClassA {
	public ClassA() {
		System.out.println("ClassA default constructor");
	}
	
	public ClassA(String args) {
		System.out.println("ClassA overloaded constructor");
	}
}


public class ClassB extends ClassA {

	public ClassB() {
		this("passing args");
		System.out.println("In the ClassB Constructor");
	}

	public ClassB(String args) {
		super("overloaded");
		System.out.println("In the ClassB overloaded Constructor ");
	}

	public static void main(String[] args) {

		ClassB b = new ClassB();
		System.out.println("****************************");
		ClassB b2 = new ClassB("load");
	}

}
```

```text
ClassA overloaded constructor
In the ClassB overloaded Constructor 
In the ClassB Constructor
****************************
ClassA overloaded constructor
In the ClassB overloaded Constructor
```

## Initialization Blocks

We've talked about two places in a class where you can put code that performs operations: methods and constructors. Initialization blocks are the third place in a Java program where operations can be performed. Initialization blocks run when the class is first loaded (a static initialization block) or when an instance is created (an instance initialization block).

```java
public class SmallInit {

	static int x;
	int y;
	static { x = 7 ; } // static init block
	{ y = x + 1; } // instance init block

	public void printValues(){
		System.out.println(x);
		System.out.println(y);
		System.out.println("****************");
	}
	public static void main(String[] args) {
		SmallInit value1 = new SmallInit();

		value1.printValues();
	}
}
```

```text
7
8
****************
```

So we static init block runs first and then the instance initialization block.

A static initialization block runs once, when the class is first loaded. An instance initialization block runs once every time a new instance is created. You can have many initialization blocks in a class. It is important to note that unlike methods or constructors, the order in which initialization blocks appear in a class matters.

```java
public class Init {
	
	Init(int x) { System.out.println("1-arg const"); } //Line 1
	Init() { System.out.println("no-arg const"); } //Line 2
	static { System.out.println("1st static init"); } //Line 3
	{ System.out.println("1st instance init"); } //Line 4
	{ System.out.println("2nd instance init"); } //Line 5
	static { System.out.println("2nd static init"); } //Line 6
	
	public static void main(String [] args) {
		new Init();
		new Init(7);
	}
}
```

```text
1st static init
2nd static init
1st instance init
2nd instance init
no-arg const
1st instance init
2nd instance init
1-arg const
```

Order of how the program executed:-
1. When new Init(); is called
    1. Line 3
    2. Line 6
    3. Line 4
    4. Line 5
    5. Line 2
2. When new Init(7);is called
    1. Line 4
    2. Line 5
    3. Line 1







