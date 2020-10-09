---
title: Java - Type Casting
date: 2019-01-08
description: Casting one object to another type
categories:
  - java
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
---

The type casting comprises of two subtypes, a) Primitive type casting and b) Object Reference Type casting.

# Primitive Type casting
Casting lets you convert primitive values from one type to another. Casts can be implicit or explicit. An implicit cast means you don't have to write code for the cast; the conversion happens automatically. Typically, an implicit cast happens when you're doing a widening conversion. In other words, to put a smaller thing (say, a byte) into a bigger container (like an int).

The large-value-into-small-container conversion is referred to as narrowing and requires an explicit cast, where you tell the compiler that you're aware of the danger and accept full responsibility.

```java
int a = 100;
long b = a; // Implicit cast, an int value always fits in a long
```
Now if we want to assign an decimal value to an integer variable 
int x = 345.456; 

the compiler will raise an error saying:-
Incompatible type for declaration. Explicit cast needed to convert double to int.

To resolve the issue we will have to explicitly typecast the double value to int type
So the code now looks like this:- 
- int x =  (int)345.456;

The following code demonstrates the primitive typecasting:-
```java
public class Test {
	public static void main(String args[]){
		float f = 123.45f;
		
		System.out.println("The value of f = " + f);
		
		int i = (int)f; // explicit typecasting 
		System.out.println("The value of i = " + i);
		
		double d = (double)f; // explicitly typecasting but could also be implicit
		System.out.println("The value of d = " + d);
	}
}
```
{% include ad %}
```text
The value of f = 123.45
The value of i = 123
The value of d = 123.44999694824219
```

# Object Reference Type casting
In java object typecasting one object reference can be type cast into another object reference. The cast can be to its own class type or to one of its subclass or superclass types or interfaces.

When we cast a reference along the class hierarchy in a direction from the root class towards the children or subclasses, it is a downcast. When we cast a reference along the class hierarchy in a direction from the sub classes towards the root, it is an upcast. We need not use a cast operator in this case.

The compile-time rules are there to catch attempted casts in cases that are simply not possible. This happens when we try to attempt casts on objects that are totally unrelated (that is not subclass super class relationship or a class-interface relationship) At runtime a ClassCastException is thrown if the object being cast is not compatible with the new type it is being cast to.

```java
//X is a supper class of Y and Z which are sibblings.
public class RunTimeCastDemo {

	public static void main(String args[]) {
		X x = new X();
		Y y = new Y();
		Z z = new Z();
		X xy = new Y(); // compiles ok (up the hierarchy)
		X xz = new Z(); // compiles ok (up the hierarchy)
		//		Y yz = new Z();   incompatible type (siblings)
		//		Y y1 = new X();   X is not a Y
		//		Z z1 = new X();   X is not a Z
		X x1 = y; // compiles ok (y is subclass of X)
		X x2 = z; // compiles ok (z is subclass of X)
		Y y1 = (Y) x; // compiles ok but produces runtime error
		Z z1 = (Z) x; // compiles ok but produces runtime error
		Y y2 = (Y) x1; // compiles and runs ok (x1 is type Y)
		Z z2 = (Z) x2; // compiles and runs ok (x2 is type Z)
		//		Y y3 = (Y) z;     inconvertible types (siblings)
		//		Z z3 = (Z) y;     inconvertible types (siblings)
		Object o = z;
		Object o1 = (Y) o; // compiles ok but produces runtime error
	}
}
```

In general cast is done when an Object reference is assigned (cast) to:
-	 A reference variable whose type is the same as the class from which the object was instantiated. An Object as Object is a super class of every Class.
-	 A reference variable whose type is a super class of the class from which the object was instantiated.
-	 A reference variable whose type is an interface that is implemented by the class from which the object was instantiated.
-	 A reference variable whose type is an interface that is implemented by a super class of the class from which the object was instantiated.

Consider an interface Vehicle, a super class Car and its subclass Ford. The following example shows the automatic conversion of object references handled by the compiler
{% include ad %}
```java
interface Vehicle {
}
class Car implements Vehicle {
}

class Ford extends Car {
}
```

Let c be a variable of type Car class and f be of class Ford and v be an vehicle interface reference. We can assign the Ford reference to the Car variable:
i.e. we can do the following

### Example 1
```java
c = f; //Ok Compiles fine
```

Where c = new Car();

And, f = new Ford();

The compiler automatically handles the conversion (assignment) since the types are compatible (sub class - super class relationship), i.e., the type Car can hold the type Ford since a Ford is a Car.

### Example 2
```java
v = c; //Ok Compiles fine
c = v; // illegal conversion from interface type to class type results in compilation error
```
Where c = new Car();

And v is a Vehicle interface reference (Vehicle v)

The compiler automatically handles the conversion (assignment) since the types are compatible (class – interface relationship), i.e., the type Car can be cast to Vehicle interface type since Car implements Vehicle Interface. (Car is a Vehicle).














