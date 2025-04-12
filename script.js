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
    try {
        const response = await fetch('http://127.0.0.1:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.response || 'No response from the assistant.';
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