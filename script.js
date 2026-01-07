const eventsContainer = document.getElementById("eventsContainer");
const eventForm = document.getElementById("eventForm");
const warningMsg = document.getElementById("warningMsg");
const searchInput = document.getElementById("searchInput");

// Initial Events
let events = [
    {
        name: "Tech Conference",
        date: "2025-02-10",
        description: "A conference about latest technologies."
    },
    {
        name: "Music Festival",
        date: "2024-11-15",
        description: "Live music and fun."
    }
];

// Display current year
document.getElementById("year").textContent = new Date().getFullYear();

// Render Events
function renderEvents(filter = "") {
    eventsContainer.innerHTML = "";

    const today = new Date().toISOString().split("T")[0];

    events
        .filter(event =>
            event.name.toLowerCase().includes(filter.toLowerCase()) ||
            event.date.includes(filter)
        )
        .forEach((event, index) => {
            const card = document.createElement("div");
            card.classList.add("event-card");

            if (event.date < today) {
                card.classList.add("past");
            }

            card.innerHTML = `
                <h3>${event.name}</h3>
                <p><strong>Date:</strong> ${event.date}</p>
                <p>${event.description}</p>
                <button onclick="deleteEvent(${index})">Delete</button>
            `;

            eventsContainer.appendChild(card);
        });
}

// Add Event
eventForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("eventName").value.trim();
    const date = document.getElementById("eventDate").value;
    const description = document.getElementById("eventDescription").value.trim();

    if (!name || !date || !description) {
        warningMsg.textContent = "All fields are required!";
        return;
    }

    warningMsg.textContent = "";

    events.push({ name, date, description });

    // Sort by date
    events.sort((a, b) => new Date(a.date) - new Date(b.date));

    eventForm.reset();
    renderEvents();
});

// Delete Event
function deleteEvent(index) {
    events.splice(index, 1);
    renderEvents();
}

// Search
searchInput.addEventListener("input", function () {
    renderEvents(this.value);
});

// Initial Render
renderEvents();
