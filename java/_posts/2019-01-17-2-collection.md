---
title: Iterators
date: 2019-01-17
description: Mechanism to traverse 
categories:
  - java
author_staff_member: rohit
---

When we are having a collection of objects we needed a mechanism to traverse through it. But no two implementations are going to be the same when we are implementing a Collection interface for e.g. if we are using ArrayList or LinkedList, the two implementations are different and in no ways we can use the same algorithm to traverse through the all the collections.

To avoid these problems, in the Collection interface, an iterator method was declared which will return an Iterator object.

So every time someone implements a Collection class, he will have to override the Iterator method and provide a mechanism to traverse through the data structure he is providing.

The iterator has only three methods declared

| Methods | Description |
| next() | Returns a reference of type T to the next object that is available from the iterator and throws an exception of type java.util.NoSuchElementException if no further elements are available. | 
| hasNext() | Returns true if at least one more element is available from the iterator, so calling the next() method for the iterator returns a reference to the object in the container. The method returns false if no more elements are available from the iterator. Thus this method provides a way to check whether calling the next() method for the iterator will return a reference or throw an exception. |
| remove() | If the remove operation is supported, this method removes the last element that was retrieved by the preceding next() method call from the collection. If the remove operation is supported, this method throws an exception of type java.lang.UnsupportedOperationException. It will also throw an exception of type java.lang.IllegalStateException if the next() method has not been called for the iterator object prior to calling the remove() method. |

# Using Iterators

Now let us take an example of using Iterator, I will be using ArrayList to demonstrate how to use the iterator object obtained from the Collection object.

```java
import java.util.ArrayList;
import java.util.Iterator;

public class Main {
  public static void main(String[] args) {
    ArrayList<Integer> al = new ArrayList<Integer>();  //Line 1: Creating an ArrayList

    al.add(1);	//Line 2: Adding values to arrays
    al.add(2);
    al.add(3);
    al.add(4);
    al.add(5); 

     
    Iterator<Integer> iterate = al.iterator(); //Line 3: Getting an iterator object. 
    
    while(iterate.hasNext()) { //Line 4: using the hasNext method to check if there is more element.
      Integer integer = iterate.next(); //Line 5: using next() method to get the value.
     
      if(integer == 3){
    	  iterate.remove(); //Line 6: calling the remove() method to delete the value from the list.
    	  System.out.println(integer + " --> Deleting this element");
      }else{
    	  System.out.println(integer);
      }
    	  
    }
    
    System.out.println(al);
  }
}
```
Now let us understand what is happening in the above code,
- At line 1: we are creating a reference to the object of ArrayList which will hold the data of type Integer. Here we have used the concept of Generics using <> to define the type of list we want to create( we will see details of Generics in later chapter).
- At line 2: we are adding some values to the list.
- At line 3: we are using iterator() method of Collections class to get an iterator object.
- At line 4: we used hasNext() method of iterator to check whether we have more elements in the list.
- At line 5: if we have more elements in the list, we are using next() method to get that next element.
- At line 6: if we want to delete any object from the list we just have to call the remove method, and object to which the next() method is referencing will be deleted.
{% include ad %}
```text
1
2
3 --> Deleting this element
4
5
[1, 2, 4, 5]
```

# Iterators - foreach loop
The basic for loop was extended in Java 5 to make iteration over arrays and other collections more convenient. This newer for statement is called the enhanced for or for-each (because it is called this in other programming languages).

It's commonly used to iterate over an array or a Collections class (eg, ArrayList). It can also iterate over anything that implements the Iterable<E> interface (must define iterator() method). Many of the Collections classes (eg, ArrayList) implement Iterable<E>, which makes the for-each loop very useful. You can also implement Iterable<E> for your own data structures.

The for-each and equivalent for statements have these forms. The two basic equivalent forms are given, depending one whether it is an array or an Iterable that is being traversed. In both cases an extra variable is required, an index for the array and an iterator for the collection.

```java

public class Main {
	public static void main(String args[]) {

		double[] ar = { 1.2, 3.0, 0.8 };

		for (double d : ar) { // d gets successively each value in ar.
			System.out.println(d);
		}
	}
}
```
```text
1.2
3.0
0.8
```









