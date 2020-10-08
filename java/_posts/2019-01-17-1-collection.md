---
title: Collection framework
date: 2019-01-17
description: We are going to look into details List, Set & Map functions.
categories:
  - java
author_staff_member: rohit
---

A collection allows a group of objects to be treated as a single unit. Arbitrary objects can be stored, retrieved, and manipulated as elements of collections.

The Collection Framework provides a well-designed set if interface and classes for sorting and manipulating groups of data as a single unit, a collection.

# So What Do You Do with a Collection?
There are a few basic operations you'll normally use with collections:
- Add objects to the collection.
- Remove objects from the collection.
- Find out if an object (or group of objects) is in the collection.
- Retrieve an object from the collection (without removing it).
- Iterate through the collection, looking at each element (object) one after another.

# Key Interfaces and Classes of the Collections Framework
The core interfaces allow collections to be manipulated independently of their implementation. These interfaces define the common functionality exhibited by collections and facilitate data exchange between collections. These interfaces are


| Collection | Set | Sorted Set |
| List  | Map | Sorted Map |
| Queue | NavigableMap | NavigableSet |

<img alt="collection" src="/images/loader.gif"  data-src="/images/2019/java/collection.png" class="lazy"/>

So we have Set and List interface which extend from Collection interfaces, and we have SortedMap which is extending from Map interface.

The different interfaces describe the different types of groups. For the most part, once you understand the interfaces, you understand the framework. While you always need to create specific, implementations of the interfaces, access to the actual collection should be restricted to the use of the interface methods, thus allowing you to change the underlying data structure, without altering the rest of your code.
{% include ad %}
When designing software with the Collection Framework, it is useful to remember the following hierarchical relationship of the four basic interfaces of the framework.

- The Collection interface is a group of objects, with duplicates allowed.
- Set extends Collection but forbids duplicates.
- List extends Collection also, allows duplicates and introduces positional indexing.
- Map extends neither Set nor Collection

The concrete classes which implement these interfaces are:-

| Maps | Sets | Lists | Queues | Utilities |
| :---: | :---: | :---: | :---: | :---: |
| HashMap | HashSet | ArrayList | PriorityQueue | Collections |
| HashTable | LinkedHashSet | Vector | | |
| TreeMap | TreeSet | LinkedList |
| LinkedHashMap |


After java 1.6 two more interfaces were introduced which are NavigableMap and NavigableSet these two interfaces extend from the SortedMap and SortedSet respectively. These interfaces provide special methods to sort the elements in ascending order, descending order, also to retrieve the element which is immediately greater than or equal to a given value etc. These methods are used to return the closest matches of elements for the given elements in the collection.  

Other than these classes, we have a special class which is used to manipulate the Collection Objects, this class is Collections, this class has some of the very important methods such as sort, shuffle, reverse, binaySearch, etc.
{% include ad %}
# Collection interface

The Collection interface is used to represent any group of objects, or elements. You use the interface when you wish to work with a group of elements in as general a manner as possible.

Listed below are the methods which have to be implemented while implementing Collection interface.

| Method | Return type | Description |
| :---: | :---: | :---: |
| add(Object o) | boolean | Ensures that this collection contains the specified element (optional operation). |
| addAll(Collection c) | Boolean | Adds all of the elements in the specified collection to this collection (optional operation) |
| clear() | Void | Removes all of the elements from this collection (optional operation). |
| contains(Object o) | Boolean | Returns true if this collection contains the specified element. |
| containsAll(Collection c) | Boolean | Returns true if this collection contains all of the elements in the specified collection. |
| isEmpty() | Boolean | Returns true if this collection contains no elements. |
| iterator() | Iterator | Returns an iterator over the elements in this collection. |
| remove(Object o) | Boolean | Removes a single instance of the specified element from this collection, if it is present (optional operation). |
| removeAll(Collection c) | boolean | Removes all this collection's elements that are also contained in the specified collection (optional operation). |
| retainAll(Collection c) | Boolean | Retains only the elements in this collection that are contained in the specified collection (optional operation). |
| size() | Int | Returns the number of elements in this collection. |
| toArray() | Object[] | Returns an array containing all of the elements in this collection. |
|toArray(Object[] a) | Object[] | Returns an array containing all of the elements in this collection; the runtime type of the returned array is that of the specified array. |


The interface supports basic operations like adding and removing. When you try to remove an element, only a single instance of the element in the collection is removed, if present.
- boolean add (Object o) 
- boolean remove(Object o)

{% include ad %}

The Collection interface also supports query operations
- int size() 
- boolean isEmpty() 
- boolean contains(Object o) 
- Iterator iterator() 

Because the Collection interface is generic, you can write utility methods that operate on any kind of collection. For example, here is a generic method that tests whether an arbitrary collection contains a given element:

```java
public static <E> boolean contains(Collection<E> c, Object obj)
{
	for (E element : c)
		if (element.equals(obj))
			return true;
	return false;
}
```






