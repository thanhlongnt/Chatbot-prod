// Chatbot functionality
const chatbotSection = document.getElementById("chatbotSection");
const infoSection = document.getElementById("infoSection");
const chatArea = document.getElementById("chatArea");
const userInput = document.getElementById("userInput");
const send = document.getElementById("send");
const strat_display = document.querySelector(".strategy-display");

// strat_display.innerHTML = ""; // Clear any existing content

// var jupyter = document.createElement("iframe");
// jupyter.src = "cse152a_wi25_hw1.html"; 
// jupyter.style.width = "100%";
// jupyter.style.height = "100%"; 

// chatArea.appendChild(jupyter);


var message_entry = 0;
infoSection.classList.remove("hide-info");
infoSection.classList.add("expand-info");

// generate a random conversation id
const conversation_id = Math.floor(Math.random() * 1000000);
const responses = new Set();
isButton = false;
button_id = "";

const botMsg = document.createElement("p");
botMsg.textContent = "Bot: " + "Hello, I am debugging chatbot! Please describe your bug and I will try to give you a stratergy to help";
botMsg.style.textAlign = "left";
chatArea.appendChild(botMsg);
chatArea.scrollTop = chatArea.scrollHeight;

async function sendMessage() {
  userMessage = "";
  if (isButton){
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
    console.log("hello world");
    userMessage = userInput.value;
    if (userMessage.trim() === "") return; // Don't send if input is empty
    userInput.remove();
    send.remove();

    const restart = document.createElement('button');
    restart.textContent = 'restart'; // Set the button text
    restart.id = message_entry; // Add an ID (optional)
    restart.className = 'btn'; // Add a class (optional)
    restart.addEventListener('click', () => {
      chatArea.innerHTML = ""
      restart.remove()
      let div = document.querySelector('.chatbot');
      div.appendChild(userInput);
      div.appendChild(send);
      
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
  // Hide the info section and expand the chatbot back to full width
  
  // Simulate chatbot response with a delay
  var botMsg = await getResponse();
  if (botMsg == null){
    return;
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
            "session-id": String(conversation_id),
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
  message_entry += 1;
}

function getResponse(){
  if (responses.size == 6){
    const botMsgElem = document.createElement("p");
    botMsgElem.textContent = "Bot: " + "No more stratergies, please come back later!";
    botMsgElem.style.textAlign = "left";
    chatArea.appendChild(botMsgElem);
    chatArea.scrollTop = chatArea.scrollHeight;
    console.log(botMessage);
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
        // Append the response from the backend to the conversation
        botMessage = data;
        if (responses.has(data)) {
          return null;
        }
        else{
          responses.add(data)
        }
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

          const button = document.createElement('button');
          button.textContent = 'yes'; // Set the button text
          button.id = "yes"; // Add an ID (optional)
          button.className = 'btn'; // Add a class (optional)

          button.addEventListener('click', () => {
              isButton = true;
              button_id = "yes";
              sendMessage();
          });
          chatArea.appendChild(button);

          const button2 = document.createElement('button');
          button2.textContent = 'no'; // Set the button text
          button2.id = "no"; // Add an ID (optional)
          button2.className = 'btn'; // Add a class (optional)

          button2.addEventListener('click', () => {
              isButton = true;
              button_id = "no";
              sendMessage();
          });
          chatArea.appendChild(button2);

          const button3 = document.createElement('button');
          button3.textContent = 'yes, but new strat'; // Set the button text
          button3.id = "yes, but new strat"; // Add an ID (optional)
          button3.className = 'btn'; // Add a class (optional)

          button3.addEventListener('click', () => {
              isButton = true;
              button_id = "yes, but new strat";
              sendMessage();
          });
          chatArea.appendChild(button3);

          chatArea.scrollTop = chatArea.scrollHeight;
        }, 2000);
        return data;        
    })
    .catch(error => console.error('Error:', error));
  }  
  console.log(botMessage);

  return botMessage;
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

function updateStrategyContent(strategyId, newButton) {
  // const title = document.getElementById('strategy-title');
  // const explanation = document.getElementById('strategy-explanation');
  // const example = document.getElementById('strategy-example');
  // const codingExample = document.getElementById('strategy-coding-example');
  // const additions = document.getElementById('strategy-additions');
  
  // var message = ""

  infoSection.classList.remove("expand-info");
  infoSection.classList.add("hide-info");

  // chatbotSection.classList.remove("slide-right");
  // chatbotSection.classList.add("chatbot-expanded"); // Expand chatbot

  // var jupyter = document.createElement("iframe");
  // jupyter.src = "cse152a_wi25_hw1.html"; 
  // jupyter.style.width = "100%";
  // jupyter.style.height = "600px";

  // strat_display.appendChild(jupyter);
  
  setTimeout(() => {
    document.getElementById("stratergy_display").src = "jupyter_html/bad_state.html"

  //   switch (strategyId) {
  //       case "Did you try minimizing your test cases?":
  //           title.textContent = window.getTestCaseMinimization.title;
  //           explanation.textContent = window.getTestCaseMinimization.explanation;
  //           example.textContent = window.getTestCaseMinimization.example;
  //           codingExample.textContent = window.getTestCaseMinimization.codingExample;
  //           additions.textContent = window.getTestCaseMinimization.additions;
  //           message = window.getTestCaseMinimization.title;
  //           break;
        
  //       case "Have you tried narryowing down the responsible code?":
  //           title.textContent = window.getNarrowingResponsibleCode.title;
  //           explanation.textContent = window.getNarrowingResponsibleCode.explanation;
  //           example.textContent = window.getNarrowingResponsibleCode.example;
  //           additions.textContent = window.getNarrowingResponsibleCode.additions;
  //           codingExample.textContent = window.getNarrowingResponsibleCode.codingExample;
  //           message = window.getNarrowingResponsibleCode.title;
  //           break;

  //       case "Hmmmm this sounds interesting. Have you tried regression testing?":
  //           title.textContent = window.getRegressionTesting.title;
  //           explanation.textContent = window.getRegressionTesting.explanation;
  //           example.textContent = window.getRegressionTesting.example;
  //           additions.textContent = window.getRegressionTesting.additions;
  //           codingExample.textContent = window.getRegressionTesting.codingExample;
  //           message = window.getRegressionTesting.title;
  //           break;
  //       case "Ok. Have you tried using the bad state stratergy?":
  //           title.textContent = window.getBadState.title;
  //           explanation.textContent = window.getBadState.explanation;
  //           example.textContent = window.getBadState.example;
  //           additions.textContent = window.getBadState.additions;
  //           codingExample.textContent = window.getBadState.codingExample;
  //           message = window.getBadState.title;
  //           break;

  //       case "Did you try identifying Relative Code and State?":
  //         title.textContent = window.getIdentifyRelativeCode.title;
  //         explanation.textContent = window.getIdentifyRelativeCode.explanation;
  //         example.textContent = window.getIdentifyRelativeCode.example;
  //         additions.textContent = window.getIdentifyRelativeCode.additions;
  //         codingExample.textContent = window.getIdentifyRelativeCode.codingExample;
  //         message = window.getIdentifyRelativeCode.title;
  //         break;
        
  //       case "Have you tried to ask an expert?":
  //         title.textContent = window.getAskAnExpert.title;
  //         explanation.textContent = window.getAskAnExpert.explanation;
  //         example.textContent = window.getAskAnExpert.example;
  //         additions.textContent = window.getAskAnExpert.additions;
  //         codingExample.textContent = window.getAskAnExpert.codingExample;
  //         message = window.getAskAnExpert.title;
  //         break;
  //       case "Have you tried using print statements?":
  //         title.textContent = window.getPrintStatements.title;
  //         explanation.textContent = window.getPrintStatements.explanation;
  //         example.textContent = window.getPrintStatements.example;
  //         additions.textContent = window.getPrintStatements.additions;
  //         codingExample.textContent = window.getPrintStatements.codingExample;
  //         message = window.getPrintStatements.title;
  //         break;      
  //   }
    infoSection.classList.remove("hide-info");
    infoSection.classList.add("expand-info");
  }, 1000); // Simulating delay for bot response

  message = "test"

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