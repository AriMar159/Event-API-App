const apiKey = 'hfBHdQuTwelptWFArSc1OwFGDLhmOmes';

const eventsContainer = document.getElementById("events");

async function fetchRandomEvents() {
    try {
        const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&size=5`;
        const response = await fetch(url);
        const data = await response.json();
        return data._embedded.events;
    } catch (error) {
        console.error("Error fetching random events:", error);
        return [];
    }   
}

function displayEvents(events) {
    eventsContainer.innerHTML = ""; // Clear previous results
    events.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");
        const img = document.createElement("img");
        img.src = event.images[0].url;
        img.alt = event.name;
        const title = document.createElement("h2");
        title.textContent = event.name;
        const date = document.createElement("p");
        date.textContent = event.dates.start.localDate;
        eventCard.appendChild(img);
        eventCard.appendChild(title);
        eventCard.appendChild(date);
        eventCard.addEventListener("click", () => {
            window.open(event.url, "_blank");
        });
        eventsContainer.appendChild(eventCard);
    });
}
searchButton.addEventListener("click", async () => {
    const city = document.getElementById("city").value;
    const classification = document.getElementById("classification").value;
    fetchEvents(city, classification);
});

async function fetchEvents(city, classification) {
    if (!city || !classification) {
        alert("Please enter both city and classification.");
        return;
    }
    const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&city=${city}&classificationId=${classification}&size=5`;
    try {
        const response = await fetch(url);
        const data = await response.json();
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