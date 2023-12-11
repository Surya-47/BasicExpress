// PPT 1

/*
Client Side Programming
• It is the program that runs on the client machine (browser) 

    2) Make interactive web pages
    3) Interact with local storage
    4) Sending request for data to server

• The Programming languages for client-side programming are :
1) Javascript 5) AJAX 6) Angular JS


Server Side Programming

    It is the program that runs on server.

    1) Querying the database
    2) Generating content to the web page
    3) Access/Write a file on server.
    4) Interact with other servers

    • The Programming languages for server-side programming are :
        1) PHP
        2) C++
        3) Java and JSP
        4) Python

    Why do we need a framework for server side development?

       * It is possible but takes a longer time. It requires heavy coding and
        takes a lot of effort.
        * So reduce the sheer amount of code

    What is Node.js?
        • Node.js is an open source server environment
        • Node.js is free
        • Node.js runs on various platforms (Windows, Linux, Unix, Mac OS X,
        etc.)
        • Node.js uses JavaScript on the server

    Why Node.js?
        • A common task for a web server can be to open a file on the server
        and return the content to the client.
        • Here is how PHP or ASP handles a file request:
        • Sends the task to the computer's file system.
        • Waits while the file system opens and reads the file.
        • Returns the content to the client.
        18
        • Ready to handle the next request.

    Why Node.js?
        Here is how Node.js handles a file request:
        • Sends the task to the computer's file system.
        • Ready to handle the next request.
        • When the file system has opened and read the file, the server returns
        the content to the client.
        • Node.js eliminates the waiting, and simply continues with the next
        19
        request.
        • Node.js runs single-threaded, non-blocking, asynchronously
        programming, which is very memory efficient.

*/


// creating server with node
const http = require('http');
const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});
server.listen(5000, () => {
    console.log(`Server running`);
}); 



// PPT 2


/*
 What is express.js ?
    • Express is a small framework that sits on top of Node.js’s web server 
    functionality to simplify its APIs and add helpful new features.

    • Allows to set up middleware's to respond to HTTP Requests.
    • Defines a routing table which is used to perform different actions
    based on HTTP Method and URL.
    • Allows to dynamically render HTML Pages based on passing
    arguments to templates.

    res.send sets that string as the body, and it closes the connection.

    The Response.json() method accepts an object or array, and converts it to JSON before sending it: res.json({ username: 'Flavio' })

    An alternative way to send the response, without any body, is by using the Response.end() method: res.end()

    res.status(404).send('File not found')

    res.redirect('/go-there')

    res.download('/file.pdf')

*/


// Express
var express = require('express')
var app = express()
app.get('/routing', function (req, res) {
    res.send('world')
})
app.listen(5000, () => {
    console.log('server ready')
}); 


app.get('/oldpage', (req, res) => {
    // Redirect to a new page
    res.redirect('/newpage');

    // This code will not execute
    console.log('Redirecting...');
    return;
});


// PPT 3
/*

Types of Routing or Applying parameter in Routes
    • Applying Route Parameters using Query Strings ?key= value & key= value
    • Applying Route Parameters using Regex Regular expression
    • Applying Route Parameters using Defined parameter <param-name>
    • Applying call back functions for defined parameters
*/

// routing with > query params
app.get('/product-details', function (req, res) {
    res.send('Product ID: ' + req.query.id + ' and Product Name: ' + req.query.name);
});

const url = require('url');
const reqUrl = 'http://localhost:9000/user?country=India&city=Delhi';
const urlobject = url.parse(reqUrl, true);
console.log(urlObject.host);
console.log(urlObject.pathname);
console.log(urlobject.search);      // country=India6city Delhi


const queryData = urlobject.query    // {country : 'India',city : 'Delhi'}
queryData.country;                   // 'India'
queryData.city;                       // 'Delhi'


// routing with > reg ex
app.get('/ts/:id([0-9]{5})', function (req, res) {
    res.send('id: ' + req.params.id);
});
// routing with > defined params
app.get('/t/:name/:id', function (req, res) {
    res.send('id: ' + req.params.id + ' and name: ' + req.params.name);
});


/*

The app.param() method in Express.js is used to register callback functions for specific route parameters. This allows you to perform additional logic or modifications based on the value of the parameter. Here's an example to illustrate its usage:

*/

