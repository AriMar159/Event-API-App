export class UI {
    constructor(eventbrite) {
        this.init();
        this.result = document.getElementById("results");
    }

    init() {
        console.log("UI Initialized");
    }

    // Display events in the results section
    displayEvents(events) {
        let HTMLTemplate = "";

        events.forEach(event => {
            const eventName = event.name || "No Event Name Available";
            const eventDate = event.dates?.start?.localDate || "No Date Available";
            const eventTime = event.dates?.start?.localTime || "No Time Available";
            const eventImage = event.images?.[0]?.url || "https://via.placeholder.com/150";
            const eventUrl = event.url || "#";

            HTMLTemplate += `
            <div class="event">
                <img src="${eventImage}" alt="Event Image" style="width:100%; max-width:300px;">
                <h2>${eventName}</h2>
                <p>Date: ${eventDate}</p>
                <p>Time: ${eventTime}</p>
                <a href="${eventUrl}" target="_blank">View Details</a>
            </div>
            <hr>`;
        });

        this.result.innerHTML = HTMLTemplate;
    }

    // Display a message
    printMessage(message, className) {
        // Create a div
        const div = document.createElement("div");
        div.className = className;
        div.appendChild(document.createTextNode(message));

        // Insert into the DOM
        const container = document.querySelector(".container");
        container.insertBefore(div, this.result);

        // Remove the message after 3 seconds
        setTimeout(() => {
            const alert = document.querySelector(`.${className}`);
            if (alert) alert.remove();
        }, 3000);
    }
}
