import express from "express"
import fetch from "node-fetch"
import dotenv from "dotenv"

dotenv.config()

const app=express()

app.use(express.json())

app.use(express.static("."))

app.post("/generate",async(req,res)=>{

const script=req.body.script

const prompt=`
Convert this YouTube script into a cinematic AI prompt:

${script}
`

const response=await fetch(
`https://generativelanguage.googleapis.com/v1beta/models/${process.env.model}:generateContent?key=${process.env.gmni_key}`,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[{parts:[{text:prompt}]}]
})
}
)

const data=await response.json()

const output=data.candidates[0].content.parts[0].text

res.json({prompt:output})

})

app.listen(3000)
