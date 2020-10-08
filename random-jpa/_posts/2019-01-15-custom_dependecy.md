    ---
title: Adding custom dependency in Random-JPA
date: 2019-01-15
description: Creating missing relationship between entities. 
author_staff_member: rohit
---

There are many systems which doesn't have proper foreign key relationship. In order to create relationship with other entities, random-jpa provides dependencies to be added to JPAContextFactory. Based on these provided custom dependencies and foreign key relationship, a JPAContext is created.

Let us continue with our application, suppose application want to maintain an audit trail of all the inventories ordered by an employee. But there is **no foreign key relationship** between the tables.


## Problem statement
I want to create new EmployeeInventoryAudit entries for a customer. So during my complete application lifcycle, EmployeeInventoryAudit depends on Employee, but there is no foreign key relationship in table so random-JPA will not be able to derive this relationship automatically.

We will have to provide custom dependency at the application level(random-JPA also provides test level dependency as softLinks);

## Table setup
Add Table:
```sql
CREATE TABLE employee_inventory_audit (
    id           INT             NOT NULL AUTO_INCREMENT,
    emp_no      INT             NOT NULL,
    inventory   VARCHAR(40)     NOT NULL,
    quantity   INT     NOT NULL,
    PRIMARY KEY (id)
);
``` 
Entity:
```java
@Entity
@Table(name = "employee_inventory_audit")
public class EmployeeInventoryAudit {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Basic
    @Column(name = "emp_no")
    private Integer employeeNumber;

    @Basic
    @Column(name = "inventory")
    private String inventory;

    @Basic
    @Column(name = "quantity")
    private Integer quantity;

    @Basic
    @Column(name = "purchase_date")
    private LocalDate purchaseDate;

    // Getter & Setter        
}
```

{% include ad %}

And static meta model:
```java
@StaticMetamodel(EmployeeInventoryAudit.class)
public class EmployeeInventoryAudit_ {

    public static volatile SingularAttribute<EmployeeInventoryAudit, Integer> id;
    public static volatile SingularAttribute<EmployeeInventoryAudit, Integer> employeeNumber;
    public static volatile SingularAttribute<EmployeeInventoryAudit, String> inventory;
    public static volatile SingularAttribute<EmployeeInventoryAudit, Integer> quantity;
    public static volatile SingularAttribute<EmployeeInventoryAudit, LocalDate> purchaseDate;

}
```

## Adding custom dependency in Random-JPA

So as per the business logic, employeeNumber attribute of EmployeeInventoryAudit depends on employee's customerNumber.

And we will tell the same thing to Random-JPA context factory while creating jpaContext.

```java
    final Dependencies dependencies = Dependencies.newInstance();
    dependencies.withLink(Link.newLink(EmployeeInventoryAudit_.employeeNumber, Employee_.empNo));
    
    final JPAContext jpaContext = JPAContextFactory
                    .newInstance(Database.MY_SQL, entityManager)
                    .with(dependencies)
                    .generate();
```

Now if you generate EmployeeInventoryAudit using JPAContext:

```java
    @Test @Transactional
    public void createEmployeeInventoryAudit() {

        final ResultMap resultMap = jpaContext.createAndPersist(Entity.of(EmployeeInventoryAudit.class));

        resultMap.print(System.out::println);

    }
``` 
It would create employee followed by employee_inventory_audit.
```text
└── *ROOT*
    └── in.kuros.randomjpa.blogexample.entity.Employee|0 [empNo: 10023]
        └── in.kuros.randomjpa.blogexample.entity.EmployeeInventoryAudit|0 [id: 1]
``` 

It behaves same as if employee_inventory_audit(emp_no) has foreign key to employees(emp_no) table.

{% include ad %}

Complete configuration
```java
@Configuration
public class TestConfig {

    @Autowired private EntityManager entityManager;

    @Bean
    public JPAContext createJpaContext() {
        return JPAContextFactory
                .newInstance(Database.MY_SQL, entityManager)
                .with(getDependencies())
                .generate();
    }

    private Dependencies getDependencies() {
        final Dependencies dependencies = Dependencies.newInstance();
        dependencies.withLink(Link.newLink(EmployeeInventoryAudit_.employeeNumber, Employee_.empNo));

        return dependencies;
    }
}
```
 
checkout the [Commit History](https://github.com/kuros/random-jpa-example/commit/38c9be8692f032914bc41e7e6094da7e883ca499) on github