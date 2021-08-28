import React, {useState, useContext } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton'
import { VroomContext } from '../../Common/VroomContext';

const BuildLessonPlan = (props) => {

    const [contents, setcontents]  = useState([{
        name: "",
        time: "",
        description: ""
    }])
    const [name, setName] = useState("");

    const {
        setLessonPlan,
        setLessonPlanPage
    } = useContext(VroomContext);

    const handleAdd = () => {
        if (contents.length < 5) {
            setcontents([...contents, {
                name: "",
                time: "",
                description: ""
            }]);
        }
    }

    const handleDelete = (index) => {
        const copy = [];
        for (let i = 0; i < contents.length; i++) {
            const name = document.getElementById("contents-name" + i).value;
            const time = document.getElementById("contents-time" + i).value;
            const description = document.getElementById("contents-description" + i).value;
            copy.push({
                name: name,
                time: time,
                description: description
            })
        }
        
        copy.splice(index, 1);
        setcontents(copy);
    }

    const handleSave = () => {
        const contents = [];
        for (let i = 0; i < contents.length; i++) {
            const name = document.getElementById("contents-name" + i).value;
            const time = document.getElementById("contents-time" + i).value;
            const description = document.getElementById("contents-description" + i).value;
            contents.push({
                name: name,
                time: time,
                description: description
            })
        }
        const name = document.getElementById("lesson-name").value;
        setLessonPlan({
            name: name,
            contents: contents
        })
        setLessonPlanPage("view")
    }

    const handleExit = () => {
        setLessonPlanPage("opening")
    }

    return (
        <div className="tab-container">
            <h4 className="pt-5">Build Lesson Plan</h4>
            <div className="center-columns">
                <Form className="center-colums w-100">
                    <div className="form-question">
                        <Form.Label className="mb-1">Lesson name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" id="lesson-name" defaultValue={name} />
                    </div>
                    <div className="mt-4">
                        {contents.map((contents, index) => (
                            <div className="d-flex flex-column" key={"overall"+index+contents.name}>
                                <div className="d-flex">
                                    <Form.Label className="mb-1">Section name</Form.Label>
                                    <Form.Control
                                        id={"contents-name" + index}
                                        placeholder="contents name"
                                        defaultValue={contents.name}
                                    />
                                    <Form.Label className="mb-1">Time</Form.Label>
                                    <Form.Control
                                        id={"contents-time" + index}
                                        placeholder="10"
                                        defaultValue={contents.time}
                                    />
                                    <CloseButton onClick={() => handleDelete(index)} className="mt-2 ms-1"/>
                                </div>
                                <Form.Label className="mb-1">Teaching Notes</Form.Label>
                                <Form.Control
                                    id={"contents-description" + index}
                                    placeholder="Description"
                                    defaultValue={contents.description}
                                />
                                
                            </div>
                        ))}
                    </div>
                </Form>
                <div className="d-flex align-items-start w-100">
                <Button variant="outline-primary" onClick={handleAdd}>+ SECTION</Button>
                </div>
                <div className="p-1 your-meeting-button">
                    <Button onClick={handleSave}>Save</Button>
                </div>
                <div className="p-1 your-meeting-button">
                    <Button onClick={handleExit}>Exit</Button>
                </div>
            </div>
        </div>

    )
}

export default BuildLessonPlan;