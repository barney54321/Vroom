import React, {useState, useContext} from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import BarObject from '../../Common/BarObject';
import { VroomContext } from '../../Common/VroomContext';
import axios from "axios";

// import { VroomContext } from '../Common/VroomContext';

/*
Poll
{
    name: "Poll 1",
    question: "What project is more awesome?",
    options: [ 
        {option: "Vroom",
        names: ["amy", "bob"]},
        {option: "Vroom but in blue",
        names: ["steven", "someone"]}
    ]   
}
*/

const ViewPoll = (props) => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [showStudents, setShowStudents] = useState(false);

    const {
        setPollPage,
        currentPoll,
        activePoll,
        setActivePoll,
        polls,
        setPolls
    } = useContext(VroomContext);

    const isActive = currentPoll === activePoll;
    
    const poll = polls[currentPoll];

    // need to get these values
    const options = poll.options;
    const question = poll.question;

    let students = []
    if (activeIndex !== null && poll.options[activeIndex].names) {
        students = poll.options[activeIndex].names
    }

    const getResults = () => {
        axios.get("http://127.0.0.1:8080/results").then(res => {
            const copy = [...polls];
            copy[currentPoll].options = res.data.options
            setPolls(copy)
        }).catch(err => {
            console.log(err)
        });
    }

    const refresh = () => {
        if (isActive) {
            getResults();
        }
    }
    
    const closePoll = () => {
        // close poll
        axios.post("http://127.0.0.1:8080/closepoll").then(res => {
            const copy = [...polls];
            copy[currentPoll].options = res.data.options
            setPolls(copy);
            setActivePoll(null);
        }).catch(err => {
            console.log(err)
        });
    }

    const handleBack = () => {
        setPollPage("existing")
    }

    const launchButton = <Button onClick={props.launchPoll}>{poll.hasLaunched ? "Relaunch" : "Launch"}</Button>;

    const actionButton = isActive ? <Button variant="danger" onClick={closePoll}>Close Poll</Button> : launchButton;

    const studentsInfo =  showStudents ?
        <div className="students"> 
            <hr></hr>
            <h4 style={{marginTop: -20}}>Students</h4>
            <ListGroup>
                {students.map((student, index) => <ListGroup.Item >{student}</ListGroup.Item>)}
            </ListGroup>
        </div>
        : console.log();
    
    return (
        <div className="tab-container">
            <div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4>Poll Results</h4>
                    <Button className="mt-2" onClick={handleBack}>Back</Button>
                </div>
                <BarObject
                    options={options}
                    question={question}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    setShowStudents={setShowStudents}
                />
            </div>
            <div className="mt-3 d-flex justify-content-end">
                <Button className="me-2" onClick={refresh}>Refresh</Button> 
                {actionButton}               
            </div>
            {studentsInfo}
            
        </div>
        
    )
}

export default ViewPoll;