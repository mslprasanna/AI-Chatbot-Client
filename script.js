
const sendBtn = document.getElementById("sendBtn");
const userInput = document.getElementById("userInput");
const chatBox = document.querySelector(".chat-box");

function addMessage(type, text) {

    const div = document.createElement("div");

    div.classList.add("message");
    div.classList.add(type + "-message");

    div.textContent = text;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;

    return div;
}
sendBtn.addEventListener("click", sendMessage);
async function sendMessage() {

    const message = userInput.value;

    if (message .trim() === "") {
        return;
    }

   addMessage("user", message);
    userInput.value = "";
chatBox.scrollTop = chatBox.scrollHeight;
sendBtn.disabled=true;
userInput.disabled=true;
 const aiMessage = addMessage("ai", "🤖 Thinking...");


    
try{
    console.log("Sending request...");
const response = await fetch("https://ai-chatbot-backend-fkyi.onrender.com/chat", {
        method: "POST",
         headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        message: message
    })
    });
 console.log("Response received:", response.status);
   const data = await response.json();
   aiMessage.textContent = data.message;

if (data.action === "addToCart") {

    const index = foods.findIndex(food =>
        food.name === data.item
    );

    if (index !== -1) {
        addToCart(index);
    }
}


    console.log(data);
chatBox.scrollTop = chatBox.scrollHeight;
}

catch (error) {
console.error(error);
    aiMessage.textContent = "❌ Something went wrong. Please try again.";

}
finally {

     sendBtn.disabled=false;
userInput.disabled=false;
userInput.focus();

    }
}

userInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

});

