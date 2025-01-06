import { EventBrite } from "./ticketmaster.js";

export class UI {
    constructor(eventbrite) {
        // App initialization
       this.init(eventbrite);
    }

    // Method when the app starts
    async init (eventbrite) {
        // Display categories in <select>
       await this.printCategories(eventbrite);

        // Select the results container
        this.result = document.getElementById('result');
    }

    // Display events from the API
    displayEvents(events) {
        // Build a template
        let HTMLTemplate = '';

        // Loop through events and print the result
        events.forEach(eventInfo => {
            HTMLTemplate += `
            <div class="col-md-4 mt-4"> 
                <div class="card">
                    <img class="img-fluid mb-2" src="${eventInfo.logo !== null ? eventInfo.logo.url : 'https://via.placeholder.com/150'}" alt="Event Image">
                    <div class="card-body">
                        <h2 class="text-center card-title">${eventInfo.name.text}</h2>
                        <p class="lead text-info">Event Information:</p>
                        <p>${eventInfo.description.text ? eventInfo.description.text.substring(0, 200) : 'No description available.'}...</p>
                        <span class="badge badge-primary">Capacity: ${eventInfo.capacity || 'Not available'}</span>
                        <span class="badge badge-secondary">Date & Time: ${eventInfo.start.local}</span>
                        <a href="${eventInfo.url}" target="_blank" class="btn btn-primary btn-block mt-4">Get Tickets</a>
                    </div>
                </div>
            </div>`;
        });

        // Insert the template into the results container
        this.result.innerHTML = HTMLTemplate;
    }

    // Print categories in the <select>
    async printCategories(eventbrite) {
        await eventbrite.getCategoriesAPI()
            .then(categories => {
                const categoriesList = categories.categories; // Update based on actual API response structure
                const categoriesSelect = document.querySelector('#category');
                // Insert categories into <select>
                categoriesList.forEach(category => {
                    // Create the option element
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.textContent = category.name;
                    categoriesSelect.appendChild(option);
                });
            })
            .catch(error => console.log('Error fetching categories:', error));
    }

    // Display a message
    printMessage(message, className) {
        // Create a div
        const div = document.createElement('div');
        div.className = className;
        // Add the text
        div.appendChild(document.createTextNode(message));

        // Insert into the HTML
        const searchDiv = document.querySelector('#search-events');
        searchDiv.appendChild(div);

        // Remove the alert after 3 seconds
        setTimeout(() => {
            this.removeMessage();
        }, 3000);
    }

    // Remove the message
    removeMessage() {
        const alert = document.querySelector('.alert');
        if (alert) {
            alert.remove();
        }
    }
}

