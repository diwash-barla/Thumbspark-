let historyPanel = document.getElementById("historyPanel")
let historyList = document.getElementById("historyList")

function toggleHistory(){
historyPanel.classList.toggle("active")
loadHistory()
}

function saveHistory(prompt){

let history = JSON.parse(localStorage.getItem("prompt_history") || "[]")

history.unshift(prompt)

localStorage.setItem("prompt_history", JSON.stringify(history))

}

function loadHistory(){

let history = JSON.parse(localStorage.getItem("prompt_history") || "[]")

historyList.innerHTML=""

history.forEach(p=>{
let div=document.createElement("div")
div.className="history-item"
div.innerText=p.substring(0,120)
historyList.appendChild(div)
})

}

async function generatePrompt(){

let script=document.getElementById("scriptInput").value

let resultBox=document.getElementById("result")

resultBox.innerText="Generating..."

const apiKey = window.env.gmni_key
const model = window.env.model

let prompt = `
You are a professional prompt engineer.

Convert the following YouTube script into a powerful cinematic prompt
for AI image or video generation.

Script:
${script}
`

let res = await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[
{
parts:[
{ text:prompt }
]
}
]
})
}
)

let data=await res.json()

let output=data.candidates[0].content.parts[0].text

resultBox.innerText=output

saveHistory(output)

}
