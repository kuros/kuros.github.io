---
title: Java - Exception mechanism
date: 2019-01-08
description: try-catch-throw-throws-finally
categories:
  - java
image: https://source.unsplash.com/random/1500x1000
author_staff_member: rohit
---

An exception is a problem that arises during the execution of a program. An exception can occur for many different reasons, including the following:
- A user has entered invalid data.
- A file that needs to be opened cannot be found.
- A network connection has been lost in the middle of communications, or the JVM has run out of memory.

Some of these exceptions are caused by user error, others by programmer error, and others by physical resources that have failed in some manner.

Let’s take an example of the Car, in which the engine of the car explodes due to heat if the speed of the car reaches beyond 100 miles/hour. Thus, explosion of the car is the exception that is caused against the normal speeding up of the car. 

<img alt="Comment-4" src="/images/java/j-32.png" lazyload width="600px"/>

In order to avoid that explosion what one can do is when the car reaches 90 miles/hour, an indicator glows and the driver is forced to retard the car speed. 

<img alt="Comment-4" src="/images/java/j-33.png" lazyload width="600px"/>

Hence the analogy that would be apt here would be explosion of the car as the creation of exception and glowing of the indicator as catching the exception in order to avoid that exception to hamper the proper functioning of the car.

## Catching Exceptions:
A method catches an exception using a combination of the try and catch keywords. A try/catch block is placed around the code that might generate an exception. Code within a try/catch block is referred to as protected code, and the syntax for using try/catch looks like the following:

```java
try
{
   //Protected code
}catch(ExceptionName e1)
{
   //Catch block
}
```

The try block contains code that throws exceptions. Code that doesn’t throw exceptions may also be included. The catch keyword is followed by a declaration, which appears in parentheses. Like any declaration, this consists of a type followed by a name. The type must match the type of the exception being thrown in the try block. For e.g. 


```java
1. public class ExcepTest{
2. 
3.   public static void main(String args[]){
4.      try{
5.         int a[] = new int[2];
6.         System.out.println("Access element three :" + a[3]);
7.      }
8.      catch(ArrayIndexOutOfBoundsException e){
9.         System.out.println("Exception thrown  :" + e);
10.      }
11.      System.out.println("Out of the block");
12.   }
13. }
```
In the above mentioned code we have declared an array with size 2, but while printing the values we are trying to access the values at memory location 3, which is not a valid condition.

Line 1-3 is just setup. The try block is lines 4–7. Note that only line 6 can throw an exception. Lines 9–12 are the catch block.

## Multiple catch Blocks

A try block can be followed by multiple catch blocks. The syntax for multiple catch blocks looks like the following:

```java
try
{
   //Protected code
}catch(ExceptionType1 e1)
{
   //Catch block
}catch(ExceptionType2 e2)
{
   //Catch block
}catch(ExceptionType3 e3)
{
   //Catch block
}
```

The previous statements demonstrate three catch blocks, but you can have any number of them after a single try. If an exception occurs in the protected code, the exception is thrown to the first catch block in the list. If the data type of the exception thrown matches ExceptionType1, it gets caught there. If not, the exception passes down to the second catch statement. This continues until the exception either is caught or falls through all catches, in which case the current method stops execution and the exception is thrown down to the previous method on the call stack.

**Note:** The hierarchy order of Exception types for the catch block should such that the parent Exception class is at the last position, i.e. suppose we have three types of exception:  IOException, SQLException,	Exception. Then it must be arranged such that Exception is at the last.

```java

public class Main {

	public static void main(String[] args) {
		int array[] = { 20, 10, 30 };
		int num1 = 15;
		int res = 0;

		for (int ct = 3; ct >= 0; ct--) {
			try {
				res = num1 / ct;
				System.out.println("The result is: " + res);
				System.out.println("The value of array are: " + array[ct]);

			}

			catch (ArrayIndexOutOfBoundsException e) {
				System.out.println("Error…. Array is out of Bounds");
			}

			catch (ArithmeticException e) {
				System.out.println("Can't be divided by Zero");
			}
		}
	}
}
```
```text
The result is: 5
Error…. Array is out of Bounds
The result is: 7
The value of array are: 30
The result is: 15
The value of array are: 10
Can't be divided by Zero
```

