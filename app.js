if (eventName !== '') {
//Query Event Brite API
    eventbrite.queryAPI(eventName, category)
        .then (events => {
                //Check for events
            const eventList = events.events.events;
            if (eventList.length > 0) {
                //Print the events
                ui.displayEvents(events.events);

            } else {
                    //There are no events, print a message
                ui.printMessage('No Results Found', 'text-center alert alert-danger mt-4');  
            }         
        })
}else{
        //Print a message
    ui.printMessage('Add an Event or City',  'text-center alert alert-danger mt-4');
}