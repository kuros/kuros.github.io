---
title: List, ArrayList, LinkedList
date: 2019-01-17
description: We will look at different implementations of List interface. 
categories:
  - java
author_staff_member: rohit
---

A List extends Collection interface but it also cares about the index. The one thing that List has that non-lists don't have is a set of methods related to the index. Those key methods include things like get(int index), indexOf(Object o), add(int index, Object obj), and so on. 

Since in list we are more concentrated on the order of the elements, in which order the list has been created and how the elements are arranged in the List.

So let us see the addition methods provided by List method other than the methods provided by the Collection Class.


| Method | Return type | Description |
| :---: | :---: | :---: | 
| add(int index, Object element) | void | Inserts the specified element at the specified position in this list (optional operation). |
| addAll(int index, Collection c) | boolean | Inserts all of the elements in the specified collection into this list at the specified position (optional operation). |
| get(int index) | Object | Returns the element at the specified position in this list. |
| remove(int index) | Object |  Removes the element at the specified position in this list (optional operation). |
| set(int index, Object element) | Object | Replaces the element at the specified position in this list with the specified element (optional operation). |
| subList(int fromIndex, int toIndex) | List |  Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive. |

Now we have learned about the List interface and its method which have to be implemented. Let us the see the concrete classes which implement it.

# ArrayList
The **ArrayList** class extends **AbstractList** and implements the **List** interface. ArrayList supports dynamic arrays that can grow as needed. In Java, standard arrays are of a fixed length. After arrays are created, they cannot grow or shrink, which means that you must know in advance how many elements an array will hold. But, sometimes, you may not know until run time precisely how large of an array you need. To handle this situation, the collections framework defines ArrayList. In essence, an ArrayList is a variable-length array of object references. That is, an ArrayList can dynamically increase or decrease in size. Array lists are created with an initial size. When this size is exceeded, the collection is automatically enlarged. When objects are removed, the array may be shrunk.

Some of the advantages ArrayList has over arrays are
- It can grow dynamically.
- It provides more powerful insertion and search mechanisms than arrays.

Let's take a look at using an ArrayList that contains Strings.

```java
List myList = new ArrayList();
List<String> myList = new ArrayList<String>();
```

We have used two types of declaration at Line 1; we have created an array list which can hold any kind of object, where as declaration at Line 2; states that we creating a list which will hold only the data of String type.

In many ways, ArrayList<String> is similar to a String[] in that it declares a container that can hold only Strings, but it's more powerful than a String[] as we have seen the ArrayList grows dynamically and it also provides method of insertion and searching.
{% include ad %}
# Adding and Removing Elements
Now we have our list ready and we want to insert elements to it. Adding element to a list is very easy, you just have to call add() method.

```java
import java.util.ArrayList;
import java.util.List;


public class Main {
	public static void main(String args[]) throws Exception {
	    // Create/fill collection
	    List<String> list = new ArrayList<String>();
	    list.add("A");
	    list.add("B");
	    list.add("C");
	    list.add("D");
	    
	    System.out.println(list);
	    
	    System.out.println(list.size());
	    System.out.println(list.contains("B"));
	    System.out.println(list.contains("BB"));
	    list.remove("C");
	    System.out.println(list.size());

	  }
}
```
```text
[A, B, C, D]
4
true
false
3
```

In the above code we have used add() method to add the elements in the list. Then used the size() method to get the total number of elements in the list and finally used the contains() method to check whether the specific element is present.

To remove an element we use the remove method of the Collection Interface.

# Converting Arrays to Lists to Arrays

There are a couple of methods that allow you to convert arrays to Lists, and Lists to arrays. The List and Set classes have toArray() methods, and the Arrays class (extends Object)has a static method called asList(). The Arrays.asList() method copies an array into a List.

**Note:** When you use the asList() method, the array and the List become joined at the hip. When you update one of them, the other gets updated automatically.

Now let us understand this by an example:

```java
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public class Main {
	public static void main(String[] args) {
		
		String[] sa = { "one", "two", "three", "four" };
		List sList = Arrays.asList(sa); // make a List
		System.out.println("size " + sList.size());
		System.out.println("idx2 " + sList.get(2));

		sList.set(3, "six"); // change List
		sa[1] = "five"; // change array
		
		Iterator iterate = sList.iterator();
		while(iterate.hasNext()){
			System.out.print(iterate.next() + " ");
		}
			
		System.out.println("\nsl[1] " + sList.get(1));
	}
}
```

