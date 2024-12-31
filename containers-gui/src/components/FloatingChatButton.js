import React, { useState } from "react"
import { Chat } from "./Chat"

export const FloatingChatButton = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
        <button
            onClick={() => setIsOpen(!isOpen)}
            className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg"
        >
            {isOpen ? "Zamknij Chat" : "Otwórz Chat"}
        </button>

        {isOpen && (
            <div className="fixed bottom-16 right-4 w-[400px] h-[600px] bg-white border rounded-2xl shadow-lg flex flex-col overflow-hidden">
                <Chat />
            </div>
        )}
    </>
    )
}