---
title: Java - Operators (Part - 2)
date: 2019-01-08
description: More Operators to work with
categories:
  - java
image: https://source.unsplash.com/random/1500x1000
author_staff_member: rohit
---

Few more operators which are used in Java.

## The Logical Operators
The following table lists the logical operators. Assume boolean variables A holds true and variable B holds false then:

| Operator  | Description   | Example   |
| :----:    | :---:         | :---:     |
| &&        | Called Logical AND operator. If both operands are non zero then the condition becomes true | (A && B) is false |
| \\|\\|    | Called Logical OR operator. If any of the two operands is non zero then the condition becomes true | (A \\|\\| B) is true |
| !         | Called Logical NOT operator. Used to reverse the logical state of its operand. If a condition is true then Logical NOT operator will make false | !(A && B) is true |

```java
public class Entry {
	public static void main(String[] args) {
		// create truth table for && (conditional AND) operator
	      System.out.printf( "%s\n%s: %b\n%s: %b\n%s: %b\n%s: %b\n\n",
	         "Conditional AND (&&)", "false && false", ( false && false ),
	         "false && true", ( false && true ), 
	         "true && false", ( true && false ),
	         "true && true", ( true && true ) );

	      // create truth table for || (conditional OR) operator
	      System.out.printf( "%s\n%s: %b\n%s: %b\n%s: %b\n%s: %b\n\n",
	         "Conditional OR (||)", "false || false", ( false || false ),
	         "false || true", ( false || true ),
	         "true || false", ( true || false ),
	         "true || true", ( true || true ) );

	      // create truth table for ! (logical negation) operator
	      System.out.printf( "%s\n%s: %b\n%s: %b\n", "Logical NOT (!)",
	         "!false", ( !false ), "!true", ( !true ) );
	}
}
```

```bash
Conditional AND (&&)
false && false: false
false && true: false
true && false: false
true && true: true

Conditional OR (||)
false || false: false
false || true: true
true || false: true
true || true: true

Logical NOT (!)
!false: true
!true: false
```


## The Assignment Operators
There are following assignment operators supported by Java language:

| Operator  | Description   | Example   |
| :----:    | :---:         | :---:     |
| = | Simple assignment operator, assigns value from right side operand to left side operand | C = A + B will assign value A + B to C |
| -= | Subtract AND assignment operator, it subtract right operand from left operand and assign the value to left operand | C -= A is equivalent to C = C - A |
| += | Add AND assignment operator, it adds right operand to left operand and assign the value to left operand | C += A is equivalent to C = C + A |
| *= | Multiply AND assignment operator, it multiply right operand and left operand and assign the value to left operand | C *= A is equivalent to C = C * A |
| /= | Divide AND assignment operator, it divides left operand with right operand and assign the value to left operand | C /= A is equivalent to C = C / A |
| %= | Modulus AND assignment operator, it modulus left operand with right operand and assign the value to left operand | C %= A is equivalent to C = C % A |
| <<= | Left shift and assign operator | C <<=2  is equivalent to C = C << 2 |
| >>= | Right shift and assign operator | C >>=2  is equivalent to C = C >> 2 |
| &= | Bitwise AND assignment operator | C &= 2  is equivalent to C = C & 2 |
| ^= | Bitwise XOR assignment operator | C ^= 2  is equivalent to C = C ^ 2 |
| \\|= | Bitwise OR assignment operator | C \\|= 2  is equivalent to C = C \\| 2 |


## Conditional Operator
Conditional operator is also known as the ternary operator. This operator consists of three operands and is used to evaluate boolean expressions. The goal of the operator is to decide which value should be assigned to the variable. The operator is written as :

```text
variable x = (expression) ? value if true : value if false
```

```java
public class Test {
	public static void main(String args[]){
		int a , b;
		a = 10;
		b = (a == 1) ? 20: 30;
		System.out.println( "Value of b is : " +  b );

		b = (a == 10) ? 20: 30;
		System.out.println( "Value of b is : " + b );
	}
}
```
```text
Value of b is : 30
Value of b is : 20
```

## instanceOf Operator
This operator is used only for object reference variables. The operator checks whether the object is of a particular type(class type or interface type), this operator is often used to test that the child class is inherited from the parent class or not. instanceOf operator is wriiten as:

```text
(Object reference variable) instanceof (class/interface type)
```

If the object referred by the variable on the left side of the operator passes the IS-A check for the class/interface type on the right side then the result will be true. For example 

```java
String name = "James";
boolean result = name instanceof String;
// This will return true since name is of type String
```

## Precedence of Java Operators
Operator precedence determines the grouping of terms in an expression. This affects how an expression is evaluated. Certain operators have higher precedence than others; for example, the multiplication operator has higher precedence than the addition operator:

For example x = 7 + 3 * 2; Here x is assigned 13, not 20 because operator * has higher precedenace than + so it first get multiplied with 3*2 and then adds into 7.

Here operators with the highest precedence appear at the top of the table, those with the lowest appear at the bottom. Within an expression, higher precedenace operators will be evaluated first.

| Category  | Operator   | Associativity   |
| :----:    | :---:         | :---:     |
| Postfix   | ()[].(dot operator)| Left to Right |
| Unary   | ++ -- ! ~ | Right to Left |
| Multiplicative   | * / % | Left to Right |
| Additive   | + - | Left to Right |
| Shift   | >> >>> << | Left to Right |
| Relational   | > >= < <= | Left to Right |
| Equality   | == != | Left to Right |
| Bitwise   | & ^ \\| | Left to Right |
| Logical   | && \\|\\| | Left to Right |
| Conditional      | ? : | Right to Left |
| Assignment      | = += -= *= /= %= >>= <<= &= ^= \\|= | Right to Left |
| Comma      | , | Left to Right |













