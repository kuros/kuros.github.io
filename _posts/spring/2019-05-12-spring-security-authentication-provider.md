---
title: Spring Security with Authentication Provider
date: 2019-04-21
description: Spring gives you facility to customise, how you want to authenticate user. We will look using a custom authentication provider. 
categories:
  - spring
  - spring-security
author_staff_member: rohit
---

We have looked into [basics of spring security]({% link _posts/spring/2019-04-21-spring-security.md %}) in my previous post. Lets look into how we can authenticate a user from custom list;

So let's start, first we create a spring boot application, for database we will use H2.

# Enable Spring Security

In order to enable spring security in any spring application, just add the following dependency in your pom file.

```xml
<!--pom.xml-->

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>

``` 

That's it you have enabled spring security.

{% include ad %}

We want to expose "/books" which is a public api i.e. anyone can access it. We have another set of harry potter books ("/secure/books") which we want to be secured.

```java
// src/main/java/in/kuros/controller/CartController.java

package in.kuros.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class BookController {

    @GetMapping("/books")
    public List<String> getBooks() {
        final List<String> books = new ArrayList<>();
        books.add("A Little Forever");
        books.add("To Kill a Mockingbird");
        books.add("A Thousand Splendid Suns");

        return books;
    }
    
    @GetMapping("/secured/books")
    public List<String> securedBooks() {
        final List<String> books = new ArrayList<>();
        books.add("Harry Potter and the Philosopher's Stone");
        books.add("Harry Potter and the Chamber of Secrets");

        return books;
        
    }
}
```

Now run the application, you see by default, spring has auto configured the security

<img alt="sign-in" src="/images/loader.svg" data-src="/images/2019/spring/sign-in.png" class="lazy img-center img-half"/>

Username is "user" & password to login, will be found in the logs something like this.

```text

Using generated security password: fb610637-e0a6-423b-bb6b-1badf661d885

```
Try logging in.

# Spring security configuration
So far so good, we have security configured, but we still have a problem. Both our apis are behind authentication. But we wanted only one api to be secured.

{% include ad %}

To fix this, we need to crete a config file which extends WebSecurityConfigurerAdapter. We need to override configure method as below.

```java
// src/main/java/in/kuros/config/SecurityConfig.java

package in.kuros.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        http
                .authorizeRequests()
                .antMatchers("/books").permitAll()
                .antMatchers("/secured/*").authenticated();
        http
                .formLogin();
    }
}
```

Great now we have fulfilled our requirement, _/books_ is public and _/secured/books_ are restricted.

Lets look at what happened, we configured httpSecurity to authorize requests and permitted everyone to access _/books_, where for any url starting with _/secured/_ needs to be authenticated.
We have also enforced formLogin() here.


# H2 database setup in spring boot
Before we proceed further, lets enable H2 database to where we will store our user information.

To integrate H2 database, we need to the following dependency in our pom file..

```xml
<!-- pom.xml -->

    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>com.h2database</groupId>
        <artifactId>h2</artifactId>
        <scope>runtime</scope>
    </dependency>
```
We have added dependency to enable JPA with H2 database. Next we will enable h2-console, we will add the property to our application.properties.

```properties
# src/main/resources/application.properties

spring.h2.console.enabled=true
spring.jpa.hibernate.ddl-auto=create
spring.datasource.data=classpath:db/data.sql
spring.jpa.properties.hibernate.enable_lazy_load_no_trans=true
```

Let's start the server, connect to _http://localhost:8080/h2-console_

<img alt="h2-db-login" src="/images/loader.svg" data-src="/images/2019/spring/h2-db-login.png" class="lazy img-center img-half"/>

{% include ad-h %}

user the following properties to login
```properties
driver class=org.h2.Driver
jdbc url=jdbc:h2:mem:testdb
username=sa
password=
```

But the moment you login, you will get an error:

```text
Whitelabel Error Page
This application has no explicit mapping for /error, so you are seeing this as a fallback.

Sun May 12 13:31:45 IST 2019
There was an unexpected error (type=Forbidden, status=403).
Forbidden
```

To fix this, we will add the following configuration in our **SecurityConfig**

```java
        http
                .csrf()
                .disable();

```

