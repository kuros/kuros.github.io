---
title: Map collection
date: 2019-01-17
description:  
categories:
  - java
author_staff_member: rohit
---

A Map cares about unique identifiers. You map a unique key (the ID) to a specific value. You're probably quite familiar with Maps since many languages support data structures that use a key/value or name/value pair. The Map implementations let you do things like search for a value based on the key, ask for a collection of just the values, or ask for a collection of just the keys. Like Sets, Maps rely on the equals() method to determine whether two keys are the same or different.

A map does not allow duplicate keys, in other words, the keys are unique. Each key maps to one value at the most, implementing what is called a single-valued map.

<img alt="collection" src="/images/loader.gif"  data-src="/images/2019/java/map.png" class="lazy img-center"/>

**NOTE:** Both the keys and the values must be objects. This means that primitive values must be wrapped in their respective wrapper objects, if they are to be put in a map.

The listed operations constitute the basic functionality provided by a map.

| Method | Return Type | Description |
|:---:|:---:|:---:|
| put(Object key, Object value) | Object | Inserts the <key, value> entry into the map. It returns the value previously associated with the specified key, if any. Otherwise, it returns the null value. |
| get(Object key) | Object | Returns the value to which the specified key is mapped, or null if no entry is found. |
| remove(Object key) | Object | The remove() method deletes the entry for the specified key. It returns the value previously associated with the specified key, if any. Otherwise, it returns the null value. |
| containsKey(Object key) | boolean | Returns true if the specified key is mapped to a value in the map. |
| containsValue(Object value) | boolean | Returns true if there exists one or more keys that are mapped to the specified value. |

{% include ad %}
# HashMap

The HashMap gives you an unsorted, unordered Map. When you need a Map and you don't care about the order (when you iterate through it), then HashMap is the way to go; the other maps add a little more overhead. Where the keys land in the Map is based on the key's hashcode, so, like HashSet, the more efficient your hashCode() implementation, the better access performance you'll get. HashMap allows one null key and multiple null values in a collection.

<img alt="collection" src="/images/loader.gif"  data-src="/images/2019/java/map-2.png" class="lazy img-center"/>

```java
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;

public class Main {
	public static void main(String[] args) {
		HashMap<String, String> hMap = new HashMap<String, String>(); // Creating
																		// a
																		// hashMap

		// Adding the values as key, value pair
		hMap.put("1", "One");
		hMap.put("2", "Two");
		hMap.put("3", "Three");

		// Using keySet() method get the set of keys and finally getting the
		// Iterator Object from it.
		Iterator itr = hMap.keySet().iterator();

		while (itr.hasNext()) {
			String key = (String) itr.next();
			// Using the get method to the value refernced by the key
			System.out.println("The value at " + key + " is " + hMap.get(key));
		}
		
		Collection collection = hMap.values();
		System.out.println(collection);
		
		if(hMap.containsKey("2")){
			hMap.remove("2");
		}
		
		collection = hMap.values();
		System.out.println(collection);
	}
}
```

In the above code :
- We have used put(key, values) method to put a key-value pair in the HashMap
- The keySet() Method return a set of elements of keys of HashMap.
- We used get(key) Method to get the value for the given key.
- We used the containsKey(Key)method to find that whether the key is present in the list.
- If the key is present in the list we used the remove(key) method to remove the Key.

```text
The value at 1 is One
The value at 2 is Two
The value at 3 is Three
[One, Two, Three]
[One, Three]
```
{% include ad %}
# TreeMap
You can probably guess by now that a TreeMap is a sorted Map. And you already know that by default, this means "sorted by the natural order of the elements." Like TreeSet, TreeMap lets you define a custom sort order (via a Comparable or Comparator) when you construct a TreeMap, that specifies how the elements should be compared to one another when they're being ordered.

<img alt="collection" src="/images/loader.gif"  data-src="/images/2019/java/t-map.png" class="lazy img-center"/>

```java
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.TreeMap;

public class Main {
	public static void main(String[] args) {
		TreeMap<String, String> hMap = new TreeMap<String, String>(); // Creating
																		// a
																		// TreeMap

		// Adding the values as key, value pair
		hMap.put("1", "One");
		hMap.put("2", "Two");
		hMap.put("3", "Three");

		// Using keySet() method get the set of keys and finally getting the
		// Iterator Object from it.
		Iterator itr = hMap.keySet().iterator();

		while (itr.hasNext()) {
			String key = (String) itr.next();
			// Using the get method to the value refernced by the key
			System.out.println("The value at " + key + " is " + hMap.get(key));
		}
		
		Collection collection = hMap.values();
		System.out.println(collection);
		
		if(hMap.containsKey("2")){
			hMap.remove("2");
		}
		
		collection = hMap.values();
		System.out.println(collection);
	}
}
```

```text
The value at 1 is One
The value at 2 is Two
The value at 3 is Three
[One, Two, Three]
[One, Three]
```


