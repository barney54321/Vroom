import React from 'react'
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const Commands = () => {
    const submitForm = () => {
        // function when we submit form
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
