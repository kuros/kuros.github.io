---
title: Java Serialization & Deserialization
date: 2019-01-16
description: save this object state to the persistent store
categories:
  - java
author_staff_member: rohit
---

Serialization lets you simply say “save this object state to the persistent store" you'd have to use one of the I/O classes to write out the state of the instance variables of all the objects you want to save.

After a serialized object has been written into a file, it can be read from the file and deserialized that is, the type information and bytes that represent the object and its data can be used to recreate the object in memory.

Most impressive is that the entire process is JVM independent, meaning an object can be serialized on one platform and deserialized on an entirely different platform.

To demonstrate how serialization works in Java, I am going to use the Employee class that we discussed early on in the book. Suppose that we have the following Employee class, which implements the Serializable interface:

```java
public class Employee implements java.io.Serializable
{
   public String name;
   public String address;
   public transient int SSN;
   public int number;
   public void mailCheck()
   {
      System.out.println("Mailing a check to " + name
                           + " " + address);
   }
}
```

Notice that for a class to be serialized successfully, two conditions must be met:
- The class must implement the java.io.Serializable interface. 
- All of the fields in the class must be serializable. If a field is not serializable, it must be marked transient.

# Serializing an Object:
The ObjectOutputStream class is used to serialize an Object. The following SerializeDemo program instantiates an Employee object and serializes it to a file.

```java
import java.io.*;

public class SerializeDemo
{
   public static void main(String [] args)
   {
      Employee e = new Employee();
      e.name = "Reyan Ali";
      e.address = "Phokka Kuan, Ambehta Peer";
      e.SSN = 11122333;
      e.number = 101;
      try
      {
         FileOutputStream fileOut =
         new FileOutputStream("employee.ser");
         ObjectOutputStream out =
                            new ObjectOutputStream(fileOut);
         out.writeObject(e);
         out.close();
          fileOut.close();
      }catch(IOException i)
      {
          i.printStackTrace();
      }
   }
}
```

In the above program we have used classes **ObjectInputStream** and **ObjectOutputStream** which are high-level streams that contain the methods for serializing and deserializing an object.

The ObjectOutputStream class contains many write methods for writing various data types, but one method in particular stands out:
- public final void writeObject(Object x) throws IOException

The above method serializes an Object and sends it to the output stream. Other than this, we have
- public void defaultReadObject() throws IOException,  ClassNotFoundException

This method read the non-static and non-transient fields of the current class from this stream. This may only be called from the readObject method of the class being deserialized. It will throw the NotActiveException if it is called otherwise.
{% include ad %}
When the program is done executing, a file named employee.ser is created. The program does not generate any output, but study the code and try to determine what the program is doing.

**Note:** When serializing an object to a file, the standard convention in Java is to give the file a .ser extension. This .ser file is created where we have specified the path, In this case since we have not given relative path, it will create the file at same location where we have executed the class.

Now let us see what happens if we do not implement the Serializable interface.

```java
public class Employee {
	public String name;
	public String address;
	public transient int SSN;
	public int number;

	public void mailCheck() {
		System.out.println("Mailing a check to " + name + " " + address);
	}
}
```

Since we have not implemented Serializable interface, the compiler gives an error as not seralizalbe.

```text
java.io.NotSerializableException: Employee
	at java.io.ObjectOutputStream.writeObject0(ObjectOutputStream.java:1184)
	at java.io.ObjectOutputStream.writeObject(ObjectOutputStream.java:348)
	at Employee.main(Employee.java:29)
```

# Deserializing an Object:
The following DeserializeDemo program deserializes the Employee object created in the SerializeDemo program. Study the program and try to determine its output:

```java
import java.io.*;
public class DeserializeDemo
{
   public static void main(String [] args)
   {
      Employee e = null;
      try
      {
         FileInputStream fileIn =
                       new FileInputStream("employee.ser");
         ObjectInputStream in = new ObjectInputStream(fileIn);
         e = (Employee) in.readObject();
         in.close();
         fileIn.close();
     }catch(IOException i)
     {
         i.printStackTrace();
         return;
     }catch(ClassNotFoundException c)
     {
         System.out.println(".Employee class not found.");
         c.printStackTrace();
         return;
     }
     System.out.println("Deserialized Employee...");
     System.out.println("Name: " + e.name);
     System.out.println("Address: " + e.address);
     System.out.println("SSN: " + e.SSN);
     System.out.println("Number: " + e.number);
 }
}
```

