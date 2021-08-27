import React from 'react'
import ExistingPoll from './ExistingPoll'
import { ListGroup } from 'react-bootstrap'
import {useState} from 'react'
import Button from 'react-bootstrap/Button'

const DefaultPollPage = (props) => {
    const [polls, setPolls] = useState([{id: 0, name: "Poll 1"},{id: 1, name: "Poll 2"}, {id: 2, name: "Poll 3"} ])


    const deletePoll = (index) => {
        const copy = [...polls];
        copy.splice(index, 1);
        setPolls(copy);
    }

    const addPoll = () => {
        console.log("add poll clicked");
    }
    return (
        <div>
            <h4>Existing Polls</h4>
            <ListGroup defaultActiveKey="">

            {polls.map((poll, index) => (<ExistingPoll key={poll.id} poll={poll} index={index} deletePoll={deletePoll}/>))}
        
            </ListGroup>
            <Button variant="primary" onClick={addPoll}>Add Poll</Button>
        </div>
    )
}

export default DefaultPollPage
