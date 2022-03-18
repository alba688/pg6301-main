import React, {useState} from "react";
import ReactDOM from "react-dom";

function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    function handleSubmit(event) {
        event.preventDefault();
        onLogin(username);
    }

    return (
        <div>
            <h1>Please log in</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </label>
                <button>Login</button>
            </form>
        </div>
    );
}

function ChatMessage({ chat: { author, message } }) {
    return (
        <div>
            <strong>{author}: </strong>
            {message}
        </div>
    );
}

function ChatApplication({ username }) {
    const [chatLog, setChatLog] = useState([
        {
            author: "Allie",
            message: "Hello",
        },
        {
            author: "Vegard",
            message: "Hello",
        },
        {
            author: "Christian",
            message: "Hello to you",
        },
    ]);
    const [message, setMessage] = useState("");

    function handleNewMessage(event) {
        event.preventDefault();
        setChatLog([...chatLog, { author: username, message }]);
        setMessage("");
    }

    return (
        <div className={"application"}>
            <header>Chat application {username}</header>
            <main>
                {chatLog.map((chat, index) => (
                    <ChatMessage key={index} chat={chat} />
                ))}
            </main>
            <footer>
                <form onSubmit={handleNewMessage}>
                    <input value={message} onChange={(e) => setMessage(e.target.value)} />
                    <button>Submit</button>
                </form>
            </footer>
        </div>
    );
}

function Application() {
    const [username, setUsername] = useState("Allie");

    if (!username) {
        return <Login onLogin={(username) => setUsername(username)} />;
    }

    return <ChatApplication username={username} />;
}

ReactDOM.render(<Application />, document.getElementById("app"));