import React, {useState, useContext } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton'
import { VroomContext } from '../../Common/VroomContext';
import CustomDropZone from "../../Common/CustomDropZone";

const BuildLessonPlan = (props) => {

    const {
        setLessonPlan,
        lessonPlan,
        setViewLessonPlan
    } = useContext(VroomContext);

    const [contents, setcontents]  = useState(lessonPlan.contents)
    const [name, setName] = useState(lessonPlan.name);

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
        const lessonName = document.getElementById("lesson-name").value;
        setLessonPlan({
            name: lessonName,
            contents: copy
        })
        setViewLessonPlan(true);
    }

    const handleClear = () => {
        setcontents([
                {name: "",
                    description: "",
                    time:""
                }
            ]);
        setName("");
    }

    const importLessonPlan = (json) => {
        setName(json.name);
        setcontents(json.contents);
    }

    return (            
        <div className="tab-container">
            <h4>Set Lesson Plan</h4>
            <div className="center-columns">
                <CustomDropZone callback={importLessonPlan}/>
                <h3 className="mt-2">Or build your own</h3>
                <Form className="center-colums w-100">
                    <div className="form-question">
                        <Form.Label className="mb-1">Lesson name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" id="lesson-name" defaultValue={name} />
                    </div>
                    <div className="mt-3">
                        {contents.map((contents, index) => (
                            <div className="d-flex flex-column" key={"overall"+index+contents.name}>
                                <hr></hr>
                                <div className="d-flex">
                                    <div className="section-name">
                                        <Form.Label className="mb-1">Section Name</Form.Label>
                                        <Form.Control
                                            className="name-submit"
                                            id={"contents-name" + index}
                                            placeholder="contents name"
                                            defaultValue={contents.name}
                                        />
                                    </div>
                                    <div className="section-name">
                                        <Form.Label className="mb-1">Time (min)</Form.Label>
                                        <Form.Control
                                            className=""
                                            id={"contents-time" + index}
                                            placeholder="10"
                                            defaultValue={contents.time}
                                        />
                                    </div>
                                   
                                        <CloseButton onClick={() => handleDelete(index)} className="section-close"/>
                                
                                </div>
                                <Form.Label className="mb-1">Teaching Notes</Form.Label>
                                <Form.Control
                                    className="mb-3"
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
            </div>
            <div className="d-flex justify-content-end align-items-center your-meeting-button">
                <Button variant="danger" className="me-2" onClick={handleClear}>Clear</Button>
                <Button onClick={handleSave}>Save</Button>
            </div>
        </div>
    )
}

export default BuildLessonPlan;