---
title: Java - Classpath
date: 2019-01-08
description: Tell Java where to search for programs.
categories:
  - java
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
---

CLASSPATH tells Java where to search for programs.

The Java runtime system needs to know where to find programs that you want to run and libraries that are needed. It knows where the predefined Java packages are, but if you are using additional packages, you must tell specify where they are located.

For example, suppose you want the Java runtime to find a class named Cool.class in the package utility.myapp. If the path to that directory is C:\java\MyClasses\utility\myapp, you would set the class path so that it contains /src/java/MyClasses. To run that app, you could use the following JVM command:

```bash
$ java -classpath /src/java/MyClasses utility.myapp.Cool 
``` 

When the app runs, the JVM uses the class path settings to find any other classes defined in the utility.myapp package that are used by the Cool class.

## Adding Folders and archive files to classpath
When classes are stored in a directory (folder), like /src/java/MyClasses/utility/myapp, then the class path entry points to the directory that contains the first element of the package name. (in this case, /src/java/MyClasses, since the package name is utility.myapp.) 

But when classes are stored in an archive file (a .zip or .jar file) the class path entry is the path to and including the .zip or .jar file. For example, to use a class library that is in a .jar file, the command would look something like this: 

```bash
$ java -classpath /src/java/MyClasses/myclasses.jar utility.myapp.Cool
```

## Multiple specifications
To find class files in the directory /src/java/MyClasses as well as classes in /src/java/OtherClasses, you would set the class path to: 
```bash
$ java -classpath /src/java/MyClasses;/src/java/OtherClasses 
``` 
Note that the two paths are separated by a semicolon. 

## Using the CLASSPATH environment variable
Use the below command to set the CLASSPATH for the system variable.
```bash
$ set CLASSPATH=classpath1;classpath2...
``` 
For e.g. if my classes are located at the location /src/java/myAppClasses, then to set the classpath in the command line use the following command.

```bash
$ set CLASSPATH=/src/java/myAppClasses;
```











