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
        <div>
            <h4>Modify Commands</h4>
            <Form onSubmit={submitForm}>
                <Form.Group>
                    <Form.Label>!now</Form.Label>
                    <Form.Control type="text" placeholder="Enter what students should be working on now"></Form.Control>
                    <Form.Label>!attend</Form.Label>
                    <Form.Control type="text" placeholder="Enter the attendance link."></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>      
        </div>
    )
}

export default Commands
