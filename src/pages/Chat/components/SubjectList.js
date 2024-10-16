import React from 'react';
import '../chat.css';

const Search = () => {
    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <span className="input-group-text row pad"><i id="buttons" className="fa fa-search"></i></span>
                <input type="text" className="form-control row" placeholder="Search..."
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
            {/* <i class="fa fa-leanpub" aria-hidden="true"></i> */}
            <i id="buttons" class="fa fa-graduation-cap" aria-hidden="true"></i>
            <div className="about subjecttext">
                <div className="name">{name}</div>
                <div className="status"> <i className="fa fa-circle online"></i>{tag}</div>
            </div>
        </li>
    );
}

const SubjectList = () => {
    return (
        <div className="people-list row">
            <div style={{ width: "90%", height: "6%", paddingTop: "2%", paddingTop: "5%" }}>
                <span className='title'>History</span>
            </div>
            <div style={{ width: "80%", height: "70%", paddingBottom: "2%", paddingTop: "5%" }} className='hidden vertical-scroll'>
                <ul className="chat-list">
                    <HistoryPart name={"Math 1"} tag={"To study"} />
                    <HistoryPart name={"Math 2"} tag={"To study"} />
                    <HistoryPart name={"Math 3"} tag={"To study"} />
                    <HistoryPart name={"Math 1"} tag={"To study"} />
                    <HistoryPart name={"Math 2"} tag={"To study"} />
                    <HistoryPart name={"Math 3"} tag={"To study"} />
                    <HistoryPart name={"Math 1"} tag={"To study"} />
                    <HistoryPart name={"Math 2"} tag={"To study"} />
                    <HistoryPart name={"Math 3"} tag={"To study"} />
                    <HistoryPart name={"Math 1"} tag={"To study"} />
                    <HistoryPart name={"Math 2"} tag={"To study"} />
                    <HistoryPart name={"Math 3"} tag={"To study"} />
                </ul>
            </div>
            <div style={{ width: "90%", height: "7%", paddingTop: "5%" }}>
                <Search />
            </div>
        </div>
    );
}

export default SubjectList;
