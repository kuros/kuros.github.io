---
title: Configuring Preconditions
date: 2019-01-16
description: Handling triggers is a difficult job when you are dealing with data generation.  
author_staff_member: rohit
---

You have two independent tables having no relationship between them, but you still want to create them in specific orders. To enforce order during the creation you can add preconditions to jpa context factory.

Let us say you want Account entity to be created before Person entity, although Person doesn't have a direct relationship with Account

```java
final JPAContextFactory jpaContextFactory 
    = JPAContextFactory.newInstance(Database.MY_SQL, persistenceService.getEntityManager());

jpaContextFactory.withPreconditions(Before.of(Person.class).create(Account.class));
```

**Note: This is a system level configuration, Random-JPA would try to adjust order but skips if it's in direct conflict with foreign key relationship**