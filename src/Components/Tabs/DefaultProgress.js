import React, {useState, useContext } from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import BarObject from '../Common/BarObject';
import { VroomContext } from '../Common/VroomContext';
import axios from "axios";

const DefaultProgress = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [showStudents, setShowStudents] = useState(false);
    
    const {
        getProgress,
        progress
    } = useContext(VroomContext);
    
    // progress of students: [{question: 1, names: ["Name 1", "Name 2"]}, {question: 2, names: ["Name 3"]}]
    let students = []
    if (activeIndex !== null && progress[activeIndex].names) {
        students = progress[activeIndex].names
    }

    console.log("progress", progress)

    const studentInfo = showStudents ?
    <div className="students"> 
        <h4>Students</h4>
        <ListGroup className={"mb-3"}>
            {students.map((student, index) => <ListGroup.Item >{student}</ListGroup.Item>)}
        </ListGroup>
    </div>
    : console.log();

    return (
        <div className="tab-container">
            <div>
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h4>Progress</h4>
                        <p>Select a question to view students</p>
                    </div>
                    <Button className="mb-2" onClick={getProgress}>Refresh</Button>
                </div>
                
                
                <BarObject
                    question=" "
                    options={progress}
                    activeIndex={activeIndex}
                    setActiveIndex={setActiveIndex}
                    showVotes={false}
                    setShowStudents={setShowStudents}
                />
            </div>
            <hr></hr>
            {studentInfo}
        </div>
        
    )
}

export default DefaultProgress;