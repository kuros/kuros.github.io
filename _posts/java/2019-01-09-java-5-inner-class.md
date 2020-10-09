---
title: Java - Inner class
date: 2019-01-09
description: One of the most important and confusing topics.
categories:
  - java
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
---

Inner classes let you define one class within another. They provide a type of scoping for your classes since you can make one class a member of another class. Just as classes have member variables and methods, a class can also have member classes. They come in several flavors, depending on how and where you define the inner class, including a special kind of inner class known as a "top-level nested class" (an inner class marked static), which technically isn't really an inner class.

You define an inner class within the curly braces of the outer class:

```java
class MyOuter {
	class MyInner { }
}
```

When you will compile this class, this class will produce two .class files
- MyOuter.class
- MyOuter$MyInner.class

## Instantiating an Inner Class from Within the Outer Class

Most often, it is the outer class that creates instances of the inner class, since it is usually the outer class wanting to use the inner instance as a helper for its own personal use.

```java
class MyOuter {
	private int x = 7;
	public void makeInner() {
		MyInner in = new MyInner(); // make an inner instance
		in.seeOuter();
	}
	class MyInner {
		public void seeOuter() {
			System.out.println("Outer x is " + x);
		}
	}
}
```

You can see in the preceding code that the MyOuter code treats MyInner just as though MyInner were any other accessible class—it instantiates it using the class name (new MyInner()), and then invokes a method on the reference variable (in.seeOuter()).

{% include ad %}
## Creating an Inner Class Object from Outside the Outer Class Instance Code

If we want to create an instance of the inner class, we must have an instance of the outer class.

```java
public static void main(String[] args) {
	MyOuter mo = new MyOuter(); // gotta get an instance!
	MyOuter.MyInner inner = mo.new MyInner();
	inner.seeOuter();
}
```

The preceding code is the same regardless of whether the main() method is within the MyOuter class or some other class (assuming the other class has access to MyOuter, and sinceMyOuter has default access, that means the code must be in a class within the same package asMyOuter).

```java
package inc;

class FactoryOuter {
	FactoryInner[] fi = new FactoryInner[3];
	protected int lastIndex = 0;
	private int x = 0;

	public FactoryOuter(int x) {
		this.x = x;
	}

	public int getX() {
		return x;
	}

	public void addInner(int y) {
		if (lastIndex < fi.length) {
			fi[lastIndex++] = new FactoryInner(y);
		} else
			throw new RuntimeException("FactoryInner array full");
	}

	public void list() {
		for (int i = 0; i < fi.length; i++) {
			System.out.print("I can see into the inner class where y = "
					+ fi[i].y + " or call display: ");
			fi[i].display();
		}
	}

	public class FactoryInner {
		private int y;

		protected FactoryInner(int y) {
			this.y = y;
		}

		public void display() {
			System.out.println("FactoryInner x = " + x + " and y = " + y);
		}
	}
}

public class FactoryInnerOuter {
	public static void main(String[] args) {
		FactoryOuter fo = new FactoryOuter(1);
		fo.addInner(101);
		fo.addInner(102);
		fo.addInner(103);
		fo.list();
		// fo.addInner(104);
	}
}
```
{% include ad %}

The explanation of the code is as below
- an instance of FactoryOuter contains a three element array of FactoryInner objects
- the addInner method instantiates a FactoryInner object and adds it to the array (note that is still automatically associated with the FactoryOuter instance by the JVM, but we need our own mechanism for keeping track of the inner class instances we create) 
    - a better approach would be to use one of the collections classes instead of an array, to avoid running out of room in the array
    

        
```text
I can see into the inner class where y = 101 or call display: FactoryInner x = 1 and y = 101
I can see into the inner class where y = 102 or call display: FactoryInner x = 1 and y = 102
I can see into the inner class where y = 103 or call display: FactoryInner x = 1 and y = 103
```






