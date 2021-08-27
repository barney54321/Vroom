import React, {useState} from "react";
import CustomDropZone from "../Common/CustomDropZone";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton'

const alphabet = "abcde"

const LessonPlan = (props) => {

    const [options, setOptions]  = useState(["", ""])
    const [name, setName] = useState("");
    const [question, setQuestion] = useState("");

    const handleAdd = () => {
        if (options.length < 5) {
            setOptions([...options, ""]);
        }
    }

    const handleDelete = (index) => {
        const copy = [];
        for (let i = 0; i < options.length; i++) {
            copy.push(document.getElementById("option" + i).value);
        }
        copy.splice(index, 1);
        setOptions(copy)
    }

    const importPoll = (json) => {
        setName(json.name);
        setQuestion(json.question);
        setOptions(json.options)
    }

    return (
        <div>
            <CustomDropZone callback={importPoll}/>
            <div className="center-columns">
                <Form className="center-colums w-100">
                    <div className="form-question">
                        <Form.Label className="mb-1">Poll Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter name" defaultValue={name} />
                    </div>
                    <div className="form-question">
                        <Form.Label className="mb-1">Poll Question</Form.Label>
                        <Form.Control type="text" placeholder="Enter your question" defaultValue={question} />
                    </div>
                    <div className="mt-4">
                        {options.map((option, index) => (
                            <div className="d-flex" key={index+option}>
                                <InputGroup className="mb-2">
                                    <InputGroup.Text>{alphabet[index]}</InputGroup.Text>
                                    <Form.Control
                                        id={"option" + index}
                                        placeholder="Option"
                                        defaultValue={option}
                                    />
                                </InputGroup>
                                <CloseButton onClick={() => handleDelete(index)} className="mt-2 ms-1"/>
                            </div>
                        ))}
                    </div>
                </Form>
                <div className="d-flex align-items-start w-100">
                <Button variant="outline-primary" onClick={handleAdd}>+ OPTION</Button>
                </div>
            </div>
        </div>

    )
}

export default LessonPlan;