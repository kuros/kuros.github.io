---
title: Random-JPA Integration
date: 2019-01-21
description: Using Random-JPA to create a simple test data.
image: https://source.unsplash.com/random/1200x900
author_staff_member: rohit
toc: true
---

As we have already setup an application, we will go ahead to add latest random-JPA dependency [![Maven Central](https://img.shields.io/maven-central/v/com.github.kuros/random-jpa.svg?label=Maven%20Central)](https://search.maven.org/search?q=g:%22com.github.kuros%22%20AND%20a:%22random-jpa%22)

Just add the dependency to your pom.xml, at the time writing this article latest version is 1.0.3
```xml
        <dependency>
            <groupId>com.github.kuros</groupId>
            <artifactId>random-jpa</artifactId>
            <version>1.0.3</version>
            <scope>test</scope>
        </dependency>
```

## Problem Statement
Let's say we want to write a query to **fetch the latest salaries each employee**.

Schema relation:

<img alt="Employee Salary Relation ship" src="/images/rjpa/salaries.webp" lazyload width="300px"/>

So our sql query will look like this:
```sql
select *
from salaries s where not exists(select 1 from salaries s2 where s.emp_no = s2.emp_no and s.from_date < s2.from_date and s.to_date < s2.to_date );
```

{% include ad %}

| id | emp_no | salary | from_date | to_date |
| :--: | :--: | :--: |  :--: |  :--: | 
| 3 | 10001 | 88958 | 2002-06-22 | 9999-01-01 |
| 6 | 10002 | 72527 | 2001-08-02 | 9999-01-01 |
| 8 | 10003 | 43311 | 2001-12-01 | 9999-01-01 |
| 12 | 10004 | 74057 | 2001-11-27 | 9999-01-01 |
| 14 | 10005 | 59755 | 2001-08-02 | 9999-01-01 |


## Adding JPA Repository
```java
package in.kuros.randomjpa.blogexample.repository;

import in.kuros.randomjpa.blogexample.entity.Salary;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

import java.util.List;

@RepositoryRestResource(collectionResourceRel = "salary", path = "salary")
public interface SalaryRepository extends PagingAndSortingRepository<Salary, Integer> {

    @RestResource(path = "latest")
    @Query("FROM Salary s WHERE NOT EXISTS (select 1 FROM Salary s2 WHERE s.employeeId = s2.employeeId and s2.fromDate < s.fromDate and s2.toDate < s.toDate) ")
    List<Salary> findLatestSalaries();
}
```

Now we access the service using the endpoint

```text
http://localhost:8080/salary/search/latest
```

you will get response as:
```json
{
  "_embedded" : {
    "salary" : [ {
      "employeeId" : 10001,
      "salary" : 85112,
      "fromDate" : "2000-06-22",
      "toDate" : "2001-06-22",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/salary/1"
        },
        "salaries" : {
          "href" : "http://localhost:8080/salary/1"
        }
      }
    }, {
      "employeeId" : 10002,
      "salary" : 69366,
      "fromDate" : "1999-08-03",
      "toDate" : "2000-08-02",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/salary/4"
        },
        "salaries" : {
          "href" : "http://localhost:8080/salary/4"
        }
      }
    }, {
      "employeeId" : 10003,
      "salary" : 43699,
      "fromDate" : "2000-12-01",
      "toDate" : "2001-12-01",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/salary/7"
        },
        "salaries" : {
          "href" : "http://localhost:8080/salary/7"
        }
      }
    }, {
      "employeeId" : 10004,
      "salary" : 67096,
      "fromDate" : "1998-11-28",
      "toDate" : "1999-11-28",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/salary/9"
        },
        "salaries" : {
          "href" : "http://localhost:8080/salary/9"
        }
      }
    }, {
      "employeeId" : 10005,
      "salary" : 60098,
      "fromDate" : "2000-08-02",
      "toDate" : "2001-08-02",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/salary/13"
        },
        "salaries" : {
          "href" : "http://localhost:8080/salary/13"
        }
      }
    } ]
  },
  "_links" : {
    "self" : {
      "href" : "http://localhost:8080/salary/search/latest"
    }
  }
}
```

**But something is wrong**, this endpoint is returning incorrect values, eg. Employee 10001 has salary as **85112** but as per our earlier query it should be **88958**.

{% include ad %}
There is a bug in our query, that's why we need integration tests to validate our queries.

## Time to write test

Earlier we had mainly two option either we had fixed employee data backup against which the test suite runs, but there were high chances that the data corruption leading to test failures.

Or, developer maintains test fixtures responsible for creating relevant data, but maintaining relationship was the real pain.

## Random-JPA in Action

Lets start by writing a simple test

```java
package in.kuros.randomjpa.blogexample.repository;

import com.github.kuros.random.jpa.Database;
import com.github.kuros.random.jpa.JPAContext;
import com.github.kuros.random.jpa.JPAContextFactory;
import com.github.kuros.random.jpa.persistor.model.ResultMap;
import com.github.kuros.random.jpa.types.Entity;
import in.kuros.randomjpa.blogexample.entity.Salary;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SalaryRepositoryTest {

    @Autowired private EntityManager entityManager;
    @Autowired private SalaryRepository salaryRepository;

    @Test @Transactional
    public void shouldTestForFetchingSalaryRecordForOnlyOneEntry() {
        final JPAContext jpaContext = JPAContextFactory.newInstance(Database.MY_SQL, entityManager)
                .generate();

        final ResultMap resultMap = jpaContext.createAndPersist(Entity.of(Salary.class));
        resultMap.print(System.out::println);

        final Salary salary = resultMap.get(Salary.class);

        final List<Salary> latestSalaries = salaryRepository.findLatestSalaries();

        final Optional<Salary> result = latestSalaries
                .stream()
                .filter(sal -> sal.getId().equals(salary.getId())).findFirst();

        Assert.assertTrue(result.isPresent());
        Assert.assertEquals(salary.getSalary(), result.get().getSalary());
        Assert.assertEquals(salary.getFromDate(), result.get().getFromDate());
        Assert.assertEquals(salary.getToDate(), result.get().getToDate());
    }
}
```
The test passed and it prints below output:
```text
└── *ROOT*
    └── in.kuros.randomjpa.blogexample.entity.Employees|0 [empNo: 10016]
        └── in.kuros.randomjpa.blogexample.entity.Salaries|0 [id: 15]
```

{% include ad %}

## Understanding test components

In the first line of test
```java
final JPAContext jpaContext = JPAContextFactory.newInstance(Database.MY_SQL, entityManager)
                .generate();
``` 
We generated JPAContext using the factory, we provided the database type (in this case MySQL) and the entity manager.

next we told jpaContext to create an entry for Salary
```java
final ResultMap resultMap = jpaContext.createAndPersist(Entity.of(Salaries.class));
```

Just for auditing/debugging purpose, we printed the hierarchy created by
```java
resultMap.print(System.out::println);
```
which prints
```text
└── *ROOT*
    └── in.kuros.randomjpa.blogexample.entity.Employees|0 [empNo: 10016]
        └── in.kuros.randomjpa.blogexample.entity.Salaries|0 [id: 15]
```
Under the hood, random-jpa has created new employee (id: 10016) & salary (id: 15) record for respective employee.

Once the record is created, random-jpa returns a resultMap which consist of all the entities which has been created, to access the entity you simply get from result map
```java
final Salary salary = resultMap.get(Salary.class);
```

And you can use this test data for writing your tests.




