async function generatePrompt(){

let script=document.getElementById("scriptInput").value

let result=document.getElementById("result")

result.innerText="Generating..."

let res=await fetch("/generate",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({script})

})

let data=await res.json()

result.innerText=data.prompt

}
