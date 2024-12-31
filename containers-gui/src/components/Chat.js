import React, { useEffect, useState, useRef } from "react"
import { HubConnectionBuilder } from "@microsoft/signalr"
import axios from "axios"

export const Chat = () => {
    const [connection, setConnection] = useState(null)
    const [messages, setMessages] = useState([])
    const [message, setMessage] = useState("")
    const [username, setUsername] = useState(() => {
        return localStorage.getItem("username") || ""
    })
    const connectedRef = useRef(false)
    const messagesEndRef = useRef(null)

const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
}

    useEffect(() => {
        if (connectedRef.current) return
        connectedRef.current = true

        const connect = async () => {
            const cn = new HubConnectionBuilder()
                .withUrl(`${process.env.REACT_APP_BACKEND_URL}/chat`)
                .withAutomaticReconnect()
                .build()

            cn.on("ReceiveMessage", (user, message) => {
                setMessages((prev) => [...prev, { user, message }])
            })

            await cn.start()
            setConnection(cn)

            fetchChatHistory()
        }

        connect()
    }, [])

    const fetchChatHistory = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/chat/history`)
            const loadedHistory = response.data.map(item => ({
                user: item.User,
                message: item.Message
            }))
            setMessages((prev) => [...loadedHistory, ...prev])
        } catch (error) {
            console.error("Failed to fetch chat history:", error)
        }
    }

    const handleSend = async (e) => {
        e.preventDefault()
        if (connection) {
            try {
                await connection.invoke("SendMessage", username, message)
                setMessage("")
                scrollToBottom()
            } catch (error) {
                console.error("SendMessage error:", error)
            }
        }
    }

    useEffect(() => {
        localStorage.setItem("username", username)
    }, [username])

    return (
        <div className="flex flex-col h-full rounded-2xl">
        <header className="flex items-center justify-between p-4 bg-blue-600 text-white">
            <input
                type="text"
                placeholder="Nazwa"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="px-2 py-1 border rounded-2xl text-black"
            />
        </header>

        <div className="grid grid-cols-2 flex-1 p-4 bg-gray-100 space-y-4 overflow-y-auto" >
            {messages.map((m, idx) => {
                const isMe = m.user === username
                return (
                    <>
                    <div
                        key={idx}
                        className={`max-w-sm p-3 rounded-3xl text-sm ${
                            isMe
                                ? "bg-blue-500 text-white self-end text-right col-start-2 justify-self-end"
                                : "bg-gray-300 text-black self-start text-left col-start-1 justify-self-start"
                        }`}
                        style={{
                            borderRadius: "15px",
                            padding: "10px 15px",
                            maxWidth: "60%",
                            alignSelf: isMe ? "flex-end" : "flex-start",
                        }}
                    >
                        {!isMe && <div className="text-xs text-gray-500">{m.user}</div>}
                        <div>{m.message}</div>
                       
                    </div>
                     {!isMe && <div className="col-start-2 justify-self-end"></div>}
                     </>
                )
            })}
            <div ref={messagesEndRef} className="h-4" ></div>
        </div>

        <form
            onSubmit={handleSend}
            className="flex p-4 border-t bg-white"
        >
            <input
                type="text"
                placeholder="Wiadomość"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 border p-2 rounded-2xl mr-2"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-2xl"
            >
                wyślij
            </button>
        </form>
    </div>
    )
}