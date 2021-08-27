import React from 'react'
import { Form, FormGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const LeaveMeeting = () => {
    const updateName = () => {
        // function to update name
    }

    const killBot = () => {
        // function to kill bot 
    }
    return (
        <div>
            <h4>Your Meeting</h4>
            <Form onSubmit={updateName}>
                <Form.Group>
                    <Form.Label>Edit your zoom name</Form.Label>
                    <Form.Control type="text" placeholder="Your exact zoom name"></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>
            <Button variant="danger" onClick={killBot}>Kill bot</Button>
        </div>
    )
}

export default LeaveMeeting
