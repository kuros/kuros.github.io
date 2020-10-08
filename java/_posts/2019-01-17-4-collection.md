---
title: Set, Sorted Set, HashSet, TreeSet
date: 2019-01-17
description: we want to create a collection that holds unique objects so what should we do?  
categories:
  - java
author_staff_member: rohit
---

Now let us say that we want to create a list that holds unique objects so what should we do? Should we use the normal list (ArrayList or LinkedList) to keep the data and whenever we want to insert data, should we go and check the list every time that whether the list already contains the object or not.

To simply our life, java has provided us with Sets.

Sets may not contain duplicate elements. If you try to add an object to a Set that already contains that object, the add() call will return false and the Set will not be changed. A true return value from add() means the Set did not formerly contain the object, but now it does.

# Hashset
A HashSet is an unsorted, unordered Set. It uses the hashcode of the object being inserted, so the more efficient your hashCode() implementation the better access performance you'll get. Use this class when you want a collection with no duplicates and you don't care about order when you iterate through it.

```java
import java.util.HashSet;
import java.util.Set;

public class Main {
	public static void main(String[] args) {
       String name1 = "John";
       String name2 = "Michel";
       String name3 = "John";
       String name4 = "Harry";
       String name5 = "abhishek";
       
       Set<String> set = new HashSet<String>(); //creating a set
       
       //Adding the data
       System.out.println(set.add(name1));
       System.out.println(set.add(name2));
       System.out.println(set.add(name3));
       System.out.println(set.add(name4));
       System.out.println(set.add(name5));
       
       //Printing the data 
       System.out.println(set);
	}

}
```
{% include ad %}
```text
true
true
false
true
true
[Michel, Harry, abhishek, John]
```

In the above example we have created a Set in which we try to add the element of String type. We try to add ‘John’ two times but fail to add the element again.

# SortedSet 

A SortedSet is an Interface which extends Set Interface. It is a set that further guarantees that its iterator will traverse the set in ascending element order, sorted according to the natural ordering of its elements, or by a Comparator (we will see later in this chapter what is a comparator and how to implement it) provided at sorted set creation time. Several additional operations are provided to take advantage of the ordering.

The following are the methods declared in the SortedSet additional to the methods declared in the Set interface.

| Method | Return Type | Description |
|:---:|:---:|:---:| 
| comparator() | Comparator | Returns the comparator associated with this sorted set, or null if it uses its elements' natural ordering. | 
| first() |  Object |  Returns the first (lowest) element currently in this sorted set. |
| headSet(Object toElement) |  SortedSet |  Returns a view of the portion of this sorted set whose elements are strictly less than toElement.| 
| last() | Object |  Returns the last (highest) element currently in this sorted set. |
| subSet(Object fromElement, Object toElement) | SortedSet | Returns a view of the portion of this sorted set whose elements range from fromElement, inclusive, to toElement, exclusive. | 
| tailSet(Object fromElement) | SortedSet | Returns a view of the portion of this sorted set whose elements are greater than or equal to fromElement. |

{% include ad %}
# Treeset

The TreeSet is one of two sorted collections (the other being TreeMap). It uses a Red-Black tree structure (but you knew that), and guarantees that the elements will be in ascending order, according to natural order. Optionally, you can construct a TreeSet with a constructor that lets you give the collection your own rules for what the order should be (rather than relying on the ordering defined by the elements' class) by using a Comparable or Comparator.
```java
import java.util.SortedSet;
import java.util.TreeSet;

public class Main {
	public static void main(String[] args) {
		SortedSet<String> set = new TreeSet<String>(); // Creating a TreeSet Object
		
		//Adding elements
		set.add("b");
		set.add("c");
		set.add("a");
		set.add("d");
		set.add("g");
		
		System.out.println(set); // Printing the set
		
		System.out.println("First element = " + set.first()); //Printing the First element of the set.
		System.out.println("Last element = " + set.last()); //Printing the Last element of the set
		
		//creating a new Set of first few elements from the given set and printing the set
		System.out.println("creating set for elements before 'd': " + set.headSet("d"));
		
		//creating a new Set of elements from the given set and printing the set
		System.out.println("Creating new sub set from 'b' to 'd': " + set.subSet("b", "d"));
		
		//creating a new Set of last few elements from the given set and printing the set
		System.out.println("Creating set of last elements from 'c' to end: " + set.tailSet("c"));
		
	}
}
```
{% include ad-h %}
```text
[a, b, c, d, g]
First element = a
Last element = g
creating set for elements before 'd': [a, b, c]
Creating new sub set from 'b' to 'd': [b, c]
Creating set of last elements from 'c' to end: [c, d, g]
```

