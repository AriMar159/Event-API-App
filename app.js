if (eventName !== '') {

    eventbrite.queryAPI(eventName, category)
        .then (events => {

            const eventList = events.events.events;
            if (eventList.length > 0) {

                ui.displayEvents(events.events);

            } else {

                ui.printMessage('No Results Found', 'text-center alert alert-danger mt-4');  
            }         
        })
}else{

    ui.printMessage('Add an Event or City',  'text-center alert alert-danger mt-4');
}