In this program we are
1. Creating an array called as ‘sa’.
2. Then we use Arrays.asList() static method create an a List.
3. Then we are accessing the values of the sList with its size() method and get() method.
4. Now we are changing the value of index 3 to ‘Six’ using the List operatios.
5. Then we are setting the value if index 1 to ‘five’ using the arrays operation.
6. Finally when print he the values  of array ‘sa’ and value at location 1 of the list.
{% include ad %}
```text
size 4
idx2 three
one five three six
sl[1] five
```

Notice that we have made changes to list which was reflected in array and vice-versa.

This is how an array of String will look like in the memory 

<img alt="collection" src="/images/loader.gif"  data-src="/images/2019/java/list.png" class="lazy"/>

So each value will be assigned a memory location consecutively(e.g. value ‘one’ will be stored at location 1001, value ‘two’ will be stored at location 1002 and so on). But when we call the asList() method the value is modified like this

<img alt="collection" src="/images/loader.gif"  data-src="/images/2019/java/list-2.png" class="lazy"/>

So actually the same array is will start behaving like a List without creating a copy of the Array.

# Linked List
A linked list is a data structure that consists of a sequence of data records such that in each record there is a field that contains a reference (i.e., a link) to the next record in the sequence.

<img alt="collection" src="/images/loader.gif"  data-src="/images/2019/java/l-list.png" class="lazy img-center img-half"/>

A Linked List will look like the above fig, we have two at consecutive two memory locations for e.g. 2 and 2184, in this case 2 is the actual data which we want to store and 2184 is the memory location of another consecutive memory locations where our next data is stored.

In java a LinkedList is actually a doubly linked list i.e. the List will Look like this:-

<img alt="collection" src="/images/loader.gif"  data-src="/images/2019/java/l-list-2.png" class="lazy img-center img-half"/>
{% include ad %}
## Using Linked List

Accessing a linked list is same as using ArrayList. Insertions and deletions in a doubly-linked list are very efficient—elements are not shifted, as is the case for an array. The LinkedList class provides extra methods that implement operations that add, get, and remove elements at either end of a LinkedList:

| Method | Return Type |
|:---:|:---:|
| addFirst(Object obj) | void |
| addLast(Object obj) | void |
| getFirst() | Object |
| getLast() | Object |
| removeFirst() | Object |
| removeLast() | Object |

Let us see an example of these methods implementation, in the below code we will create a list of type Linked List and add the values to this list. Then we will use the above mentioned methods to manipulate the list.

```java
import java.util.LinkedList;
import java.util.List;

public class Main {
	public static void main(String args[]) throws Exception {
	    // Create/fill collection
	    LinkedList<String> list = new LinkedList<String>();
	    
	    list.add("A");
	    list.add("B");
	    list.add("C");
	    list.add("D");
	    
	    System.out.println(list);
	    
	    list.addFirst("1");
	    list.addLast("2");
	    System.out.println(list);
	    
	    System.out.println("The first value = " + list.getFirst());
	    System.out.println("The last value = " + list.getLast());
	    
	    System.out.println("The value removed from the first position of list = " + list.removeFirst());
	    System.out.println("The value removed from the last position of list = " + list.removeLast());
	    
	    System.out.println(list);

	  }
}
```
{% include ad %}
```text
[A, B, C, D]
[1, A, B, C, D, 2]
The first value = 1
The last value = 2
The value removed from the first position of list = 1
The value removed from the last position of list = 2
[A, B, C, D]
```

Similar to the ArrayList, we have one more class the Vector class, the only difference between Vector class and ArrayList is that the methods of Vector class are synchronized, and hence are thread safe, where as the methods of ArrayList is not synchronized.

# Which one to choose
So we have three implementations of List interface, ArrayList, LinkedList, Vector, to choose amongst them use the following rule.
1. ArrayList: When you want to store data in the memory which may vary(think of a growing array).
2. LinkedList : Prefer LinkedList over ArrayList when you want to store a very large amount of data in the memory.
3. Vector: Prefer Vector over ArrayList if you want to make the list thread safe since all the methods are synchronized




