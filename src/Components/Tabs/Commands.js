import React from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

// Send JSON body with new commands: {commands: [{command: "now", response: "Questions"}, {command: "attend", response: "bitly.qwerty"}]}


const Commands = () => {
    const submitForm = () => {
        axios.post("http://127.0.0.1:8080/updatecommands").then(res => {
            
        }).catch(err => {
            console.log(err)
        });
    }
    return (
        <div className="tab-container">
            <h4 className="pt-5">Modify Commands</h4>
            <Form onSubmit={submitForm}>
                <Form.Group>
                    <Form.Label class="mb-2">!now</Form.Label>
                    <Form.Control className="mb-3" type="text" placeholder="Enter what students should be working on now"></Form.Control>
                    <Form.Label class="mb-2">!attend</Form.Label>
                    <Form.Control className="mb-3" type="text" placeholder="Enter the attendance link."></Form.Control>
                </Form.Group>
                    <div className="p-1 your-meeting-button">
                        <Button variant="primary" type="submit">Submit</Button>
                    </div>
            </Form>      
        </div>
    )
}

export default Commands
