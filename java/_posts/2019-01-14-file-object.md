---
title: File Object
date: 2019-01-14
description:  
categories:
  - java
author_staff_member: rohit
---

Objects of type File are used to represent the actual files (but not the data in the files) or directories that exist on a computer's physical disk. First, let's create a new file and write a few lines of data to it:

```java
import java.io.*; 
class Writer1 {
	public static void main(String [] args) {
		File file = new File("fileWrite1.txt"); // There's no
												//file yet!
	}
}
```

If you compile and run this program, when you look at the contents of your current directory, you'll discover absolutely no indication of a file called fileWrite1.txt. When you make a new instance of the class File, you're not yet making an actual file, you're just creating a filename.

Once you have a File object, there are several ways to make an actual file.

```java

import java.io.*;

class Writer1 {
	public static void main(String [] args) {
		try { // warning: exceptions possible
			boolean newFile = false;
			File file = new File // it's only an object
			("fileWrite1.txt");
			System.out.println(file.exists()); // look for a real file
			newFile = file.createNewFile(); // maybe create a file!
			System.out.println(newFile); // already there?
			System.out.println(file.exists()); // look again
		} catch(IOException e) { }
	}
}
```

We used exists() method to check whether the file is already present of the disk or not. We use createNewFile() method to create an actual file on the disk.

For the first run, the output will be:-
```text
false
true
true
```
When you run the same program for the second time the output will be:-

```text
true
false
true
```

i.e. for the second time, since the file is already existing, the createNewFile() method returns null, hence not creating a new file.

Main methods that are used for the file class are:

| Method | Description |
| :---: | :---: |
| createNewFile() |Atomically creates a new, empty file named by this abstract pathname if and only if a file with this name does not yet exist.|
| delete()|Deletes the file or directory denoted by this abstract pathname.|
| exists()|Tests whether the file or directory denoted by this abstract pathname exists.|
| getAbsolutePath() |Returns the absolute pathname string of this abstract pathname.|
| isDirectory()|Tests whether the file denoted by this abstract pathname is a directory.|
| isFile()|Tests whether the file denoted by this abstract pathname is a normal file.|
| mkdir()|Creates the directory named by this abstract pathname.|
| renameTo (File dest)|Renames the file denoted by this abstract pathname.|
{% include ad %}
# Creating directories

```java
import java.io.File;

public class CreateFile {
	public static void main(String[] args) throws Exception {
		File dir = new File("MyDir");

		if (!dir.exists()){
			dir.mkdir();
			System.out.println("Directory created");
		}
		else
			System.out.println("directory already exists");

		if (dir.exists()) {
			
			File file = new File(dir, "Myfile");

			if (!file.exists()) {
				boolean result = file.createNewFile();

				if (result)
					System.out.println("File Created");
				else
					System.out.println("File not created");
			} else {
				System.out.println("File already exists");
			}
		} else {
			System.out.println("Cannot create directory");
		}
	}
}
```

```text
Directory created
File Created
```

# Renaming files

Now we will look how to rename the file, we will first check if the file exists, then we will rename it.

```java
import java.io.File;

public class RenameFile {
	public static void main(String[] args) throws Exception {
		File file = new File("MyDir", "Myfile");
		
		if (file.exists()){
			boolean status = file.renameTo(new File("MyDir", "RenamedFile.txt"));
			if(status)
				System.out.println("File Renamed");
			else
				System.out.println("File Not Renamed");
		}else{
			System.out.printf("File '%s' not found", file.getName());
		}
	}
}
```
{% include ad %}
```text
File Renamed
```

# Deleting file
We can also delete the file using the File Object.

```java
import java.io.File;

public class Entry {
	public static void main(String[] args) throws Exception {
		File file = new File("MyDir", "Myfile");
		
		if (file.exists()){
			boolean status = file.delete();
			if(status)
				System.out.println("File Deleted");
			else
				System.out.println("File Not Deleted");
		}else{
			System.out.printf("File '%s' not found", file.getName());
		}
	}
}
```
{% include ad %}
```text
File Deleted
```

# RandomAccessFile
Instances of RandomAccessFile class support both reading and writing to access file randomly. A random access file behaves like a large array of bytes stored in the file system. There is a kind of cursor, or index into the implied array, called the file pointer; input operations read bytes starting at the file pointer and advance the file pointer past the bytes read. If the random access file is created in read/write mode, then output operations are also available; output operations write bytes starting at the file pointer and advance the file pointer past the bytes written. 

Let us look at the main methods provided by this class.

| Methods | Description| 
| :---: | : --- :|
| read() | Reads a byte of data from this file.|
| read(byte[] b) | Reads up to b.length bytes of data from this file into an array of bytes.|
| read(byte[] b, int off, int len) | Reads up to len bytes of data from this file into an array of bytes.|
| write(byte[] b) | Writes b.length bytes from the specified byte array to this file, starting at the current file pointer.|
| write(byte[] b, int off, int len) | Writes len bytes from the specified byte array starting at offset off to this file.|
| seek(long pos) | Sets the file-pointer offset, measured from the beginning of this file, at which the next read or write occurs.|
| skipBytes(int n) | Attempts to skip over n bytes of input discarding the skipped bytes.|
| getFilePointer() | Returns the current offset in this file.|

Now let us go and implement these methods in program:-

```java
import java.io.FileNotFoundException;
import java.io.IOException; 
import java.io.RandomAccessFile; 

public class Main { 
	/** * Example method for using the RandomAccessFile class */ 
	public void testRandomAccessFile(String filename) { 
		RandomAccessFile randomAccessFile = null;
		try {
			//Declare variables that we're going to write 
			String line1 = "First line\n"; 
			String line2 = "Second line\n"; 
			
			//Create RandomAccessFile instance with read / write permissions 
			randomAccessFile = new RandomAccessFile(filename, "rw"); 
			
			//Write two lines to the file 
			randomAccessFile.writeBytes(line1); 
			randomAccessFile.writeBytes(line2); 
			
			//Place the file pointer at the end of the first line 
			randomAccessFile.seek(line1.length()); 
			//Declare a buffer with the same length as the second line 
			
			long position = randomAccessFile.getFilePointer();
			System.out.println("Now the pointer is at location " + position);
			
			byte[] buffer = new byte[line2.length()];
			
			//Read data from the file 
			randomAccessFile.read(buffer); 
			
			//Print out the buffer contents 
			System.out.println(new String(buffer)); 
			
			position = randomAccessFile.getFilePointer();
			System.out.println("Now the pointer is at location " + position);
				
			}catch (FileNotFoundException ex) {
				ex.printStackTrace(); 
			} catch (IOException ex) {
				ex.printStackTrace(); 
			} finally { 
				try { 
					if (randomAccessFile != null) randomAccessFile.close();
				} catch (IOException ex) { ex.printStackTrace(); 
				}
			}
	}	
							/** * @param args the command line arguments */ 
	public static void main(String[] args) {
		new Main().testRandomAccessFile("myFile.txt");  
	}
}
```

In this program we first use writeBytes() method to write the data in the file then use seek method to traverse the file, used the getFilePointer()  method to get the current location. Finally reading a chunk of data using the read() method

```java
Now the pointer is at location 11
Second line

Now the pointer is at location 23
```












