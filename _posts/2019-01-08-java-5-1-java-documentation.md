---
title: Java - Documentation
date: 2019-01-08
description: Introduction to Java documentation
categories:
  - java
image: https://source.unsplash.com/random/1500x1000
author_staff_member: rohit
---

The JDK contains a very useful tool, called javadoc, that generates HTML documentation from your source files. If you add comments that start with the special delimiter /** to your source code, you too can easily produce professional-looking documentation.

Each comment is placed immediately above the feature it describes. A comment starts with a /** and ends with a */. Each /** . . . */ documentation comment contains free-form text followed by tags. A tag starts with an @, such as @author or @param. In the free-form text, you can use HTML modifiers such as <em>...</em> for emphasis, <code>...</code> for a monospaced “typewriter” font, <strong>...</strong> for strong emphasis, and even <img ...> to include an image.

## Class Comments
The class comment must be placed after any import statements, directly before the class definition.

Here is an example of a class comment:

```java
/**
* A <code>Card</code> object represents a playing card, such
* as "Queen of Hearts". A card has a suit (Diamond, Heart,
* Spade or Club) and a value (1 = Ace, 2 . . . 10, 11 = Jack,
* 12 = Queen, 13 = King)
*/
public class Card {

}
```

### @author name
This tag makes an “author” entry. You can have multiple @author tags, one for each author.

### @version text
This tag makes a “version” entry. The text can be any description of the current version.

## Method Comments
Each method comment must immediately precede the method that it describes. In addition to the general-purpose tags, you can use the following tags:

### @param variable description
This tag adds an entry to the “parameters” section of the current method. The description can span multiple lines and can use HTML tags. All @param tags for one method must be kept together.

### @return description
This tag adds a “returns” section to the current method. The description can span multiple lines and can use HTML tags.

### @throws class description
This tag adds a note that this method may throw an exception. We will see in later chapter’s  what is an exception

```java
/**
* Raises the salary of an employee.
* @param byPercent percentage by which to raise the salary (e.g. 10 = 10%)
* @return the amount of the raise
*/
public double raiseSalary(double byPercent) {
    double raise = salary * byPercent / 100;
    salary += raise;
    return raise;
}
```

## Field Comments
You only need to document public fields—generally that means static constants.

```java
/**
* The "Hearts" card suit
*/
public static final int HEARTS = 1;
```


## Comment Extraction

Let us consider we want to now create actual html documentation.

Suppose we have a package named as javaDocTest which has a class TestDoc and now we want to create documentation and we want to keep the documents in the folder KeepDocFolder then in that case we give the following command

```bash
$ javadoc -d keepDocFolder javaDocTest
```

<img alt="Comment-1" src="/images/java/j-28.png" lazyload width="600px"/>

After this command is executed the following structure will be created 

<img alt="Comment-2" src="/images/java/j-29.png" lazyload width="600px"/>

This folder will contain the entire document for classes and methods,

<img alt="Comment-3" src="/images/java/j-30.png" lazyload width="600px"/>

Now if we click on the TestDoc link it will give the details of all the methods declared in the class.

<img alt="Comment-4" src="/images/java/j-31.png" lazyload width="600px"/>











