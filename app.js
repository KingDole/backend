//setup... this is similar to when we use our default tags in html
const express = require ("express");
//activate or tell this app variable to be an express server
const app = express();
const router = express.Router();

//start the web server... app.listen(portnumber, function)
app.listen(3000, function(){
    console.log("Listening on port 3000");
})

//making an api using routes
//Routes are used to handle browser requests. They look like URLs. The difference is that when a browser requests a route, it is dynamically handled using a function.

//GET or a regular request when someone goes to http://localhost:3000/hello. When using a function in a route, we almost always have a paramter or handle a response and request.
app.get("/hello", function(req,res){
    res.send("<h1>Hello, Express</h1>");
})

app.get("/goodbye", function(req,res){
    res.send("<h1>Goodbye, Express</h1>");
})