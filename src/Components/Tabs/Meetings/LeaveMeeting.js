import React, { useState, useContext } from 'react'
import { ToastContainer, Toast, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { VroomContext } from '../../Common/VroomContext';
import axios from 'axios';
import LoadingBar from '../../Common/LoadingBar';

const LeaveMeeting = () => {
    const [showToast, setShowToast] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    const {
        setInMeeting,
        setTutorName,
        tutorName
    } = useContext(VroomContext);

    const updateName = (event) => {

        event.preventDefault();
        
        
        // function to update name
        const name = document.getElementById("tutor-name").value;

        axios.post("http://127.0.0.1:8080/editname", {name: name}).then(res => {
            console.log(res)
            setTutorName(name);
            setShowToast(true);
            setShowLoading(false);
        }).catch(err => {
            console.log(err)
            setShowLoading(false);
        });
    }

    const killBot = () => {
        // function to kill bot 

        axios.post("http://127.0.0.1:8080/leave").then(res => {
            setInMeeting(false);
            console.log(res);
            setShowLoading(false);
            
        }).catch(err => {
            console.log(err)
        });
    }
    return (
        <>
        {showLoading ?   
        <LoadingBar text="Please wait!"/>
        : 
        <div className="tab-container">
            <div className="your-meeting">
                <h4>Your Meeting</h4>
                <Form onSubmit={updateName}>
                    <Form.Group>
                        <Form.Label class="mb-2">Edit your zoom name</Form.Label>
                        <Form.Control className="mb-3" id="tutor-name" type="text" defaultValue={tutorName} placeholder="Your exact zoom name"></Form.Control>
                    </Form.Group>
                </Form>
                <Button variant="primary" type="submit" onClick={e => {setShowLoading(true); updateName(e); }}>Submit</Button>

            </div>
            <div className="d-flex justify-content-end align-items-center your-meeting-button">
                <Button variant="danger" onClick={() => {setShowLoading(true); killBot();}}>Kill bot</Button>
            </div>
            <ToastContainer style={{width: "fit-content"}} position="top-end" className="p-3" >
                <Toast bg='primary' className="my-toast" onClose={() => setShowToast(false)} show={showToast} delay={1000} autohide>
                    <Toast.Body>Saved!</Toast.Body>
                </Toast>
            </ToastContainer>

            
        
        </div>
        }

        </>
        
        
    )
}

export default LeaveMeeting
