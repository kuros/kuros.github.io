---
title: Java - Package - the class Management
date: 2019-01-08
description: How to manage growing number of classes 
categories:
  - java
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
---

Now we are aware of how to write the classes and are able to write simple programs in java, but what if our programs start to grow big, then how are going to manage the classes. There could be a situation where we have to handle more than thousands of classes. To do so Java has provided a concept of creating a collection of classes called packages.

The main reason for using packages is to guarantee the uniqueness of class names. Suppose two programmers come up with the bright idea of supplying an Employee class. As long as both of them place their class into different packages, there is no conflict.

## Advantages of packages
Packages provide an alternative to creating procedures and functions as stand-alone schema objects, and they offer the following advantages:

- Modularity: Logically related programming structures can be encapsulated in a named module. Each package is easy to understand, and the interface between packages is simple, clear, and well-defined.
- Easier Application Design: Package specification and package body can be coded and compiled separately. A package specification can be coded and compiled without its body. Then, stored subprograms that reference the package can also be compiled. A user does not need to fully define the package body until he is ready to complete the application.
- Hiding Information: The programming constructs declared in the package specification are public (visible and accessible to applications). The programming constructs declared in the package body are private (hidden and inaccessible to applications). The package body hides the definitions of the private constructs so that only the package is affected (not the application or any calling program) if the definitions change. This enables a user to change the implementation without having to recompile calling programs. Also, hiding the implementation details from users protects the integrity of the package.
- Added Functionality: Packaged public variables and cursors persist for the duration of a session. In this way, they can be shared by all subprograms that execute in the calling environment. They also enable a user to maintain data across transactions without having to store it in the database. Private constructs also persist for the duration of the session, but can only be accessed within the package.
- Better Performance: When a packaged subprogram is called for the first time, the entire package is loaded into the memory. As a result, later calls to related subprograms in the package do not require any further disk I/O. Packaged subprograms also stop cascading dependencies and thereby avoid unnecessary compilations.
- Overloading: Procedures and functions, when used within a package, can be overloaded, i.e., multiple subprograms can be created with the same name in the same package, each taking different number of parameters or different types of parameters.

## Class Importation

A class can use all classes from its own package and all public classes from other packages.

There are two ways to access the classes in other packages:-

- Add the full package name in front of every class name for e.g.
    ```java
java.util.Date today = new java.util.Date();
    ```
- This is a very tedious type of importing the packages which is generally not recommended.
- You place import statements at the top of your source files (but below any package statements). For example, you can import all classes in the java.util package with the statement
    ```java
import java.util.*;
    ```
- Then you can use
    ```java
Date today = new Date();
    ```
- You can also import a specific class inside a package:
    ```java
import java.util.Date;
    ```

Most of the time, you just import the packages that you need, without worrying too much about them. But if we want to import two classes with the same name from two different packages we have a problem.

<img alt="import multiple class with same name" src="/images/java/j-20.png" lazyload width="600px"/>
    
So we see compilation error in the above case. To resolve this case what we do is we use the full package name to every class name

```java
import java.util.*;
import java.sql.*;

public class LearnPackages {
	java.util.Date today;
	java.sql.Date tommorow;

}
```

## Addition of classes into a package

To place classes inside a package, you must put the name of the package at the top of your source file, before the code that defines the classes in the package.

```java
package somePackage;


public class LearnPackages {
	public static void main (String args[]){
		
	}
}
```

If you don’t put a package statement in the source file, then the classes in that source file belong to the default package. The default package has no package name. Up to now, all our example classes were located in the default package.
The folder structure will be as follows:-

```text
$ src/somePackage/LearnPackages.java
```

## Access Modifiers     

In Java code, class and variable and method and constructor declarations can have “access specifiers”, that is one of: private, protected, public. (or none.).

The purpose of access specifiers is to declare which entity cannot be accessed from where. Its effect has different consequences when used on a class, class member (variable or method), and constructor.

## Access modifiers for Classes
There are total 2 types of access specifire available.
- Public 
- Default
Let us go though each of them one by one

### public 
A class declaration with the public keyword gives all classes from all packages access to the public class. Means you can access any public class just by importing the class with its package.

### Default Access

A class with default access has no modifier preceding it in the declaration! It's the access control you get when you don't type a modifier in the class declaration. Think of default access as package-level access, because a class with default access can be seen only by classes within the same package.

Let us consider that

<img alt="import multiple class with same name" src="/images/java/j-21.png" lazyload width="400px"/>

<img alt="import multiple class with same name" src="/images/java/j-22.png" lazyload width="400px"/> 

So the class is not visible in the other package if we use the default access specifier, but if we try to access the ClassA in inc.chapter5 package only then all the methods will be visible to the classes declared in the same package

## Access modifiers for Methods/Variables
Method and variable members are usually given access control in exactly the same way, whereas a class can use just two of the four access control levels (default or public), members can use all four:
- Public
- Protected
- Default
- private

### public methods/variables
When a method or variable member is declared public, it means all other classes, regardless of the package they belong to, can access the member (assuming the class itself is visible).

### private method/varaible
Members marked private can't be accessed by code in any class other than the class in which the private member was declared.

### Protected and Default Members
The protected and default access control levels are almost identical, but with one critical difference. A default member may be accessed only if the class accessing the member belongs to the same package, whereas a protected member can be accessed (through inheritance) by a subclass even if the subclass is in a different package.

| Access Specifire | Description |
| :---: | :---: |
| public | Visible to all the classes |
| private | Visible only in an implementing class |
| protected | Visible in implementing class and subclasses everywhere |
| (Default) | Visible only in the current package |

```java
package inc;

public class TestPack1 {

	public void pack1PublicMethod(){
		System.out.println("Public method from pack 1");
	}
	
	protected void pack1ProtectedMethod(){
		System.out.println("Protected method from pack 1");
	}
	
	void pack1DefaultMethod(){
		System.out.println("Default method from pack 1");
	}
	
	private void pack1PrivateMethod(){
		System.out.println("private method from pack 1");
	}	
}
```
<img alt="import multiple class with same name" src="/images/java/j-23.png" lazyload width="600px" style="margin-bottom: 20px"/> 
<img alt="import multiple class with same name" src="/images/java/j-24.png" lazyload width="600px" style="margin-bottom: 20px"/> 
<img alt="import multiple class with same name" src="/images/java/j-25.png" lazyload width="600px"/> 

In the above code we have shown:-
- In the same package, available methods are of public, protected and default access modifiers.
- In different package, only method of public access modifier is available.
- Where as if the class is extending super class of different package, available methods are of public and protected access modifiers.








