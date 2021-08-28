import React, {useState, useContext} from 'react';
import { Button, ListGroup } from 'react-bootstrap';
import BarObject from '../Common/BarObject';
import { VroomContext } from '../Common/VroomContext';
import axios from "axios";

const DefaultProgress = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [showStudents, setShowStudents] = useState(false);
    
    const {
        setProgress,
        progress
    } = useContext(VroomContext);
    
    //  const progress = [{question: "q1", students: ["amy", "bob"], value: 90},  {question: "q2", students: ["caro", "db"], value: 90}]

    const getProgress = () => {
        // refresh button 
        axios.get("http://127.0.0.1:8080/getprogress").then(res => {
            setProgress(res.data.questions)

            // Check logic on whether to show students or not 
            if (res.data.questions) {
                setShowStudents(true);
            }
        }).catch(err => {
            console.log(err)
        });

        console.log(progress)
    }

    return (
        <div className="tab-container">
            <div>
                <h4>Progress</h4>
                <p>Select a question to view students</p>
                <BarObject question=" " activeIndex={activeIndex} setActiveIndex={setActiveIndex}></BarObject>
            </div>
            <hr></hr>
            <div className="students"> 
                {showStudents && <h3>Students</h3>}
                <ListGroup className={showStudents && "mb-3"}>
                    {showStudents && progress.length!== 0 ? progress[activeIndex].names.map((student, index) => <ListGroup.Item >{student}</ListGroup.Item>) : console.log("none")}
                </ListGroup>
            </div>
            <Button className="mb-5" onClick={getProgress}>Refresh</Button>
        </div>
        
    )
}

export default DefaultProgress;