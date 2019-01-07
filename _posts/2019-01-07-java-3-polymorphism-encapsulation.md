---
title: Java - Polymorphism & Encapsulation
date: 2019-01-07
description: Understanding Polymorphism & Encapsulation in real life
categories:
  - java
image: https://source.unsplash.com/random/1500x1000
author_staff_member: rohit
---

**Polymorphism means when an entity behaves differently depending upon the context its being used.** Moreover In other words Polymorphism is the capability of an action or method to do different things based on the object that it is acting upon.

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
        }
    
        public void eat() {
            System.out.println("Person has nothing to eat");
        }
        
    }
    
    //This is the Child class
    public class Student extends Person {
    
    	public void eat(){
    		System.out.println("No food to eat");
    	}
    	
    	public void eat(String food){
    		System.out.println(name + " eating delicious " + food);
    	}
    	
    }
    
    //A test class to run the program
    public class RunProgram {
    	
    	public static void main(String[] args) {
    		Student student = new Student(); // Creating an instance of Class Student
    		student.eat();
    		student.eat("Pastry");
    	}
    
    }    

``` 

### Output

```text
    No food to eat
    Raj eating delicious pastry
```
We can see here that one function when provided different parameter provides different functionality. Notice, we have defined a eat method in Person class but since we are overriding the eat method in the Student class, the value of student class is printed. So one function can exist in different/multiple forms and hence it is called polymorphism.


## Encapsulation

**Encapsulation is the technique of making the fields in a class private and providing access to the fields via public methods.** If a field is declared private, it cannot be accessed by anyone outside the class, thereby hiding the fields within the class. For this reason, encapsulation is also referred to as data hiding.

```java
    public class Employee {
        
        private String name;
        
        private String address;
        
        public String getName() {
            return name;
        }
        public void setName(String name) {
            this.name = name;
        }
        public String getAddress() {
            return address;
        }
        public void setAddress(String address) {
            this.address = address;
        }
    }

```
Here we have taken an example of an employee, we can access the name/address with the getter and setter methods.

Encapsulation can be described as a protective barrier that prevents the code and data being randomly accessed by other code defined outside the class. 

```java
    public class BadProgram {
        public int width;
        public int height = 5;
        //we wanted that every time the height should be 5
        public void area (int width){
            System.out.println("Area = " + width * height);
        }
    }
    
    //A test class to run the program
    public class RunProgram {
        
        public static void main(String[] args) {
            BadProgram prog = new BadProgram();
            prog.height = 10;
            prog.area(2);	
        }
    }

```

### Output
```text
Area = 20
```
The expected output was 10 but since we are modifying the value of height from different class so we cannot guarantee the output every time. So in order to prevent programmers doing this, the concept of encapsulation was introduced.