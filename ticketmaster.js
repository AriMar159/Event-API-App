export class EventBrite {
    constructor() {
        this.apiKey = "hfBHdQuTwelptWFArSc1OwFGDLhmOmes"; // Replace with your Ticketmaster API key
    }

    // Fetch events based on event name and city
    async queryAPI(eventName, city) {
        try {
            const queryParams = new URLSearchParams({
                apikey: this.apiKey,
                keyword: eventName || "",
                city: city || "",
            });

            const url = `https://app.ticketmaster.com/discovery/v2/events.json?${queryParams}`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Failed to fetch events: ${response.status}`);
            }

            const data = await response.json();
            const events = data._embedded?.events || [];
            return { events };
        } catch (error) {
            console.error("Error in queryAPI:", error);
            throw error;
        }
    }
}
