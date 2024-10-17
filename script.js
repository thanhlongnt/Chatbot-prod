// Chatbot functionality
const chatbotSection = document.getElementById("chatbotSection");
const infoSection = document.getElementById("infoSection");
const chatArea = document.getElementById("chatArea");
const userInput = document.getElementById("userInput");

function sendMessage() {
  const userMessage = userInput.value;

  if (userMessage.trim() === "") return; // Don't send if input is empty

  // Add user's message to chat area
  const userMsgElem = document.createElement("p");
  userMsgElem.textContent = "You: " + userMessage;
  chatArea.appendChild(userMsgElem);

  // Hide the info section and expand the chatbot back to full width
  infoSection.classList.remove("expand-info");
  infoSection.classList.add("hide-info");
  chatbotSection.classList.remove("slide-right");
  chatbotSection.classList.add("chatbot-expanded"); // Expand chatbot

  // Simulate chatbot response with a delay
  setTimeout(() => {
    // var botMessage = "This is a response from the chatbot!";
    fetch("https://446wc80hoi.execute-api.us-east-2.amazonaws.com/Test1", {
      method: 'GET',
      mode: "cors"
    })
    .then(response => response.json())
    .then(data => {
        // Append the response from the backend to the conversation
        var botMessage = data;
        const botMsgElem = document.createElement("p");
        botMsgElem.textContent = "Bot: " + botMessage;
        chatArea.appendChild(botMsgElem);
        // infoSection.innerHTML = `<p>New information based on your message: "${botMessage}"</p>`;
        
    })
    .catch(error => console.error('Error:', error));
    
    // const botMsgElem = document.createElement("p");
    // botMsgElem.textContent = "Bot: " + botMessage;
    // chatArea.appendChild(botMsgElem);

    // Update the info section with new content
    
    

    // Make the info section visible again and shrink the chatbot
    infoSection.classList.remove("hide-info");
    infoSection.classList.add("expand-info");

    // Shrink the chatbot to make room for the info section
    chatbotSection.classList.remove("chatbot-expanded");
    chatbotSection.classList.add("slide-right");
  }, 1000); // Simulating delay for bot response

  // Clear the input
  userInput.value = "";
}

// Helper functions to handle cookies
function setCookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000); // Days converted to milliseconds
  const expires = "expires=" + date.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const cookies = document.cookie.split(";");
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

function eraseCookie(name) {
  document.cookie = name + "=; Max-Age=-99999999; path=/";
}

// Consent Modal Functionality
document.addEventListener("DOMContentLoaded", () => {
  const consentModal = document.getElementById("consentModal");
  const consentAgreeBtn = document.getElementById("consentAgree");
  const consentDeclineBtn = document.getElementById("consentDecline");
  const emailInput = document.getElementById("emailInput");

  // Check if consent is already given or declined via cookies
  const userConsent = getCookie("userConsent");
  const declineTimestamp = getCookie("declineTimestamp");

  const now = new Date();

  // Debugging: log to check cookies
  console.log("Checking cookies... Decline Timestamp: ", declineTimestamp);

  // If there's a declineTimestamp, parse it and check if 24 hours have passed
  if (declineTimestamp) {
    const declineDate = new Date(parseInt(declineTimestamp)); // Parse the timestamp correctly
    const timeSinceDecline = now.getTime() - declineDate.getTime();

    console.log("Time since decline (in ms): ", timeSinceDecline);

    // 24 hours = 86400000 milliseconds
    if (timeSinceDecline < 86400000) {
      console.log(
        "Less than 24 hours since decline, not showing the consent modal."
      );
      return; // Do not prompt for email again if within 24 hours
    } else {
      console.log("More than 24 hours since decline, showing consent modal.");
      eraseCookie("declineTimestamp"); // Remove the old timestamp
      consentModal.style.display = "flex";
    }
  }

  if (!userConsent) {
    // Show the consent modal if no prior consent is given and no valid decline timestamp exists
    console.log("No consent given yet, showing consent modal.");
    consentModal.style.display = "flex";
  }

  consentAgreeBtn.addEventListener("click", () => {
    const email = emailInput.value.trim();

    if (!email) {
      alert("Please enter a valid email address.");
      return;
    }

    // Store consent and email in cookies
    setCookie("userConsent", "granted", 365); // Consent stored for 1 year
    setCookie("userEmail", email, 365);

    // Hide the modal
    consentModal.style.display = "none";

    // Enable storing inputs
    enableInputStorage();
  });

  consentDeclineBtn.addEventListener("click", () => {
    // Hide the modal without storing consent
    consentModal.style.display = "none";

    // Set a cookie to track when the user declined, store current timestamp in milliseconds
    setCookie("declineTimestamp", now.getTime(), 1); // Store as milliseconds

    // Disable input storage or handle declined case
    disableInputStorage();
  });
});

function enableInputStorage() {
  console.log("Consent given. Input storage is enabled.");
  // Code to enable input storage (e.g., storing messages in a database)
}

function disableInputStorage() {
  console.log("Consent declined. Input storage is disabled.");
  // Code to disable input storage (e.g., prevent messages from being stored)
}
