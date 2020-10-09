---
title: Java - Data Types
date: 2019-01-08
description: Data Types supported in Java
categories:
  - java
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
---
Java is a strongly typed language. This means that every variable must have a declared type. There are eight primitive types in Java. Four of them are integer types; two are floating-point number types; one is the character type char, used for code units in the Unicode encoding scheme and one is a boolean type for truth values.

# Integer Types
The integer types are for numbers without fractional parts. Negative values are allowed.

| Types |  Storage Requirements | Range (Inclusive) |
| :---- |  :-----------------   | :-------- |
| int   | 4 Bytes               | –2,147,483,648 to 2,147,483, 647 (just over 2 billion) |
| short | 2 Bytes               | –32,768 to 32,767 |
| long  | 8 Bytes               | –9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 |
| byte  | 1 Byte                | –128 to 127 |

In most situations, we use the int type to store an integer values but if you want to store a very large number such as total number of people of our planet, you’ll need to resort to a long. The byte and short types are mainly intended for specialized applications, such as low-level file handling, or for large arrays when storage space is at a premium.

Long integer numbers have a suffix L (for example, 4000000000L). Hexadecimal numbers have a prefix 0x (for example, 0xCAFE). Octal numbers have a prefix 0. For example, 010 is 8.

{% include ad %}
# Floating-Point Type
The floating-point types denote numbers with fractional parts.

| Types |  Storage Requirements | Range (Inclusive) |
| :---- |  :-----------------   | :-------- |
| float | 4 bytes               | approximately ±3.40282347E+38F(6–7 significant decimal digits) |
| double| 8 bytes               | approximately ±1.79769313486231570E+308 (15 significant decimal digits) |

The name double refers to the fact that these numbers have twice the precision of the float type. (Some people call these double-precision numbers.) Here, the type to choose in most applications is double. The limited precision of float is simply not sufficient for many situations. Seven significant (decimal) digits may be enough to precisely express your annual salary in dollars and cents, but it won’t be enough for your company president’s salary. The only reasons to use float are in the rare situations in which the slightly faster processing of single-precision numbers is important or when you need to store a large number of them.

Numbers of type float have a suffix F (for example, 3.402F). Floating-point numbers without an F suffix (such as 3.402) are always considered to be of type double. You can optionally supply the D suffix (for example, 3.402D).

In particular, there are three special floating-point values to denote overflows and errors:
- Positive infinity (Double.POSITIVE_INFINITY)
- Negative infinity (Double.NEGATIVE_INFINITY)
- NaN -not a number (Double.NaN)

{% include ad %}
# The char Type
The char type is used to describe individual characters. Most commonly, these will be character constants. For example, 'A' is a character constant with value 65. It is different from "A", a string containing a single character. Unicode code units can be expressed as hexadecimal values that run from \u0000 to \uFFFF. 

There are several escape sequences for special characters.


|Escape Sequence    |	Name                |	Unicode Value |
| :----             |  :-----------------   | :-------- |
|\b	                | Backspace	            |\u0008 |
|\t	                | Tab	                |\u0009 |
|\n	                | Linefeed	            |\u000a |
|\r	                | Carriage return	    |\u000d |
|\”             	| Double quote	        |\u0022 |
|\’	                | Single quote	        |\u0027 |
|\\	                | Backslash	            |\u005c |

# The boolean Type
The boolean type has two values, false and true. It is used for evaluating logical conditions. You cannot convert between integers and boolean values








