---
title: Java Formatters
date: 2019-01-15
description:  
categories:
  - java
author_staff_member: rohit
---

Like all byte and character stream objects, instances of PrintStream and PrintWriter implement a standard set of write methods for simple byte and character output. In addition, both PrintStream and PrintWriter implement the same set of methods for converting internal data into formatted output. Two levels of formatting are provided: 

- print and println format individual values in a standard way. 
- format formats almost any number of values based on a format string, with many options for precise formatting. 

# The print and println Methods
The methods print() and println() are almost the same, with a slight difference, i.e. when we use println() method a new line character is added to the String at the end which means your cursor will move to the next line.

```java
public class Main {
    public static void main(String[] args) {
        int i = 2;
        double r = Math.sqrt(i);
        
        System.out.print("The square root of ");
        System.out.print(i);
        System.out.print(" is ");
        System.out.print(r);
        System.out.println(".");

        i = 5;
        r = Math.sqrt(i);
        System.out.println("The square root of " + i + " is " + r + ".");
    }
}
```
{% include ad %}
```text
The square root of 2 is 1.4142135623730951.
The square root of 5 is 2.23606797749979.
```

# The _format_ Method
The format method formats multiple arguments based on a format string. The format string consists of static text embedded with format specifiers; except for the format specifiers, the format string is output unchanged. The formatting is same as using printf() method in C to print the values.

```java
import java.util.Formatter;

public class Main {
	public static void main(String args[]) {
	    Formatter fmt = new Formatter();

	    // Format 4 decimal places.
	    fmt.format("%.4f", 123.1234567);
	    System.out.println(fmt);

	    // Format to 2 decimal places in a 16 character field.
	    fmt = new Formatter();
	    fmt.format("%16.2e", 123.1234567);
	    System.out.println(fmt);

	    // Display at most 15 characters in a string.
	    fmt = new Formatter();
	    fmt.format("%.15s", "Formatting with Java is now easy.");
	    System.out.println(fmt);
	  }
}
```
{% include ad %}
```text
123.1235
        1.23e+02
Formatting with
```
The supported conversion types are listed below, along with their meanings, and the corresponding arguments expected in the argument vector:

# Date Formatting
A pattern of special characters is used to specify the format of the date. We use the object of Format class to specify these format. We use SimpleDateFormat class which inherit Format class to define our pattern

This example demonstrates some of the characters

```java
import java.text.Format;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Entry {
	public static void main(String[] args) throws Exception {

		Format formatter;

		// Get today's date
		Date date = new Date();

		formatter = new SimpleDateFormat("MM/dd/yy");
		String s = formatter.format(date);
		System.out.println(s);
		// 01/09/02

		formatter = new SimpleDateFormat("dd-MMM-yy");
		s = formatter.format(date);
		System.out.println(s);
		// 29-Jan-02

		// Examples with date and time; see also
		// Formatting the Time Using a Custom Format
		formatter = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss");
		s = formatter.format(date);
		System.out.println(s);

		// 2002.01.29.08.36.33
		formatter = new SimpleDateFormat("E, dd MMM yyyy HH:mm:ss Z");
		s = formatter.format(date);
		System.out.println(s);
		// Tue, 09 Jan 2002 22:14:02 -0500
	}
}
```
{% include ad %}
```text
01/29/19
29-Jan-19
2019.01.29.15.18.54
Tue, 29 Jan 2019 15:18:54 +0530
```

# Calendar Formatting

When we are working with we can use an object of Calendar class (an abstract base) for converting between a Date object and a set of integer fields such as YEAR, MONTH, DAY, HOUR, and so on. 

Subclasses of Calendar interpret a Date according to the rules of a specific calendar system. The platform provides one concrete subclass of Calendar: GregorianCalendar. 

