// Event Listeners for Sign-in and App Services
document.querySelector('.sign-in').addEventListener('click', function() {
    alert('Coming Soon');
});

document.querySelector('.app-services').addEventListener('click', function() {
    alert('The app will be soon available for download on App Store and Google Play Store.');
});

// Toggle Chatbot visibility
const chatbotButton = document.querySelector('.chatbot-button');
const chatbotContainer = document.querySelector('.chatbot-container');
const closeChatbotButton = document.querySelector('.close-chatbot');
const sendButton = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

// Show Chatbot
chatbotButton.addEventListener('click', function () {
    chatbotContainer.style.display = 'block';
});

// Hide Chatbot
closeChatbotButton.addEventListener('click', function () {
    chatbotContainer.style.display = 'none';
});

// Send Message to Chatbot Function
async function sendMessageToChatbot(message) {
    const apiKey = "AIzaSyCI0cha59eogAVTa7zzoQa44h_4dU4wJT8";  // Replace with your actual API key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`;
  
    // Create request payload using the user's input message
    const requestData = {
        prompt: {
            text: message  // User's input message goes here
        }
    };
  
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData), // Send the prompt data in the request body
        });
  
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        if (data.candidates && data.candidates.length > 0) {
            return data.candidates[0].content;  // Get the chatbot's response
        } else {
            return 'Sorry, I didn’t get that. Please try again.';
        }
    } catch (error) {
        console.error('Error:', error);
        return 'There was an issue connecting to the chatbot service.';
    }
}

// Display Chat Messages Function
function displayMessage(message, className) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', className);
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle Send Button Click
sendButton.addEventListener('click', async function () {
    const message = userInput.value.trim(); // Capture user's input message
    if (message) {
        // Display user message in the chat window
        displayMessage(message, 'user-message');
        userInput.value = '';  // Clear the input field

        // Get and display chatbot's reply
        const reply = await sendMessageToChatbot(message);
        displayMessage(reply, 'chatbot-message');
    }
});