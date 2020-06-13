/* Global Variables */
const btn = document.querySelector( "#generate" ),
    zipInput = document.querySelector( "#zip" ), 
    feelingsInput = document.querySelector( "#feelings" );

// Personal API Key for OpenWeatherMap API
const apikey = '62f2b672194d4136da89832a175ba8ae';
const endpoint = 'http://api.openweathermap.org/',

//example = 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=c88b9d9f14854c57985e94d399cce307';
// `http://api.openweathermap.org/data/2.5/weather?zip=${ zipcode},&appid=${ apikey }`;
 


// Create a new date instance dynamically with JS
const generateDate = () => {
    const d = new Date();
    const newDate = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;
    return newDate;
}

//

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
    console.log( data );
    try
    {
        await fetch( url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify( data )
        } ).then( data => data.json() )
            .then( data => console.log( data ) )
        
    } catch ( error )
    {
        console.log( "error: ", error );

    }
}

/* Function to GET Project Data */
const getData = async () => {
    try {
        await fetch( '/api/getdata' )
            .then( data => data.json() )
            .then(data => console.log(data))
    } catch (error) {
        console.log("error: ", error)
    }
}

/* Function called by event listener */
const performProcess = () => {

    zip = zipInput.value;
    feelings = feelingsInput.value;

    if ( zip !== '' && feelings !== '' )
    {
        const apiCall = `${ endpoint }/2.5/weather?zip=${ zipcode },${ countrycode }&appid=${ apikey }`;
        getWeatherData( apiCall );
    } else
    {
        let msg = '';
        ( zip === '' ) ? msg = 'zip input is empty' : msg = 'feelings input is empty';
    }

}

// Event listener to add function to existing HTML DOM element
btn.addEventListener( 'click', performProcess );
