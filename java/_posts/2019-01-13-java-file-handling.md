---
title: File Handling
date: 2019-01-13
description: One of the most frequently used task in programming is writing to and reading from a file. To do this in Java there are more possibilities. At this time only the most frequently used text file handling solutions will be presented. 
categories:
  - java
author_staff_member: rohit
---

To write anything to a file first of all we need a file name we want to use. The file name is a simple string like like this:

```java
String fileName = "test.txt";
```
If you want to write in a file which is located elsewhere you need to define the complete file name and path in your fileName variable:
```java
String fileName = "c:\\filedemo\\test.txt";
```

However if you define a path in your file name then you have to take care the path separator. On windows system the '\' is used and you need to backslash it so you need to write '\\', in Unix, Linux systems the separator is a simple slash '/'.
 
To make your code OS independent you can get the separator character as follows:

```java
String separator = System.getProperty("file.separator");
```

## Open a file
To open a file for writing use the FileWriter class and create an instance from it. The file name is passed in the constructor like this:

```java
FileWriter writer = new FileWriter(fileName);
```

This code opens the file in overwrite mode. If you want to append to the file then you need to use an other constructor like this:

```java
FileWriter writer = new FileWriter(fileName,true);
```

Besides this the constructor can throw an IOException so we put all of the code inside a try-catch block.
{% include ad %}
## Write to file
At this point we have a writer object and we can send real content to the file. You can do this using the write() method, which has more variant but the most commonly used requires a string as input parameter.
 
Calling the write() method doesn't mean that it immediately writes the data into the file. The output is maybe cached so if you want to send your data immediately to the file you need to call the flush() method.
 
As last step you should close the file with the close() method and you are done.

```java
	public void writeFile() {
	
		String fileName = "c:\\test.txt";
	
		try {
	
			FileWriter writer = new FileWriter(fileName,true);
	
			writer.write("Test text.");
	
			writer.close();
	
		} catch (IOException e) {
	
			e.printStackTrace();
	
		}
	
	}
```

However, in a real world situation, the FileWriter is usually not used directly. Instead of FileWriter the BufferedWriter or from Java 1.5 the PrintWriter are used. These writer objects, gives you more flexibility to handle your IO.
Here is a simple BufferedWriter example:

```java

     public void writeFile() {
	   
		String fileName = "c:\\test.txt";

		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(fileName,true));
			
			writer.write("Test text.");
			writer.newLine();
			writer.write("Line2");
			writer.close();
	  }catch (IOException e) {
		  e.printStackTrace();
	 
	  } 
	}
```

The Buffered writer helps us to write a chunk of data at time, as the name suggest first it buffers the data and then writes it into a file.

## Reading from the file
Now it's time to read the file content back. Not surprisingly reading from a file is very similar to writing. We only need to use *Reader objects instead of *Writer objects. It means that you can use FileReader or BufferedReader. As a simple FileReader can handle only a single character or a character array it is more convenient to use the BufferedReader which can read a complete line from a file as a string. So using a BufferedReader we can read a text file line by line with the readln() method as you can see in this example:

```java

	public String readFile() {
	    String fileName = "c:\\test.txt";
	    String LS = System.getProperty("line.separator");
	    StringBuffer fileContent = new StringBuffer();
	 
	    try {
	        FileReader fr = new FileReader(fileName);
	        BufferedReader reader = new BufferedReader(new FileReader(fileName));
	 
	        String line;
	        while ((line = reader.readLine()) != null) {
	            fileContent.append(line).append(LS);
	        }
	        reader.close();
	        fr.close();
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	 
	    return fileContent.toString();
	}
```
Don’t forget to close the streams after using it; the data might get corrupted if the closing action is not taken care of. 
{% include ad %}
Now since we have seen how to write and read from the file, let us compile our code as a single program which has a capability to first write the data and then read from the file and show the output on the console.

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class Main {

	public static void main(String[] args) {
	
		Main fd = new Main();
		fd.writeFile();
		String txt = fd.readFile();
		System.out.println(txt);
	}

	public void writeFile() {
	
		String fileName = "c:\\test.txt";
		try {
			BufferedWriter writer = new BufferedWriter(new FileWriter(fileName,true));
			writer.write("Test text.");
			writer.newLine();
			writer.write("Line2");
			writer.close();
		
		} catch (IOException e) {		
			e.printStackTrace();		
		}	
	}

	public String readFile() {
	
		String fileName = "c:\\test.txt";
		String LS = System.getProperty("line.separator");
		StringBuffer fileContent = new StringBuffer();
		
		try {
			FileReader fr = new FileReader(fileName);
			BufferedReader reader = new BufferedReader(new FileReader(fileName));
			String line;
			while ((line = reader.readLine()) != null) {
				fileContent.append(line).append(LS);
			}
			
		} catch (IOException e) {		
			e.printStackTrace();		
		}

		return fileContent.toString();	
	}
}
```
```text
Test text.
Line 2
```














