import { EventBrite } from "./ticketmaster.js";
import { UI } from "./ui.js";

//Get references to DOM elements
const searchButton = document.getElementById('submitBtn');
const eventNameInput = document.getElementById('event-name');
const categoryInput = document.getElementById('category');

searchButton.addEventListener('click', async () => {
    const eventName = eventNameInput.value.trim();
    const category = categoryInput.value.trim();
    const eventbrite = new EventBrite();
    const ui = new UI(eventbrite);
    //Add click event listener to the button


    //Call event logic
    if (eventName !== '') {
    //Query Event Brite API
        eventbrite.queryAPI(eventName, category)
            .then (events => {
                    //Check for events
                const eventList = events.events.events;
                if (eventList.length > 0) {
                    //Print the events
                    ui.displayEvents(eventsList);

                } else {
                        //There are no events, print a message
                    ui.printMessage('No Results Found', 'text-center alert alert-danger mt-4');  
                }         
            })
            .catch(error => {

                console.error('Error querying Eventbrite API:', error);
                ui.printMessage('Error fetching events. Please try again.', 'text-center alert')
            })
    } else {
       
            //Print a message
      await  ui.printMessage('Add an Event or City',  'text-center alert alert-danger mt-4');
    }
});
