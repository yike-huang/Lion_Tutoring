const subjects = {
  Math: ["Algebra 1", "Geometry", "Algebra 2", "Pre-Calculus", "Calculus"],
  Science: ["Biology", "Chemistry", "Anatomy and Physiology", "Physics"],
  ACT: ["ACT English", "ACT Math", "ACT Reading", "ACT Science"],
  English: ["English"],
};

const tutors = [
  {
    name: "Maya Patel",
    subjects: ["Algebra 2", "Pre-Calculus", "Calculus", "ACT Math"],
  },
  {
    name: "Daniel Kim",
    subjects: ["Biology", "Chemistry", "ACT Science"],
  },
  {
    name: "Sofia Garcia",
    subjects: ["English", "ACT English", "ACT Reading"],
  },
  {
    name: "Ethan Brooks",
    subjects: ["Geometry", "Algebra 1", "Physics"],
  },
];

let sessions = [
  {
    id: 1,
    requesterType: "Parent",
    studentName: "Jordan Lee",
    grade: "11",
    email: "parent@example.com",
    category: "Math",
    subject: "Pre-Calculus",
    tutorPreference: "specific",
    tutor: "Maya Patel",
    date: getOffsetDate(2),
    time: "4:00 PM",
    note: "Review unit circle and trigonometry identities.",
    status: "Accepted",
    hours: 0,
  },
  {
    id: 2,
    requesterType: "Student",
    studentName: "Nina Wang",
    grade: "10",
    email: "nina@example.com",
    category: "Science",
    subject: "Chemistry",
    tutorPreference: "any",
    tutor: "",
    date: getOffsetDate(3),
    time: "4:30 PM",
    note: "Balancing equations and mole conversions.",
    status: "Pending",
    hours: 0,
  },
];

const demoTutor = "Maya Patel";
const subjectCategory = document.querySelector("#subjectCategory");
const subjectName = document.querySelector("#subjectName");
const tutorPreference = document.querySelector("#tutorPreference");
const preferredTutor = document.querySelector("#preferredTutor");
const sessionDate = document.querySelector("#sessionDate");
const roleMap = {
  Parent: "booking",
  Student: "booking",
  Tutor: "tutor",
  Admin: "admin",
};

let currentUser = null;

function getOffsetDate(offset) {
  const date = new Date();
  date.setDate(date.getDate() + offset);
  return date.toISOString().slice(0, 10);
}

function init() {
  sessionDate.value = getOffsetDate(1);
  populateCategories();
  updateSubjects();
  updateTutorOptions();
  bindEvents();
  renderAll();
}

function bindEvents() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => switchRole(tab.dataset.role));
  });

  document.querySelector("#authForm").addEventListener("submit", (event) => {
    event.preventDefault();
    signIn("email");
  });
  document.querySelector("#googleSignIn").addEventListener("click", () => signIn("Google"));
  document.querySelector("#signOut").addEventListener("click", signOut);
  subjectCategory.addEventListener("change", () => {
    updateSubjects();
    updateTutorOptions();
  });
  subjectName.addEventListener("change", updateTutorOptions);
  tutorPreference.addEventListener("change", updateTutorOptions);
  preferredTutor.addEventListener("change", () => {
    if (preferredTutor.value !== "any") {
      tutorPreference.value = "specific";
    }
  });
  document.querySelector("#requestForm").addEventListener("submit", addRequest);
  document.querySelector("#statusFilter").addEventListener("change", renderAdmin);
  document.querySelector("#exportCsv").addEventListener("click", exportCsv);
}

function signIn(method) {
  const role = document.querySelector("#authRole").value;
  const emailField = document.querySelector("#authEmail");
  const email = method === "Google" ? "google.user@hardingacademy.org" : emailField.value.trim();

  if (!email) {
    emailField.focus();
    return;
  }

  currentUser = { role, email, method };
  document.querySelector("#authPanel").classList.add("hidden");
  document.querySelector("#signedInBar").classList.remove("hidden");
  document.querySelector("#signedInText").textContent = `Signed in as ${role} with ${method}`;
  if (role === "Parent" || role === "Student") {
    document.querySelector("#requesterType").value = role;
  }
  switchRole(roleMap[role]);
}

