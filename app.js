import { EventBrite } from "./ticketmaster.js";
import { UI } from "./ui.js";

// Initialize EventBrite and UI
const eventbrite = new EventBrite();
const ui = new UI(eventbrite);

// Event listener for search button
document.getElementById("searchBtn").addEventListener("click", async () => {
    const eventName = document.getElementById("event-name").value.trim();
    const city = document.getElementById("city").value.trim();

    // Check if inputs are provided
    if (!eventName && !city) {
        ui.printMessage("Please enter an event name or city", "alert alert-danger text-center");
        return;
    }

    try {
        // Query the Ticketmaster API
        const { events } = await eventbrite.queryAPI(eventName, city);

        // Check for events and display
        if (events.length > 0) {
            ui.displayEvents(events);
        } else {
            ui.printMessage("No events found. Try another search.", "alert alert-warning text-center");
        }
    } catch (error) {
        console.error("Error fetching events:", error);
        ui.printMessage("Error fetching events. Try again later.", "alert alert-danger text-center");
    }
});
