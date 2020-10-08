---
title: Console IO
date: 2019-01-12
description: console input is rarely used, but programmers often use System.out.println for output during the debugging phase 
categories:
  - java
author_staff_member: rohit
---
Java was designed for graphical user interfaces (GUI) and industrial strength file and Internet I/O. No attempt was made to have simple input and output facilities like C++'s cin and cout. This isn't a problem for big programs, but it makes small student examples large and awkward, requiring knowledge of conversion and exceptions from the beginning. In practice console input is rarely used, but programmers often use System.out.println for output during the debugging phase. 

There are three predefined I/O streams that use the console. These are equivalent to Unix standard input, error, and output streams. 
- System.out - standard output stream
- System.in - standard input stream
- System.err - standard error

Now let us concentrate on the major parts i.e. input and output of data from the console.

## The Console
A more advanced alternative to the Standard Streams is the Console. This is a single, predefined object of type Console that has most of the features provided by the Standard Streams, and others besides. The Console is particularly useful for secure password entry. The Console object also provides input and output streams that are true character streams, through its reader and writer methods.

Before a program can use the Console, it must attempt to retrieve the Console object by invoking System.console(). If the Console object is available, this method returns it. If System.console returns NULL, then Console operations are not permitted, either because the OS doesn't support them or because the program was launched in a non-interactive environment.

The Console object supports secure password entry through its readPassword method. This method helps secure password entry in two ways. First, it suppresses echoing, so the password is not visible on the user's screen. Second, readPassword returns a character array, not a String, so the password can be overwritten, removing it from memory as soon as it is no longer needed.

```java
import java.io.Console;
import java.util.Arrays;
import java.io.IOException;

public class Password {
    
    public static void main (String args[]) throws IOException {

        Console c = System.console();
        if (c == null) {
            System.err.println("No console.");
            System.exit(1);
        }

        String login = c.readLine("Enter your login: ");
        char [] oldPassword = c.readPassword("Enter your old password: ");

        if (verify(login, oldPassword)) {
            boolean noMatch;
            do {
                char [] newPassword1 =
                    c.readPassword("Enter your new password: ");
                char [] newPassword2 =
                    c.readPassword("Enter new password again: ");
                noMatch = ! Arrays.equals(newPassword1, newPassword2);
                if (noMatch) {
                    c.format("Passwords don't match. Try again.%n");
                } else {
                    change(login, newPassword1);
                    c.format("Password for %s changed.%n", login);
                }
                Arrays.fill(newPassword1, ' ');
                Arrays.fill(newPassword2, ' ');
            } while (noMatch);
        }

        Arrays.fill(oldPassword, ' ');

    }

    //Dummy verify method. 
    static boolean verify(String login, char[] password) {
        return true;
    }

    //Dummy change method.
    static void change(String login, char[] password) {}
}
```

Let us understand the what does the above program tries to do :-
- Attempt to retrieve the Console object. If the object is not available, abort. 
- Invoke Console.readLine to prompt for and read the user's login name. 
- Invoke Console.readPassword to prompt for and read the user's existing password. 
- Invoke verify to confirm that the user is authorized to change the password. (In this example, verify is a dummy method that always returns true.) 
- Repeat the following steps until the user enters the same password twice: 
    - Invoke Console.readPassword twice to prompt for and read a new password. 
    - If the user entered the same password both times, invoke change to change it. (Again, change is a dummy method.) 
    - Overwrite both passwords with blanks. 
- Overwrite the old password with blanks.























