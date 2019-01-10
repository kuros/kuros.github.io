---
title: Java - Programming Fundamentals (Part 2)
date: 2019-01-07
description: Class & Variables
categories:
  - java
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
---

In this section we are going to understand how to create a class and add attributes (variables) to it.

## Creating class
We start with creating Person class. To start follow the steps given below:-
- Create a Text File. 
- Rename the file as Person.java
- Use the text editor or an IDE to write the code
- Use keyword “class” to create a class.
 
```java

    //creating the class.
    public class Person {
        
    }

```
Now the Person class is created but still it has no attributes or functionality, so now we will provide a set of attributes to it as variables.

## Variables
- Every variable has a type
- Place the type first, followed by the name of the variable
- The semicolon is necessary because a declaration is a complete Java statement.
- A variable name must begin with a letter and must be a sequence of letters or digits.
- The length of a variable name is essentially unlimited.
- You can have multiple declarations on a single line.
- Names are highly case sensitive so variable newAccount is different from newaccount
- Local variables must be declared and initialized before use.

### Initializing Variables
After you declare a variable, you must explicitly initialize it by means of an assignment statement—you can never use the values of uninitialized variables.

```java
    public class RunnerClass {
    
        public static void main(String[] args) {
            int IntegerVariable;
            String StringVariable;
            
            System.out.println(IntegerVariable);
            System.out.println(StringVariable);
        }
    
    }

```
```bash

$ javac RunnerClass.java 
RunnerClass.java:7: error: variable IntegerVariable might not have been initialized
        System.out.println(IntegerVariable);
                           ^
RunnerClass.java:8: error: variable StringVariable might not have been initialized
        System.out.println(StringVariable);
                           ^
2 errors

```
To use a local variable, one must declare the variable before using it.

In Java you can put declarations anywhere in your code. For example, the following is valid code in Java:
- double salary = 65000.0;
- System.out.println(salary);
- int vacationDays = 12; // ok to declare a variable here

In Java, it is considered good style to declare variables as closely as possible to the point where they are first used.


```java
    public class Main {
    
    	public static void main(String[] args) {
    		int IntegerVariable = 1;
    		String StringVariable = "Hello";
    		
    		System.out.println(IntegerVariable);
    		System.out.println(StringVariable);
    	}
    
    }

```

```bash
1
Hello
```

### List of key words which cannot be used as variable names

| Keyword           | Meaning     |
| :-------------    | :---------- | 
|  abstract         | an abstract class or method   | 
| assert            | used to locate internal program errors | 
| boolean           | the Boolean type |
| break             | breaks out of a switch or loop |
| byte              | the 8-bit integer type |
| case              | a case of a switch    |
| catch             | the clause of a try block catching an exception |
| char              | the Unicode character type |
| class             | defines a class type |
| const             | const |
| continue          | continues at the end of a loop |
| default           | the default clause of a switch |
| do                | the top of a do/while loop |
| double            | the double-precision floating-number type |
| else              | the else clause of an if statement |
| enum              | an enumerated type |
| extends           | an enumerated type |
| final             | a constant, or a class or method that cannot be overridden
| finally           | the part of a try block that is always executed |
| float             | the single-precision floating-point type |
| for               | a loop type |
| goto              | not used |
| if                | a conditional statement |
| implements        | defines the interface(s) that a class implements |
| import            | imports a package |
| instanceof        | tests if an object is an instance of a class |
| int               | the 32-bit integer type |
| interface         | an abstract type with methods that a class can implement |
| long              | the 64-bit long integer type |
| native            | a method implemented by the host system |
| new               | allocates a new object or array |
| null              | a null reference |
| package	        | a package of classes |
| private	        | a feature that is accessible only by methods of this class |
| protected	        | a feature that is accessible only by methods of this class,its children, and other classes in the same package |
| public	        | a feature that is accessible by methods of all classes |
| return	        | returns from a method |
| short	            | the 16-bit integer type |
| static	        | a feature that is unique to its class, not to objects of its class |
| strictfp	        | Use strict rules for floating-point computations |
| super	            | the superclass object or constructor |
| switch	        | a selection statement |
| synchronized	    | a method or code block that is atomic to a thread |
| this	            | the implicit argument of a method, or a constructor of this class |
| throw	            | throws an exception |
| throws	        | the exceptions that a method can throw |
| transient	        | marks data that should not be persistent |
| try	            | a block of code that traps exceptions |
| void	            | denotes a method that returns no value |
| volatile	        | ensures that a field is coherently accessed by multiple threads |
| while	            | a loop |

Let’s return back to our Problem statement, since we have learned how to declare variables we will add variables to our Person class.

```java

    //Adding variables to the class.
    public class Person {
        
        /* The will hold a string data type */
        private String firstName;
        
        /* The will hold a string data type */
        private String lastName;
        
        /* The will hold a string data type */
        private String accountNumber;
        
        /* The will hold a integer data type */
        private double balance;
        
    }

```