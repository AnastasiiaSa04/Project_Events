const eventsStore = [
    {
        title: "INFJ Personality Type - Coffee Shop Meet & Greet",
        description: "Being an INFJ",
        date: new Date(2024, 2, 23, 15),
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w ",
        type: "offline",
        attendees: 99,
        category: "Hobbies and Passions",
        distance: 50,
    },
    {
        title: "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
        description: "New York AI Users",
        date: new Date(2024, 2, 23, 11, 30),
        image: "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
        type: "offline",
        attendees: 43,
        category: "Technology",
        distance: 25,
    },
    {
        title: "Book 40+ Appointments Per Month Using AI and Automation",
        description: "New Jersey Business Network",
        date: new Date(2024, 2, 16, 14),
        image: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "online",
        category: "Technology",
        distance: 10,
    },
    {
        title: "Dump writing group weekly meetup",
        description: "Dump writing group",
        date: new Date(2024, 2, 13, 11),
        image: "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "online",
        attendees: 77,
        category: "Business",
        distance: 100,
    },
    {
        title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
        description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
        date: new Date(2024, 2, 14, 11),
        image: "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "online",
        attendees: 140,
        category: "Social Activities",
        distance: 75,
    },
    {
        title: "All Nations - Manhattan Missions Church Bible Study",
        description: "Manhattan Bible Study Meetup Group",
        date: new Date(2024, 2, 14, 11),
        image: "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        type: "offline",
        category: "Health and Wellbeing",
        distance: 15,
    },
];

function formatDate(date) {
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', timeZoneName: 'short' };
    return date.toLocaleString('en-US', options);
}

function createCard(event) {
  const typeLabel = event.type === "offline" ? `${event.distance} km` : "online";
  const attendees = event.attendees ? `<span>${event.attendees} attendees</span>` : "";

  return `
    <div class="cards_column">
      <img src="${event.image}" alt="img">
      <div class="info">
        <time>${formatDate(event.date)}</time>
        <h4>${event.title}</h4>
        <p>${event.category} (${typeLabel})</p>
        ${attendees}
      </div>
    </div>
  `;
}

function renderEvents(events) {
  const container = document.getElementById("events-container");
  container.innerHTML = "";
  events.forEach(event => {
    container.insertAdjacentHTML("beforeend", createCard(event));
  });
}

const activeFilters = {
  type: "all",
  distance: "all",
  category: "all",
  day: "all",
};

function applyFilters() {
  const filtered = eventsStore.filter(event => {
    if (activeFilters.type !== "all" && event.type !== activeFilters.type) {
      return false;
    }

    if (
      activeFilters.distance !== "all" &&
      event.type === "offline" &&
      event.distance > parseInt(activeFilters.distance)
    ) {
      return false;
    }

    if (
      activeFilters.category !== "all" &&
      event.category.toLowerCase() !== activeFilters.category.toLowerCase()
    ) {
      return false;
    }

    if (
      activeFilters.day !== "all" &&
      getDayKey(event.date) !== activeFilters.day
    ) {
      return false;
    }

    return true;
  });

  renderEvents(filtered);
}

function getDayKey(date) {
  return date.toISOString().split("T")[0]; // YYYY-MM-DD
}

function getDayLabel(date) {
  return date.toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
  });
}

function insertDayFilter() {
  const container = document.querySelector(".dropdown_all");

  // Создаем список уникальных дней из eventsStore
  const uniqueDaysMap = new Map();
  eventsStore.forEach(event => {
    const key = getDayKey(event.date);
    if (!uniqueDaysMap.has(key)) {
      uniqueDaysMap.set(key, {
        key,
        label: getDayLabel(event.date)
      });
    }
  });

  // Создаем HTML для day фильтра
  const dayDropdown = document.createElement("div");
  dayDropdown.classList.add("dropdown");
  dayDropdown.setAttribute("data-filter", "day");
  dayDropdown.innerHTML = `
    <button class="dropbtn">Any day</button>
    <img src="Icons/dropdown.png" alt="dropbtn">
    <ul class="dropdown_menu">
      <li data-value="all">Any day</li>
      ${Array.from(uniqueDaysMap.values()).map(day => `
        <li data-value="${day.key}">${day.label}</li>
      `).join("")}
    </ul>
  `;

  container.appendChild(dayDropdown);
}

document.addEventListener("DOMContentLoaded", () => {
  renderEvents(eventsStore);
  insertDayFilter();

  const dropdowns = document.querySelectorAll(".dropdown_menu li");

  dropdowns.forEach(item => {
    item.addEventListener("click", () => {
      const filterType = item.closest(".dropdown").dataset.filter;
      const value = item.dataset.value;

      activeFilters[filterType] = value;
      applyFilters();

      const button = item.closest(".dropdown").querySelector(".dropbtn");
      button.textContent = item.textContent;
    });
  });
});