```java
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

public class Entry {
	public static void main(String[] args) throws Exception {

		Calendar calendar = new GregorianCalendar();

		// Tell the calendar what date/time to format
		calendar.setTime(new Date());

		// print out most of the known fields
		System.out.println("ERA: " + calendar.get(Calendar.ERA));
		System.out.println("YEAR: " + calendar.get(Calendar.YEAR));
		System.out.println("MONTH: " + calendar.get(Calendar.MONTH));
		System.out.println("WEEK_OF_YEAR: "
				+ calendar.get(Calendar.WEEK_OF_YEAR));
		System.out.println("WEEK_OF_MONTH: "
				+ calendar.get(Calendar.WEEK_OF_MONTH));
		System.out.println("DATE: " + calendar.get(Calendar.DATE));
		System.out.println("DAY_OF_MONTH: "
				+ calendar.get(Calendar.DAY_OF_MONTH));
		System.out
				.println("DAY_OF_YEAR: " + calendar.get(Calendar.DAY_OF_YEAR));
		System.out
				.println("DAY_OF_WEEK: " + calendar.get(Calendar.DAY_OF_WEEK));
		System.out.println("DAY_OF_WEEK_IN_MONTH: "
				+ calendar.get(Calendar.DAY_OF_WEEK_IN_MONTH));
		System.out.println("AM_PM: " + calendar.get(Calendar.AM_PM));
		System.out.println("HOUR: " + calendar.get(Calendar.HOUR));
		System.out
				.println("HOUR_OF_DAY: " + calendar.get(Calendar.HOUR_OF_DAY));
		System.out.println("MINUTE: " + calendar.get(Calendar.MINUTE));
		System.out.println("SECOND: " + calendar.get(Calendar.SECOND));
		System.out
				.println("MILLISECOND: " + calendar.get(Calendar.MILLISECOND));
		System.out.println("ZONE_OFFSET: "
				+ (calendar.get(Calendar.ZONE_OFFSET) / (60 * 60 * 1000)));
		System.out.println("DST_OFFSET: "
				+ (calendar.get(Calendar.DST_OFFSET) / (60 * 60 * 1000)));
	}
}
```
{% include ad %}
```text
ERA: 1
YEAR: 2019
MONTH: 0
WEEK_OF_YEAR: 5
WEEK_OF_MONTH: 5
DATE: 29
DAY_OF_MONTH: 29
DAY_OF_YEAR: 29
DAY_OF_WEEK: 3
DAY_OF_WEEK_IN_MONTH: 5
AM_PM: 1
HOUR: 3
HOUR_OF_DAY: 15
MINUTE: 20
SECOND: 38
MILLISECOND: 620
ZONE_OFFSET: 5
DST_OFFSET: 0
```

# Working with Strings
String class has someimportant methods which are very useful when we are working with strings.

## Spilt
The split method splits the string around matches of the given regular expression. The array returned by this method contains each substring of this string that is terminated by another substring that matches the given expression or is terminated by the end of the string. The substrings in the array are in the order in which they occur in this string. If the expression does not match any part of the input then the resulting array has just one element, namely this string.

```java
public class Entry {
	public static void main(String[] args) throws Exception {

		String string = "This is 1 test, and 2 we will try";
		String[] array = string.split(" "); // Splitting using space
		for (String s : array)
			System.out.println(s);

		System.out.println("***************************");
		array = string.split(","); // Splitting using comma
		for (String s : array)
			System.out.println(s);

		System.out.println("********************");

		array = string.split("[0-9]"); // Splitting using any digit
		for (String s : array)
			System.out.println(s);

		
		System.out.println("***************************");
		array = string.split("xyz"); // Splitting using any digit
		for (String s : array)
			System.out.println(s);
	}
}
```
{% include ad %}

```text
This
is
1
test,
and
2
we
will
try
***************************
This is 1 test
 and 2 we will try
********************
This is 
 test, and 
 we will try
***************************
This is 1 test, and 2 we will try
```

# String Tokenizer
StringTokenizer class provides the first step in this parsing process, often called the lexer (lexical analyzer) or scanner. **StringTokenizer implements the Enumeration interface**. Therefore, given an input string, you can enumerate the individual tokens contained in it using StringTokenizer. 

To use StringTokenizer, you specify an input string and a string that contains delimiters. Delimiters are characters that separate tokens. Each character in the delimiters string is considered a valid delimiter—for example, ",;:" sets the delimiters to a comma, semicolon, and colon. The default set of delimiters consists of the whitespace characters: space, tab, newline, and carriage return.

The StringTokenizer constructors are shown here:

```java
StringTokenizer(String str) 
StringTokenizer(String str, String delimiters) 
StringTokenizer(String str, String delimiters, boolean delimAsToken)
```

In all versions, str is the string that will be tokenized. In the first version, the default delimiters are used. In the second and third versions, delimiters is a string that specifies the delimiters. In the third version, if delimAsToken is true, then the delimiters are also returned as tokens when the string is parsed. Otherwise, the delimiters are not returned. 

```java
import java.util.StringTokenizer;

public class Entry {
	public static void main(String[] args) throws Exception {

		String Demo = "This is a string that we want to tokenize";

		StringTokenizer Tok = new StringTokenizer(Demo);
		int n = 0;

		while (Tok.hasMoreElements())
			System.out.println("" + ++n + ": " + Tok.nextElement());
	}

}
```
```text
1: This
2: is
3: a
4: string
5: that
6: we
7: want
8: to
9: tokenize
```









