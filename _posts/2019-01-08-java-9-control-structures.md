---
title: Java - Control Structures
date: 2019-01-08
description: How the control flow works
categories:
  - java
image: https://source.unsplash.com/random/1500x1000
author_staff_member: rohit
---

Java, like any programming language, supports both conditional statements and loops to determine control flow.

## Conditional Statements

The conditional statement in Java has the form

### The If Statement

The simple if statement has the following syntax:

```java
if (<conditional expression>)
<statement action>
```
The condition must be surrounded by parentheses.

In Java, as in most programming languages, you will often want to execute multiple statements when a single condition is true. In this case, you use a block statement that takes the form
```java
{
statement1
statement2
. . .
}
```

<img alt="if condition" src="/images/java/j-4.png" width="250">

```java
if (yourSales >= target)
{
	performance = "Satisfactory";
	bonus = 100;
}
```

### The If-else Statement

The if/else statement is an extension of the ‘if’ statement. If the statements defined in the ‘if’ block fails, the statements in the ‘else’ block are executed. You can either have a single statement or a block of code within if-else blocks.
 
Note that the conditional expression should result into a Boolean value either **true** or **false**.

The if-else statement has the following syntax:

```java
if (<conditional expression>)
<statement action>
else
<statement action>
```

<img alt="if else condition" src="/images/java/j-5.png" width="250">

```java
public class IfElseStatementDemo {

	public static void main(String[] args) {
		 int testscore = 76;
	        char grade;

	        if (testscore >= 90) {
	            grade = 'A';
	        } else if (testscore >= 80) {
	            grade = 'B';
	        } else if (testscore >= 70) {
	            grade = 'C';
	        } else if (testscore >= 60) {
	            grade = 'D';
	        } else {
	            grade = 'F';
	        }
	        System.out.println("Grade = " + grade);

	}
}
```

```bash
Grade = C
```

### Switch Case Statement
The switch case statement, also called a case statement is a multi-way branch with several choices. A switch is easier to implement than a series of if/else statements. The switch statement begins with a keyword, followed by an expression that equates to a no long integral value. Following the controlling expression is a code block that contains zero or more labeled cases. Each label must equate to an integer constant and each must be unique. When the switch statement executes, it compares the value of the controlling expression to the values of each case label. The program will select the value of the case label that equals the value of the controlling expression and branch down that path to the end of the code block. If none of the case label values match, then none of the codes within the switch statement code block will be executed. Java includes a default label to use in cases where there are no matches. We can have a nested switch within a case block of an outer switch. 

Its general form is as follows:

```text
switch (expression){
    case label1: <statement1>
    case label2: <statement2>
    …
    case labeln: <statementn>
    default: <statement>
} // end switch 
```
**Note:**  A switch's expression must evaluate to a char, byte, short, int, or an enum.

When executing a switch statement, the program falls through to the next case. Therefore, if you want to exit in the middle of the switch statement code block, you must insert a break statement, which causes the program to continue executing after the current code block. 

```java
public class SwitchCaseStatementDemo {

	public static void main(String[] args) {
			
		char val1 = 'a';
		int val2 = 3;
		
		switch (val1) {
		case 'a':
			System.out.println("This is 'a'");
			break;
		case 'A':
			System.out.println("This is 'A'");
			break;
		default:
			System.out.println("Cannot be determined");
		}
		
		switch (val2) {
		case 1:
			System.out.println("This is number 1");
			break;
		case 2:
			System.out.println("This is number 2");
			break;
		case 3:
			System.out.println("This is number 3");
			break;
		default:
			System.out.println("Cannot be determined");
		}
	}
}
```


```bash
This is 'a'
This is number 3
```

 Let us see one more example on this:-
 
 ```java
public class Entry {
    public static void main(String[] args) {

        int month = 8;
        switch (month) {
            case 1:  System.out.println("January"); break;
            case 2:  System.out.println("February"); break;
            case 3:  System.out.println("March"); break;
            case 4:  System.out.println("April"); break;
            case 5:  System.out.println("May"); break;
            case 6:  System.out.println("June"); break;
            case 7:  System.out.println("July"); break;
            case 8:  System.out.println("August"); break;
            case 9:  System.out.println("September"); break;
            case 10: System.out.println("October"); break;
            case 11: System.out.println("November"); break;
            case 12: System.out.println("December"); break;
            default: System.out.println("Invalid month.");break;
        }
    }
}
```


```bash
August
```






