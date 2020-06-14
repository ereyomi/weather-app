### Weather-Journal App Project
This is the third project for the udacity frontend nanodegree program.

## Description
This project's aim is to create an asynchronous web app that uses Web API and user data to dynamically update the UI for a Weather-Journal App. 

The project makes use of the [OpenWeatherMap.com] API to retrieve current weather information on the zip code area that is passed in by the user. 

This data is then formatted and saved in an object on the server.

Finally, it is sent to the browser and displayed in the user interface.

### setup app yourself
1. Clone the repo
2. Delete package.json
3. `npm install body-parser` - middleware
4. `npm install cors`
5. `npm install express`
6. `npm install nodemon`
    run `nodemon [your app name]` instead of node [your app name] e.g 
    `nodemon server.js` to start project
7. visit `localhost:8000` on your browser

### setup app using package.json
1. Clone the repo
2. `npm install` - middleware
3. 	run `nodemon server.js` to start
4. visit `localhost:8000` on your browser