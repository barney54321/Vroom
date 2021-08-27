import React from 'react'
import { Form, FormGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
const Meeting = () => {
    const launch = () => {
        // function when we submit form
    }
    return (
        <div className="meeting-page p-1">
            <h4>Launch an assistant</h4>
            <Form onSubmit={launch}>
                <Form.Group>
                    <Form.Label className="mb-2">URL of the zoom meeting</Form.Label>
                    <Form.Control className="mb-4" type="text" placeholder="https://zoom.example..."></Form.Control>
                    <Form.Label>Your zoom name</Form.Label>
                    <Form.Control className="mb-4" type="text" placeholder="Some name"></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">Submit</Button>
            </Form>            
        </div>
    )
}

export default Meeting;
