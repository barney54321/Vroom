import React from 'react'
import { Form, FormGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
const Meeting = () => {
    const launch = () => {
        // function when we submit form
    }
    return (
        <div>
            <h4>Launch an assistant</h4>
            <Form onSubmit={launch}>
                <Form.Group>
                    <Form.Label>URL of the zoom meeting</Form.Label>
                    <Form.Control type="text" placeholder="https://zoom.example..."></Form.Control>
                    <Form.Label>Your zoom name</Form.Label>
                    <Form.Control type="text" placeholder="Some name"></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>            
        </div>
    )
}

export default Meeting;
