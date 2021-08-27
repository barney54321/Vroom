import React, {useState, useContext} from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import BarObject from '../Common/BarObject';
import { VroomContext } from '../Common/VroomContext';

const DefaultProgress = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showStudents, setShowStudents] = useState(true);
    
    const {
        polls,
        setPolls
    } = useContext(VroomContext);
    
    const progress = [{question: "q1", students: ["amy", "bob"], value: 90},  {question: "q2", students: ["caro", "db"], value: 90}]

    const refresh = () => {
        // refresh button 
    }

    return (
        <div>
            <div>
                <h4>Progress</h4>
                <p>Select a question to view students</p>
                <BarObject question=" " activeIndex={activeIndex} setActiveIndex={setActiveIndex}></BarObject>
            </div>
            <div className="students"> 
                {showStudents && <h4>Students</h4>}
                <ListGroup>
                    {showStudents && progress[activeIndex].students.map((student, index) => <ListGroup.Item >{student}</ListGroup.Item>)}
                </ListGroup>
            </div>
            <Button onClick={refresh}>Refresh</Button>
        </div>
        
    )
}

export default DefaultProgress;