const express = require('express');
const app = express();

const hostname = '127.0.01'
const port= 5000
console.log('127.0.01:5000')


// Set the view engine to EJS
app.set('view engine', 'ejs');

// Define a route for the home page
app.get("/", (req, res) => {
    console.log("Here")
    res.send(`<h1>`+'surya'+`</h1>`)
    res.render("index", { text: "World" })
})
 
// Import and use the user router
const userRouter = require("./routes/users.js"); // use is usually implemented before get. So it acts as a middlewarez
app.use(userRouter);

// Start the server
app.listen(port,hostname)
