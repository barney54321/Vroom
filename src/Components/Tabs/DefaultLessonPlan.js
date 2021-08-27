import React from 'react'
import { Form, FormGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

const Commands = () => {
    const createNew = () => {
        // function to create a new lesson plan
    }

    const importPlan = () => {
        // function to import a lesson plan
    }
    return (
        <div>
            <Form onSubmit={submitForm}>
            <Form.Group>
                <Form.Label>Some message about lesson plans</Form.Label>
            </Form.Group>
                <Button variant="primary" onClick={importPlan}>Import</Button>
                <Button variant="primary" onClick={createNew}>Create New</Button>
            </Form>            
        </div>
    )
}

export default Commands
