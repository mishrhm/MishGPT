import React, { useEffect } from "react";
import { useState } from "react";


function App() {


    const getMessages = async () => {
    
        try {
            const options = {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    message: value,
                    content: value,
                })
            }
            const response = await fetch('http://localhost:3005/completions', options)
            const data = await response.json()
            setMessage(data.choices[0].message)

        } catch (err) {
            console.error(err);
        }
    }

    const createNewChat = async () => {
        setMessage([])
        setValue("")
        setTitle(null)
    }

    const swapChat = async (newTitle) => {
        setTitle(newTitle)
        setValue("")
        setMessage([])
    }


    const [message, setMessage] = useState(null);
    const [value, setValue] = useState("");
    const [allChats, setAllChats] = useState([])
    const [title, setTitle] = useState(null)

    const currentChat = allChats.filter(chat => chat.title === title)
    const uniqueTitles = Array.from(new Set(allChats.map(chat => chat.title)))


    useEffect(() => {
        if (!title && value && message) {
            setTitle(value)
        }
        if (title && value && message) {
            setAllChats(allChats => (
                [...allChats,
                {
                    role: "user",
                    content: value,
                    "title": title,
                },
                {
                    role: "assistant",
                    content: message.content,
                    "title": title,
                }
                ]
            ))
        }
    }, [message, title])

    console.log(allChats)



    return (
        <div className="wrapper">
            <section className="sidebar">
                <button onClick={createNewChat}>+ New chat</button>
                <div className="history">
                    <ul>
                        {uniqueTitles.map((title, index) =>
                            <p key={index} onClick={()=>swapChat(title)}>
                                {title}
                            </p>)}
                    </ul>
                </div>
                <nav>
                    <p>Made by Mish R</p>
                </nav>
            </section>
            <section className="main-window">
                <div className="banner"><h1>Mish GPT</h1></div>
                <ul className="feeds">
                    {currentChat.map((message, index) => 
                    <li key={index}>
                        <p className="role">{message.role}</p>
                        <p className="content">{message.content}</p>
                    </li>
                    )}
                </ul>
                <div className="input-section">
                    <div className="input-container">
                        <input value={value} onChange={(e) => setValue(e.target.value)} />
                        <div id="submit" onClick={getMessages}>submit</div>
                    </div>
                </div>
                <p className="info">Free Research Preview. This is a ChatGPT clone made by Mish using official openAI public APIs
                    for learning purposes. ChatGPT may produce inaccurate information about people, places, or
                    facts. ChatGPT Mar 23 Version
                </p>
            </section>
            <script src="../app.js"></script>
        </div>
    );
}

export default App;
