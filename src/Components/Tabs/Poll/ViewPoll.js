import React, {useState, useContext} from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import BarObject from '../../Common/BarObject';
import { VroomContext } from '../../Common/VroomContext';

// import { VroomContext } from '../Common/VroomContext';

const ViewPoll = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showStudentsForPoll] = useState(true);

    const {
        setPollPage,
    } = useContext(VroomContext);
    
    const poll = [{question: "q1", students: ["amy", "bob"], value: 90}, {question: "q2", students: ["caro", "db"], value: 90}]
    
    // need to get these values
    const values = null;
    const votes = 0;
    const question = "Question"

    const refresh = () => {
        // refresh button 
        console.log("refresh")
    }
    
    const closePoll = () => {
        // close poll
        console.log("close poll")
    }

    const createNewPoll = () => {
        // close poll
        setPollPage("build")
    }

    const handleBack = () => {
        setPollPage("existing")
    }


    return (
        <div>
            <div>
                <h4>Poll Results</h4>
                <p>Select an answer to view students</p>
                <BarObject values={values} votes={votes} question={question} activeIndex={activeIndex} setActiveIndex={setActiveIndex}></BarObject>
            </div>
            <div className="students"> 
                {showStudentsForPoll && <h4>Students</h4>}
                <ListGroup>
                    {showStudentsForPoll && poll[activeIndex].students.map((student, index) => <ListGroup.Item >{student}</ListGroup.Item>)}
                </ListGroup>
            </div>
            <Button variant="danger" onClick={closePoll}>Close Poll</Button>
            <Button onClick={refresh}>Refresh</Button>
            <Button onClick={createNewPoll}>+ New Poll</Button>
            <Button onClick={handleBack}>Back</Button>
        </div>
        
    )
}

export default ViewPoll;