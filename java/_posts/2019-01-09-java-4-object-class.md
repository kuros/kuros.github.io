---
title: Java - Object class
date: 2019-01-09
description: Understanding methods of object class.
categories:
  - java
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
---

The Object class sits at the top of the class hierarchy tree in the Java development environment. Every class in the Java system is a descendent (direct or indirect) of the Object class. The Object class defines the basic state and behavior that all objects must have, such as the ability to compare oneself to another object, to convert to a string, to wait on a condition variable, to notify other objects that a condition variable has changed, and to return the object's class.

It has some important method declared which are:-

<img alt="this impl" src="/images/java/j-19.webp" lazyload width="600px"/>

## The equals Method
Use the equals to compare two objects for equality. This method returns true if the objects are equal, false otherwise. Note that equality does not mean that the objects are the same object. Consider this code that tests two Integers, one and anotherOne, for equality: 

```java
Integer one = new Integer(1), anotherOne = new Integer(1);
if (one.equals(anotherOne))
    System.out.println("objects are equal");
``` 
This code will display objects are equal even though one and anotherOne reference two different, distinct objects. They are considered equal because they contain the same integer value. 

Your classes should override this method to provide an appropriate equality test. Your equals method should compare the contents of the objects to see if they are functionally equal and return true if they are. 

Let us see an example, we have a Employee class and we will override the equals method and use the employee name to compare the whether the two objects are equal or not.

```java
package inc;

public class Employee {

	private String name;
	private int age;

	public Employee(String name, int age) {
		this.name = name;
		this.age = age;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

	@Override
	public boolean equals(Object obj) {
		if (obj instanceof Employee) {

			Employee employee = (Employee) obj;
			if (name.equals(employee.getName()))
				return true;
		}

		return false;
	}
}
```
{% include ad %}

```java
package inc;

public class Entry {

	public static void main(String[] args) {
		Employee employee = new Employee("John", 21);
		Employee employee2 = new Employee("John", 45);
		Employee employee3 = new Employee("Michel", 25);
		
		if (employee.equals(employee2))
			System.out.println("The two employee's are equal");
		else
			System.out.println("Sorry, the two employee's are equal");
		
		if (employee.equals(employee3))
			System.out.println("The two employee's are equal");
		else
			System.out.println("Sorry, the two employee's are equal");
	}
}
```
{% include ad %}
```text
The two employee's are equal
Sorry, the two employee's are equal
```

## The toString Method
Returns a string representation of the object. In general, the toString method returns a string that "textually represents" this object. The result should be a concise but informative representation that is easy for a person to read. It is recommended that all subclasses override this method.

```java
public class A {

	@Override
	public String toString() {
		return "this is A String";
	}
}

public class B {

	public static void main(String[] args) {
		A a = new A();
		System.out.println(a);
	}

}
```

```text
this is A String
```

## The Hashcode Method

Anytime you override equals() you should also override hashCode(). The hashCode() method should ideally return the same int for any two objects that compare equal and a different int for any two objects that don't compare equal, where equality is defined by the equals() method. This is used as an index by the java.util.Hashtable class.

A hash function is any well-defined procedure or mathematical function that converts a large, possibly variable-sized amount of data into a small datum, in this case it uses int values. The values returned by a hash function are called hash codes

Hash codes are used to speed up table lookup or data comparison tasks—such as finding items in a database, detecting duplicated or similar records in a large file

In the Car example equality is determined exclusively by comparing license plates; therefore only the licensePlate field is used to determine the hash code. Since licensePlate is a String, and since the String class has its own hashCode() method, we can sponge off of that.

```java
public int hashCode() {
	  
    return this.licensePlate.hashCode();
    
}
```
{% include ad %}
Other times you may need to use the bitwise operators to merge hash codes for multiple fields. There are also a variety of useful methods in the type wrapper classes (java.lang.Double, java.lang.Float, etc.) that convert primitive data types to integers that share the same bit string. These can be used to hash primitive data types.

## The finalize method

Every class inherits the finalize() method from java.lang.Object .The method is called by the garbage collector when it determines no more references to the object exist. The Object finalize method performs no actions but it may be overridden by any class, normally it should be overridden to clean-up non-Java resources ie closing a file, closing database connections etc.

But best practice is to use a try-catch-finally statement and to always call super.finalize() method. Finalize runs once and only once for every object.

```java
    @Override
    	protected void finalize() throws Throwable {
    		try{
    			close(); //close all the open file
    		}finally{
    			super.finalize();
    		}	
    	} 
```




