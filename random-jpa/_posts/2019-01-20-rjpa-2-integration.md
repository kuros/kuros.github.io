---
title: Random-JPA Integration (Contd.)
date: 2019-01-20
description: Writing a more complex data setup
author_staff_member: rohit
toc: true
---

In my previous post, we have written a jpa query to fetch latest salary of employees but there was an error in response, so we are first writing a failing tests to capture the error and then we will fix the bug.

Before we proceed with the new test, lets create a [StaticMetaModel](https://docs.oracle.com/javaee/6/tutorial/doc/gjiup.html).

```java
package in.kuros.randomjpa.blogexample.entity;

import javax.persistence.metamodel.SingularAttribute;
import javax.persistence.metamodel.StaticMetamodel;
import java.time.LocalDate;

@StaticMetamodel(Salary.class)
public class Salary_ {

    public static volatile SingularAttribute<Salary, Integer> id;
    public static volatile SingularAttribute<Salary, Integer> employeeId;
    public static volatile SingularAttribute<Salary, Integer> salary;
    public static volatile SingularAttribute<Salary, LocalDate> fromDate;
    public static volatile SingularAttribute<Salary, LocalDate> toDate;

}
``` 

It's time to test our query with more intensive data. In this scenario, we want to create two salary records for a given employee with custom from and to dates, and fetch his latest salary.

```java
    @Test @Transactional
    public void shouldTestToFetchLatestSalaryRecordForMultipleEntry() {
        final JPAContext jpaContext = JPAContextFactory.newInstance(Database.MY_SQL, entityManager)
                .generate();

        final LocalDate oldFromDate = LocalDate.now().minusDays(2);
        final LocalDate oldToDate = LocalDate.now().minusDays(1);

        final LocalDate newFromDate = LocalDate.now();
        final LocalDate newToDate = LocalDate.now().plusDays(1);


        final ResultMap resultMap = jpaContext.createAndPersist(
                Entity.of(Salary.class, 2)
                        .with(0, Salary_.fromDate, oldFromDate)
                        .with(0, Salary_.toDate, oldToDate)
                        .with(1, Salary_.fromDate, newFromDate)
                        .with(1, Salary_.toDate, newToDate));

        resultMap.print(System.out::println); //just for debugging

        final Salary salary1 = resultMap.get(Salary.class, 0);
        final Salary salary2 = resultMap.get(Salary.class, 1);

        final List<Salary> latestSalaries = salaryRepository.findLatestSalaries();

        final Optional<Salary> result = latestSalaries
                .stream()
                .filter(sal -> sal.getEmployeeId().equals(salary1.getEmployeeId())).findFirst();

        Assert.assertTrue(result.isPresent());

        Assert.assertEquals("The salary id should match with latest salary", salary2.getId(), result.get().getId());
        Assert.assertEquals(salary2.getSalary(), result.get().getSalary());
        Assert.assertEquals(salary2.getFromDate(), result.get().getFromDate());
        Assert.assertEquals(salary2.getToDate(), result.get().getToDate());
    }
```
And when you run the test it fails
```text
└── *ROOT*
    └── in.kuros.randomjpa.blogexample.entity.Employee|0 [empNo: 10019]
        ├── in.kuros.randomjpa.blogexample.entity.Salary|0 [id: 19]
        └── in.kuros.randomjpa.blogexample.entity.Salary|1 [id: 20]



java.lang.AssertionError: The salary id should match with latest salary 
Expected :20
Actual   :19
 <Click to see difference>


	at org.junit.Assert.fail(Assert.java:88)
	at org.junit.Assert.failNotEquals(Assert.java:834)
	at org.junit.Assert.assertEquals(Assert.java:118)
	at in.kuros.randomjpa.blogexample.repository.SalaryRepositoryTest.shouldTestToFetchLatestSalaryRecordForMultipleEntry(SalaryRepositoryTest.java:84)
	at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
	at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
	at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	at java.lang.reflect.Method.invoke(Method.java:498)
	at org.junit.runners.model.FrameworkMethod$1.runReflectiveCall(FrameworkMethod.java:50)
	at org.junit.internal.runners.model.ReflectiveCallable.run(ReflectiveCallable.java:12)
	at org.junit.runners.model.FrameworkMethod.invokeExplosively(FrameworkMethod.java:47)
	at org.junit.internal.runners.statements.InvokeMethod.evaluate(InvokeMethod.java:17)
	at org.springframework.test.context.junit4.statements.RunBeforeTestExecutionCallbacks.evaluate(RunBeforeTestExecutionCallbacks.java:74)
	at org.springframework.test.context.junit4.statements.RunAfterTestExecutionCallbacks.evaluate(RunAfterTestExecutionCallbacks.java:84)
	at org.springframework.test.context.junit4.statements.RunBeforeTestMethodCallbacks.evaluate(RunBeforeTestMethodCallbacks.java:75)
	at org.springframework.test.context.junit4.statements.RunAfterTestMethodCallbacks.evaluate(RunAfterTestMethodCallbacks.java:86)
	at org.springframework.test.context.junit4.statements.SpringRepeat.evaluate(SpringRepeat.java:84)
	at org.junit.runners.ParentRunner.runLeaf(ParentRunner.java:325)
	at org.springframework.test.context.junit4.SpringJUnit4ClassRunner.runChild(SpringJUnit4ClassRunner.java:251)
	at org.springframework.test.context.junit4.SpringJUnit4ClassRunner.runChild(SpringJUnit4ClassRunner.java:97)
	at org.junit.runners.ParentRunner$3.run(ParentRunner.java:290)
	at org.junit.runners.ParentRunner$1.schedule(ParentRunner.java:71)
	at org.junit.runners.ParentRunner.runChildren(ParentRunner.java:288)
	at org.junit.runners.ParentRunner.access$000(ParentRunner.java:58)
	at org.junit.runners.ParentRunner$2.evaluate(ParentRunner.java:268)
	at org.springframework.test.context.junit4.statements.RunBeforeTestClassCallbacks.evaluate(RunBeforeTestClassCallbacks.java:61)
	at org.springframework.test.context.junit4.statements.RunAfterTestClassCallbacks.evaluate(RunAfterTestClassCallbacks.java:70)
	at org.junit.runners.ParentRunner.run(ParentRunner.java:363)
	at org.springframework.test.context.junit4.SpringJUnit4ClassRunner.run(SpringJUnit4ClassRunner.java:190)
	at org.junit.runner.JUnitCore.run(JUnitCore.java:137)
	at com.intellij.junit4.JUnit4IdeaTestRunner.startRunnerWithArgs(JUnit4IdeaTestRunner.java:68)
	at com.intellij.rt.execution.junit.IdeaTestRunner$Repeater.startRunnerWithArgs(IdeaTestRunner.java:47)
	at com.intellij.rt.execution.junit.JUnitStarter.prepareStreamsAndStart(JUnitStarter.java:242)
	at com.intellij.rt.execution.junit.JUnitStarter.main(JUnitStarter.java:70)
```

So now we have a failing test, but before we move to fixing our query let's understand the syntax.
{% include ad %}
## Test Breakdown
Our aim was to create two salaries for 1 employee with different date ranges:

```java
final ResultMap resultMap = jpaContext.createAndPersist(
                Entity.of(Salary.class, 2)
                        .with(0, Salary_.fromDate, oldFromDate)
                        .with(0, Salary_.toDate, oldToDate)
                        .with(1, Salary_.fromDate, newFromDate)
                        .with(1, Salary_.toDate, newToDate));
```

Here we told random-JPA to create 2 copies of Salary, in the background it determined its parent structure and created two rows Salary object. 
Also you are providing custom values of each attributes you want to override, for entity referenced by index of creation order.

So here we are saying we want to set oldFromDate/oldToDate to Salary row 1 & newFromDate/newToDate to salary row 2.

Simple isn't it.

checkout the [Commit History](https://github.com/kuros/random-jpa-example/commit/ba143f36756125c6b7a00b9600b739b4ba7727ac) on github

## Time to fix the test

```java
@RepositoryRestResource(collectionResourceRel = "salary", path = "salary")
public interface SalaryRepository extends PagingAndSortingRepository<Salary, Integer> {

    @RestResource(path = "latest")
    @Query("FROM Salary s WHERE NOT EXISTS (select 1 FROM Salary s2 WHERE s.employeeId = s2.employeeId and s.fromDate < s2.fromDate and s.toDate < s2.toDate) ")
    List<Salary> findLatestSalaries();
}
```

You run the test and it passes. **Hurray !!!**

checkout the [Commit History](https://github.com/kuros/random-jpa-example/commit/c4185eabad25089f5f51383837de4e61cdbd0896) on github

{% include ad %}
## Make JPAContext Singleton

Before we end the tutorial, one important thing remaining.

We should make JPAContext as a singleton object since loading the context is an heavy operation as build an internal hierarchy graph and entity mappings.

In this tutorial we will create JPAContext bean.

```java
import com.github.kuros.random.jpa.Database;
import com.github.kuros.random.jpa.JPAContext;
import com.github.kuros.random.jpa.JPAContextFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.persistence.EntityManager;

@Configuration
public class TestConfig {

    @Autowired private EntityManager entityManager;

    @Bean
    public JPAContext createJpaContext() {
        return JPAContextFactory.newInstance(Database.MY_SQL, entityManager).generate();
    }
}
```

And modified our test to use autowired JPAContext. Now you made sure you are loading JPAContext only once.

{% include ad %}
## Complete Test
```java
package in.kuros.randomjpa.blogexample.repository;

import com.github.kuros.random.jpa.JPAContext;
import com.github.kuros.random.jpa.persistor.model.ResultMap;
import com.github.kuros.random.jpa.types.Entity;
import in.kuros.randomjpa.blogexample.entity.Salary;
import in.kuros.randomjpa.blogexample.entity.Salary_;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SalaryRepositoryTest {

    @Autowired private JPAContext jpaContext;
    @Autowired private SalaryRepository salaryRepository;

    @Test @Transactional
    public void shouldTestForFetchingSalaryRecordForOnlyOneEntry() {

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

    @Test @Transactional
    public void shouldTestToFetchLatestSalaryRecordForMultipleEntry() {

        final LocalDate oldFromDate = LocalDate.now().minusDays(2);
        final LocalDate oldToDate = LocalDate.now().minusDays(1);

        final LocalDate newFromDate = LocalDate.now();
        final LocalDate newToDate = LocalDate.now().plusDays(1);


        final ResultMap resultMap = jpaContext.createAndPersist(
                Entity.of(Salary.class, 2)
                        .with(0, Salary_.fromDate, oldFromDate)
                        .with(0, Salary_.toDate, oldToDate)
                        .with(1, Salary_.fromDate, newFromDate)
                        .with(1, Salary_.toDate, newToDate));

        resultMap.print(System.out::println); //just for debugging

        final Salary salary1 = resultMap.get(Salary.class, 0);
        final Salary salary2 = resultMap.get(Salary.class, 1);

        final List<Salary> latestSalaries = salaryRepository.findLatestSalaries();

        final Optional<Salary> result = latestSalaries
                .stream()
                .filter(sal -> sal.getEmployeeId().equals(salary1.getEmployeeId())).findFirst();

        Assert.assertTrue(result.isPresent());

        Assert.assertEquals("The salary id should match with latest salary", salary2.getId(), result.get().getId());
        Assert.assertEquals(salary2.getSalary(), result.get().getSalary());
        Assert.assertEquals(salary2.getFromDate(), result.get().getFromDate());
        Assert.assertEquals(salary2.getToDate(), result.get().getToDate());
    }
}
``` 

checkout the [Commit History](https://github.com/kuros/random-jpa-example/commit/83efda2d2b9410a662df22c06d8cceb0112804a7) on github



