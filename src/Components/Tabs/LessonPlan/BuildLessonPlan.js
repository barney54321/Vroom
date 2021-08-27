import React, {useState, useContext } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton'
import { VroomContext } from '../../Common/VroomContext';

const BuildLessonPlan = (props) => {

    const [sections, setSections]  = useState([{
        title: "",
        time: "",
        description: ""
    }])
    const [name, setName] = useState("");

    const {
        setLessonPlan,
    } = useContext(VroomContext);

    const handleAdd = () => {
        if (sections.length < 5) {
            setSections([...sections, {
                title: "",
                time: "",
                description: ""
            }]);
        }
    }

    const handleDelete = (index) => {
        const copy = [];
        for (let i = 0; i < sections.length; i++) {
            const title = document.getElementById("section-title" + i).value;
            const time = document.getElementById("section-time" + i).value;
            const description = document.getElementById("section-description" + i).value;
            copy.push({
                title: title,
                time: time,
                description: description
            })
        }
        console.log(copy)
        console.log(index)
        console.log("length", copy.length)
        copy.splice(index, 1);
        console.log(copy)
        setSections(copy);
    }

    const handleSave = () => {
        const sections = [];
        for (let i = 0; i < sections.length; i++) {
            const title = document.getElementById("section-title" + i).value;
            const time = document.getElementById("section-time" + i).value;
            const description = document.getElementById("section-description" + i).value;
            sections.push({
                title: title,
                time: time,
                description: description
            })
        }
        const title = document.getElementById("lesson-title").value;
        setLessonPlan({
            title: title,
            sections: sections
        })
    }

    return (
        <div>
            <div className="center-columns">
                <Form className="center-colums w-100">
                    <div className="form-question">
                        <Form.Label className="mb-1">Lesson Title</Form.Label>
                        <Form.Control type="text" placeholder="Enter title" id="lesson-title" defaultValue={name} />
                    </div>
                    <div className="mt-4">
                        {sections.map((section, index) => (
                            <div className="d-flex flex-column" key={"overall"+index+section.title}>
                                <div className="d-flex">
                                    <Form.Label className="mb-1">Section Title</Form.Label>
                                    <Form.Control
                                        id={"section-title" + index}
                                        placeholder="Section Title"
                                        defaultValue={section.title}
                                    />
                                    <Form.Label className="mb-1">Time</Form.Label>
                                    <Form.Control
                                        id={"section-time" + index}
                                        placeholder="10"
                                        defaultValue={section.time}
                                    />
                                    <CloseButton onClick={() => handleDelete(index)} className="mt-2 ms-1"/>
                                </div>
                                <Form.Label className="mb-1">Teaching Notes</Form.Label>
                                <Form.Control
                                    id={"section-description" + index}
                                    placeholder="Description"
                                    defaultValue={section.description}
                                />
                                
                            </div>
                        ))}
                    </div>
                </Form>
                <div className="d-flex align-items-start w-100">
                <Button variant="outline-primary" onClick={handleAdd}>+ Section</Button>
                </div>
                <Button onClick={handleSave}>Save</Button>
            </div>
        </div>

    )
}

export default BuildLessonPlan;