import React, {useContext} from 'react';
import { Form, FormGroup } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { VroomContext } from '../../Common/VroomContext';


const OpeningLessonPlan = () => {

    const {
        setLessonPlanPage,
    } = useContext(VroomContext);

    const createNew = () => {
        setLessonPlanPage("build")
    }

    const submitForm = () => {
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

export default OpeningLessonPlan