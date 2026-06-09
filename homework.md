Create a repository
Initialize the repository - by running the command npm init
since we use express.js - install it by using the command npm i -g express
node_modules, package.jsn, package-lock.json - tilde and caret
Create a server
Listen to prot number 7777
Write request handlers for /, /hello
Install nodemon and update scrips under package.json
What are dependencies?
Why did we use -g while installing the nodemon

Install git by running the command git init
Create .gitignore file and add node_modules folder in it- so that that should bot be moved to git
Commit your changes from the local repository
Login to the git account and create the remote repository
Get the commands from there and run that in the terminal to push all the cahanges to remote repository
Now Play with the routes /hello/test, /hello, / etc
Note : Order of the routes matters a lot...
Install Postman - Create a workspace > create collection and Test your routes 
Explore routing and use of ?, +, () etc
Explore use of regex in routes
Dynamic routes, reading queries, reading params etc

Play with multiple route handlers
next()
Next function and errors along with res.send()
app.use("/route, rH, rH2)
How express JS basically handles requests behind the scenes
Know the difference between app.use and app.all
Write a dummy auth middleware for admin
Write a dummy auth middleware for user except /user/login
Error handling using (wildcard) app.use("/", (err, req, res, next) => .....)


Create a free cluster on Official webside MongoDB Atlas
Get the connection string from there - just cpopy it
Install the mongoose library in the project
Connect with the mongodb database, use /devTinder at the end of the url, Since the connection string is of the cluster...
Call the connectDB function and connect to the database before starting application on port 7777
Crete a userSchema inside the models > user.js file and create a User model and export it
Create POST/ signup API to add data to database
Psuh some documents using API calls from postman
Error handling using try, catch


Go through the differences between JSON and Javascript object
Add the app.use(express.json()) midddleware which is given by express.js to convert json to JS object
Make the /signup API dynamic to receive the data from the end user
Create - API - get all the users(feed API)
Crete an api to get the user from the request Email (pass the email in Postman in the request body)
Create a API for deleting the user via ID, by taking the id from the request params
Difference between PATCH and PUT methods
Tryout the API to update the user
EXplore the jmongoose documentation for model methods
Create a API to update the user with emailID

Added the default validations in schema - required, trim, unique, min, max, default, photoURL, lowercase, default
Created a custom validator function for the gender
Improve the dB schema - put all appropriate validations on each field in Schema
Add timestamps to the DB schema
Add a custom validation function to check whether only required fields are allowed for the modification...
DATA SANITIZATION : API level validation
Scenario : sills can be added in 100's - to fix add the condition to set tme max length....
Scenario : since userId should not be updated, get the userId via url(params) instead from the request body - so that updating the userId should not be allowed.
Install and Explore validator function
Use validator functions for the Email, Password etc
NOTE: NEVER TRUST THE request.body

The Previous validations were for the updating the user (PATCH) request
Now add the Signup validations.
    - Create folder utils and a file called validation.js inside it..
    - import the validaor inside it and add the validations
Scenario : Passwords should be saved with encryption in the database
install bcrypt npm package
import it in app.js - add bcrypt.hash keeping the salts as 10 - pass it in the request payload(separately)- to save the encypted passwords
------IMPORTANT-----
Install jsonwebtoken
While login create a jwt by passing payload(userid - in our case), secretOrPrivateKey.... and send that as a cookie
    var token = await jwt.sign({ _id : userDetails._id }, "password@112233");
    res.cookie("token", token);
When the /profile is accessed after the login - use verify method to verify the token and secretOrPrivateKey and get the payload back(userid in our case)
Find the user by using findUserById
Create a userAuth middleware
Add the userAuth middleware in /profile API and new sendConnectionRequest API( create new API - sendConnectionRequest )
Set the expiry of JWT token and the cookie for 8 days by adding {expiresIn :'1d'}
Also add the cookie expiration time.....
Create userSchema method to getJWT
Create userSchema method to verifyPassword(password)

Explore tinder API's
Create a list of API's you can think of in DevTinder
Group multiple routes under respective groups
Read documentation for express routes
Creates routes folder for managing auth, profile amd request routes
Create authRouter, profileRouter and requestRouter
Import these fields in app.js 
Create POST /logout API
Create PATCH /profile/edit

Create connection request schema, 
Send Connection Request API
Proper validation of Data 
Think about All corner cases and Handle them
Read more about $or query 
ref: https://www.mongodb.com/docs/manual/reference/mql/query-predicates/logical/
schema.pre("save") function
Read more about indexes..
Why do we need indexes?
What is the advantages and disadvantages of creating indexes
ref: https://www.mongodb.com/docs/manual/core/indexes/index-types/index-compound/

Write the code with proper validation - /request/review/:status/:userId
Thought process : GET and POST APIs
The best advice - await ....connection.save() - should be the 2nd last line 
Use ref: "User" and populate to create a relation between the two - here it is User and ConnectionRequest
Create GET /user/requests/received with all the checks
Create GET /user/connections API with all the checks

Logic for GET /feed API
Explore the $nin, $and, $ne and othe r quer operators
Pagination
    /feed?page=1&limit=10 - This gives 1-10
    /feed?page=2&limit=10 - This gives 11-20
    /feed?page=3?limit?10 - This gives 21-30
.skip() and .limit()
    skip = (page-1)*limit
Add the condition for limiting the number of users