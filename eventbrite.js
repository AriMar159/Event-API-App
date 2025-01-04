class EventBrite{
//Constructor when instantiate
    constructor() {
        this.auth_token = '';
        this.orderby = 'date';
    }

//Get the Events for API
    async queryAPI(eventName, category) {
        const eventResponse = await fetch (``);

        //Wait for response and return as json

        const events = await eventResponse.json();

        return {
            events
        }
    }

    //Get categories from API
    async getCategoriesAPI( {
        //Query the API
        const categoriesResponse = await fetch(``);
    })
}