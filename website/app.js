/* Global Variables */

//global declearation for formatting date for UI
let days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];
let months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
const w = {
    "coord": { "lon": -122.08, "lat": 37.39 },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 282.55,
        "feels_like": 281.86,
        "temp_min": 280.37,
        "temp_max": 284.26,
        "pressure": 1023,
        "humidity": 100
    },
    "visibility": 16093,
    "wind": {
        "speed": 1.5,
        "deg": 350
    },
    "clouds": {
        "all": 1
    },
    "dt": 1560350645,
    "sys": {
        "type": 1,
        "id": 5122,
        "message": 0.0139,
        "country": "US",
        "sunrise": 1560343627,
        "sunset": 1560396563
    },
    "timezone": -25200,
    "id": 420006353,
    "name": "Mountain View",
    "cod": 200
};

//button and inputs
const btn = document.querySelector( "#generate" ),
    zipInput = document.querySelector( "#zip" ), 
    feelingsInput = document.querySelector( "#feelings" );

//
// Personal API Key for OpenWeatherMap API
const apikey = '62f2b672194d4136da89832a175ba8ae';
const endpoint = 'http://api.openweathermap.org/';

//example = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=c88b9d9f14854c57985e94d399cce307';
// `http://api.openweathermap.org/data/2.5/weather?zip=${ zipcode},&appid=${ apikey }`;
 


// Create a new date instance dynamically with JS
const generateDate = () => {
    const d = new Date();
    const newDate = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;
    return newDate;
}
//format date
const formatDate = (date) => {

    let currentDate = new Date( date);
    /* save the above information using the below things I console log */
    console.log( 'year: ', currentDate.getFullYear() );
    console.log( 'Month: ', currentDate.getMonth(), " - ", months[ currentDate.getMonth() ] );
    console.log( 'day: ', currentDate.getDate(), days[ currentDate.getDay() ] );
}
//convert Temp To Celcius
const convertTempToCelcius = (temp) => {
    const celcius = temp - 273; //passed in temperature is in kelvin
    return celcius.toFixed(2);
}

/* Function to GET Web API Data*/
const getWeatherData = async ( api ) => {
    try
    {
        console.log(api)
        await fetch( api )
            .then( data => data.json() )
            .then( data => console.log( data ) )
    } catch ( error )
    {
        console.log( "error: ", error )
    }
}

/* Function to POST data */
const postData = async ( url = '', data = {} ) => {
    try
    {
        const options = {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( data )
        };
        
        try {
            await fetch( url, options )
                .then( res => res.json() )
                .then( data => console.log( "posted: ", data ) );
            
        } catch (error) {
            console.log("error: ", error)
        }
        
    } catch ( error )
    {
        console.log( "error: ", error );

    }
}

/* Function to GET Project Data */
const getData = async( url = '/api/getdata' ) => {
    try
    {
        const res = await fetch( url );
        const d = await res.json();
        return d;

    } catch (error) {
        console.log("error: ", error)
    }
}

/* create card UI */
const createCard = (data, parent) => {
    //parent
    
    const divParent = parent;
    const card = document.createElement( 'div' );
    card.setAttribute( 'class', 'card' );
   /*  const childrenClasses = [ 'date', 'temp', 'location', 'content' ];

    childrenClasses.forEach( childClass => {
        const createParagraph = document.createElement( 'p' );
        createParagraph.setAttribute( 'class', `${ childClass }` );
        card.appendChild( createParagraph );
    } ) */
    card.innerHTML = `
        <p id="date">${data.date}</p>
        <p id="temp">${convertTempToCelcius( data.temperature )}&#8451;</p>
        <p id="location">${data.name}</p>
        <p id="content">${data.weather_description}</p>
        <p id="content">${data.feelings}</p>
    `; 
    divParent.appendChild( card );
};
/* update UI */
const updateUserInterface = async () => {

   
    getData().then( data => {

        if ( typeof data !== null && data.length > 0 )
        {
            const divParent = document.querySelector( '#entryHolder' );
            divParent.innerHTML = '';
            data.map( d => createCard( d, divParent ) );

        } else
        {
            console.log("empty data")
        }
        } )
}

/* Function called by event listener */
const performProcess = event => {

    event.preventDefault();
    
    const zip = zipInput.value;
    const feelings = feelingsInput.value;
    
    if ( zip !== '' && feelings !== '' )
    {
        //const apiCall = `${ endpoint }/2.5/weather?zip=${ zipcode },${ countrycode }&appid=${ apikey }`;
        //const weatherData = getWeatherData( apiCall );
        const weatherData = w;
        const toSenddata = {
            date: generateDate(),
            temperature: weatherData.main.temp,
            feelings,
            name: weatherData.name,
            weather_description: weatherData.weather[0].description,
        }
        /* post data to project data */
        postData( '/api/postdata', toSenddata );

        /* update UI */
        updateUserInterface();
        
        
    } else
    {
        let msg = '';
        if ( zip === '' && feelings === '')
        {
            msg = 'Zip input and feeling Input are empty'
        } else if (zip === '')
        {
            msg = 'zip input is empty';
        } else {
            msg = 'feelings input is empty';
        }
        alert( msg );
    }

}

// Event listener to add function to existing HTML DOM element
btn.addEventListener( 'click', performProcess );
