import React from 'react';
import './chat.css';
import sendButtonImage from './images/send.png';

const Title = () => {
    return (
        <div class="chat-header clearfix">
            <div class="row">
                <div>
                    <a href="http://localhost:3000/chat" data-toggle="modal" data-target="#view_info">
                        <img src="https://th.bing.com/th/id/OIP.A8lyNalw4uW0GtMhQB_9ZAHaHa?w=800&h=800&rs=1&pid=ImgDetMain" alt="avatar" />
                    </a>
                    <div class="chat-about">
                        <h class="title">Chat</h>
                    </div>
                </div>
            </div>
        </div>
    );
}

const Search = () => {
    return (
        <div class="input-group">
            <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-search"></i></span>
                <input type="text" class="form-control" placeholder="Search..." />
            </div>
        </div>
    );
}

const PeopleList = () => {
    return (
        <div id="plist" class="people-list">
            <Search />
            <p>History</p>
            <ul class="list-unstyled chat-list mt-2 mb-0">
                <li class="clearfix">
                    <img src="https://www.altinoluk.com.tr/files/categories/oku-dusun-12667.png" alt="avatar" />
                    <div class="about">
                        <div class="name">Triangle Theorem</div>
                        <div class="status"> <i class="fa fa-circle offline"></i> Study </div>
                    </div>
                </li>
                <li class="clearfix active">
                    <img src="https://www.altinoluk.com.tr/files/categories/oku-dusun-12667.png" alt="avatar" />
                    <div class="about">
                        <div class="name">Square Formula</div>
                        <div class="status"> <i class="fa fa-circle online"></i> To learn </div>
                    </div>
                </li>
            </ul>
        </div>
    );
}

const sendMessage = (inputMessage) => {
    return (
        <div>{inputMessage}</div>
    );
}

const UserInput = () => {
    return (
        <div class="chat-message clearfix">
            <div class="input-group mb-0">
                <div class="input-group-prepend">
                    <input name="inputMessage" type="text" class="form-control" placeholder="Enter text here..." />
                    <img src={sendButtonImage} width="30" height="30" alt="avatar" onClick={() => sendMessage(InputMessage)} />
                </div>

            </div>
        </div>
    );
}
//  <span class="input-group-text"><i class="fa fa-send"></i></span>
const OutputMessage = ({ messageText }) => {
    return (
        <li class="clearfix">
            <div class="message-data">
                <span class="message-data-time">10:12 AM, Today</span>
            </div>
            <div class="message my-message">{messageText}</div>
        </li>
    );
}

const InputMessage = ({ messageText }) => {
    return (
        <li class="clearfix">
            <div class="message-data float-right">
                <span class="message-data-time">10:10 AM, Today</span>
                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar/" />
            </div>
            <div class="message other-message float-right">{messageText}</div>
        </li>
    );
}

const Chat = () => {
    console.log('hello');
    return (
        <div class="container">
            <div class="row clearfix">
                <div class="col-lg-12">
                    <div class="card chat-app">
                        <PeopleList />
                        <div class="chat">
                            <Title />
                            <div class="chat-history">
                                <ul class="m-b-0">
                                    <InputMessage messageText={"Hi, help me to find the square of triangle, please."} />
                                    <OutputMessage messageText={"Hello, can you tell more about the task?"} />
                                </ul>
                            </div>
                            <UserInput />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
