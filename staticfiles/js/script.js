// Fetch response from the API based on user message
API_KEY = "AIzaSyAeuB_lKhVOg75bqvre0CaNVVge7h7N6Tc"
API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;
let userMessage = "";
const Conversation = document.querySelector(".Conversation");

const InputForm = document.querySelector(".InputForm");

InputForm.addEventListener("submit", (e) => {
    e.preventDefault();

    userMessage = document.querySelector(".Main").value.trim()
    if (userMessage == "") {
        return
    }
    InputForm.reset();

    let div = `<section class='ChatContainer'><div><span style='color:red'>User: </span>${userMessage}</div><i class="fa-solid fa-volume-high"></i></section>`
    
    Conversation.innerHTML = Conversation.innerHTML + div;
    generateAPIResponse()

})


const generateAPIResponse = async () => {

    try {
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
        
        let div = `<section class='ChatContainer ai-container'><div><span style='color:red'>AI: </span>${apiresponce}</div><i class="fa-solid fa-volume-high"></i></section>`
        Conversation.innerHTML = Conversation.innerHTML + div;

    } catch (error) {

       let div = `<section class='ChatContainer ai-container'><div><span style='color:red'>AI: </span style="color:"pink"">😒SORRY😒</div></section>`
       Conversation.innerHTML = Conversation.innerHTML + div;
    }
};


let listContainer = document.querySelector(".Conversation")
listContainer.addEventListener("click", (e) => {
    let text1=e.target
    if(text1.tagName=="I")
    {
        text1.style.display="none"   

    let text=e.target.parentElement.innerText;
    text=text.replace("volume_up","")
    text=text.replace("AI: ","")
    text=text.replace("User: ","")
    console.log(text)
    Speak(text,text1)
}
})


   function speakAndWait(text) {
    return new Promise((resolve) => {
        let utter = new SpeechSynthesisUtterance();
        utter.lang = 'en-US';
        utter.text = text;
        utter.volume = 1;

        // Jab speech complete ho, tab promise resolve hoga
        utter.onend = function () {
            resolve(); // Speech complete hone ke baad resolve
        };

        // Speech synthesis start karo
        window.speechSynthesis.speak(utter);
    });
}

// Function ko synchronous tarike se call karo
async function Speak(text,tag) {
    await speakAndWait(text); // Speech ke complete hone ka wait karega
    console.log("Speech completed");
    tag.style.display="inline"
}

