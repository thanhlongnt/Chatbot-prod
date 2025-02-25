// Chatbot functionality
const chatbotSection = document.getElementById("chatbotSection");
const infoSection = document.getElementById("infoSection");
const chatArea = document.getElementById("chatArea");
const userInput = document.getElementById("userInput");
const send = document.getElementById("send");
const strat_display = document.querySelector(".strategy-display");

var message_entry = 0;
infoSection.classList.remove("hide-info");
infoSection.classList.add("expand-info");

// generate a random conversation id
const conversation_id = Math.floor(Math.random() * 100000000);
const responses = new Set();
isButton = false;
button_id = "";

const botMsg = document.createElement("p");
botMsg.textContent = "Bot: " + "Hello, I am debugging chatbot! Please describe your bug and I will try to give you a stratergy to help";
botMsg.style.textAlign = "left";
chatArea.appendChild(botMsg);
chatArea.scrollTop = chatArea.scrollHeight;

yes_button = ""
no_button = ""
yes_but_button = ""

async function sendMessage() {
  userMessage = "";
  if (isButton){
    yes_button.remove()
    yes_but_button.remove()
    no_button.remove()
    switch(button_id){
      case "yes":
        userMessage = "yes";
        break;
      
      case "no":
        userMessage = "no"
        break;

      case "yes, but new strat":
        userMessage = "yes, but new strat"
    }
  }
  else {
    userMessage = userInput.value;
    if (userMessage.trim() === "") return; // Don't send if input is empty
    userInput.remove();
    send.remove();

    const restart = document.createElement('button');
    restart.textContent = 'restart'; // Set the button text
    restart.id = message_entry; // Add an ID (optional)
    restart.className = 'btn'; // Add a class (optional)
    
    restart.addEventListener('click', () => {
      location.reload();
    });
    
    let div = document.querySelector('.chatbot');
    div.appendChild(restart);
  }

  // Add user's message to chat area
  const userMsgElem = document.createElement("p");
  userMsgElem.textContent = "You: " + userMessage;
  userMsgElem.style.textAlign = "right";

  chatArea.appendChild(userMsgElem);
  chatArea.scrollTop = chatArea.scrollHeight;
  
  if ((message_entry > 0)){
    if (userMessage.toLowerCase() == "yes"){
      setTimeout(() => {
        const botMsgElem = document.createElement("p");
        botMsgElem.textContent = "Bot: " + "Thank you so much for using our tool! Please fill out this short survey on your experience with this tool.";
        botMsgElem.style.textAlign = "left";
        chatArea.appendChild(botMsgElem);
        chatArea.scrollTop = chatArea.scrollHeight;
        console.log(botMessage);
      }, 1000)
      userInput.value = ""
      return;

    }
  }

  var botMsg = null
  if (responses.size == 4){
    const botMsgElem = document.createElement("p");
    botMsgElem.textContent = "Bot: " + "No more stratergies, please come back later!";
    botMsgElem.style.textAlign = "left";
    chatArea.appendChild(botMsgElem);
    chatArea.scrollTop = chatArea.scrollHeight;
    console.log(botMessage);
    return
  }

  while (botMsg == null){
    botMsg = await getResponse();
  }
  
  updateStrategyContent(botMsg, true);

  // Shrink the chatbot to make room for the info section
  setTimeout(() => {
  }, 1000)

  if (getCookie("userConsent")) {
    console.log(getCookie("userEmail"));
  
    fetch("https://90nnqg2igk.execute-api.us-west-1.amazonaws.com/Innitial/Chatbot_prod",
      {
          method: 'POST', 'mode': 'cors',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            "session_id": String(conversation_id),
            "entry_number": String(message_entry),
            "Email": String(getCookie("userEmail")),
            "question": userMessage,
            "chatbot_output": botMsg,
            "time": String(new Date()),
          })
      })
      .then(response => {
          return response.json();
      })
      .then(data => console.log(data))
      .catch(error => console.log(error));
  }

  // Clear the input
  userInput.value = "";
  console.log(message_entry)
  message_entry += 1;
}

function make_button(mes){
  console.log(mes)
  const button = document.createElement('button');
  button.textContent = mes; // Set the button text
  button.id = mes; // Add an ID (optional)
  button.className = 'btn'; // Add a class (optional)

  button.addEventListener('click', () => {
      isButton = true;
      button_id = mes;
      sendMessage();
  });

  return button;
}

function getResponse(){
  if (responses.size == 4){
    return null;
  }
  var botMessage = null;
  while (botMessage == null){
    botMessage = fetch("https://90nnqg2igk.execute-api.us-west-1.amazonaws.com/Innitial/Chatbot_prod", {
      method: 'GET',
      mode: "cors"
    })
    .then(response => response.json())
    .then(data => {
        if (responses.has(data)) {
          console.log("hello there!")
          botMessage = null;
          return null;
        }
        else{
          responses.add(data)
        }
        botMessage = data;
        const botMsgElem = document.createElement("p");
        botMsgElem.textContent = "Bot: " + botMessage;
        botMsgElem.style.textAlign = "left";
        chatArea.appendChild(botMsgElem);
        console.log(botMessage);
        chatArea.scrollTop = chatArea.scrollHeight;
  
        setTimeout(() => {
          const botMsgFeedback = document.createElement("p");
          botMsgFeedback.style.textAlign = "left";
          botMsgFeedback.textContent = "Bot: Was this a helpful response? If you didn't find it helpful, please type no and I will give you another response. If you found the stratergy to be helpful, please type yes to end the conversation.";
          chatArea.appendChild(botMsgFeedback);

          yes_button = make_button('yes')
          no_button = make_button('no')
          yes_but_button = make_button('yes, but new strat')

          chatArea.appendChild(yes_button)
          chatArea.appendChild(yes_but_button)
          chatArea.appendChild(no_button)

          chatArea.scrollTop = chatArea.scrollHeight;
        }, 2000);
        return data;        
    }).catch(error => console.error('Error:', error));
  }
  
  if (botMessage == null){
    console.log("Nothing")
  }
  console.log(botMessage);


  return botMessage;
}

function updateStrategyContent(strategyId, newButton) {
  infoSection.classList.remove("expand-info");
  infoSection.classList.add("hide-info");

  message = ""
  setTimeout(() => {

    switch (strategyId) {
        case "Did you try minimizing your test cases?":
          document.getElementById("stratergy_display").src = "jupyter_html/test_case_min.html"
          message = "Test Case minimization"
          break;
            
        case "Ok. Have you tried using the bad state stratergy?":
          document.getElementById("stratergy_display").src = "jupyter_html/bad_state.html"
          message = "Bad State"
          break;
            
        case "Have you tried using print statements?":
          document.getElementById("stratergy_display").src = "jupyter_html/print_statements.html"
          message = "Print Statements"
          break;      

        case "Have you tried carefulling tracing through your code?":
          document.getElementById("stratergy_display").src = "jupyter_html/read_code.html"
          message = "Tracing Code"
          break;      
    }
    infoSection.classList.remove("hide-info");
    infoSection.classList.add("expand-info");
  }, 1000); // Simulating delay for bot response

  if (newButton) {  
    setTimeout(() => {
      const button = document.createElement('button');
      button.textContent = 'Click to see "' + message + '" again'; // Set the button text
      button.id = message_entry; // Add an ID (optional)
      button.className = 'btn'; // Add a class (optional)

      button.addEventListener('click', () => {
          updateStrategyContent(strategyId, false);
      });
      chatArea.appendChild(button);
    }, 1000); // Simulating delay for bot response
  }

  return message;
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