import React, {useState, useContext} from "react";
import CustomDropZone from "../../Common/CustomDropZone";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button';
import CloseButton from 'react-bootstrap/CloseButton'
import { VroomContext } from '../../Common/VroomContext';

const alphabet = "abcde";

/*
[{
    name: "Poll 1",
    question: "What project is more awesome?",
    options: [ 
        {option: "Vroom",
        names: ["amy", "bob"]},
        {option: "Vroom but in blue",
        names: ["steven", "someone"]}
    ],
    hasLaunched: false   
}]
*/

const BuildPoll = (props) => {

    const [options, setOptions]  = useState(["", ""])
    const [name, setName] = useState("");
    const [question, setQuestion] = useState("");

    const {
        polls,
        setPolls,
        setCurrentPoll,
        setPollPage,
    } = useContext(VroomContext);

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
        setOptions(copy);
    }

    const handleSave = () => {
        const copyOptions = [];
        for (let i = 0; i < options.length; i++) {
            const option = {
                option: document.getElementById("option" + i).value,
                names: []
            }
            copyOptions.push(option);
        }
        const name = document.getElementById("poll-name").value;
        const question = document.getElementById("poll-question").value;
        const copy = [...polls, {
            name: name,
            question: question,
            options: copyOptions,
            hasLaunched: false
        }]
        setPolls(copy);
        setCurrentPoll(copy.length-1);
        setPollPage("view");
        console.log()
    }

    const importPoll = (json) => {
        setName(json.name);
        setQuestion(json.question);
        setOptions(json.options)
    }

    const handleExit = () => {
        setPollPage("existing")
    }

    return (
        
        <div className="tab-container">
            <h4>New Poll</h4>
            <CustomDropZone callback={importPoll}/>
            <div className="center-columns">
                <Form className="center-colums w-100">
                    <div className="pt-2 form-question">
                        <Form.Label className="mb-1">Poll Name</Form.Label>
                        <Form.Control id="poll-name" type="text" placeholder="Enter name" defaultValue={name} />
                    </div>
                    <div className="pt-2 form-question">
                        <Form.Label className="mb-1">Poll Question</Form.Label>
                        <Form.Control id="poll-question" type="text" placeholder="Enter your question" defaultValue={question} />
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
                <Button className="mt-2" variant="outline-primary" onClick={handleAdd}>+ OPTION</Button>
                </div>
            </div>
            <div className="pt-3 d-flex justify-content-between align-items-center">
                <Button onClick={handleExit}>Exit</Button>
                <Button onClick={handleSave}>Save</Button>
            </div>
            
        </div>

    )
}

export default BuildPoll;