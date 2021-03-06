import React, { useState, useContext } from 'react'
import { Form, Toast, ToastContainer } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { VroomContext } from '../../Common/VroomContext';
import axios from "axios";
import LoadingBar from '../../Common/LoadingBar';

const Meeting = () => {
    const {
        setInMeeting,
        setTutorName
    } = useContext(VroomContext);

    const [showLoading, setShowLoading] = useState(false)
    const [showToast, setShowToast] = useState(false)

    const launch = (event) => {
        event.preventDefault();

        const url = document.getElementById("url-link").value;
        const name = document.getElementById("tutor-name").value;

        axios.post("http://127.0.0.1:8080/join", {name: name, url: url}).then(res => {
            console.log(res)
            setInMeeting(true);
            setTutorName(name);
            setShowLoading(false);
        }).catch(err => {
            console.log(err)
            setShowToast(true);
            setShowLoading(false);
        });
    }
    return (
        <>
        {showLoading ?   
        <LoadingBar text="Please wait while Vroom joins!"/>
        : 
        <div className="tab-container">
            <h4>Launch an assistant</h4>
            <Form onSubmit={launch}>
                <Form.Group>
                    <Form.Label className="mb-2">URL of the zoom meeting</Form.Label>
                    <Form.Control className="mb-4" id="url-link" type="text" placeholder="https://zoom.example..."></Form.Control>
                    <Form.Label className="mb-2">Your zoom name</Form.Label>
                    <Form.Control className="mb-4"id="tutor-name" type="text" placeholder="Some name"></Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={e => {launch(e); setShowLoading(true);}}>Submit</Button>
            </Form>  
            <ToastContainer style={{width: "fit-content"}} position="top-center" className="p-3" >
                <Toast bg='danger' className="my-toast" onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide>
                    <Toast.Body>Link Invalid!</Toast.Body>
                </Toast>
            </ToastContainer>          
        </div>}

        </>
    )
}

export default Meeting;
