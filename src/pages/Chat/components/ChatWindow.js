import { callSearchAgent } from '../../../api/sc/agents/callSearchAgent';
import '../chat.css';
import React, { useCallback, useEffect, useState, Fragment } from 'react';

const keyWords = new Map([
    ["узлы", "action_find_key_concepts"],
    ["изображения", "action_find_images"],
    ["отношения", "action_find_relations"],
    ["определения", "action_find_definitions"],
    ["аксиомы", "action_find_axioms"],
    ["задачи", "action_find_tasks"],
    ["утверждения", "action_find_statements"],
    ["доказательства", "action_find_statements_proofs"],
    ["теоремы", "action_find_statements_theorems"],
]);

const keyWordsAbout = new Map([
    ["Предметная область треугольников", "subject_domain_of_triangles"],
    ["Предметная область множеств", "subject_domain_of_sets"],
    ["Предметная область фигур", "subject_domain_of_figures"],
    ["Предметная область многоугольников", "subject_domain_of_polygons"],
    ["треугольник", "concept_triangle"],
    ["фигура", "concept_figure"],
    ["множество", "concept_set"],
    ["угол", "d_concept_angle"],
    ["квадрат", "concept_square"],
]);

// Какие ключевые узлы в Предметная область треугольников?
// Какие ключевые узлы в Предметная область треугольников?
const ParseInputMessage = (msg) => {
    const splitted = msg.split(" ");
    let keys = [...keyWords.keys()];
    for (let i = 0; i < keys.length; i++) {
        if (splitted.includes(keys[i])) {
            let keysAbout = [...keyWordsAbout.keys()];
            for (let j = 0; j < keysAbout.length; j++) {
                if (msg.includes(keysAbout[j])) {
                    return [keyWords.get(keys[i]), keyWordsAbout.get(keysAbout[j]), keys[i]];
                }
            }
        }
    }
    return null;
}

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
        const now = new Date();
        const options = { weekday: 'long', hour: '2-digit', minute: '2-digit' };
        const time = now.toLocaleString([], options);
        const newMessages = [...messages, { text: msg, class: 'input', time }];
        setMessages(newMessages);

        try {
            const paramaters = ParseInputMessage(msg);
            let data = "";
            if (paramaters !== null) {
                const action_class = paramaters[0];
                const argument = paramaters[1];
                const keyword = paramaters[2];
                console.log(paramaters);
                data = await callSearchAgent(action_class, argument, keyword);
            }
            else {
                const response = await fetch('http://localhost:5000/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', },
                    body: JSON.stringify({ message: msg }),
                });
                data = await response.json();
                data = data.response;
            }
            const responseTime = now.toLocaleString([], options);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: data, class: 'output', time: responseTime }
            ]);
        } catch (error) {
            console.error(error);
            const errorTime = now.toLocaleString([], options);
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