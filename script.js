async function fetchData() {}

document.getElementById("searchBtn").addEventListener("click", function() {
    const city = document.getElementById("city").value;
    const classification = document.getElementById("classification").value;

    fetchEvents(city, classification);
});

// Fetch available classifications
async function fetchClassifications() {
    const apiKey = 'hfBHdQuTwelptWFArSc1OwFGDLhmOmes';
    const url = `https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Populate the classification dropdown
        populateClassificationDropdown(data._embedded.classifications);
    } catch (error) {
        console.error("Error fetching classifications:", error);
    }
}

// Populate classification dropdown list
function populateClassificationDropdown(classifications) {
    const classificationSelect = document.getElementById("classification");

    // Clear any existing options
    classificationSelect.innerHTML = '';

    // Add a default "Select classification" option
    const defaultOption = document.createElement("option");
    defaultOption.text = "Select classification";
    defaultOption.value = "";
    classificationSelect.appendChild(defaultOption);

    // Populate the dropdown with classifications
    classifications.forEach(classification => {
        const option = document.createElement("option");
        option.value = classification.segment.id;
        option.text = classification.segment.name;
        classificationSelect.appendChild(option);
    });
}

// Fetch events based on city and classification
async function fetchEvents(city, classification) {
    if (!city || !classification) {
        alert("Please enter both city and classification.");
        return;
    }

    const apiKey = 'hfBHdQuTwelptWFArSc1OwFGDLhmOmes'; // Use your actual API key
    console.log(classification)
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${city}&classificationId=${classification}&size=5`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Check if the API has returned events
        if (data._embedded && data._embedded.events) {
            displayEvents(data._embedded.events);
        } else {
            alert("No events found for this search.");
        }
    } catch (error) {
        console.error("Error fetching events:", error);
        alert("There was an error fetching events.");
    }
}

// Display fetched events
function displayEvents(events) {
    const eventsContainer = document.getElementById("events");
    eventsContainer.innerHTML = ''; // Clear previous events

    events.forEach(event => {
        const eventImage = event.images && event.images.length > 0 ? event.images[0].url : 'https://via.placeholder.com/150';
        const eventElement = document.createElement("div");
        eventElement.classList.add("event");
        eventElement.innerHTML = `
            <h2>${event.name}</h2>
            <img src="${eventImage}" alt="${event.name}" style="width: 100%; max-width: 300px; height: auto;"/>
            <p><strong>Date:</strong> ${event.dates.start.localDate}</p>
            <p><strong>Venue:</strong> ${event._embedded.venues[0].name}</p>
            <p><strong>Location:</strong> ${event._embedded.venues[0].city.name}</p>
            <a href="${event.url}" target="_blank">Buy Tickets</a>
        `;
        eventsContainer.appendChild(eventElement);
    });
}

// Initial classification dropdown
fetchClassifications();document.getElementById("searchBtn").addEventListener("click", function() {
    const city = document.getElementById("city").value;
    const classification = document.getElementById("classification").value;

    fetchEvents(city, classification);
});

// Fetch available classifications
async function fetchClassifications() {
    const apiKey = 'hfBHdQuTwelptWFArSc1OwFGDLhmOmes'; // Use your actual API key
    const url = `https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Populate the classification dropdown
        populateClassificationDropdown(data._embedded.classifications);
    } catch (error) {
        console.error("Error fetching classifications:", error);
    }
}

// Populate classification dropdown list
function populateClassificationDropdown(classifications) {
    const classificationSelect = document.getElementById("classification");

    // Clear any existing options
    classificationSelect.innerHTML = '';

    // Add a default "Select classification" option
    const defaultOption = document.createElement("option");
    defaultOption.text = "Select classification";
    defaultOption.value = "";
    classificationSelect.appendChild(defaultOption);

    // Populate the dropdown with classifications
    classifications.forEach(classification => {
        const option = document.createElement("option");
        option.value = classification.segment.id;
        option.text = classification.segment.name;
        classificationSelect.appendChild(option);
    });
}

