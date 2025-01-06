// const { env } = require('node:process')

export class EventBrite {
//Constructor when instantiate
    constructor() {
        this.ticketmasterApiKey = 'hfBHdQuTwelptWFArSc1OwFGDLhmOmes';
    }

//Get the Events for API
    async queryAPI(eventName, category) {
        const eventResponse = await fetch (`https://app.ticketmaster.com/discovery/v2/events.json?size=1&apikey=${this.ticketmasterApiKey}`);

        //Wait for response and return as json

        const events = await eventResponse.json();

        return {
            events
        }
    }

    //Get catergories from API
    async getCategoriesAPI() {
        //Query the API
        const categoriesResponse = await fetch(`https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=${this.ticketmasterApiKey}`)
       .then(response => console.log(response))
       .catch(error => console.error(error));
       
        //Wait for response and return as JSON
        const categories = await categoriesResponse.json();
        return categories;
    }
}