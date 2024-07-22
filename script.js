const messageBar = document.querySelector(".bar-wrapper input");
const sendBtn = document.querySelector(".bar-wrapper button");
const messageBox = document.querySelector(".message-box");

let API_URL = "https://api.openai.com/v1/chat/completions";
let API_KEY = "sk-proj-1dzVlkqSHihqbb1SJQjrT3BlbkFJrYrwThQ1TH19fUrKML8o";

sendBtn.onclick = function () {
  if(messageBar.value.length > 0){
    const UserTypedMessage = messageBar.value;
    messageBar.value = "";

    let message =
    `<div class="chat message">
    <img src="user.jpg">
    <span>
      ${UserTypedMessage}
    </span>
    </div>`;

    let response = 
    `<div class="chat response">
    <img src="chatbot.jpg">
    <span class= "new">...
    </span>
    </div>`

    messageBox.insertAdjacentHTML("beforeend", message);

    setTimeout(() =>{
      messageBox.insertAdjacentHTML("beforeend", response);

      const requestOptions = {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [{"role": "user", "content": UserTypedMessage}]
        })
      }

      fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        var chatBotResponse = document.querySelector(".response .new");
        chatBotResponse.innerHTML = data.choices[0].message.content;
        chatBotResponse.classList.remove("new");
      }).catch((error) => {
          chatBotResponse.innerHTML = "Opps! An error occured. Please try again";
      })
    }, 100);
  }
}