After this we are able to login but the page not rendered properly.

<img alt="h2-db-login" src="/images/loader.svg" data-src="/images/2019/spring/h2-db-failed.png" class="lazy img-center img-half"/>

so we need to add below configuration to allow any frame to run from the same origin.

```java
        http
                .headers()
                .frameOptions().sameOrigin();
```

so we are able to login now.

{% include ad %}

Lets create the entity & repository:

```java
// src/main/java/in/kuros/entity/User.java

@Entity
@Table(name = "users")
public class UserEntity {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Basic
    @Column(name = "user_name")
    private String userName;

    @Basic
    @Column(name = "password")
    private String password;

    @OneToMany(mappedBy = "user")
    private List<UserRoles> userRoles;

    // getters & setters        
}


// src/main/java/in/kuros/entity/UserRoles.java

@Entity
@Table(name = "user_roles")
public class UserRoles {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "role")
    private String role;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", insertable = false, updatable = false)
    private UserEntity user;
    
    // getters and setters
}

```

We will also insert values in the tables users & user_roles, we will create db/data.sql

```sql
# src/main/resources/db/data.sql

INSERT INTO users (user_name, password) VALUES ('kuros', 'passwd');

INSERT INTO user_roles (user_id, role) VALUES (1, 'ADMIN'),
                                              (1, 'USER');

```

We have all our data setup, we will verify ( _http://localhost:8080/h2-console_ ). 

<img alt="h2-db-login" src="/images/loader.svg" data-src="/images/2019/spring/h2-db-users.png" class="lazy img-center"/>


# User Authentication

Well, we have our api's secured, but we still have a problem, we still rely on password generated by spring. We want to access our api's using our users.

There are multiple ways we can handle it, but in this post we will focus on using authentication provider.

{% include ad %}

We will create a custom authentication provider. We need to implement authenticate method, you will get authentication object, it will contain username and credentials which we will validate.

After we validate the user we need to create new Token, but make sure you do not forward password beyond, you don't want password to leak to other filters.

```java
package in.kuros.custom;

import in.kuros.entity.UserEntity;
import in.kuros.entity.UserRoles;
import in.kuros.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Authentication authenticate(final Authentication authentication) throws AuthenticationException {
        final String username = authentication.getName();
        final String password = authentication.getCredentials().toString();

        final List<UserRoles> userRoles = getUserIfAuthenticated(username, password);

        return new UsernamePasswordAuthenticationToken(username, null, getGrantedAuthorities(userRoles));
    }

    private Collection<? extends GrantedAuthority> getGrantedAuthorities(final List<UserRoles> userRoles) {
        return userRoles
                .stream()
                .map(role -> (GrantedAuthority) role::getRole)
                .collect(Collectors.toList());
    }

    private List<UserRoles> getUserIfAuthenticated(final String username, final String password) {
        final UserEntity entity = userRepository.findByUserName(username);

        if (entity == null) {
            throw new UsernameNotFoundException("Authentication failed");
        }

        if (!entity.getPassword().equals(password)) {
            throw new UsernameNotFoundException("Authentication failed");
        }

        return entity.getUserRoles();
    }

    @Override
    public boolean supports(final Class<?> aClass) {
        return aClass.equals(UsernamePasswordAuthenticationToken.class);
    }
}
```

{% include ad-h %}

Finally we will override the configure method and provide our custom authentication provider.

So our SecurityConfig is finally complete:

```java
// src/main/java/in/kuros/config/SecurityConfig.java

package in.kuros.config;

import in.kuros.custom.CustomAuthenticationProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired private CustomAuthenticationProvider customAuthenticationProvider;

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        http
                .headers()
                .frameOptions().sameOrigin();

        http
                .csrf()
                .disable();

        http
                .authorizeRequests()
                .antMatchers("/books").permitAll()
                .antMatchers("/secured/**").authenticated();
        http
                .formLogin();
    }

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(customAuthenticationProvider);
    }
}
```

Now we have a fully functional app with security enabled.

Full code can be found here: [Spring Security with Authentication Provider](https://github.com/kuros/blog-code/tree/master/spring/spring-security-authentication-provider)
 
