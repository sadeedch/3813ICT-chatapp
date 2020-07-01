# Chat Application



## Documentation
## Sadeed Ahmad 
## Software Frameworks


## 1.	Main Functions:

:small_blue_diamond: Built in AngularJS allowing the users to register and login by interacting with the MongoDB database. 
:small_blue_diamond: Particular privileges assigned to users depending on their role. 
:small_blue_diamond: Users are able to join different chat rooms and communicate with other users.
:small_blue_diamond: Technical aspects of this project involves using  AngularJS, MongoDB, REST APIs and socket.io to help enable real time communication.
:small_blue_diamond: Version control using Git. 




## 2.	NodeJS as server:

I used nodejs as the server and all the code to start the server is in the server folder and server.js file. This file was created with the command “ng new ChatApp”. To start the server, just have to go to server folder and then type the command node server.js. This will start the server on port 3000 as described in the program. 
I used http package to create a new server because the http package has a create server method, this method has two arguments respectively are request and response.
In the server directory, api.js file has all the apis used to make the functions of this ChatApp.
The server file also includes a users.json file which has the list of all the registered users and the information about which groups or channels they belong to. 




## 3.	Components: 
All the components were created by ng generate component command. This program includes three components which are login, home and manage. Login takes care of the login page. After the login is successful, it takes the user to home page where a link is shown for the manage page. Manage page is the main dashboard page for this application where the user performs different functions as assigned to them. 
For example, if a user is signed in as a super user, he will have the access to all the functions of this chat app while if the user is signed as a normal user, he will only be able to see the groups or channels he is in. He won’t be able to make any changes to any other user’s role. 
 
All the styling of this app is done through the styles.css file and for data persistence, the user login details are added or derived from local storage function.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
	
 

