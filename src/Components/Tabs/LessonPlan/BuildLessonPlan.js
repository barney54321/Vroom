import React, {useState, useContext } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton'
import { VroomContext } from '../../Common/VroomContext';
import CustomDropZone from "../../Common/CustomDropZone";

const BuildLessonPlan = (props) => {

    const [contents, setcontents]  = useState([{
        name: "",
        time: "",
        description: ""
    }])
    const [name, setName] = useState("");

    const {
        setLessonPlan,
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
        console.log("contents", copy)
        setLessonPlan({
            name: lessonName,
            contents: contents
        })
    }

    const importLessonPlan = (json) => {
        setName(json.name);
        setcontents(json.contents);
    }

    return (            
        <div className="tab-container">
            <h4 className="pt-5">Build Lesson Plan</h4>
            <div className="center-columns">
                <CustomDropZone callback={importLessonPlan}/>
                <Form className="center-colums w-100">
                    <div className="form-question">
                        <Form.Label className="mb-1">Lesson name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" id="lesson-name" defaultValue={name} />
                    </div>
                    <div className="mt-4">
                        {contents.map((contents, index) => (
                            <div className="d-flex flex-column" key={"overall"+index+contents.name}>
                                <div className="d-flex">
                                    <Form.Label className="mb-1">Section Name</Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        id={"contents-name" + index}
                                        placeholder="contents name"
                                        defaultValue={contents.name}
                                    />
                                    <Form.Label className="mb-1">Time</Form.Label>
                                    <Form.Control
                                        className="mb-3"
                                        id={"contents-time" + index}
                                        placeholder="10"
                                        defaultValue={contents.time}
                                    />
                                    <CloseButton onClick={() => handleDelete(index)} className="mt-2 ms-1"/>
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
            <div className="p-1 d-flex justify-content-end align-items-center your-meeting-button">
                <Button onClick={handleSave}>Save</Button>
            </div>
        </div>

    )
}

export default BuildLessonPlan;