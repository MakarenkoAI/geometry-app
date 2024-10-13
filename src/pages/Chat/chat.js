import React, { useState } from 'react';
import './chat.css';
import sendButtonImage from './images/send.png';

const Title = () => {
    return (
        <div className="chat-header clearfix">
            <a href="http://localhost:3000/chat" data-toggle="modal" data-target="#view_info">
                <img src="https://th.bing.com/th/id/OIP.A8lyNalw4uW0GtMhQB_9ZAHaHa?w=800&h=800&rs=1&pid=ImgDetMain" alt="avatar" />
            </a>
            <span className='chat-about'>Chat</span>
        </div>
    );
}

const Search = () => {
    return (
        <div className="input-group">
            <div className="input-group-prepend inline">
                <span className="input-group-text"><i className="fa fa-search"></i></span>
                <input type="text" className="form-control" placeholder="Search..."
                    onKeyUp={(e) => {
                        if (e.key === 'Enter') {
                            alert(e.target.value);
                        }
                    }} />
            </div>
        </div>
    );
}

const HistoryPart = ({ name, tag, active }) => {
    // active
    return (
        <li className="clearfix">
            <img src="https://www.altinoluk.com.tr/files/categories/oku-dusun-12667.png" alt="avatar" />
            <div className="about">
                <div className="name">{name}</div>
                <div className="status"> <i className="fa fa-circle online"></i>{tag}</div>
            </div>
        </li>
    );
}

const PeopleList = () => {
    return (
        <div id="plist" className="people-list">
            <div className='inline'><Search />
                <span className='title'>History</span>
            </div>
            <ul className="chat-list">
                <HistoryPart name={"Math 1"} tag={"To study"} />
                <HistoryPart name={"Math 2"} tag={"To study"} />
                <HistoryPart name={"Math 3"} tag={"To study"} />
            </ul>
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
        <div className="chat-message clearfix">
            <div className="input-group mb-0">
                <div className="input-group-prepend">
                    <input name="inputMessage" type="text" className="form-control" placeholder="Enter text here..."
                        value={value} // ...force the input's value to match the state variable...
                        onChange={(e) => { setValue(e.target.value) }}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                alert(e.target.value);
                            }
                        }} />
                    <img src={sendButtonImage} width="6%" height="6%" alt="avatar" onClick={handle} />
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
        <div className="chat">
            <Title />
            <div className="chat-history">
                <ul className="m-b-0">
                    <InputMessage messageText={"Hi, help me to find the square of triangle, please."} />
                    <OutputMessage messageText={"Hello, can you tell more about the task?"} />
                </ul>
            </div>
            <UserInput />
        </div>
    );
}
const Chat = () => {
    return (
        <div className="container" >
            <div display='inline-block'>
                <PeopleList />
                <ChatWindow />
            </div>
        </div>
    );
};

export default Chat;
