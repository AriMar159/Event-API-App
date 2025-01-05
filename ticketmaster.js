// const { env } = require('node:process')

export class EventBrite {
//Constructor when instantiate
    constructor() {
        this.auth_token = 'ITXKB4PKNMDESWD2OKA6';
        this.orderby = 'date';
    }

//Get the Events for API
    async queryAPI(eventName, category) {
        const eventResponse = await fetch (`https://www.eventbriteapi.com/v3/events/search/?q=${eventName}&sort_by=${this.orderby}&categories=${category}&token=${this.auth_token}`);

        //Wait for response and return as json

        const events = await eventResponse.json();

        return {
            events
        }
    }

    //Get categories from API
    async getCategoriesAPI() {
        //Query the API
        const categoriesResponse = await fetch(`https://www.eventbriteapi.com/v3/categories/?token=${this.auth_token}`)
       .then(response => console.log(response))
       .catch(error => console.error(error));
       
        //Wait for response and return as JSON
        const categories = await categoriesResponse.json();
        return categories;
    }
}