import React, { useState } from 'react';
import { exampleAgent } from '../../../api/agents/exampleAgent';
import '../chat.css';

const Title = () => {
    return (
        <div className="chat-header">
            <span className='chat-about'>Geometry Chat</span>
        </div>
    );
}

const UserInput = ({ onButtonClick }) => {
    const [value, setValue] = useState("");
    function handle() {
        onButtonClick(value);
        setValue("");
    }
    return (
        <div className="chat-message">
            <div className="input-group mb-0">
                <div className="input-group-prepend pad">
                    <input name="inputMessage" type="text" className="form-control" placeholder="Enter text here..."
                        value={value}
                        onChange={(e) => { setValue(e.target.value) }}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                onButtonClick(e.target.value);
                                setValue("");
                            }
                        }}
                        autoComplete="off" />
                    <span className="input-group-text"><i id="buttons" className="fa fa-paper-plane-o fa-2x" onClick={handle}></i></span>
                </div>
            </div>
        </div>
    );
}

const OutputMessage = ({ messageText, time }) => {
    return (
        <li className="clearfix">
            <div className="message-data">
                <span className="message-data-time">{time}</span>
            </div>
            <div className="message my-message">{messageText}</div>
        </li>
    );
}

const InputMessage = ({ messageText, time }) => {
    return (
        <li className="clearfix">
            <div className="message-data float-right">
                <span className="message-data-time">{time}</span>
            </div>
            <div className="message other-message float-right multiline">{messageText}</div>
        </li>
    );
}

const Message = ({ text, classMessage, time }) => {
    if (classMessage === 'output') {
        return (<OutputMessage messageText={text} time={time} />);
    } else {
        return (
            <InputMessage messageText={text} time={time} />
        );
    }
}

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);

    const handleMessage = async (msg) => {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const newMessages = [...messages, { text: msg, class: 'input', time }];
        setMessages(newMessages);

        try {
            const response = await fetch('http://localhost:5000/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: msg }),
            });
            const data = await response.json();
            const responseTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: data.response, class: 'output', time: responseTime }
            ]);
        } catch (error) {
            console.error(error);
            const errorTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'Пока что я не могу ответить.', class: 'output', time: errorTime }
            ]);
        }
    };

    return (
        <div className="chat row">
            <Title />
            <div className="chat-history vertical-scroll">
                <ul>
                    {messages.map((msg, index) => (
                        <Message key={index} text={msg.text} classMessage={msg.class} time={msg.time} />
                    ))}
                </ul>
            </div>
            <UserInput onButtonClick={handleMessage} />
        </div>
    );
}

export default ChatWindow;