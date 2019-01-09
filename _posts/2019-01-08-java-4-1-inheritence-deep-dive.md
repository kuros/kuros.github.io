---
title: Java - Inheritance deep dive
date: 2019-01-08
description: A deep dive in inheritance and method overriding
categories:
  - java
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
---

Ohh! Its inheritance again….. its freaking me out. I don’t understand what it is?
We see this kind of reaction every time we someone is first told about, Let us understand it using a simple example. 

Suppose you are a Zoo manager and you want to store the data about the animal of the zoo:-

<img alt="Animal family picture" src="/images/java/j-13.png" lazyload width="250px"/>

To solve this we create a class with the name of Animal and it will have some features which is common to all the animals, so all the animals will have a common method.
 
```java
public class Animal {
	
	public Animal(){
		System.out.println("This a generic Animal class");
	}
	String eat = "Animal eats";
	// Some featues goes here regarding Animal
	// ....
	// ....
	
}
```

Now our Zoo manager have different problem he wishes to store specific information about the a type of animal say but this information will not be applicable for other animals, a Monkey.

```java
public class Monkey extends Animal{
	
	public Monkey(){
		System.out.println("This a Monkey class");
	}

	String eat = "Eats banana";
	// this class holds the information about Monkey
	//....
	//....

	
}
```

Now there are different types of Monkey in the Zoo such as Ape, Baboon and Gorilla.

```java
public class Gorilla extends Monkey {

	String eat = "Eats banana and leafs";	
	// Some details regarding the Gorilla
	//....
	//....
	
}
```

## IS-A relationship
Interface implementation is not a part of inheritance tree and does not follow IS-A relationship IS-A is a way of saying, "this thing is a type of that thing."

So now

<img alt="Animal family picture" src="/images/java/j-14.png" lazyload width="400px"/>

"Monkey extends Animal" means "Monkey IS-A Animal."

"Gorilla extends Monkey" means "Gorilla IS-A Monkey."

So we can also say "Gorilla IS-A Animal."
  
## Has-A relationship
HAS-A relationships are based on usage, rather than inheritance. In other words, class A HAS-A B if code in class A has a reference to an instance of class B. For e.g. assuming again that Monkey extends from Animal. 

Has-A Relationship is also called as Aggregation. And a monkey has teeth hands legs etc.

<img alt="Animal family picture" src="/images/java/j-15.png" lazyload width="400px"/>

```java
public class Monkey {

	String name = "Gorilla";
	
	String teeth = "Sharp teeth";
	
	String hands = "long thin hands";
	
	String legs = "Short legs";
}
```

# Method Overriding
In a class hierarchy, when a method in a subclass has the same name and type signature as a method in its superclass, then the method in the subclass is said to override the method in the superclass.

Now in our Animal class let us assume that Animal has an eat method.
```java
public class Animal {
	
	public void eat(){
		System.out.println("Animal is eating");
	}
	
}

public class Monkey extends Animal{
	
      // overridding the Animal class method eat()
	public void eat() { 
		System.out.println("Monkey is eating");
	}
}

public class RunProgram {

	public static void main(String[] args) {
		Animal animal = new Animal(); // step1
		Animal animal2 = new Monkey(); //step2
		Monkey monkey = new Monkey(); //step3
		
		animal.eat();
		animal2.eat();
		monkey.eat();
	}

}
```

```text
Animal is eating
Monkey is eating
Monkey is eating
```
So let’s see what happens 
- At Step1: We create reference of Animal which points to an Animal object. So the output for animal.eat() is as expected (printing the Animal version of eat() method). 
- At Step2: We create reference of Animal which points to a Monkey object. So this time it will go run the Monkey version of eat () method, i.e. overriding the base class method.
- At Step3: Monkey reference refers to Monkey object, so prints the Monkey version of the eat () method)

Now let us modify the previous code and new function to the Monkey class.

```java
public class Animal {
	
	public void eat(){
		System.out.println("Animal is eating");
	}
	
}

public class Monkey extends Animal{
	
	public void eat() {
		System.out.println("Monkey is eating");
	}
	
	public void jump() {
		System.out.println("Monkey is jumping");
	}
}

public class RunProgram {

	public static void main(String[] args) {
		Animal animal = new Animal();
		Animal animal2 = new Monkey();
		Monkey monkey = new Monkey();
		
		animal.jump();//Line1
		
		animal2.jump();//Line2
		
		monkey.jump(); //Line3
	}
}
```
**Expected**

```text
Monkey is jumping
Monkey is jumping
Monkey is jumping
```
**But it is wrong and you will get the output as** 

```text
cannot find symbol
  symbol:   method jump()
  location: variable animal of type Animal
cannot find symbol
  symbol:   method jump()
  location: variable animal2 of type Animal
```
Let us understand it why does it happen:-
-	Line1:- The reference type is of Animal and it is pointing to an animal object, since the Animal class does not have any method known as jump(), so it gave a compilation error.
-	Line2:- The reference type is of Animal but the it pointing to Monkey object, still the reference type being an Animal type does know there exists any method known as jump() so it will give a compilation error.
-	Line3:- The it works fine since the reference and the object type is same and the jump() method is visible to the monkey reference.


## Late Binding

Java uses late-binding to support polymorphism; which means the decision as to which of the many methods should be used is deferred until runtime.

It is Java's use of late-binding which allows you to declare an object as one type at compile-time but executes based on the actual type at runtime.
If we use :

```java
Animal animal = new Monkey();
```

The object of monkey is bound to the animal reference type. However methods declared in Monkey class will not be visible in animal reference, to access you will have cast animal object to Monkey type.






