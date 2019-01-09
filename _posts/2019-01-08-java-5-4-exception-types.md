---
title: Java - Exception Types
date: 2019-01-08
description: Predefined, User defined, Checked & Unchecked Exception
categories:
  - java
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
---

There are many predefined Exceptions available in java which are mentioned below, these are some of the common exceptions seen.

|Exception Type	| Description |
| :--   | :-- |
| java.lang.RuntimeException  |   RuntimeException is the superclass of those exceptions that can be thrown during the normal operation of the Java Virtual Machine.|
| ArithmeticException |   Thrown when an exceptional arithmetic condition has occurred. For example, an integer "divide by zero" throws an instance of this class.|
| ArrayStoreException |   Thrown to indicate that an attempt has been made to store the wrong type of object into an array of objects.|
| ClassCastException  |   Thrown to indicate that the code has attempted to cast an object to a subclass of which it is not an instance.|
| IndexOutOfBoundsException   |   Thrown to indicate that an index of some sort (such as to an array, to a string, or to a vector) is out of range.|
| NullPointerException    |   Thrown when an application attempts to use null in a case where an object is required|
| ClassNotFoundException  |   Thrown when an application tries to load in a class through its string name|
| IllegalAccessException  |   An IllegalAccessException is thrown when an application tries to reflectively create an instance (other than an array), set or get a field, or invoke a method, but the currently executing method does not have access to the definition of the specified class, field, method or constructor.|
| IOException |   Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations.|

## Custom Exception (Declaring you own)

You can create your own exceptions in Java. Keep the following points in mind when writing your own exception classes:

- All exceptions must be a child of Throwable.
- If you want to write a checked exception that is automatically enforced by the Handle or Declare Rule, you need to extend the Exception class.
- If you want to write a runtime exception, you need to extend the RuntimeException class.

We can define our own Exception class as below:

```java
class MyException extends Exception{
}
```
You just need to extend the Exception class to create your own Exception class. These are considered to be checked exceptions. The following InsufficientFundsException class is a user-defined exception that extends the Exception class. An exception class is like any other class, containing useful fields and methods.

```java
//Declaring a user defined Exception 
public class InsufficientFundsException extends Exception {
	
	private double amount;
	
	public InsufficientFundsException(double amount)
	{
	   this.amount = amount;
	}
	
	public double getAmount()
	{
	   return amount;
	}
}


public class AccessFund {
	
	private double balance;
	private int accountNo;
	
	public AccessFund(int accountNo, double balance) {
		this.accountNo = accountNo;
		this.balance = balance;
	}
	
	public void depositAmount(double amount){
		balance = balance + amount;
	}
	
	public void withdraw (double amount) throws InsufficientFundsException{
		if (balance > amount){
			balance = balance - amount;
			System.out.println("Amount withdrawn = " + amount + " Now the current balance is " + balance);
		}
		else
		{
			double requiredAmount = amount - balance;
			throw new InsufficientFundsException(requiredAmount);		
		}
	}
}


public class Test {

	public static void main(String[] args){
		AccessFund newAccount = new AccessFund(1, 5000);
		
		try {
			newAccount.depositAmount(1000);
			newAccount.withdraw(2000);
			System.out.println("trying to withdraw 5000 now");
			newAccount.withdraw(5000);
		} catch (InsufficientFundsException e) {
			System.out.println(e.getAmount() + " money required");
		}
	}
}
```

In the above code we have declared a class which has two methods depositAmount and withdraw, but if we try to withdraw money more than the current balance then the method will throw an **InsufficientFundsException**.

```text
Amount withdrawn = 2000.0 Now the current balance is 4000.0
trying to withdraw 5000 now
1000.0 money required
```


## Checked vs Unchecked Exceptions

In Java the Exception are divided primarily in two different categories 
 - Checked Exceptions
 - Unchecked Exceptions (also known as Runtime Exceptions)
 
### Checked Exceptions

A checked exception is an exception that is typically a user error or a problem that cannot be foreseen by the programmer. For example, if a file is to be opened, but the file cannot be found, an exception occurs. These exceptions cannot simply be ignored at the time of compilation.

Some of the commonly used checked exceptions are :-

| Exception   | Description |
| :--   | :-- |
| ClassNotFoundException  | Thrown when an application tries to load in a class through its string name |
| IllegalAccessException  | An IllegalAccessException is thrown when an application tries to reflectively create an instance (other than an array), set or get a field, or invoke a method, but the currently executing method does not have access to the definition of the specified class, field, method or constructor. |
| IOException | Signals that an I/O exception of some sort has occurred. This class is the general class of exceptions produced by failed or interrupted I/O operations. |
| User defined exceptions |	The user defines the exceptions by inheriting the Exception Class. |

#### A custom checked exception
```java
public class CheckedException extends Exception {
    
    public CheckedException(String errorMessage) {
        super(errorMessage);
    }
}
```

### Unchecked Exceptions
An unchecked or runtime exception is an exception that occurs that probably could have been avoided by the programmer. As opposed to checked exceptions, runtime exceptions are ignored at the time of compilation.

Most commonly faced runtime exceptions are :- 

| Exception | Description |
| :--   | :-- |
| ArithmeticException | Thrown when an exceptional arithmetic condition has occurred. For example, an integer "divide by zero" throws an instance of this class. |
| ClassCastException | Thrown to indicate that the code has attempted to cast an object to a subclass of which it is not an instance. |
| IndexOutOfBoundsException | Thrown to indicate that an index of some sort (such as to an array, to a string, or to a vector) is out of range. |
| NullPointerException | Thrown when an application attempts to use null in a case where an object is required |

#### A custom un-checked exception
```java
public class UnCheckedException extends RuntimeException {
    
    public CheckedException(String errorMessage) {
        super(errorMessage);
    }
}
```






















