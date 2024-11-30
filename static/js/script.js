
API_KEY = "AIzaSyAeuB_lKhVOg75bqvre0CaNVVge7h7N6Tc"
API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;
let userMessage = "";
const Conversation = document.querySelector(".Conversation");

const InputForm = document.querySelector(".InputForm");

InputForm.addEventListener("submit", (e) => {
    e.preventDefault();

    userMessage = document.querySelector(".Main").value.trim();

    if (userMessage === "") {
        return;
    }

    InputForm.reset();

    let userMessageDiv = `
        <section class='ChatContainer'>
            <div>
                <span style='color:red'>User: </span> 
                <p>${userMessage}</p>
            </div>
            <i class="fa-solid fa-volume-high"></i>
        </section>`;
    Conversation.innerHTML += userMessageDiv;

    generateAPIResponse();
});


const generateAPIResponse = async () => {
    try {
        let loaderID = "loading-indicator";
        let loader = `<section id='${loaderID}' class='ChatContainer ai-container'>
                        <div>
                            <span style='color:red'>AI: </span>
                            <p> <i class="fa-solid fa-ellipsis fa-flip"></i> </p>
                        </div>
                        <i class="fa-solid fa-volume-high"></i>
                      </section>`;
        Conversation.innerHTML = Conversation.innerHTML + loader;

        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{ text: userMessage }]
                    }
                ]
            })
        });

        const data = await response.json();
        const apiresponce = data?.candidates[0].content.parts[0].text;

        document.getElementById(loaderID).remove();

        if (apiresponce) {
            let div = `<section class='ChatContainer ai-container'>
                        <div>
                            <span style='color:red'>AI: </span>
                            <p>${apiresponce}</p>
                        </div>
                        <i class="fa-solid fa-volume-high"></i>
                      </section>`;
            Conversation.innerHTML = Conversation.innerHTML + div;
        }

    } catch (error) {

        let loaderElement = document.getElementById("loading-indicator");
        if (loaderElement) loaderElement.remove();

        let div = `<section class='ChatContainer ai-container'>
                     <div>
                        <span style='color:red'>AI: </span>😒SORRY😒
                     </div>
                   </section>`;
        Conversation.innerHTML = Conversation.innerHTML + div;
    }
};



let listContainer = document.querySelector(".Conversation")
listContainer.addEventListener("click", (e) => {
    let text1 = e.target
    if (text1.tagName == "I") {
        text1.classList.add("fa-fade")
        const elem = e.target.parentElement // I added this line to get the parent element's text
        
        // let text = elem.innerText;   // this line was getting the text with user and AI
        let text = elem.querySelector("div p").innerText;
        text = text.replace("volume_up", "")
        text = text.replace("AI: ", "")
        text = text.replace("User: ", "")
        Speak(text, text1)
    }
})


function speakAndWait(text) {
    return new Promise((resolve) => {
        let utter = new SpeechSynthesisUtterance();
        utter.lang = 'en-US';
        utter.text = text;
        utter.volume = 1;

        utter.onend = function () {
            resolve();
        };

        window.speechSynthesis.speak(utter);
    });
}

async function Speak(text, tag) {
    await speakAndWait(text);
    tag.classList.remove("fa-fade")
}

