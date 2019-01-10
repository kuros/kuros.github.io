---
title: Thread wait and join
date: 2019-01-10
description: Diving deep into the thread methods wait & join and how they work in sync to give desired result. 
categories:
  - java
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
---

The Java language includes three important methods that effectively allow one thread to signal to another. Without this facility, various constructs used in concurrent programming would be difficult and inefficient to implement, at least prior to Java 5.

## The wait() method

Java includes an elegant inter process communication mechanism via the **wait()**, **notify()**, and **notifyAll()** methods. These methods are implemented as **final** methods in **Object**, so all classes have them. All three methods can be called only from within a **synchronized** method. Although conceptually advanced from a computer science perspective, the rules for using these methods are actually quite simple:

- **wait()** tells the calling thread to give up the monitor and go to sleep until some other thread enters the same monitor and calls notify().
- **notify()** wakes up the first thread that called wait() on the same object.
- **notifyAll()** wakes up all the threads that called wait() on the same object. The highest priority thread will run first.

These methods are declared within Object, as shown here:
- final void wait() throws InterruptedException 
- final void notify() 
- final void notifyAll()

Now let us understand this through an example:-

```java
class MyResource {
	  boolean ready = false;
	  synchronized void waitFor() throws Exception {  //Line 1: declare method as synchronized
	    System.out.println(Thread.currentThread().getName()+ " is entering waitFor().");
	      while (!ready)
	        wait(); //Line 2: calling the wait() method

	    System.out.println(Thread.currentThread().getName() + " resuming execution.");
	  }
	  synchronized void start() {
	    ready = true;
	    notify(); //Line 3: using notify method to inform the thread that object has been released
	  }
	}

	class MyThread implements Runnable {
	  MyResource myResource;

	  MyThread(String name, MyResource so) {
	    myResource = so;
	    new Thread(this, name).start(); //Line 4: starts the thread, Calling run() of Line 5.
	  }

	  public void run() { //Line 5: Declared the run method for the Class MyThread
	   
	    try {
	      myResource.waitFor();
	    } catch (Exception e) {
	      e.printStackTrace();
	    }
	  }
	}

	public class Main {
	  public static void main(String args[]) throws Exception {
	    MyResource sObj = new MyResource(); //Line 6: creating an object of MyResource
	    new MyThread("MyThread", sObj); //Starting the thread.
	    for (int i = 0; i < 10; i++) { 
	      Thread.sleep(1000); //Making the thread sleep for 1 sec
	      System.out.print(".");
	    }
	    sObj.start(); //finally calling start() method of MyResource to notify the thread.
	  }
	}
```

In the above code we have a MyResource class, it has two methods:-

- waitFor() :- this method is a synchronized method which will wait until the ready is set to true.
- start() :- when this method is called it will set the value for ready to true and will call the notify() method 

Then we have MyThread Class which implements the runnable interface, in its constructor we have created an instance of Thread class and passed the MyThread Object using this keyword, and after that we have called its start method.

Now let us focus to the Main class, In the main class we have started the thread which in turn calls the waitFor() method of MyResource, went in the loop to sleep (for 1 sec), after 10 sec period of time, we call the start() method of MyResource to notify the waiting thread that the object has been released. 

```java
MyThread is entering waitFor().
..........MyThread resuming execution.
```

## The join() method

The non-static join() method of class Thread lets one thread "join onto the end" of another thread. If you have a thread B that can't do its work until another thread A has completed its work, then you want thread B to "join" thread A. This means that thread B will not become runnable until A has finished (and entered the dead state).

```java
Thread t = new Thread();
t.start();
t.join();
```

The preceding code takes the currently running thread (if this were in the main() method, then that would be the main thread) and joins it to the end of the thread referenced by t. This blocks the current thread from becoming runnable until after the thread referenced by t is no longer alive. In other words, the code t.join() means "Join me (the current thread) to the end of t, so that t must finish before I (the current thread) can run again."

```java
class MyThread implements Runnable {
  int count;

  MyThread() {
    count = 0;
  }

  public void run() {
    System.out.println("MyThread starting.");
    try {
      do {
        Thread.sleep(500);
        System.out.println("In MyThread, count is " + count);
        count++;
      } while (count < 6);
    } catch (InterruptedException exc) {
      System.out.println("MyThread interrupted.");
    }
    System.out.println("MyThread terminating.");
  }
}

public class Main {
  public static void main(String args[]) {
    System.out.println("Main thread starting.");
    Thread thrd = new Thread(new MyThread());
    thrd.start();
    try {
      thrd.join();
    } catch (InterruptedException exc) {
      System.out.println("Main thread interrupted.");
    }
    System.out.println("Main thread ending.");
  }
}
```

In this above code we are joining the thread thrd to the main thread, telling the main thread to wait for thrd thread to complete and then proceed.

```text
Main thread starting.
MyThread starting.
In MyThread, count is 0
In MyThread, count is 1
In MyThread, count is 2
In MyThread, count is 3
In MyThread, count is 4
In MyThread, count is 5
MyThread terminating.
Main thread ending.
```

```text
Thread 1: locked resource 1
Thread 2: locked resource 2
```

In the above program, we have two resources, resource1 and resource2. We create two different threads, t1 and t2. In t1 thread we have locked the resource1 and wait for 50 milliseconds and then we are trying to lock resource2. Where as in t2 we have locked resource2 first and then we are trying to lock resource1. So now we have a problem t1 will try to capture resource which is already locked by t2, hence it will wait for resource2 to be released. Whereas t2 has locked the resource2 and t2 is waiting for the resource1 to be released. So none of the two threads can move forward hence we call that the two threads are in deadlock condition.
