Similarly, the ObjectInputStream class contains the following method for deserializing an object:
- public final Object readObject() throws IOException, ClassNotFoundException

This method reads the object from the serialized file. Other than this we have another method
- public void defaultWriteObject() throws IOException

Writes the non-static and non-transient fields of the current class to this stream. This may only be called from the writeObject method of the class being serialized. It will throw the NotActiveException if it is called otherwise.
{% include ad %}
```text
Deserialized Employee...
Name: Reyan Ali
Address: Phokka Kuan, Ambehta Peer
SSN: 0
Number: 101
```
Here are following important points to be noted:
- The try/catch block tries to catch a ClassNotFoundException, which is declared by the readObject() method. For a JVM to be able to deserialize an object, it must be able to find the bytecode for the class. If the JVM can't find a class during the deserialization of an object, it throws a ClassNotFoundException.
- Notice that the return value of readObject() is cast to an Employee reference.
- The value of the SSN field was 11122333 when the object was serialized, but because the field is transient, this value was not sent to the output stream. The SSN field of the deserialized Employee object is 0 which is the default value.

```java
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

abstract class Shape implements Serializable {
  public static final int RED = 1, BLUE = 2, GREEN = 3;

  private int x, y, size;

  private static Random r = new Random();

  private static int counter = 0;

  public abstract void setColor(int newColor);

  public abstract int getColor();

  public Shape(int xVal, int yVal, int dim) {
    x = xVal;
    y = yVal;
    size = dim;
  }

  public String toString() {
    return getClass() + "color[" + getColor() + "] xPos[" + x + "] yPos[" + y + "] dim[" + size
        + "]\n";
  }

}

class Circle extends Shape {
  private static int color = RED;

  public Circle(int xVal, int yVal, int dim) {
    super(xVal, yVal, dim);
  }

  public void setColor(int newColor) {
    color = newColor;
  }

  public int getColor() {
    return color;
  }
}

class Square extends Shape {
  private static int color;

  public Square(int xVal, int yVal, int dim) {
    super(xVal, yVal, dim);
    color = RED;
  }

  public void setColor(int newColor) {
    color = newColor;
  }

  public int getColor() {
    return color;
  }
}

class Line extends Shape {
  private static int color = RED;

  public static void serializeStaticState(ObjectOutputStream os) throws IOException {
    os.writeInt(color);
  }

  public static void deserializeStaticState(ObjectInputStream os) throws IOException {
    color = os.readInt();
  }

  public Line(int xVal, int yVal, int dim) {
    super(xVal, yVal, dim);
  }

  public void setColor(int newColor) {
    color = newColor;
  }

  public int getColor() {
    return color;
  }
}

public class Entry {
  public static void main(String[] args) throws Exception {
    List shapeTypes, shapes;
    if (args.length == 0) {
      shapeTypes = new ArrayList();
      shapes = new ArrayList();

      shapeTypes.add(Circle.class);
      shapeTypes.add(Square.class);
      shapeTypes.add(Line.class);

      shapes.add(new Square(4, 3, 200));
      shapes.add(new Circle(1, 2, 100));
      shapes.add(new Line(1, 2, 100));

      ObjectOutputStream out = new ObjectOutputStream(new FileOutputStream("CADState.out"));
      out.writeObject(shapeTypes);
      Line.serializeStaticState(out);
      out.writeObject(shapes);
    } else {
      ObjectInputStream in = new ObjectInputStream(new FileInputStream(args[0]));
      shapeTypes = (List) in.readObject();
      Line.deserializeStaticState(in);
      shapes = (List) in.readObject();
    }

    System.out.println(shapes);
  }

}
```
{% include ad %}
```text
[class Squarecolor[1] xPos[4] yPos[3] dim[200]
, class Circlecolor[1] xPos[1] yPos[2] dim[100]
, class Linecolor[1] xPos[1] yPos[2] dim[100]
]
```

# Conclusion
- Serialization lets you save, ship, and restore everything you need to know about a live object. And when your object points to other objects, they get saved too.
- The java.io.ObjectOutputStream and java.io.ObjectInputStream classes are used to serial and deserialize objects. Typically you wrap them around instances of FileOutputStream and FileInputStream, respectively.
- The key method you invoke to serialize an object is writeObject(), and to deserialize an object invoke readMethod().
- In order to serialize an object, it must implement the Serializable interface. Mark instance variables transient if you don't want their state to be part of the serialization process.
