---
title: Java - Programming Fundamentals (Part 3)
date: 2019-01-07
description: Methods, Constructors & Instantiation
categories:
  - java
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
---

Now we will look into how to create methods, different types of constructors and how to instantiate an object.

## Methods
- Every method must have a return type.
- Method may or may not have parameters
- Method name can have any length, it is advisable to choose the method name such that it reflects the job performed by this method.

Now returning to our problem, Since we have used private modifier for declaring the variables – so we need some way to access these variables. We will use getter and setters for these variables.

```java

    public String getFirstName() {
    		return firstName;
    	}
    
    	public void setFirstName(String firstName) {
    		this.firstName = firstName;
    	}
    
    	public String getLastName() {
    		return lastName;
    	}
    
    	public void setLastName(String lastName) {
    		this.lastName = lastName;
    	}
    
    	public String getAccountNumber() {
    		return accountNumber;
    	}
    
    	public void setAccountNumber(String accountNumber) {
    		this.accountNumber = accountNumber;
    	}
    
    	public double getBalance() {
    		return balance;
    	}
    
    	public void setBalance(double balance) {
    		this.balance = balance;
    	}

```

### Explanation
The every get method will return the values associated with the variable for which these get methods are written. For every setter method the values will be set for the variables. For e.g.
```java
public String getFirstName() {
		return firstName;
	}
```
This method will return the value for firstName variable, since firstName is of String type, hence the method is returning String type.

Similarly, for the setter method:-
```java
public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
```

For the setFirstName method we do want to return anything so we have used the return type as void. We used this reference to indicate that variable is referring to the class variable and not the variable which we are passing to the method.

## Constructors

In object-oriented programming, a constructor  in a class is a special type of subroutine called at the creation of an object. It prepares the new object for use, often accepting parameters which the constructor uses to set any member variables required when the object is first created.

**A Java constructor performs the following functions in the following order:**
1. It initializes the class variables to default values. (Byte, short, int, long, float, and double variables default to their respective zero values, booleans to false, chars to the null character ('\u0000') and references of any objects to null.)
2. It then calls the super class constructor (default constructor of super class only if no constructor is defined).
3. It then initializes the class variables to the specified values like ex: int var = 10; or float var = 10.0f and so on.
4. It then executes the body of the constructor.

### Rules for Creating Constructor
- A constructor has no return type.
- Default constructor has no parameters.
- We can have more than one constructor.
- Constructor name is same as class name.

### Default Constructor
The default constructor has no parameters.

```java
      public Person() {
		System.out.println("This is the default constructor");
            this.accountNumber = “NA”;
		this.balance = 5000;
	}
```

### Constructor overloading
We can have more one constructor. While overloading a constructor one must keep in mind that the two constructors should never have signature.

```java
	//this is the default constructor
	public Person() {
		System.out.println("This is the default constructor");
            this.accountNumber = “NA”;
		this.balance = 5000;
	}
	
	//In this constructor, we overload it with one parameter
	public Person(String accountNumber){
		System.out.println("This is the overloaded constructor");
		this.accountNumber = accountNumber;
		this.balance = 5000;
	}
	
	//In this constructor, we overload it with two parameters
	public Person(String accountNumber, double balance){
		System.out.println("This is the overloaded constructor");
		this.accountNumber = accountNumber;
		this.balance = balance;
	}
```

In the default constructor we set the account number as “NA” and balance as 5000.

In Second constructor we set the account number to the value provided by the parameter and we set the balance as 5000 which is still hard coded.

So we create another constructor with account number and balance which passed as the parameter.

Now our Person class will look like this:-

```java
    //Adding variables to the class.
    public class Person {
    	
    	public String getFirstName() {
    		return firstName;
    	}
    
    	public void setFirstName(String firstName) {
    		this.firstName = firstName;
    	}
    
    	public String getLastName() {
    		return lastName;
    	}
    
    	public void setLastName(String lastName) {
    		this.lastName = lastName;
    	}
    
    	public String getAccountNumber() {
    		return accountNumber;
    	}
    
    	public void setAccountNumber(String accountNumber) {
    		this.accountNumber = accountNumber;
    	}
    
    	public double getBalance() {
    		return balance;
    	}
    
    	public void setBalance(double balance) {
    		this.balance = balance;
    	}
    
    	/* The will hold a string data type */
    	private String firstName;
    	
    	/* The will hold a string data type */
    	private String lastName;
    	
    	/* The will hold a string data type */
    	private String accountNumber;
    	
    	/* The will hold a integer data type */
    	private double balance;
    	
    	//this is the default constructor
    	public Person() {
    		System.out.println("This is the default constructor");
    		this.balance = 5000;
    	}
    }
```

## Instantiation
Once you have class created now you want to go ahead using this class. To use this we will create an instance of the class. To do so we will create a runner class whose job will be to use the functionality of other classes. This class will hold the main method. 

````java
    public class RunnerClass {
    
        public static void main(String[] args) {
    
            Person person = new Person();
            System.out.println("Default constructor");
            System.out.println("Account Number = " +                                           person.getAccountNumber());
            System.out.println("Balance = " + person.getBalance());
            System.out.println("***********************************");
            
            Person person2 = new Person("12345");
            System.out.println("Passing the one parameter");
            System.out.println("Account Number = " + person2.getAccountNumber());
            System.out.println("Balance = " + person2.getBalance());
            System.out.println("***********************************");
            
            Person person3 = new Person("123", 50);
            System.out.println("Passing two parameters");
            System.out.println("Account Number = " + person3.getAccountNumber());
            System.out.println("Balance = " + person3.getBalance());
            System.out.println("***********************************");
        }
    
    }
````
In the runner class we have created three instance of Person class as person, person2 and person3 in three different ways and we see that the respective constructors are called when we pass the parameters respectively.


```bash
Default constructor
Account Number = null
Balance = 5000.0
***********************************
Passing the one parameter
Account Number = 12345
Balance = 5000.0
***********************************
Passing two parameters
Account Number = 123
Balance = 50.0
***********************************
```
