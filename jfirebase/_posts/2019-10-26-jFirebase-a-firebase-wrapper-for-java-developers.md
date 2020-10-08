---
title: jFirebase - Entity Framework for Firebase/Firestore
date: 2019-10-26
description: A framework designed to help java developers to work with firebase

author_staff_member: rohit
---

I decided to tryout firebase for my personal projects & learning, having come from traditional SQL background, I am well versed with JPA/Hibernate when dealing with databases. But when I started firebase, I found it completely different but also having some similarities. After spending some time understanding its feature I started looking a framework similar to JPA for firebase. I found none, so I decided to write one for myself.

[Github Source - jFirebase](https://github.com/kuros/jFirebase)

# Initialise

Add Maven dependency:
```xml
        <dependency>
            <groupId>in.kuros</groupId>
            <artifactId>jFirebase</artifactId>
            <version>0.1</version> <!-- Use the latest version-->
        </dependency>
```

Use the` PersistenceServiceFactory` to generate instance of `PersistenceService`, we need pass firestore instance and provide a list of packages where your entities reside. 

```java
// initialise with firestore & base package
final PersistenceService persistenceService = PersistenceServiceFactory.create(firestore, "in.kuros.jfirebase.demo.entity");
``` 

Now that we have initialized our persistence service we will start creating our entities to work with.

# Entity
We will use a simple pojo class and convert it into an jFirebase Entity by providing `@Entity`, you will also need to provide `@Id` field.

Currently only String & Enum are supported as Id field.

```java

package in.kuros.jfirebase.demo.entity;

import in.kuros.jfirebase.entity.CreateTime;
import in.kuros.jfirebase.entity.Entity;
import in.kuros.jfirebase.entity.Id;
import in.kuros.jfirebase.entity.UpdateTime;
import lombok.Data;

import java.util.Date;

@Data
@Entity("person")
public class Person {

    @Id
    private String personId;
    private String name;

    @CreateTime
    private Date created;
    @UpdateTime
    private Date lastModified;
}
```

We can also mark Date field for `@CreateTime` & `@UpdateTime` to record creation time & update time implicitly.

# Metadata
We will also need to create metadata class to record field description for the corresponding class.

```java
package in.kuros.jfirebase.demo.entity;

import in.kuros.jfirebase.metadata.Attribute;
import in.kuros.jfirebase.metadata.Metadata;

import java.util.Date;

@Metadata(Person.class)
public class Person_ {

    public static volatile Attribute<Person, String> personId;
    public static volatile Attribute<Person, String> name;
    public static volatile Attribute<Person, Date> created;
    public static volatile Attribute<Person, Date> lastModified;
}
```

Annotate the class with `@Metadata` and create `Attribute` field for all the corresponding fields on main class.
 
Our setup is almost done, lets create our first object using persistenceService.

# Creating object

To create a new entry in database use _create_ method. It will auto generate Id & createTime will be updated.

```java
    public void createPersonExample() {
        final Person p = new Person();
        p.setName("Rohit");

        persistenceService.create(p);

        System.out.println(p.getPersonId());
    }
```
{% include ad %}

<img alt="jfirebase-create" src="/images/loader.gif" data-src="/images/2019/jfirebase/create.png" class="lazy img-center"/>

# Creating object with id

You can create entities with custom ids.

```java
    public void createPersonWithCustomIdExample() {
        final Person p = new Person();
        p.setPersonId("1");
        p.setName("Rohit");

        persistenceService.create(p);

        System.out.println(p.getPersonId());
    }
```

<img alt="jfirebase-create" src="/images/loader.gif" data-src="/images/2019/jfirebase/create-id.png" class="lazy img-center"/>

**Note: Create method will throw exception if entity with id already exists.**

# Update/Silent create

Use _set_ method to create/update entity silently, ie. if entity exists, it will be updated else a new entry will be created.

```java
    public void updatePersonExample() {
        final Person p = new Person();
        p.setPersonId("1"); // optional if you want to create a new entry
        p.setName("Rohit");

        persistenceService.set(p);

        System.out.println(p.getPersonId());
    }
```

The set(entity) would update the complete entity.

# Updating field

Let's say I want to update age of person. We need to provide entity with id and age field populated (in this case personId is a requiredField). 
```java
    public void updateField() {
        final Person p = new Person();
        p.setPersonId("1"); // optional if you want to create a new entry
        p.setAge(20);

        persistenceService.set(p, Person_.age);
    }
```

If id field is provided, given field will be updated else a new entry is created.

<img alt="jfirebase-set" src="/images/loader.gif" data-src="/images/2019/jfirebase/set.png" class="lazy img-center"/>

# Updating multiple fields

We can update multiple fields, Use `AttributeValue`

```java
    public void updateMultipleFields() {
        persistenceService.set(AttributeValue.with(Person_.personId, "1")
                .with(Person_.name, "I changed my name")
                .with(Person_.age, 25)
                .build());
    }
```
{% include ad %}

<img alt="jfirebase-set" src="/images/loader.gif" data-src="/images/2019/jfirebase/set-multiple.png" class="lazy img-center"/>

# Working with Sub Collection

Let's say you want to map sub collection, you need to create a pojo with parent id reference.

```java
package in.kuros.jfirebase.demo.entity;

import in.kuros.jfirebase.entity.Entity;
import in.kuros.jfirebase.entity.Id;
import in.kuros.jfirebase.entity.IdReference;
import in.kuros.jfirebase.entity.Parent;
import in.kuros.jfirebase.entity.UpdateTime;

import java.util.Date;
import java.util.Map;

@Entity("employee")
public class Employee {

    @Id
    private String employeeId;

    @Parent
    @IdReference(Person.class)
    private String personId;

    private Date joiningDate;
    private Integer salary;
    private Map<String, String> phoneNumbers;

    @UpdateTime
    private Date modifiedDate;
}
```

Here we are using `@Parent` with `@IdReference` to map parent information.

Also note, to save phone numbers we are using a map. Its corresponding Metadata class will be:

```java
package in.kuros.jfirebase.demo.entity;

import in.kuros.jfirebase.entity.Entity;
import in.kuros.jfirebase.metadata.Attribute;
import in.kuros.jfirebase.metadata.MapAttribute;
import in.kuros.jfirebase.metadata.Metadata;

import java.util.Date;

@Metadata(Employee.class)
public class Employee_ {

    public static volatile Attribute<Employee, String> employeeId;
    public static volatile Attribute<Employee, String> personId;
    public static volatile Attribute<Employee, Date> joiningDate;
    public static volatile Attribute<Employee, Integer> salary;
    public static volatile MapAttribute<Employee, String, String> phoneNumbers;
    public static volatile Attribute<Employee, Date> modifiedDate;

}
```

Now to create a Employee entry within Person collection, simply create Employee object with person reference.
Note that for phoneNumbers we are using `MapAttribute`.

```java
    public void createSubCollection() {
        final Employee employee = new Employee();
        employee.setEmployeeId("123"); // Optional if you want custom id
        employee.setPersonId("1");
        employee.setJoiningDate(new Date());
        employee.setSalary(5000);

        final Map<String, String> phoneNumbers = new HashMap<>();
        phoneNumbers.put("office", "123-345-567");
        phoneNumbers.put("home", "456-789-456");
        employee.setPhoneNumbers(phoneNumbers);

        persistenceService.create(employee);
    }
```
{% include ad-h %}

<img alt="jfirebase-sub-collection" src="/images/loader.gif" data-src="/images/2019/jfirebase/sub-collection.png" class="lazy img-center"/>

# Update Map values

Let's say we want to update specific value in a map (home phone number).

```java
    public void updateMapUsingKeyValue() {
        persistenceService.set(AttributeValue
                .with(Employee_.employeeId, "123") // Required field
                .with(Employee_.personId, "1") // Required field
                .with(Employee_.phoneNumbers, "home", "111-111-111")
                .build());
    }
```

<img alt="jfirebase-map-key" src="/images/loader.gif" data-src="/images/2019/jfirebase/set-map-key.png" class="lazy img-center"/>

or we can completely replace the map - update all the phone numbers

```java
    public void updateCompleteMapValues() {
        final Map<String, String> phoneNumbers = new HashMap<>();
        phoneNumbers.put("office", "123-345-XXX");
        phoneNumbers.put("home", "456-789-XXX");

        persistenceService.set(AttributeValue
                .with(Employee_.employeeId, "123") // Required field
                .with(Employee_.personId, "1") // Required field
                .with(Employee_.phoneNumbers, phoneNumbers)
                .build());
    }
```

<img alt="jfirebase-map" src="/images/loader.gif" data-src="/images/2019/jfirebase/set-map.png" class="lazy img-center"/>


# Removing Fields
In order to delete just a field from the entry, Use: 
```java
    public void removeFields() {
        persistenceService.remove(RemoveAttribute.withKeys(Employee_.personId, "1")
                .withKey(Employee_.employeeId, "123")
                .remove(Employee_.salary)
                .removeMapKey(Employee_.phoneNumbers, "home"));
    }
``` 
Here we have deleted salary field and an entry of 'home' from phone numbers.

<img alt="jfirebase-map" src="/images/loader.gif" data-src="/images/2019/jfirebase/remove.png" class="lazy img-center"/>

# Delete Record

To delete a complete record:

```java
    public void deleteCompleteRecord() {
        final Employee employee = new Employee();
        employee.setEmployeeId("123");
        employee.setPersonId("1");
        persistenceService.delete(employee);
    }
```
You need to populate required id fields.

<img alt="jfirebase-map" src="/images/loader.gif" data-src="/images/2019/jfirebase/delete.png" class="lazy img-center"/>

# Query

To query you need to provide classes in order.

Let's say you want to find all the employee with salary greater than 1000.
```java
    public void query() {
        final List<Employee> employees = persistenceService
                .find(QueryBuilder
                        .collection(Person.class)
                        .withId("1")
                        .subCollection(Employee.class)
                        .whereGreaterThan(Employee_.salary, 1000));
        employees
                .forEach(System.out::println);
    }
```
{% include ad %}

```bash
Employee(employeeId=123, personId=1, joiningDate=Sun Oct 27 02:39:43 IST 2019, salary=5000, phoneNumbers={office=123-345-567, home=456-789-456}, modifiedDate=Sun Oct 27 02:39:43 IST 2019)
```

# Find by Id

To find a record by Id:
```java
    public void queryFindById() {
        final Employee employee = persistenceService
                .findById(QueryBuilder
                        .collection(Person.class)
                        .withId("1")
                        .subCollection(Employee.class)
                        .withId("123"));
    }
```

Provide the full path to fetch item by id.

# Select few fields
 
Let's say you want to fetch only salaries of all the employees:
```java
    public void querySelectedFields() {
        final List<Employee> employees = persistenceService
                .find(QueryBuilder
                        .collection(Person.class)
                        .withId("1")
                        .subCollection(Employee.class)
                        .select(Employee_.employeeId, Employee_.salary));

        employees.forEach(System.out::println);

    }
```

```bash
Employee(employeeId=123, personId=null, joiningDate=null, salary=5000, phoneNumbers=null, modifiedDate=null)
```

# Running queries in Transaction

You can run the transaction and execute multiple queries in it.

```java
    public void runTransactionExample() {
        final List<Employee> updatedEmployees = persistenceService.runTransaction(
            transaction -> {
                final List<Employee> employees = transaction.get(QueryBuilder
                        .collection(Person.class)
                        .withId("1")
                        .subCollection(Employee.class));
    
                employees.stream()
                        .peek(emp -> emp.setSalary(6000))
                        .forEach(transaction::set);
                return employees;
        });

        updatedEmployees
                .forEach(System.out::println);
    }
```

```bash
Employee(employeeId=123, personId=1, joiningDate=Sun Oct 27 02:44:21 IST 2019, salary=6000, phoneNumbers={office=123-345-567, home=456-789-456}, modifiedDate=Sun Oct 27 02:54:21 IST 2019)
```

# Batching 

You can batch multiple statements and commit them at once.

```java
    public void runBatchExample() {
            persistenceService.writeInBatch(writeBatch -> {
                writeBatch.set(AttributeValue
                        .with(Person_.personId, "2") // Required field
                        .with(Person_.name, "Jon") // Required field
                        .with(Person_.age, 25)
                        .build());
    
                writeBatch.set(AttributeValue
                        .with(Employee_.employeeId, "123") // Required field
                        .with(Employee_.personId, "2") // Required field
                        .with(Employee_.phoneNumbers, "home", "222-222-222")
                        .build());
            });
        }
``` 

You can find the code example [here](https://github.com/kuros/jFirebase/tree/master/demo)


