const PORT = 3005
const express = require('express')
const cors = require('cors')
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(cors())

const API_KEY = process.env.API_KEY

app.post('/completions', async (req, res) => {
    const options = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [{role: "user", content: req.body.message}],
            max_tokens: 100,
        })
    }
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions',options)
        const data = await response.json()
        res.send(data)
    }
    catch (err) {
        console.error(err);
    }
})

app.get('/',(req,res)=>{
    res.send('Backend running')
})

app.listen(PORT, () => console.log(`server listening on port: ${PORT}`))