function signOut() {
  currentUser = null;
  document.querySelector("#authPanel").classList.remove("hidden");
  document.querySelector("#signedInBar").classList.add("hidden");
  document.querySelectorAll(".dashboard").forEach((panel) => {
    panel.classList.remove("active");
  });
}

function switchRole(role) {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.role === role);
  });
  document.querySelectorAll(".dashboard").forEach((panel) => {
    panel.classList.remove("active");
  });
  document.querySelector(`#${role}Panel`).classList.add("active");
}

function populateCategories() {
  subjectCategory.innerHTML = Object.keys(subjects)
    .map((category) => `<option>${category}</option>`)
    .join("");
}

function updateSubjects() {
  const category = subjectCategory.value;
  subjectName.innerHTML = subjects[category]
    .map((subject) => `<option>${subject}</option>`)
    .join("");
}

function updateTutorOptions() {
  const subject = subjectName.value;
  const qualifiedTutors = tutors.filter((tutor) => tutor.subjects.includes(subject));
  const tutorOptions = qualifiedTutors.length
    ? qualifiedTutors.map((tutor) => `<option value="${tutor.name}">${tutor.name}</option>`).join("")
    : "<option>No tutor available</option>";
  preferredTutor.disabled = false;
  preferredTutor.innerHTML = `<option value="any">No specific tutor</option>${tutorOptions}`;

  if (tutorPreference.value === "specific" && qualifiedTutors.length) {
    preferredTutor.value = qualifiedTutors[0].name;
  } else {
    preferredTutor.value = "any";
  }
}

function addRequest(event) {
  event.preventDefault();

  const preference = tutorPreference.value;
  const tutor = preference === "specific" && preferredTutor.value !== "any" ? preferredTutor.value : "";
  const time = document.querySelector("#sessionTime").value;

  if (preference === "specific" && !tutor) {
    alert("Please choose a tutor or switch to any qualified tutor.");
    return;
  }

  if (preference === "specific" && hasTutorConflict(tutor, sessionDate.value, time)) {
    alert("That tutor already has an accepted session at this time. Please choose another time or any qualified tutor.");
    return;
  }

  sessions.unshift({
    id: Date.now(),
    requesterType: document.querySelector("#requesterType").value,
    studentName: document.querySelector("#studentName").value.trim(),
    grade: document.querySelector("#gradeLevel").value,
    email: document.querySelector("#contactEmail").value.trim(),
    category: subjectCategory.value,
    subject: subjectName.value,
    tutorPreference: preference,
    tutor,
    date: sessionDate.value,
    time,
    note: document.querySelector("#helpText").value.trim(),
    status: "Pending",
    hours: 0,
  });

  renderAll();
  switchRole("booking");
}

function hasTutorConflict(tutorName, date, time) {
  return sessions.some((session) => {
    return session.tutor === tutorName
      && session.date === date
      && session.time === time
      && ["Accepted", "Completed"].includes(session.status);
  });
}

function renderAll() {
  renderBooking();
  renderTutor();
  renderAdmin();
}

function renderBooking() {
  const container = document.querySelector("#bookingRequests");
  container.innerHTML = "";
  sessions.slice(0, 5).forEach((session) => {
    container.appendChild(createRequestCard(session, "booking"));
  });
}

function renderTutor() {
  const pending = document.querySelector("#tutorPending");
  const schedule = document.querySelector("#tutorSchedule");
  pending.innerHTML = "";
  schedule.innerHTML = "";

  sessions
    .filter((session) => canTutorSeeRequest(session))
    .forEach((session) => pending.appendChild(createRequestCard(session, "tutorPending")));

  sessions
    .filter((session) => session.tutor === demoTutor && ["Accepted", "Completed"].includes(session.status))
    .forEach((session) => schedule.appendChild(createRequestCard(session, "tutorSchedule")));

  const completedHours = sessions
    .filter((session) => session.tutor === demoTutor && session.status === "Completed")
    .reduce((total, session) => total + Number(session.hours || 0), 0);

  document.querySelector("#monthHours").textContent = completedHours.toFixed(1);
  document.querySelector("#yearHours").textContent = (completedHours + 8).toFixed(1);
  document.querySelector("#lifetimeHours").textContent = (completedHours + 24).toFixed(1);
}

