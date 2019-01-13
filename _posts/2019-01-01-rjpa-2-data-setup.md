---
title: Setup database & spring boot application
date: 2019-01-1
description: We are going to setup a simple spring boot application
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
category: random-jpa
tag:
 - spring-boot
 - spring-data-jpa
 - spring-data-rest
---

Before we start with Random-JPA, we need to simulate an application. I will be creating a simple spring boot application using MySql as my database for this purpose.

For this tutorial I will be using sample database of employees. I have created a [script](https://github.com/kuros/random-jpa-example/blob/master/database/script.sql) to get you started.

Option 1: use the script to create the employees database.
```bash
$ mysql -t script.sql
```

Option 2: user docker image to run mysql (you need to have [docker](https://docs.docker.com/) installed on your system)
```bash
$ git clone https://github.com/kuros/random-jpa-example.git
$ cd random-jpa-example/database
$ docker-compose up
```

I personal favorite is option 2, it keeps my system free of unnecessary installations and its very easy to use.

## MySQL Sample Database Schema
The MySQL sample database schema consists of the following tables:
- **Employees**: stores employee's data.
- **Departments**: stores department details. 
- **dept_manager**: store manager of each department.
- **dept_emp**: store employees under each department.
- **titles**: store the titles of each employee.
- **salaries**: store the salaries of each employee.
- **customer**: store customer's data.
- **play_group**: store the list of play groups. (both employee & external customers can join the group).
- **play_group_member**: store the list of member for each group.

<img alt="Comment-4" src="/images/rjpa/employees.webp" lazyload width="100%"/>

## Download base application
Ok, so now we have our data setup. Lets create an spring boot application, you can find the base application at [random-jpa-example](https://github.com/kuros/random-jpa-example/tree/bf119ccec3a026211172a906dd8c5e82dc16b634)
Till now we have only added entity mapping.

## Create Employee Repository
Next step is to add a repository to access data, for now we will just add repository for Employee

Creating spring data repository for entity is very easy, you just need to extend Repository interface. Here we are using PagingAndSortingRepository, you just need to specify Entity and Id type and you are done. 
```java
public interface EmployeeRepository extends PagingAndSortingRepository<Employees, Integer> {
}
```

Next we want to expose the data through rest endpoint, so will will user spring-data-rest here by adding **@RepositoryRestResource** annotation to our repository.
so our repository looks like

```java
package in.kuros.randomjpa.blogexample.repository;

import in.kuros.randomjpa.blogexample.entity.Employees;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(collectionResourceRel = "employee", path = "employee")
public interface EmployeeRepository extends PagingAndSortingRepository<Employees, Integer> {
}
```

Your base application is ready to serve data, just start the application and hit the endpoint
```text
http://localhost:8080/employee
```
you will get this response on your browser
```text
{
  "_embedded" : {
    "employee" : [ ]
  },
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/employee{?page,size,sort}",
      "templated" : true
    },
    "profile" : {
      "href" : "http://localhost:8080/profile/employee"
    }
  },
  "page" : {
    "size" : 20,
    "totalElements" : 0,
    "totalPages" : 0,
    "number" : 0
  }
}
```

Congrats you have your first app running. 
[View latest code](https://github.com/kuros/random-jpa-example/tree/955b8944aa59cf307aaa3d642cc74ef5c908ca2c)

Now as have a base application to work with, we can proceed with exploring random-JPA.


 