import React from 'react'
import { Form, FormGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from "axios";

const Meeting = () => {
    const launch = (event) => {
        event.preventDefault();

        const url = document.getElementById("url-link").value;
        const name = document.getElementById("tutor-name").value;

        axios.post("http://127.0.0.1:8080/join", {name: name, url: url}).then(res => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        });
    }
    return (
        <div className="p-1">
            <h4 className="pt-5">Launch an assistant</h4>
            <Form onSubmit={launch}>
                <Form.Group>
                    <Form.Label className="mb-2">URL of the zoom meeting</Form.Label>
                    <Form.Control className="mb-4" id="url-link" type="text" placeholder="https://zoom.example..."></Form.Control>
                    <Form.Label className="mb-2">Your zoom name</Form.Label>
                    <Form.Control className="mb-4"id="tutor-name" type="text" placeholder="Some name"></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={e => launch(e)}>Submit</Button>
            </Form>            
        </div>
    )
}

export default Meeting;
