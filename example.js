async function sendMessage() {

    const message = userInput.value;

    if (message === "") {
        return;
    }

    const newMessage = document.createElement("div");

    newMessage.classList.add("message");
    newMessage.classList.add("user-message");

    newMessage.textContent = message;

    chatBox.appendChild(newMessage);

    userInput.value = "";
chatBox.scrollTop = chatBox.scrollHeight;
sendBtn.disabled=true;
userInput.disabled=true;
     const aiMessage = document.createElement("div");

aiMessage.classList.add("message");
aiMessage.classList.add("ai-message");

aiMessage.textContent = "🤖 Thinking...";

chatBox.appendChild(aiMessage);


    
try{

 const response = await fetch("http://localhost:3000/chat", {
        method: "POST",
         headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        message: message
    })
    });

      const data = await response.text();

   aiMessage.textContent = data;
    console.log(data);
chatBox.scrollTop = chatBox.scrollHeight;
}

catch (error) {

aiMessage.textContent = "404 Error";

}
finally {

     sendBtn.disabled=false;
userInput.disabled=false;

    }
}

userInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        sendMessage();

    }

});