## Using finally

The finally block always executes when the try block exits. This ensures that the finally block is executed even if an unexpected exception occurs. But finally is useful for more than just exception handling — it allows the programmer to avoid having cleanup code accidentally bypassed by a return, continue, or break. Putting cleanup code in a finally block is always a good practice, even when no exceptions are anticipated. 

If an exception occurs and there is a return statement in catch block, the finally block is still executed. The finally block will not be executed when the System.exit(0) statement is executed earlier or on system shut down earlier or the memory is used up earlier before the thread goes to finally block.

```java
1: try {
2: // This is the first line of the "guarded region".
3: }
4: catch(MyFirstException) {
5: // Put code here that handles this exception
6: }
7: catch(MySecondException) {
8: // Put code here that handles this exception
9: }
10: finally {
11: // Put code here to release any resource we
12: // allocated in the try clause.
13: }
14:
15: // More code here
```

Let us understand the above scenario, we enter the try block at line no 1. There are two possibilities:-

1. No exception is thrown at line number 2, then in this case the program will execute the following line numbers
    ```text
1 --> 2 --> 3 --> 10 --> 11 --> 12 --> 13 --> …..
    ```

2. If the exception (of type MySecondException)  is thrown at line no 2, then in this case the program will execute the following line numbers
    ```text
1 --> 2 --> 7 --> 8 --> 9 --> 10 --> 11 --> 12 --> 13 --> …..
    ```
    
Generally if we are using other resources for e.g. database connection or file access, then in these cases if any exception occurs then we have to take care to close these resources, this condition is taken care in the finally block.

```java
public class Main {

	public static void main(String[] args) {
		try {
			int a = 25;
			int b = 0;
			int c = a / b;
		} catch (ArithmeticException e) {
			System.out.println("Arithmatic exception caught in main()");
		} finally {
			System.out.println("finally block for second try block in main()");
		}
		System.out.println("Code after second try block in main()");
	}
}
```

```text
Arithmatic exception caught in main()
finally block for second try block in main()
Code after second try block in main()
```


## The throws Keyword

If a method does not handle a checked exception, the method must declare it using the throws keyword. The throws keyword appears at the end of a method's signature.

We have a situation where we know that my method may throw an exception but we do not want to deal it with right now, we want the exception to be handled when we are calling these methods.

If you want you want someone else to handle the exception you will use the throws keyword.

```java
public class Test {

	public void printArray (int value) throws ArrayIndexOutOfBoundsException{
		int[] a = new int[2];
		a[0] = 5;
		a[1] =10;
		
		System.out.println(a[value]);
	}
	public static void main(String[] args){
		Test test = new Test();
		
		try {
			test.printArray(1);
			test.printArray(3);
		} catch (ArrayIndexOutOfBoundsException e) {
			System.out.println("oops!! there is an error");
		}
		
	}
}
```

Here we have declared a method named as printArray which throws ArrayIndexOutOfBoundsException so if we try to access the value of index 3, this method will throw an exception which we will have to catch at the time of implementation of the method.

```text
10
oops!! there is an error
```

## The throw Keyword

You can throw an exception, either a newly instantiated one or an exception that you just caught, by using the throw keyword.

Let us consider in the above example:-

```java
public class Main {

	public void printArray(int value) throws ArrayIndexOutOfBoundsException {
		int[] a = new int[2];
		a[0] = 5;
		a[1] = 10;

		System.out.println(a[value]);
	}

	public void accessMethod(int temp) throws Exception {
		try {
			printArray(temp);
		} catch (ArrayIndexOutOfBoundsException e) {
			throw e;
		}

	}

	public static void main(String[] args) {
		Main test = new Main();

		try {
			test.accessMethod(1);
			test.accessMethod(5);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
```

In this example we are calling accessMethod which in turn calls printArray method, the exception is caught in the accessMethod, but we do not want to handle the exception so we again throw this caught exception to implanting method. When an exception is thrown then we do not return to the calling point.

```text
10
java.lang.ArrayIndexOutOfBoundsException: 5
	at Main.printArray(scratch_1.java:7)
	at Main.accessMethod(scratch_1.java:12)
	at Main.main(scratch_1.java:24)
```














