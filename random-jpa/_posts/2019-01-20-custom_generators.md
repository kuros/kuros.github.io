---
title: Adding custom generator in Random-JPA
date: 2019-01-20
description: Control generation of random data by attribute or type.  
author_staff_member: rohit
---

Random-JPA provides mechanism to configure generation of random values. This can be done by adding custom generator. You need to provide generator to the JPAContextFactory in order to create JPAContext.

```java
    @Bean
    public JPAContext createJpaContext() {
        final Dependencies dependencies = getDependencies();
        final Generator generators = Generator.newInstance();
        
        return JPAContextFactory
                .newInstance(Database.MY_SQL, entityManager)
                .with(generators)
                .with(dependencies)
                .generate();
    }
```

There are two types of generator supported

1. Class Generator
2. Attribute Generator

## Random Class Generator
Add random class generator which controls, how random object is generated for a given class type.

RandomClassGenerator has two methods

```text
getTypes() - List of all the classes for which this generator will be applied.
doGenerate(Class<?> type) - provides method to generate random object, you are provided with a handle of the class for which generation is taking place.
```

Let us say that you want your restrict numerical values to range from 0-10000 system wide, i.e, all random values for type Integer/Long/int/long should be between 0-10000

```java
generator.addClassGenerator(new RandomClassGenerator() {
    @Override
    public Collection<Class<?>> getTypes() {
        final List<Class<?>> classes = Lists.newArrayList();
        classes.add(Integer.class);
        classes.add(Integer.TYPE);
        classes.add(Long.class);
        classes.add(Long.TYPE);
        return classes;
    }

    @Override
    public Object doGenerate(Class<?> aClass) {
        if (aClass == Integer.class || aClass == Integer.TYPE) {
            return RandomUtils.nextInt(10000);    
        }
                    
        return RandomUtils.nextLong(10000);
    }
});
```

{% include ad %}

## Random Attribute Generator
As the name states you can explicitly manage random generation of specific attribute.

RandomAttributeGenerator has two methods

```text
getAttributes() - List of all the attributes for which this generator is applicable.

doGenerate() - how to generate random values.
```

Let us say you want to every Employee's name & Department's name to start with "Test-"

```java
generator.addAttributeGenerator(new RandomAttributeGenerator() {
    @Override
    public List<? extends Attribute> getAttributes() {
        final List<Attribute<?, ?>> attributes = Lists.newArrayList();
        attributes.add(Employee_.firstName);
        attributes.add(Employee_.lastName);
        attributes.add(Department_.deptName);
        return attributes;
    }

    @Override
    public Object doGenerate() {
        return "Test-" + RandomStringUtils.randomAlphanumeric(10);
    }
});
```
{% include ad %}
## Order in which generator is applied

Below is the following order in which generation takes place. If the condition is met, next step is not evaluated.

1. Apply specific value (if provided in Plan).
2. Set null values for attribute (if provided in plan).
3. Apply RandomAttributeGenerator (if available).
4. Apply RandomClassGenerator (if available).
5. Apply default random generator.