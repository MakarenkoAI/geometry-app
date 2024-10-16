import React, { useState } from 'react';
import '../chat.css';

const Title = () => {
    return (
        <div className="chat-header">
            <a href="http://localhost:3000/chat" data-toggle="modal" data-target="#view_info">
                <img src="https://th.bing.com/th/id/OIP.A8lyNalw4uW0GtMhQB_9ZAHaHa?w=800&h=800&rs=1&pid=ImgDetMain" alt="avatar" />
            </a>
            <span className='chat-about'>Chat</span>
        </div>
    );
}

const UserInput = () => {
    const [value, setValue] = useState("");
    function handle() {
        alert(value);
        console.log(value);
    }
    return (
        <div className="chat-message">
            <div className="input-group mb-0">
                <div className="input-group-prepend pad">
                    <input name="inputMessage" type="text" className="form-control" placeholder="Enter text here..."
                        value={value} // ...force the input's value to match the state variable...
                        onChange={(e) => { setValue(e.target.value) }}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                alert(e.target.value);
                            }
                        }} />
                    <span className="input-group-text"><i class="fa fa-paper-plane-o fa-2x" onClick={handle}></i></span>
                </div>
            </div>
        </div>
    );
}

const OutputMessage = ({ messageText }) => {
    return (
        <li className="clearfix">
            <div className="message-data">
                <span className="message-data-time">10:12 AM, Today</span>
            </div>
            <div className="message my-message">{messageText}</div>
        </li>
    );
}

const InputMessage = ({ messageText }) => {
    return (
        <li className="clearfix">
            <div className="message-data float-right">
                <span className="message-data-time">10:10 AM, Today</span>
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar/" />
            </div>
            <div className="message other-message float-right">{messageText}</div>
        </li>
    );
}

const ChatWindow = () => {
    return (
        <div className="chat row">
            <Title />
            <div className="chat-history vertical-scroll">
                <ul>
                    <InputMessage messageText={"Hi, help me to find the square of triangle, please."} />
                    <OutputMessage messageText={"Hello, can you tell more about the task?"} />
                    <InputMessage messageText={"Hi, help me to find the square of triangle, please."} />
                    <OutputMessage messageText={"Hello, can you tell more about the task?"} />
                    <InputMessage messageText={"Hi, help me to find the square of triangle, please."} />
                    <OutputMessage messageText={"Hello, can you tell more about the task?"} />
                </ul>
            </div>
            <UserInput />
        </div>
    );
}

export default ChatWindow;
