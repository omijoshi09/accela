# AccelaTask

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.2.

## Compatible
This project is suited with mobile and web application

## How to run
The project can run by using command "ng serve" or "using package.json"


## Project Task server
Write an Angular or Ionic application to display data retrieved from the
following endpoints:
https://jsonplaceholder.typicode.com/users, 
https://jsonplaceholder.typicode.com/posts


The app should open to a simple login page. The page should consist of a text
input area and a login button. The text area should accept an email address.
The app should then try and find a user from the users endpoint with the
entered email address (this can be done by providing the email parameter to
the endpoint. Example: email=Sincere@april.biz
Once logged in, the user should be redirected to a page with two tabs.
The first tab should be titled 'User posts' and display posts by the user.
Each post should be on its own 'card' and should contain the post title in
bold, then the post body in a normal font. This page should scroll so that the
user is able to see all posts. The user should also be able to
create new posts from this page. (Note: While the post verb is supported by
the posts endpoint, nothing 'posted' will actually be reflected on the next
get. Just store the result of the post call locally to display in the list of
posts).
The second tab should be titled 'Other Posts' and should display posts by
other users. Similar to the first tab, each post should be on its own 'card'.
It should display the user name, post title and post body in that order. Also
similar to the first tab, the user should be able to scroll to see more posts
