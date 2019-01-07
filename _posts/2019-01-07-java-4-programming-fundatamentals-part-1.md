---
title: Java - Programming Fundamentals (Part 1)
date: 2019-01-07
description: Write your first java class.
categories:
  - java
image: https://source.unsplash.com/random/1500x1000
author_staff_member: rohit
---

Hello Java is very close to the simplest program that can be done in a language. Nonetheless there's quite a lot going on in it. Let's see what it does.
 
For now the initial class statement may be thought of as defining the program name, in this case HelloJava.

The initial class statement is actually quite a bit more than that since this "program" can be called not just from the command line but also by other parts of the same or different programs. We'll see more in the section on classes and methods below.

### Code
```java
    // The first class 
    public class HelloJava {
        
        // Entry point of the Program
        public static void main(String[] args) {
            
            System.out.println("Hello Java");//print the output on the class.
        }
    
    }
```
When you are saving the file then remember two things, first, your file name should be same as you class name (HelloJava). Second, you ,must save the file with the extension _.java_ (HelloJava.java).

### Output
```bash
$ javac HelloJava.java
$ java HelloJava
Hello Java
```

### Explanation
- The HelloJava class contains one method - the main method. This is where an application begins executing. 
- The main method is the first method, which the Java Virtual Machine executes. When you execute a class with the Java interpreter, the runtime system starts by calling the class's main() method.
- The main() method then calls all the other methods required to run your application. It can be said that the main method is the entry point in the Java program and java program can't run without this method.
- The signature of main() method looks like this: 
  - public static void main(String args[])  
- The method signature for the main() method contains three modifiers:
    - public indicates that the main() method can be called by any object.
    - static indicates that the main() method is a class method. The static method can be invoked without creating object of that class.
    - void indicates that the main() method has no return value.
- Finally we pass any command line arguments to the method in an array of Strings called args. In this simple program there aren't any command line arguments though.

Finally when the main method is called it does exactly one thing: print "Hello World" to the standard output, generally a terminal monitor or console window. This is accomplished by the System.out.println method. To be more precise:- 

- System is a built-in class present in java.lang package.
- out is a static final field (ie, variable)in System class which is of the type PrintStream (a built-in class, contains methods to print the different data values). i.e. out here denotes the reference variable of the type PrintStream class.Hence we can say that out is an OutputStream Object.
- println() is a public method in PrintStream class to print the data values.

We will see these Classes later, so don’t be afraid of it for now just remember, you have to use System.out.println() to print your data on the screen.