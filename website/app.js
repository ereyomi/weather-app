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

//button and inputs
const btn = document.querySelector( "#generate" ),
    zipInput = document.querySelector( "#zip" ), 
    feelingsInput = document.querySelector( "#feelings" );


// Personal API Key for OpenWeatherMap API
const apikey = '62f2b672194d4136da89832a175ba8ae';
const endpoint = 'http://api.openweathermap.org/';
const baseUrl = `${ endpoint }/data/2.5/weather?zip=`;
//http://api.openweathermap.org/data/2.5/weather?zip=94040,us&appid=62f2b672194d4136da89832a175ba8ae&units=imperial


// Create a new date instance dynamically with JS
const generateDate = () => {
    const d = new Date();
    const newDate = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;
    return newDate;
}
//format date
const formatDate = (date) => {

    let theDate = new Date( date);
    //months[ theDate.getMonth() ]
    return `${ days[ theDate.getDay() ] } ${ theDate.getDay() }, ${ theDate.getFullYear()} `;
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
        const options = {
            method: 'POST',
            mode: 'CORS',   
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( data )
        };
        console.log(api)
        await fetch( api, options )
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
            const resp = await fetch( url, options )
            const respData = resp.json();

            return respData;
            
        } catch (error) {
            console.log( error );
        }
        
    } catch ( error )
    {
        alert( "error: ", error );

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
        alert( error );
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
        <p id="date">${formatDate(data.date)}</p>
        <p id="temp">${data.temperature}&#8451;</p>
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
    
    const zipcode = zipInput.value;
    const feelings = feelingsInput.value;
    
    if ( zip !== '' && feelings !== '' )
    {
        const apiCall = `${ baseUrl }${ zipcode },&appid=${ apikey }&units=imperial`;
        getData( apiCall )
        .then( data => {
            const toSenddata = {
                date: generateDate(),
                temperature: data.main.temp,
                feelings,
                name: data.name,
                weather_description: data.weather[ 0 ]?.description,
            }
            /* post data to project data */
            postData( '/api/postdata', toSenddata )
            .then( data => {
                    if ( data !== null || typeof data !== 'undefined' )
                    {
                        /* update UI */
                        updateUserInterface();

                    } else
                    {
                        alert( "An error occur while trying to post weather data" );
                   } 
            })

            
        }
            
        )
        
        
        
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
