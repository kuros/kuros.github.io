---
title: Java - Inheritance
date: 2019-01-06
description: Why Inheritance?
categories:
  - java
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
---
Inheritance is the concept of a child class (sub class) automatically inheriting the variables and methods defined in its parent class (super class).

# Why Inheritance?
- Once a behavior (method) is defined in a super class, that behavior is automatically inherited by all subclasses. Thus, you write a method only once and it can be used by all subclasses. 
- Once a set of properties (fields) are defined in a super class, the same set of properties are inherited by all subclasses. So a class and its children share common set of properties
- A subclass only needs to implement the differences between itself and the parent.

# How to derive a sub-class
Suppose we have a parent class called Person. The person has two attributes name and place. In this program we use the Default constructor to print the value assigned to the attributes. In this case we have set name as Raj and Place as Pune.

### Code
```java

    //Parent class
    public class Person {
        String name;
        String place;
        
        // defining a Constructor which initializes the object with
        // name as "Raj" and place as "Pune"
        public Person() { 
            name = "Raj";
            place = "Pune";
            System.out.println(name);
            System.out.println(place);
        }
    }
    
```

{% include ad %}
### Output
```text
    Raj
    Pune
```
In the above code we have used a constructor to initialize the data for the Person object. For now a constructor will have the same name as class name and it will have no return type, and whenever the object is created from the class, the constructor of that class is executed.

### Problem Statement
Now we want to add new attributes to person so that is should reflect me the data for a student, so what should I do?

- Change the class Person and redefine the attributes and methods of the class
- Create a new class for student and define all the methods again
- Or Ask the Person class to share its properties and use it.

To solve this problem we use the method of inheritance, we go and define a new class (Student) and inherit the properties of the parent class (Person).

```java

    //This is the Child class
    public class Student extends Person {
    
        String studentId = "1";
        
        /*
         * Default Constructor
         */
        public Student() {
            System.out.println(studentId);
            System.out.println(name);
            System.out.println(place);
        }
        public static void main(String[] args) {
            Student student = new Student(); // Creating an instance of Class Student
        }
    }
    
```

{% include ad %}
### Output
```text
1
Raj
Pune
```
To derive a child class, we use the extends keyword.  In the student code we did not specified the name and place of the student but since we are inheriting student class from person class, the attributes are passed to the child class.

A subclass inherits all of the “public” and “protected” members (fields or methods) of its parent, no matter what package the subclass is in. If the subclass is in the same package as its parent, it also inherits the package-default members (fields or methods) of the parent.

# What You Can Do in a Sub-class Regarding Variables

- The inherited variables can be used directly, just like any other variables.
- You can declare new variables in the subclass that are not in the super class
- You can declare a variables in the subclass with the same name as the one in the super class, thus hiding it (not recommended).
- A subclass does not inherit the private members of its parent class. However, if the super class has public or protected methods for accessing its private variables, these can also be used by the subclass.

# What You Can Do in a Sub-class Regarding Methods

- The inherited methods can be used directly as they are.
- You can write a new instance method in the subclass that has the same signature as the one in the super class, thus overriding it.
- You can declare new methods in the subclass that are not in the super class.


