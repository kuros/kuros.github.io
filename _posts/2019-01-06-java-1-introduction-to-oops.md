---
title: Java - Introduction to OOPs
date: 2019-01-06
description: Why we use the OOP model for programming and its benefits.
categories:
  - java
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
---

Object-oriented programming (OOP) is a programming style that uses "objects" (data structures consisting of data fields and methods together with their interactions) to design applications and computer programs. Programming techniques may include features such as data abstraction, encapsulation, modularity, polymorphism, and inheritance.

## Classes
A class is a construct that is used as a blueprint (or template) to create objects of that class. This blueprint describes the state and behavior that the objects of the class all share. An object of a given class is called an instance of the class. The class that contains (and was used to create) that instance can be considered as the type of that object. For e.g. the class BIRD would consist of traits shared by all birds, such as beaks, legs  and wings (characteristics), and the ability to fly (behavior). 
![Bird Image](/images/java/bird.png)

## Objects
A pattern (exemplar) of a class. The class BIRD defines all possible birds by listing the characteristics and behaviors they can have; the object Eagle is one particular bird, with particular versions of the characteristics. A Bird has beak; Eagle has hooked beaks.
				
We can create object with some pre initialized state using the constructor for the Class, Suppose in the above example of Bird Class we want to assign the name of the Bird while creating the object, we can do that by using the constructor of the class. We will see how to use constructor in later chapter.

## Instance
An instance is the blue print (that is, an actual example) of a class. For example, the class Dog is a pattern or blueprint for dog objects by listing the characteristics and behaviors they can have, the object Lassie is one particular dog. 

Another example, the class BankAccountClass provides the pattern or blueprint for bank account objects; an object of type BankAccountClass would be one specific bank account.

## Abstraction
**Abstraction is the process or result of generalization by reducing the information content of a concept or an observable phenomenon, typically to retain only information which is relevant for a particular purpose.**For example, abstracting a leather soccer ball to the more general idea of a ball retains only the information on general ball attributes and behavior, eliminating the characteristics of that particular ball.

In object-oriented programming, abstraction is one of three central principles (along with encapsulation and inheritance). Through the process of abstraction, a programmer hides all but the relevant data about an object in order to reduce complexity and increase efficiency. 

