import React, { useContext } from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { VroomContext } from '../../Common/VroomContext';
import axios from 'axios';

const LeaveMeeting = () => {

    const {
        setInMeeting,
        setTutorName,
        tutorName
    } = useContext(VroomContext);

    const updateName = (event) => {

        event.preventDefault();
        
        // function to update name
        const name = document.getElementById("tutor-name").value;

        axios.post("http://127.0.0.1:8080/editname", {name: name}).then(res => {
            console.log(res)
            setTutorName(name);
        }).catch(err => {
            console.log(err)
        });
    }

    const killBot = () => {
        // function to kill bot 

        axios.post("http://127.0.0.1:8080/leave").then(res => {
            setInMeeting(false);
            console.log(res)
        }).catch(err => {
            console.log(err)
        });
    }
    return (
        <div className="tab-container">
            <div className="your-meeting">
                <h4>Your Meeting</h4>
                <Form onSubmit={updateName}>
                    <Form.Group>
                        <Form.Label class="mb-2">Edit your zoom name</Form.Label>
                        <Form.Control className="mb-3" id="tutor-name" type="text" defaultValue={tutorName} placeholder="Your exact zoom name"></Form.Control>
                    </Form.Group>
                </Form>
                <Button variant="primary" type="submit" onClick={e => updateName(e)}>Submit</Button>

            </div>
            <div className="d-flex justify-content-end align-items-center your-meeting-button">
                <Button variant="danger" onClick={killBot}>Kill bot</Button>
            </div>
        </div>
        
    )
}

export default LeaveMeeting
