// Firebase Config (PUT YOUR OWN)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ADD SKILL
function addSkill() {
  const container = document.getElementById("skillsSection");
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Skill Name" class="skillName">
    <input type="number" placeholder="Skill %" class="skillPercent">
    <hr>
  `;
  container.appendChild(div);
}

// ADD EDUCATION
function addEducation() {
  const container = document.getElementById("educationSection");
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Degree" class="degree">
    <input type="text" placeholder="Institution" class="school">
    <hr>
  `;
  container.appendChild(div);
}

// ADD EXPERIENCE
function addExperience() {
  const container = document.getElementById("experienceSection");
  const div = document.createElement("div");
  div.innerHTML = `
    <input type="text" placeholder="Job Title" class="job">
    <input type="text" placeholder="Company" class="company">
    <hr>
  `;
  container.appendChild(div);
}

// PREVIEW
function previewResume() {

  document.getElementById("resumePreview").style.display = "block";

  document.getElementById("pName").innerText =
    document.getElementById("name").value;

  document.getElementById("pContact").innerHTML =
    `<p>${document.getElementById("phone").value}</p>
     <p>${document.getElementById("address").value}</p>`;

  document.getElementById("pSummary").innerHTML =
    `<h2>Summary</h2><p>${document.getElementById("summary").value}</p>`;

  // Photo
  const file = document.getElementById("photo").files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.getElementById("pPhoto").src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Skills
  const names = document.querySelectorAll(".skillName");
  const percents = document.querySelectorAll(".skillPercent");

  let skillsHTML = "<h3>Skills</h3>";

  for (let i = 0; i < names.length; i++) {
    skillsHTML += `
      <div class="skill-bar">
        <div class="skill-fill" style="width:${percents[i].value}%">
          ${names[i].value} ${percents[i].value}%
        </div>
      </div>
    `;
  }

  document.getElementById("pSkills").innerHTML = skillsHTML;

  // Education
  const degrees = document.querySelectorAll(".degree");
  const schools = document.querySelectorAll(".school");

  let eduHTML = "<h2>Education</h2>";
  for (let i = 0; i < degrees.length; i++) {
    eduHTML += `<p><strong>${degrees[i].value}</strong> - ${schools[i].value}</p>`;
  }

  document.getElementById("pEducation").innerHTML = eduHTML;

  // Experience
  const jobs = document.querySelectorAll(".job");
  const companies = document.querySelectorAll(".company");

  let expHTML = "<h2>Experience</h2>";
  for (let i = 0; i < jobs.length; i++) {
    expHTML += `<p><strong>${jobs[i].value}</strong> - ${companies[i].value}</p>`;
  }

  document.getElementById("pExperience").innerHTML = expHTML;

  // PDF
  setTimeout(() => {
    html2pdf().from(document.getElementById("resumePreview")).save();
  }, 800);
}

// SAVE TO FIREBASE
function saveToFirebase() {

  db.collection("resumes").add({
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
    summary: document.getElementById("summary").value
  })
  .then(() => {
    alert("Resume Saved Successfully!");
  })
  .catch((error) => {
    alert("Error saving resume");
  });

}
