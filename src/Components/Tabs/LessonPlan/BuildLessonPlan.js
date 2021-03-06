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
        setLessonPlan(getContents())
        setViewLessonPlan(true);
    }

    const getContents = () => {
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
        return {
            name: lessonName,
            contents: copy
        }
    }

    const handleClear = () => {
        setcontents([
                {name: "",
                    description: "",
                    time:""
                }
            ]);
        setName("");
        setLessonPlan({
            name: "", 
            contents: [
                {name: "",
                    description: "",
                    time:""
                }
            ]
        });
    }

    const importLessonPlan = (json) => {
        setName(json.name);
        setcontents(json.contents);
    }

    const handleExport = () => {
        const lesson = getContents();
        const element = document.createElement('a');
        element.setAttribute(
            'href',
            'data:json/plain;charset=utf-8,' + encodeURIComponent(JSON.stringify(lesson))
        )
        const filename = lesson.name + ".json"
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.append(element);
        element.click();
        document.body.removeChild(element);
    }

    return (            
        <div className="tab-container">
            <h4>Set Lesson Plan</h4>
            <div className="center-columns">
                <CustomDropZone callback={importLessonPlan}/>
                <h4 style={{marginTop: -15, marginBottom: -5}}>Or build your own</h4>
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
                                            placeholder="Enter name"
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
                                    placeholder="Enter notes..."
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
            <div className="build-buttons your-meeting-button">
                <Button variant="danger" className="me-2" onClick={handleClear}>Clear</Button>
                <Button variant="secondary" className="me-2" onClick={handleExport}>Export</Button>
                <Button onClick={handleSave}>Save</Button>
            </div>
        </div>
    )
}

export default BuildLessonPlan;