---
title: Spring Security with Basic Authentication
date: 2019-04-21
description: How to secure our spring application, we will learn basics of Authentication. Add Basic Authentication to secure our application. 
categories:
  - spring
  - spring-security
author_staff_member: rohit
toc: true
---

In the world of internet, information is flowing across multiple networks. We need to secure our application against the threats posed by hackers or unauthorized users. Its like protecting your castle, you build outer walls, moat, inner walls, watchers, towers etc., basically you need different layers of protection to counter threats.

Similarly, In modern security application, we have different layers of security: 

1. Firewall
2. Login
3. Security Questions
4. Two Factor Authentication
5. Authorization.
6. Hashing
7. and many more

In this series, we will try to learn them, starting with basic authentication.

# Perquisite     
1. Spring Framework
2. Spring MVC (basics)
3. Java 8
4. Lombok Setup(if you want to run the code)
5. Maven

{% include ad-h %}

# Servlets and filters

Before we proceed, lets spend some time on revising the web flow. 

User makes a call to server using http/https protocol, server delegates the request corresponding servlet.

<img alt="servlet" src="/images/loader.svg" data-src="/images/2019/spring/servlet.png" class="lazy img-center img-half"/>

## Filter
In order to intercept requests, we are provided with filters. Spring security heavily uses these filters for authentication and authorization. 

<img alt="filters" src="/images/loader.svg" data-src="/images/2019/spring/filters.png" class="lazy img-center img-half"/>

The filter interface provides three methods
```java
package javax.servlet;

import java.io.IOException;

public interface Filter {
    default void init(FilterConfig filterConfig) throws ServletException {
    }

    void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException;

    default void destroy() {
    }
}
```

The init/destroy method is called when the filter is loaded/removed from the context. Whereas doFilter method is envoked everytime the request comes. it takes the request, response and filterChain object 

{% include ad %}

In order to configure, we need to add filter chain in _web.xml_
```xml
  <filter>
    <filter-name>myFilter</filter-name>
    <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
  </filter>

  <filter-mapping>
    <filter-name>myFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
```

## Filter Chain

As per the docs, A FilterChain is an object provided by the servlet container to the developer giving a view into the invocation chain of a filtered request for a resource. Filters use the FilterChain to invoke the next filter in the chain, or if the calling filter is the last filter in the chain, to invoke the resource at the end of the chain.

To simply put, We group filters under filter chain, and map chains to urls.

<img alt="filter chain" src="/images/loader.svg" data-src="/images/2019/spring/filter-chain.png" class="lazy img-center img-half"/>

Based on the endpoint spring figures out which filter chain needs to be applied. Once identified, it applies all the filter within that chain.

### Key Filters Provided by Spring Security

There are many filters provided by Spring Security framework, we will take a look at few of the most important filters.

1. SecurityContextPersistenceFilter: Responsible for managing security context, security context holds the details of authenticated principle, like username, roles etc. The Security context is stored at SecurityContextHolder, which manages context for a session. When the first request is made, and empty context is created and assigned to the request.
2. AuthenticationFilters: Responsible for authenticating and generating principle. This generated principle is then set in Security Context.
3. FilterSecurityInterceptor: Interceptor provides authorization.
4. ExceptionTranslationFilter: Redirect to the error or login page.

{% include ad-h %}

# Authentication Workflow
When a request comes, its delegated to Authentication filters, which generates AuthenticationTokens, these tokens are then passed to AuthenticationManager, it would validate the token and generate principle object(principle mainly means minimum basic info after authentication).

<img alt="authentication-flow" src="/images/loader.svg" data-src="/images/2019/spring/authentication-flow.png" class="lazy img-center img-half"/>

Once the Authentication is done, credentials is removed and Authorities are set. This makes sure the credentials are not leaked down the session.

## Putting it all together

Basically to enable spring security features, you just need to setup security filter chain and configure the DispatcherServlet in your web.xml. That's it.

Provide the filters and authentication provider and you are done.

<img alt="request flow" src="/images/loader.svg" data-src="/images/2019/spring/request-flow.png" class="lazy img-center img-half"/>


# Create web application

We will create a simple library application which will become our playground for setting up the spring-security.

{% include ad %}

We will start by creating a new spring boot application. 
```xml
<!-- pom.xml -->

<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.4.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>in.kuros.blog.code</groupId>
    <artifactId>spring-security-basics</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>spring-security-basics</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

## Configure H2 database
Here we are using H2 database to list book records, so lets configure H2. We will add configs to application.properties 

```properties
# src/main/resources/application.properties

