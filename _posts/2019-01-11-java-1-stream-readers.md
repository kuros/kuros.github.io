---
title: Streams, Readers & Writers
date: 2019-01-10
description: All fundamental I/O in Java is based on streams. 
categories:
  - java
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
tags:
  - I/O
  - InputStream
  - OutputStream
---

A stream represents a flow of data, or a channel of communication with (at least conceptually) a writer at one end and a reader at the other. When you are working with terminal input and output, reading or writing files, or communicating through sockets in Java, you are using a stream of one type or another. 

It is just like two people talking on a phone, which has a speaker and a mike, and all that the person has to do, is to know, how to use the phone.

<img alt="Comment-4" src="/images/java/j-40.webp" lazyload width="600px"/>

Streams in Java are one-way streets. The java.io input and output classes represent the ends of a simple stream. For bidirectional conversations, we use one of each type of stream.

<img alt="Comment-4" src="/images/java/j-41.webp" lazyload width="600px"/>

**InputStream** and **OutputStream** are abstract classes that define the lowest-level interface for all byte streams. They contain methods for reading or writing an unstructured flow of byte-level data. Because these classes are abstract, you can't create a generic input or output stream. Java implements subclasses of these for activities like reading from and writing to files and communicating with sockets. Because all byte streams inherit the structure of InputStream or OutputStream, the various kinds of byte streams can be used interchangeably. A method specifying an InputStream as an argument can, of course, accept any subclass of InputStream. Specialized types of streams can also be layered to provide features, such as buffering, filtering, or handling larger data types. In Java 1.1, new classes based around **Reader** and **Writer** were added to the **java.io** package. Reader and Writer are very much like **InputStream** and **OutputStream**, except that they deal with characters instead of bytes. As true character streams, these classes correctly handle Unicode characters, which was not always the case with the byte streams. However, some sort of bridge is needed between these character streams and the byte streams of physical devices like disks and networks. **InputStreamReader** and **OutputStreamWriter** are special classes that use an encoding scheme to translate between character and byte streams.

<img alt="Comment-4" src="/images/java/j-42.webp" lazyload width="600px"/>

So if you want to read a file which contains the text data, you should use character stream but if you have some binary file for which you are more focused on the integrity of the file than the speed, you should use a byte stream. 

## InputStream
The class java.io.InputStream is the base class for all Java IO input streams. If you are writing a component that needs to read input from a stream, try to make our component depend on an InputStream, rather than any of it's subclasses (e.g. FileInputStream).

You typically read data from an InputStream by calling the read() method. The read() method returns a int containing the byte value of the byte read. If there are no more data to be read, the read() method typically returns -1.

### Methods
```text
available()	
close()			
mark(int readlimit)		
markSupported()
read()		
read(byte[] b)		
read(byte[] b, int off, int len)
reset()		
skip(long n)
```

```java
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;


public class Main {
	public static void main(String[] args) {
		try {
			InputStream input = new FileInputStream("c:\\data\\input-file.txt");

			int data = input.read();

			while(data != -1){
			  data = input.read();
  }
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
```

In the above program we used a reference of InputStream which is referencing to object of FileInputStream ( sub class of InputStream) to read from the file (located at c:\\data\\input-file.txt ). We used the read method to read the file.

## OutputStream

The class java.io.OutputStream is the base class of all Java IO output streams. If you are writing a component that needs to write output to a stream, try to make sure that component depends on an OutputStream and not one of its subclasses.

### Methods
```text
close()			
flush()			
write(byte[] b)		
write(byte[] b, int off, int len)
write(int b)
```

Here is a simple example pushing some data out to a file: 

```java
import java.io.FileOutputStream;
import java.io.OutputStream;

public class Main {
	public static void main(String[] args) {
		try {
			OutputStream output = new FileOutputStream("c:\\data\\output-file.txt");
			output.write("Hello World".getBytes());
			output.close();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

	}
}
```

In the above program we used reference of OutputStream to point to an object of FileOutputStream which is responsible for writing the data in a file.

## Reader
The Reader is the baseclass of all Reader's in the Java IO API. Subclasses include a BufferedReader, PushbackReader etc.

### Methods
```text
close()			
mark(int readAheadLimit)		
markSupported()	read()
read(char[] cbuf)	
read(char[] cbuf, int off, int len)	ready()
reset()
```

Here is a simple example:
```java
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.io.Reader;

public class Main {
	public static void main(String[] args) {
		 try {
			Reader reader = new FileReader(new File("c:\\data\\input-file.txt"));

			    int data = reader.read();
			    while(data != -1){
			        char dataChar = (char) data;
			        data = reader.read();
			    }
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
```

Notice, that while an InputStream returns one byte at a time, meaning a value between -128 and 127, the Reader returns a char at a time, meaning a value between 0 and 65535. This does not necessarily mean that the Reader reads two bytes at a time from the source it is connected to. It may read one or more bytes at a time, depending on the encoding of the text being read.

## Writer

The Writer class is the baseclass of all Writer's in the Java IO API. Subclasses include BufferedWriter and PrintWriter among others. 

### Methods

```text
close()		
flush()			
write(char[] cbuf)		
write(char[] cbuf, int off, int len)
write(int c)	
write(String str)		
write(String str, int off, int len)
```

Here is a simple example:

```java
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

public class Main {
	public static void main(String[] args) {
		try {
			Writer writer = new FileWriter("c:\\data\\file-output.txt");

			writer.write("Hello World Writer");
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
}
```

The processing is similar to the Reader class except it reads the data in character format.






