const express = require('express');
const app = express();

// Registering a callback function for the 'id' parameter
app.param('id', (req, res, next, value) => {
    // Perform some logic based on the 'id' parameter
    if (value === 'admin') {
        res.send('Access denied');
    } else {
        req.modifiedId = value + '_modified'; // Add a modified value to the request object
        next(); // Proceed to the next middleware or route handler
    }
});

// Route with parameter
app.get('/users/:id', (req, res) => {
    const userId = req.modifiedId; // Accessing the modified value from the request object
    res.send(`Modified User ID: ${userId}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


// learn how to implement routing

// PPT 5

// performing CRUD on a json file using express
app.get('/:id', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        var users = JSON.parse(data);
        var user = users["user" + req.params.id]
        console.log(user);
        res.end(JSON.stringify(user));
    });
})

var user = {
    "user4": {
        "name": "mohit",
        "password": "password4",
        "profession": "teacher",
        "id": 4
    }
}

app.post('/addUser', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["user4"] = user["user4"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
})

var id = 4;

app.delete('/deleteUser', function (req, res) {
    // First read existing users. 
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        delete data["user" + id];

        console.log(data);
        res.end(JSON.stringify(data));
    });
})

app.patch('/addUser', function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data["user" + id] = user["user4"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
    fs.writeFile(__dirname + '/users.json', JSON.stringify(users), 'utf8', function (err) {
        res.send(users);
    });
})

// PPT 6
/*
 Route Handlers
    Route handlers can be in the form of a function, an array of functions, or combinations of both, as shown in the following examples.


    Refer slides 4,5,6 in ppt 6
*/


// Templates

const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); // Specify the directory where your Pug files are located

app.get('/', (req, res) => {
    const username = 'John'; // Example variable

    res.render('index', { username }); // Render the 'index' Pug template and pass the 'username' variable
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});


/*
doctype html
html
head
title = "Hello Pug"
body
    h1 Welcome, #{ username } !
    p.greetings#people Hello World!
*/

/*

html
head
title Simple template
body
    ul
    li Name : #{uname}
    li Age : #{uage}

*/

/*
MIDDLEWARE
    Express is a routing and middleware web framework that has 
minimal functionality of its own: An Express application is essentially 
a series of middleware function calls.
    Middleware functions are functions that have access to the request 
object (req), the response object (res), and the next middleware 
function in the application’s request-response cycle.

Middleware functions can perform the following tasks:
• Execute any code.
• Make changes to the request and the response objects.
• End the request-response cycle.
• Call the next middleware function in the stack.
• If the current middleware function does not end the request-response 
cycle, it must call next() to pass control to the next middleware 
function.

• Support serving static files
• Implement cookies
• Support sessions
• Process POST data
• Creating own custom middleware functions

Some built-in middlewares:
logger
static
cookieParser
bodyParser
query
*/ 

// To assign a middleware globally to a path
app.use('/', express.logger())

// Types of middleware
// Application level middleware
app.use((req, res) => {
    console.log('hello')
})

// router level middleware
app.get('/users', (req, res) => {
    console.log('get users')
})

//query middleware
/* it is one of the most simple and useful middleware. It converts the query string in 
the URL into a javascript object and stores it as query property on the request object. */
app.use('/', express.query())
app.use('/', (req, res) => {
    var id = req.query.id
    var score = req.query.score
    res.send("...")
})

// serving static files
/*
    serves static files directly from disk to client
    To support JS files, CSS files, image files and HTML documents
    
    Express.static(path, options)
*/
app.use(express.static('public'));
/*
    Options
    maxAge: sets the browser cache maxAge in milliseconds. It determines how long the browser should cache the static files. The default value is 0, which means the browser won't cache the files. For example, to set the maxAge to one day (86400000 milliseconds), you can do:
*/
app.use(express.static('public', { maxAge: 86400000 }));
/*
    hidden: is a boolean option. When set to true, it enables the transfer of hidden files (files with names starting with a dot, like .hiddenfile). By default, it's set to false. To enable the transfer of hidden files, you can use: 
*/
app.use(express.static('public', { hidden: true }));
/*
    redirect: is a boolean option. When set to true, if the request path is a directory, the request is redirected to the path with a trailing /. This is useful for accessing directories that contain an index.html file, for example. The default value is true, so the redirect behavior is enabled by default. To disable the redirect behavior, you can use: 
*/
app.use(express.static('public', { redirect: false }));
/*
    index: specifies the default filename for the root path. When a request is made to the root path (/), Express will look for a file with the specified name in the specified directory. The default value is index.html. So, if you have an index.html file in the public directory, it will be served as the default file for the root path. If you want to change the default filename, you can use: 
*/
app.use(express.static('public', { index: 'home.html' }));

// Handling POST body data
/*
In Express, bodyParser is a middleware that allows you to extract the body of an incoming HTTP request. It helps in parsing the request body data in various formats such as JSON, URL-encoded, or multipart data.
*/
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/users', (req, res) => {
    const userData = req.body;
    res.json(userData);
});
/*
Once the middleware is added, the parsed request body will be available in req.body in your route handlers. The example demonstrates handling a POST request to /api/users, where the parsed JSON data is accessed from req.body and then sent back as a response.
*/

//Cookies
/*
Cookies are small pieces of data that are sent from a website and stored in a user's web browser while the user is browsing the website. They are commonly used to remember and store information about the user's interactions and preferences on a website.

When a user visits a website, the server can send a response with one or more cookies included in the HTTP headers. The browser then stores these cookies and includes them in subsequent requests to the same website. This allows the server to identify and recognize the user across multiple requests and sessions.

Cookies have several uses and benefits, including:

Session Management: Cookies can be used to maintain session information and keep track of user authentication. For example, a cookie can store a unique session ID that allows the server to identify the user and provide a personalized experience.

Personalization: Websites can use cookies to remember user preferences and settings. This can include language preferences, theme choices, or customizations specific to the user's browsing experience.

Tracking and Analytics: Cookies can be used for tracking user behavior and gathering analytics data. Website owners can use this information to analyze user patterns, measure website performance, and improve user experiences.

Targeted Advertising: Cookies can be used for targeted advertising purposes. Ad networks can store cookies to track user interests and display relevant ads based on the user's browsing behavior.

Cookies have some characteristics worth mentioning:

Name-Value Pairs: A cookie consists of a name-value pair, where the name represents the identifier of the cookie, and the value stores the associated data.

Expiration Date: Cookies can have an expiration date set by the server. Once the expiration date is reached, the browser will automatically remove the cookie. If no expiration date is set, the cookie is considered a session cookie and is deleted when the user closes the browser.

Domain and Path: Cookies can be associated with a specific domain and path on the website. The browser will only send the cookie to the server if the domain and path match the request URL.

Secure and HttpOnly Flags: Cookies can have additional flags set, such as the Secure flag, which ensures that the cookie is only sent over HTTPS connections, and the HttpOnly flag, which prevents client-side JavaScript from accessing the cookie.
*/

/*
The cookie-parser middleware, when used in an Express application, parses the cookies from the incoming HTTP request and populates the req.cookies object with the parsed cookie data. It provides a convenient way to access and manipulate cookies within your route handlers.
*/
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', (req, res) => {
    const username = req.cookies.username;
    res.cookie('username', 'John Doe', { maxAge: 900000, httpOnly: true });
    res.send(`Hello, ${username || 'Guest'}`);
});

// Cookies can be removed from the client using the res.clearCookie() method. 
res.clearCookie('username');


//Sessions
/*
A session refers to a period of interaction between a user and a web application. It represents a stateful conversation and allows the application to store and retrieve user-specific data across multiple requests.

Sessions are commonly used to maintain user authentication and store temporary data during a user's visit to a website. They are particularly useful for storing sensitive information that should not be exposed to the client, such as user credentials or authorization tokens.

Here's a general overview of how sessions work:

Session Creation: When a user first visits a website, the server assigns a unique session identifier to the user. This identifier is typically stored in a cookie on the client-side or appended to the URL.

Data Storage: The server maintains a data structure (often called a session store) that associates each session identifier with a set of session data. This data can be stored in memory, a database, or a separate caching system.

Accessing Session Data: During subsequent requests from the same user, the server uses the session identifier to retrieve the associated session data from the session store. This allows the server to access user-specific information and maintain the user's state across multiple requests.

Modifying Session Data: The server can modify the session data as needed during the user's session. This can include updating user preferences, storing temporary information, or managing the user's authentication status.

Session Expiry: Sessions typically have an expiration time to ensure that inactive sessions are eventually cleared. This can be defined by setting a maximum session duration or based on user inactivity.
*/

// cookieSession middleware
/*
It simplifies session management by storing session data directly in cookies on the client-side. This means that the session data is stored in the encrypted cookie itself rather than on the server or in a separate session store.
*/

const cookieSession = require('cookie-session');

app.use(cookieSession({
    name: 'session',
    keys: ['secret-key'],
    maxAge: 24 * 60 * 60 * 1000, // session expiration time (1 day)
}));

// Example route for setting a session variable
app.get('/set-session', (req, res) => {
    req.session.username = 'John'; // Set the session variable 'username'
    res.send('Session variable set!');
});

// Example route for accessing a session variable
app.get('/get-session', (req, res) => {
    const username = req.session.username; // Access the session variable 'username'
    res.send(`Username: ${username}`);
});

// Error handling middlewares
/*
Error handling middleware in Node.js applications is used to catch and handle errors that occur during the execution of the application. It allows you to centralize error handling logic and provide consistent error responses to clients. Here's an example of how to implement error handling middleware using Express.js:
*/

const express = require('express');
const app = express();

// ...other middleware and route handlers...

// Error handling middleware
app.use((err, req, res, next) => {
    // Handle the error
    console.error(err);

    // Set the appropriate status code for the error
    res.status(err.status || 500);

    // Send an error response to the client
    res.json({
        error: {
        message: err.message || 'Internal Server Error'
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

/*
• Now, imagine that you forgot to check a certain object and you do 
some operations with the undefined property. 
• Or you use a certain library and you get an error.
• It can break your instance, and the server will crash. 
• Then, the attacker can ping a specific endpoint where there is this 
vulnerability and can stop your server for a long time.
*/

// Custom Middleware
var express = require('express');
var app = express();

function queryRemover (req, res, next) { 
    console.log("\nBefore URL: ");
    console.log(req.url); 
    req.url= req.url.split('?')[0]; 
    console.log("\nAfter URL: "); 
    console.log(req.url); next();
};

app.use (queryRemover);

app.get('/no/query', function (req, res) { 
    res.send("test");
});

/*
This code will remove any query parameters from the URL before processing the route. For example, if the incoming URL is /no/query?param1=value1&param2=value2, the middleware will remove the ?param1=value1&param2=value2 portion, resulting in the URL /no/query. This allows the route handler to focus on the base URL without query parameters.
*/

//Third party middleware
/*
Use third-party middleware to add functionality to Express apps.
Install the Node.js module for the required functionality, then load it in 
your app at the application level or at the router level.
*/

//HTTP Authentication
/*
HTTP authentication is a mechanism used to secure access to web resources by requiring clients to provide valid credentials before they can access protected resources.

Basic Authentication:
It is a type of HTTP authentication.
Basic Authentication is a simple authentication scheme in which the client sends the username and password as Base64-encoded credentials in the HTTP request headers. The server validates these credentials to grant access to the protected resource. 
*/
const express = require('express');
const app = express();

const basicAuth = require('express-basic-auth');

// Middleware for Basic Authentication
const protectedAuth = basicAuth({
    users: {
        admin: 'password123', // Sample user: admin with password: password123
        john: 'hello', // Another sample user: john with password: hello
    },
    unauthorizedResponse: 'Unauthorized Access',
});

// Protected Route with Authentication Middleware
app.get('/protected', protectedAuth, (req, res) => {
    res.send('Welcome to the protected resource!');
});

// Public Route
app.get('/', (req, res) => {
    res.send('Public page');
});

// Start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});

/*
In this example, we define two sample users, admin and john, with their respective passwords. The middleware will check if the client provides valid credentials for any of these users before allowing access to the protected resource.

When a client sends a request to the /protected route, the Basic Authentication middleware is triggered. The client must include the Authorization header in the request with the Base64-encoded username and password in the format username:password. 

If the provided credentials are valid, the client is granted access to the protected resource and receives the "Welcome to the protected resource!" response. If the credentials are invalid or not provided, the middleware responds with an "Unauthorized Access" message.
*/

// Security - Doubt