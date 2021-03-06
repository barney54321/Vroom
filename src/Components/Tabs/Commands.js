import React, { useState, useContext } from 'react'
import { ToastContainer, Toast, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import { VroomContext } from '../Common/VroomContext';


// Send JSON body with new commands: {commands: [{command: "now", response: "Questions"}, {command: "attend", response: "bitly.qwerty"}]}


const Commands = () => {
    const [showToast, setShowToast] = useState(false);

    const {
        commands,
        setCommands
    } = useContext(VroomContext);

    const submitForm = (event) => {
        event.preventDefault();
        const now = document.getElementById("now-command").value;
        const attend = document.getElementById("attend-command").value;
        const newCommands = [
            {command: "now", response: now},
            {command: "attend", response: attend}
        ]
        axios.post("http://127.0.0.1:8080/updatecommands", {commands: newCommands}).then(res => {
            setCommands(newCommands)
            setShowToast(true)
        }).catch(err => {
            console.log(err)
        });
    }
    return (
        <div className="tab-container">
            <h4>Modify Commands</h4>
            <Form onSubmit={submitForm}>
                <Form.Group>
                    <Form.Label className="mb-2">!now</Form.Label>
                    <Form.Control className="mb-3" id="now-command" type="text" defaultValue={commands[0].response} placeholder="Enter what students should be working on now"></Form.Control>
                    <Form.Label className="mb-2">!attend</Form.Label>
                    <Form.Control className="mb-3" id="attend-command" type="text" defaultValue={commands[1].response} placeholder="Enter the attendance link."></Form.Control>
                </Form.Group>
                <div className="your-meeting-button">
                     <Button variant="primary" type="submit" onClick={e => submitForm(e)}>Submit</Button>
                </div>
            </Form> 
            <ToastContainer style={{width: "fit-content"}} position="top-end" className="p-3" >
                <Toast bg='primary' className="my-toast" onClose={() => setShowToast(false)} show={showToast} delay={1000} autohide>
                    <Toast.Body>Saved!</Toast.Body>
                </Toast>
            </ToastContainer>     
        </div>
    )
}

export default Commands