function canTutorSeeRequest(session) {
  if (session.status !== "Pending") return false;
  const tutor = tutors.find((item) => item.name === demoTutor);
  const qualified = tutor.subjects.includes(session.subject);
  const assignedToDemoTutor = session.tutorPreference === "specific" && session.tutor === demoTutor;
  const openToAnyTutor = session.tutorPreference === "any";
  return qualified && (assignedToDemoTutor || openToAnyTutor);
}

function createRequestCard(session, context) {
  const template = document.querySelector("#requestTemplate");
  const card = template.content.firstElementChild.cloneNode(true);
  card.querySelector(".card-title").textContent = `${session.studentName} - ${session.subject}`;
  card.querySelector(".card-meta").textContent = `${formatDate(session.date)} at ${session.time} | ${session.tutor || "Any qualified tutor"}`;
  card.querySelector(".card-note").textContent = session.note;

  const actions = card.querySelector(".card-actions");
  actions.appendChild(statusPill(session.status));

  if (context === "tutorPending") {
    actions.appendChild(actionButton("Accept", () => acceptSession(session.id)));
    actions.appendChild(actionButton("Decline", () => updateStatus(session.id, "Declined")));
  }

  if (context === "tutorSchedule" && session.status === "Accepted") {
    actions.appendChild(actionButton("Complete", () => completeSession(session.id)));
  }

  return card;
}

function statusPill(status) {
  const pill = document.createElement("span");
  pill.className = `status ${status.toLowerCase()}`;
  pill.textContent = status;
  return pill;
}

function actionButton(label, onClick) {
  const button = document.createElement("button");
  button.className = "button";
  button.type = "button";
  button.textContent = label;
  button.addEventListener("click", onClick);
  return button;
}

function acceptSession(id) {
  const session = sessions.find((item) => item.id === id);
  if (!session) return;

  if (hasTutorConflict(demoTutor, session.date, session.time)) {
    alert("This tutor already has a session at that time.");
    return;
  }

  session.tutor = demoTutor;
  session.status = "Accepted";
  renderAll();
}

function completeSession(id) {
  const session = sessions.find((item) => item.id === id);
  if (!session) return;
  const input = prompt("Enter actual tutoring hours:", "1");
  const hours = Number(input);
  if (!Number.isFinite(hours) || hours <= 0) return;
  session.hours = hours;
  session.status = "Completed";
  renderAll();
}

function updateStatus(id, status) {
  const session = sessions.find((item) => item.id === id);
  if (!session) return;
  session.status = status;
  renderAll();
}

function renderAdmin() {
  const filter = document.querySelector("#statusFilter").value;
  const rows = filter === "All" ? sessions : sessions.filter((session) => session.status === filter);
  const body = document.querySelector("#adminTable");
  body.innerHTML = rows.map((session) => {
    return `
      <tr>
        <td>${session.studentName}</td>
        <td>${session.requesterType}</td>
        <td>${session.subject}</td>
        <td>${session.tutor || "Unassigned"}</td>
        <td>${formatDate(session.date)}</td>
        <td>${session.time}</td>
        <td><span class="status ${session.status.toLowerCase()}">${session.status}</span></td>
        <td>${Number(session.hours || 0).toFixed(1)}</td>
      </tr>
    `;
  }).join("");

  document.querySelector("#totalRequests").textContent = sessions.length;
  document.querySelector("#pendingRequests").textContent = sessions.filter((session) => session.status === "Pending").length;
  document.querySelector("#completedRequests").textContent = sessions.filter((session) => session.status === "Completed").length;
}

function exportCsv() {
  const headers = ["Student", "Requester", "Subject", "Tutor", "Date", "Time", "Status", "Hours", "Notes"];
  const lines = sessions.map((session) => [
    session.studentName,
    session.requesterType,
    session.subject,
    session.tutor || "Unassigned",
    session.date,
    session.time,
    session.status,
    session.hours || 0,
    session.note,
  ]);
  const csv = [headers, ...lines]
    .map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "lion-tutoring-sessions.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function formatDate(value) {
  const date = new Date(`${value}T12:00:00`);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

init();
