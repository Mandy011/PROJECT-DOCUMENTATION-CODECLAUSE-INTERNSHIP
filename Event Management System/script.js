// Utility Class for Event ID Management
class ID {
    /**
     * Generate an array of unique event IDs
     * @param {number} start - Start number for IDs
     * @param {number} end - End number for IDs
     * @returns {Array}
     */
    static createArrayOfNumbers(start, end) {
        return Array.from({ length: Math.ceil((end - start + 1) / 25) }, (_, i) => `OAD${start + i * 25}`);
    }

    /**
     * Get a random index within a range
     * @param {number} min - Minimum index
     * @param {number} max - Maximum index
     * @returns {number}
     */
    static getRandomIndexOfArray(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Initialize event IDs in localStorage
     */
    static setEventsIds() {
        if (!localStorage.getItem("event_ids")) {
            const ids = ID.createArrayOfNumbers(100, 999);
            localStorage.setItem("event_ids", JSON.stringify(ids));
        }
    }
}

// Event Store Class for managing localStorage
class EventStore {
    fetchEventsId() {
        return JSON.parse(localStorage.getItem("event_ids")) || [];
    }

    addEventIds(eventIds) {
        localStorage.setItem('event_ids', JSON.stringify(eventIds));
    }

    fetchEvents() {
        return JSON.parse(localStorage.getItem("events")) || [];
    }

    addEvents(events) {
        localStorage.setItem('events', JSON.stringify(events));
    }

    deleteEvent(eventId) {
        let events = this.fetchEvents().filter(event => event.event_id !== eventId);
        this.addEvents(events);
    }
}

// UI Class for managing interactions
class UI {
    constructor(storage) {
        this.storage = storage;
    }

    addEvent() {
        const formValues = this.getFormValues();
        this.clearForm();

        const eventIds = this.storage.fetchEventsId();
        const randomIndex = ID.getRandomIndexOfArray(0, eventIds.length - 1);
        const event_id = eventIds.splice(randomIndex, 1)[0];

        this.storage.addEventIds(eventIds);

        const events = this.storage.fetchEvents();
        events.push({ event_id, ...formValues });
        this.storage.addEvents(events);

        this.appendEvent({ event_id, ...formValues });
    }

    getFormValues() {
        return {
            event_name: document.querySelector("#eventName").value,
            event_start_date: document.querySelector("#startDate").value,
            event_end_date: document.querySelector("#endDate").value,
            event_total_expect_registration: document.querySelector("#totalExRgs").value,
            event_type: document.querySelector("#typeOfEvent").value,
            event_host_name: document.querySelector("#hostName").value,
            event_speaker_name: document.querySelector("#speakerName").value
        };
    }

    clearForm() {
        document.querySelectorAll('#event_form input, #event_form select').forEach(input => input.value = '');
    }

    appendEvent(event) {
        const eventContainer = document.createElement('div');
        eventContainer.dataset.id = event.event_id;
        eventContainer.classList.add("event");
        eventContainer.innerHTML = `
            <div class="card text-dark mt-3 mb-3">
                <div class="card-header">
                    <h5>${event.event_name} <span class="badge bg-info">${event.event_id}</span></h5>
                    <button class="btn btn-sm btn-outline-danger delete" data-id="${event.event_id}">Delete</button>
                    <button class="btn btn-sm btn-outline-primary edit" data-id="${event.event_id}">Edit</button>
                </div>
                <div class="card-body">
                    <p><b>Host:</b> ${event.event_host_name}</p>
                    <p><b>Speaker:</b> ${event.event_speaker_name}</p>
                    <p><b>Start Date:</b> ${event.event_start_date}</p>
                    <p><b>End Date:</b> ${event.event_end_date}</p>
                    <p><b>Type:</b> ${event.event_type}</p>
                    <p><b>Expected Registration:</b> ${event.event_total_expect_registration}</p>
                </div>
            </div>`;
        document.querySelector("#events_list").appendChild(eventContainer);
    }

    listEvents() {
        const events = this.storage.fetchEvents();
        events.forEach(event => this.appendEvent(event));
    }

    deleteEvent(event) {
        if (event.target.classList.contains('delete')) {
            const eventId = event.target.dataset.id;
            document.querySelector(`.event[data-id='${eventId}']`).remove();
            this.storage.deleteEvent(eventId);
        }
    }

    editEvent(event) {
        if (event.target.classList.contains('edit')) {
            const eventId = event.target.dataset.id;
            const events = this.storage.fetchEvents();
            const eventToEdit = events.find(event => event.event_id === eventId);
            if (eventToEdit) {
                document.querySelector("#eventName").value = eventToEdit.event_name;
                document.querySelector("#startDate").value = eventToEdit.event_start_date;
                document.querySelector("#endDate").value = eventToEdit.event_end_date;
                document.querySelector("#totalExRgs").value = eventToEdit.event_total_expect_registration;
                document.querySelector("#typeOfEvent").value = eventToEdit.event_type;
                document.querySelector("#hostName").value = eventToEdit.event_host_name;
                document.querySelector("#speakerName").value = eventToEdit.event_speaker_name;
                this.storage.deleteEvent(eventId);
            }
        }
    }
}

const ui = new UI(new EventStore());

document.querySelector("#event_form").addEventListener("submit", event => {
    event.preventDefault();
    ui.addEvent();
});

document.addEventListener('DOMContentLoaded', () => {
    ui.listEvents();
    ID.setEventsIds();
});

document.querySelector("#events_list").addEventListener('click', event => {
    ui.deleteEvent(event);
    ui.editEvent(event);
});
