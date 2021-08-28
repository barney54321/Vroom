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
    const [activeIndex, setActiveIndex] = useState(0);
    const [showStudentsForPoll] = useState(false);

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

    const createNewPoll = () => {
        // close poll
        setPollPage("build")
    }

    const handleBack = () => {
        setPollPage("existing")
    }

    const launchButton = <Button onClick={props.launchPoll}>{poll.hasLaunched ? "Relaunch" : "Launch"}</Button>;

    const actionButton = isActive ? <Button variant="danger" onClick={closePoll}>Close Poll</Button> : launchButton;
        

    return (
        <div className="tab-container">
            <div>
                <h4 className="pt-5">Poll Results</h4>
                <p>Select an answer to view students</p>
                <BarObject
                    options={options}
                    question={question}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}>
                </BarObject>
            </div>
            <div className="students"> 
                {showStudentsForPoll && <h4>Students</h4>}
                <ListGroup>
                    {showStudentsForPoll && poll[activeIndex].names.map((student, index) => <ListGroup.Item >{student}</ListGroup.Item>)}
                </ListGroup>
            </div>
            {actionButton}
            <Button onClick={refresh}>Refresh</Button>
            <Button onClick={createNewPoll}>+ New Poll</Button>
            <Button onClick={handleBack}>Back</Button>
        </div>
        
    )
}

export default ViewPoll;