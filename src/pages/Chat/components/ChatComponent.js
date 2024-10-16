import React from 'react';
import '../chat.css';
import SubjectList from './SubjectList';
import ChatWindow from './ChatWindow';

const ChatComponent = () => {
    return (
        <div className="container" >
            <SubjectList />
            <ChatWindow />
        </div>

    );
};

export default ChatComponent;
