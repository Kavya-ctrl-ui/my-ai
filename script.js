const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const chatMessages = document.getElementById('chatMessages');
const welcomeContainer = document.getElementById('welcomeContainer');

function handleSendMessage() {
    const text = userInput.value.trim();
    if (text === "") return;

    // Hide welcome screen when chat begins
    if (welcomeContainer) {
        welcomeContainer.style.display = 'none';
    }

    // 1. Append User Message
    const userMsgHTML = `
        <div class="message user">
            <div class="avatar">You</div>
            <div class="message-content">${escapeHtml(text)}</div>
        </div>
    `;
    chatMessages.innerHTML += userMsgHTML;

    userInput.value = "";
    scrollToBottom();

    // 2. Simulate AI Response after a small delay
    setTimeout(() => {
        const aiResponseText = getDummyAIResponse(text);
        const aiMsgHTML = `
            <div class="message ai">
                <div class="avatar"><i class="fa-solid fa-sparkles"></i></div>
                <div class="message-content">${aiResponseText}</div>
            </div>
        `;
        chatMessages.innerHTML += aiMsgHTML;
        scrollToBottom();
    }, 600);
}

// Event Listeners
sendBtn.addEventListener('click', handleSendMessage);
userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

function scrollToBottom() {
    const chatBody = document.getElementById('chatBody');
    chatBody.scrollTop = chatBody.scrollHeight;
}

// Simple security helper to avoid HTML injection
function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Basic simulated AI logic
function getDummyAIResponse(query) {
    const q = query.toLowerCase();
    if (q.includes('html')) {
        return "HTML stands for HyperText Markup Language. It is used to create the structure of a web page.<br><br>For example, we use headings, paragraphs, images, links and buttons to build a webpage.";
    } else if (q.includes('css')) {
        return "CSS (Cascading Style Sheets) is used to style and layout web pages — for example, to alter the font, color, size, and spacing of your content.";
    } else {
        return `That's an interesting question about <strong>"${escapeHtml(query)}"</strong>. I am a basic static UI clone built with HTML, CSS, and JS! You can customize my response logic in script.js.`;
    }
}