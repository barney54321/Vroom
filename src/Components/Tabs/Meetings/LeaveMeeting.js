import React from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const LeaveMeeting = () => {
    const updateName = (event) => {

        event.preventDefault();
        
        // function to update name
        const name = document.getElementById("tutor-name").value;

        axios.post("http://127.0.0.1:8080/editname", {name: name}).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        });
    }

    const killBot = () => {
        // function to kill bot 

        axios.post("http://127.0.0.1:8080/leave").then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        });
    }
    return (
        <div>
            <h4>Your Meeting</h4>
            <Form onSubmit={updateName}>
                <Form.Group>
                    <Form.Label>Edit your zoom name</Form.Label>
                    <Form.Control id="tutor-name" type="text" placeholder="Your exact zoom name"></Form.Control>
                </Form.Group>
            </Form>
            <Button variant="primary" type="submit" onClick={e => updateName(e)}>Submit</Button>
            <Button variant="danger" onClick={killBot}>Kill bot</Button>
        </div>
    )
}

export default LeaveMeeting