spring.datasource.url=jdbc:h2:mem:testdb;
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.h2.console.enabled=true
spring.jpa.hibernate.ddl-auto=create
spring.datasource.data=classpath:db/data.sql
```
At line 8, we are telling our to create fresh schema every time our app starts(Do not use this in prod)
At line 9, we configured our app to read data.sql to populate book table. This would initialize Book table with few values.

```sql
# src/main/resources/db/data.sql

insert into book(name) values ('A Little Forever'),
                              ('To Kill a Mockingbird '),
                              ('A Thousand Splendid Suns'),
                              ('The Kite Runner'),
                              ('Harry Potter and the Philosopher''s Stone'),
                              ('Harry Potter and the Chamber of Secrets');
```
{% include ad-h %}

## Create Entity & Respective Repository

Next, we will create Entity to map Book object.

```java
// src/main/java/in/kuros/blog/code/spring/security/basics/entity/Book.java

package in.kuros.blog.code.spring.security.basics.enitity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
@Getter
@Setter
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Basic
    @Column(name = "name")
    private String name;
}
```

At line 16 & 17, we are using lombok to generate boilerplate code for getters/setters. If you don't want to use lombok, simply provide getters/setters, the old fashion way.

{% include ad %}

Next we create JPA Repository to access Book data.

```java
// src/main/java/in/kuros/blog/code/spring/security/basics/repository/BookRepository.java

package in.kuros.blog.code.spring.security.basics.repository;

import in.kuros.blog.code.spring.security.basics.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
}
```

## Controller

Finally we need to create a controller and expose rest api to access book details.

```java
// src/main/java/in/kuros/blog/code/spring/security/basics/controller/BookController.java

package in.kuros.blog.code.spring.security.basics.controller;

