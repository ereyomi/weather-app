// Require Express to run server and routes
const express = require( 'express' );

// Start up an instance of app
const app = express();

/* Dependences */
const bodyParser = require( 'body-parser' );

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require( 'cors' );
app.use( cors() );

// Initialize the main project folder
app.use( express.static( 'website' ) );


// Setup Server

const port = 8000;

const server = app.listen( port, () => {
    console.log( "server running" );
    console.log( "running on localhost: ", port );
} )


// Setup empty JS object to act as endpoint for all routes
projectData = [];

//generate unique ID
const generateUID = () => {
    return Math.random().toString( 36 ).substring( 2, 15 ) + Math.random().toString( 36 ).substring( 2, 15 )
}

// Callback function to complete GET '/all'
app.get( '/api/getdata', (req, res) => {
    res.send(projectData)
})

// Post Route
app.post( '/api/postdata', ( req, res ) => {
    const data = {
        id: generateUID(),
        ...req.body
    }
    projectData.push( data );
    res.send( projectData );
} )