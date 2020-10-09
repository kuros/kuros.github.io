---
title: Comparable & Comparator
date: 2019-01-17
description:  
categories:
  - java
author_staff_member: rohit
---

While writing the object-oriented programs, comparison of two instances of the same class is often required. Once instances are comparable, we can sort them in any order. Comparable interface is defined in java.lang package and is used to define the natural sort order of a class. The interface java.lang.Comparator defines an auxiliary sort order for a class.  

Comparable interface can be implemented by implementing only one method: compareTo. Implement the existing class by defining the the natural order of that class. compareTo() method compares the two object of same type and returns a numerical result based on the comparison. If the result is negative, then the object sorts less than the other; if 0, the two are equal, and if positive, this object sorts greater than the other. To translate this into boolean, simply performs object1.compareTo(object2) <op> object,  where op is one of <, <=, =, !=, >, or >=.

```java
import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;

public class Person implements Comparable {
  String firstName, lastName;

  public Person(String f, String l) {
    this.firstName = f;
    this.lastName = l;
  }

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public String toString() {
    return "\n[First Name=" + firstName + ", Last name=" + lastName + "]";
  }

  public int compareTo(Object obj) {
    Person emp = (Person) obj;
    int deptComp = firstName.compareTo(emp.getFirstName());

    return ((deptComp == 0) ? lastName.compareTo(emp.getLastName())
        : deptComp);
  }

  public boolean equals(Object obj) {
    if (!(obj instanceof Person)) {
      return false;
    }
    Person emp = (Person) obj;
    return firstName.equals(emp.getFirstName())
        && lastName.equals(emp.getLastName());
  }

  public static void main(String args[]) {
    Person emps[] = { new Person("Debbie", "Deg"),
        new Person("Geri", "Gradus"), new Person("Ester", "Exy"),
        new Person("Mary", "Meas"),
        new Person("Anastasia", "Fredo") };
    Set set = new TreeSet(Arrays.asList(emps));
    System.out.println(set);
  }
}
```
```text
[
[First Name=Anastasia, Last name=Fredo], 
[First Name=Debbie, Last name=Deg], 
[First Name=Ester, Last name=Exy], 
[First Name=Geri, Last name=Gradus], 
[First Name=Mary, Last name=Meas]]
```
{% include ad %}
# Comparator Interface

While you were looking up the Collections.sort() method you might have noticed that there is an overloaded version of sort() that takes a List, AND something called a Comparator. The Comparator interface gives you the capability to sort a given collection any number of different ways. The other handy thing about the Comparator interface is that you can use it to sort instances of any class—even classes you can't modify. The Comparator interface is also very easy to implement, having only one method, compare ().

The compare () method returns an int with the following characteristics:

- negative If thisObject < anotherObject
- zero If thisObject == anotherObject
- positive If thisObject > anotherObject

```java
import java.util.*;

class Employee {

	private int age;

	private String name;

	public void setAge(int age) {

		this.age = age;

	}

	public int getAge() {

		return this.age;

	}

	public void setName(String name) {

		this.name = name;

	}

	public String getName() {

		return this.name;

	}

}

/*
 * 
 * User defined java comaprator.
 * 
 * To create custom java comparator Implement Comparator interface and
 * 
 * define compare method.
 * 
 * The below given comparator compares employees on the basis of their age.
 */

class AgeComparator implements Comparator {

	public int compare(Object emp1, Object emp2) {

		// parameter are of type Object, so we have to downcast it to Employee
		// objects

		int emp1Age = ((Employee) emp1).getAge();

		int emp2Age = ((Employee) emp2).getAge();

		if (emp1Age > emp2Age)

			return 1;

		else if (emp1Age < emp2Age)

			return -1;

		else

			return 0;

	}

}

/*
 * 
 * The below given comparator compares employees on the basis of their name.
 */

class NameComparator implements Comparator {

	public int compare(Object emp1, Object emp2) {

		// parameter are of type Object, so we have to downcast it to Employee
		// objects

		String emp1Name = ((Employee) emp1).getName();

		String emp2Name = ((Employee) emp2).getName();

		// uses compareTo method of String class to compare names of the
		// employee

		return emp1Name.compareTo(emp2Name);

	}

}

/*
 * 
 * This Java comparator example compares employees on the basis of
 * 
 * their age and name and sort it in that order.
 */

public class Main {

	public static void main(String args[]) {

		/*
		 * 
		 * Employee array which will hold employees
		 */

		Employee employee[] = new Employee[2];

		// set different attributes of the individual employee.

		employee[0] = new Employee();

		employee[0].setAge(40);

		employee[0].setName("Joe");

		employee[1] = new Employee();

		employee[1].setAge(20);

		employee[1].setName("Mark");

		System.out.println("Order of employee before sorting is");

		// print array as is.

		for (int i = 0; i < employee.length; i++) {

			System.out.println("Employee " + (i + 1) + " name :: "
					+ employee[i].getName() + ", Age :: "
					+ employee[i].getAge());

		}

		/*
		 * 
		 * Sorting array on the basis of employee age by passing AgeComparator
		 */

		Arrays.sort(employee, new AgeComparator());

		System.out
				.println("\n\nOrder of employee after sorting by employee age is");

		for (int i = 0; i < employee.length; i++) {

			System.out.println("Employee " + (i + 1) + " name :: "
					+ employee[i].getName() + ", Age :: "
					+ employee[i].getAge());

		}

		/*
		 * 
		 * Sorting array on the basis of employee Name by passing NameComparator
		 */

		Arrays.sort(employee, new NameComparator());

		System.out
				.println("\n\nOrder of employee after sorting by employee name is");

		for (int i = 0; i < employee.length; i++) {

			System.out.println("Employee " + (i + 1) + " name :: "
					+ employee[i].getName() + ", Age :: "
					+ employee[i].getAge());

		}

	}

}
```
In the above code we have declared a class Employee with two variables name and age. Now we will sort the list of employee depending on his name and age for which we used two classes NameComparator and AgeComparator respectively.

Let us take AgeComparator to understand how the comparator works. For a class to be Comparator, it must implement comparator interface. In this class we override the compareTo(object1, object2) method, So we get the Employee age from the object1 and object2. And we returned the values as -1, 0 or +1 depending on the criteria.

Once we have our comparator ready we use this comparator and pass it through the Arrays.sort() method. Once the sorting is done the original list gets sorted according to the criteria.
{% include ad %}

```text
Order of employee before sorting is
Employee 1 name :: Joe, Age :: 40
Employee 2 name :: Mark, Age :: 20


Order of employee after sorting by employee age is
Employee 1 name :: Mark, Age :: 20
Employee 2 name :: Joe, Age :: 40


Order of employee after sorting by employee name is
Employee 1 name :: Joe, Age :: 40
Employee 2 name :: Mark, Age :: 20
```

# Comparator vs. Comparable 

You say class is Comparable so it indicates that this class is self-comparable, or it is able-to-compare-it-self to some other object. It is self compared to or as its method says compareTo(Object o).

```text
Comparable (able-to-compares-itself) uses compareTo(Object o)
```

Secondly, you say class is Comparator because it is comparing objects of other class. So what it do is to, as its method says, compare(Object o1, Object o2). Remember that Comparator itself is not compared to anything, it just compare(...)-s two objects of some other class.
```text
Comparator ( compares two other objects)uses compare(Object o1, Object o2)
```