import in.kuros.blog.code.spring.security.basics.entity.Book;
import in.kuros.blog.code.spring.security.basics.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class BookController {

    private final BookRepository bookRepository;

    @Autowired
    public BookController(final BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @GetMapping(path = "books")
    public List<Book> getBooks() {
        return bookRepository.findAll();
    }
}
``` 

All our initial components are ready, lets access the data at `http://localhost:8080/books`
```json
[
  {
    "id": 1,
    "name": "A Little Forever"
  },
  {
    "id": 2,
    "name": "To Kill a Mockingbird "
  },
  {
    "id": 3,
    "name": "A Thousand Splendid Suns"
  },
  {
    "id": 4,
    "name": "The Kite Runner"
  },
  {
    "id": 5,
    "name": "Harry Potter and the Philosopher's Stone"
  },
  {
    "id": 6,
    "name": "Harry Potter and the Chamber of Secrets"
  }
]
``` 

{% include ad-h %}

# Time to add Spring Security

Ok, so now we have all our base application setup. Now we will add maven dependency for spring security:-

```xml
<!-- pom.xml -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
```

Restart the application and again try to access `http://localhost:8080/books`. We see a login page, hmmmm..., but what's the username & password? We haven't added any authentication except maven dependency.

To answer this question, Spring creates a lot of boilerplate code, Annotations & configuration to plugin security.

In order to login, Username: user, Password: <Will be found in logs: Using generated security password: XXXXXXXX>

If we debug the **DelegatingFilterProxy**, we will get list of some of the filters we talked about earlier.

<img alt="delegating-filter-proxy" src="/images/loader.svg" data-src="/images/2019/spring/delegating-filter-proxy.png" class="lazy img-center img-half"/>

# Basic Authentication
Time to customize application using basic authentication. We will first create a class extending WebSecurityConfigurerAdapter.

```java
// src/main/java/in/kuros/blog/code/spring/security/basics/security/SecurityConfiguration.java

package in.kuros.blog.code.spring.security.basics.security;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;

@Configuration
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(final HttpSecurity http) throws Exception {
        http.authorizeRequests()
                    .anyRequest()
                    .authenticated()
                .and()
                    .httpBasic()
                .and()
                    .logout();
    }

    @Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
                .withUser("myuser")
                .password("mypassword")
                .roles("USER")
                .and()
                .passwordEncoder(NoOpPasswordEncoder.getInstance());
    }
}

```
{% include ad-h %}

Lets look at them with detail.
At line 15, we override the configure method, and we say we want to authorize any requests with only basic and logout filter.

Also at line 27, we are setting up in memory authentication, with user/password details. Don't forget to add password encoder(at line 32) else you will get an error something like this

```bash
java.lang.IllegalArgumentException: There is no PasswordEncoder mapped for the id "null"
	at org.springframework.security.crypto.password.DelegatingPasswordEncoder$UnmappedIdPasswordEncoder.matches(DelegatingPasswordEncoder.java:244) ~[spring-security-core-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.security.crypto.password.DelegatingPasswordEncoder.matches(DelegatingPasswordEncoder.java:198) ~[spring-security-core-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter$LazyPasswordEncoder.matches(WebSecurityConfigurerAdapter.java:594) ~[spring-security-config-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.security.authentication.dao.DaoAuthenticationProvider.additionalAuthenticationChecks(DaoAuthenticationProvider.java:90) ~[spring-security-core-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.security.authentication.dao.AbstractUserDetailsAuthenticationProvider.authenticate(AbstractUserDetailsAuthenticationProvider.java:166) ~[spring-security-core-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.security.authentication.ProviderManager.authenticate(ProviderManager.java:175) ~[spring-security-core-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.security.authentication.ProviderManager.authenticate(ProviderManager.java:200) ~[spring-security-core-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.security.web.authentication.www.BasicAuthenticationFilter.doFilterInternal(BasicAuthenticationFilter.java:180) ~[spring-security-web-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-5.1.6.RELEASE.jar:5.1.6.RELEASE]
	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.security.web.authentication.logout.LogoutFilter.doFilter(LogoutFilter.java:116) ~[spring-security-web-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.security.web.csrf.CsrfFilter.doFilterInternal(CsrfFilter.java:100) ~[spring-security-web-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-5.1.6.RELEASE.jar:5.1.6.RELEASE]
	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.security.web.header.HeaderWriterFilter.doFilterInternal(HeaderWriterFilter.java:74) ~[spring-security-web-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-5.1.6.RELEASE.jar:5.1.6.RELEASE]
	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.security.web.context.SecurityContextPersistenceFilter.doFilter(SecurityContextPersistenceFilter.java:105) ~[spring-security-web-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.security.web.context.request.async.WebAsyncManagerIntegrationFilter.doFilterInternal(WebAsyncManagerIntegrationFilter.java:56) ~[spring-security-web-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-5.1.6.RELEASE.jar:5.1.6.RELEASE]
	at org.springframework.security.web.FilterChainProxy$VirtualFilterChain.doFilter(FilterChainProxy.java:334) ~[spring-security-web-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.security.web.FilterChainProxy.doFilterInternal(FilterChainProxy.java:215) ~[spring-security-web-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.security.web.FilterChainProxy.doFilter(FilterChainProxy.java:178) ~[spring-security-web-5.1.5.RELEASE.jar:5.1.5.RELEASE]
	at org.springframework.web.filter.DelegatingFilterProxy.invokeDelegate(DelegatingFilterProxy.java:357) ~[spring-web-5.1.6.RELEASE.jar:5.1.6.RELEASE]
	at org.springframework.web.filter.DelegatingFilterProxy.doFilter(DelegatingFilterProxy.java:270) ~[spring-web-5.1.6.RELEASE.jar:5.1.6.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.springframework.web.filter.RequestContextFilter.doFilterInternal(RequestContextFilter.java:99) ~[spring-web-5.1.6.RELEASE.jar:5.1.6.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-5.1.6.RELEASE.jar:5.1.6.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.springframework.web.filter.FormContentFilter.doFilterInternal(FormContentFilter.java:92) ~[spring-web-5.1.6.RELEASE.jar:5.1.6.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-5.1.6.RELEASE.jar:5.1.6.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.springframework.web.filter.HiddenHttpMethodFilter.doFilterInternal(HiddenHttpMethodFilter.java:93) ~[spring-web-5.1.6.RELEASE.jar:5.1.6.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-5.1.6.RELEASE.jar:5.1.6.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.springframework.web.filter.CharacterEncodingFilter.doFilterInternal(CharacterEncodingFilter.java:200) ~[spring-web-5.1.6.RELEASE.jar:5.1.6.RELEASE]
	at org.springframework.web.filter.OncePerRequestFilter.doFilter(OncePerRequestFilter.java:107) ~[spring-web-5.1.6.RELEASE.jar:5.1.6.RELEASE]
	at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:193) ~[tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:166) ~[tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:200) ~[tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:96) [tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.apache.catalina.authenticator.AuthenticatorBase.invoke(AuthenticatorBase.java:490) [tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:139) [tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:92) [tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:74) [tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:343) [tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:408) [tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:66) [tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:834) [tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1415) [tomcat-embed-core-9.0.17.jar:9.0.17]
	at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:49) [tomcat-embed-core-9.0.17.jar:9.0.17]
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1142) [na:1.8.0_131]
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:617) [na:1.8.0_131]
	at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61) [tomcat-embed-core-9.0.17.jar:9.0.17]
	at java.lang.Thread.run(Thread.java:748) [na:1.8.0_131]

```

Now when you access the url again, this time you will be asked a basic form popup.

<img alt="login" src="/images/loader.svg" data-src="/images/2019/spring/login-popup.png" class="lazy img-center img-half"/>
 
Now we can successfully login with basic authentication, using our provided username and password.

Find the complete [code here](https://github.com/kuros/blog-code/tree/master/spring/spring-security-basics)