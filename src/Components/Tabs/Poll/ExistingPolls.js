import React, {useContext} from 'react'
import ExistingPoll from './ExistingPoll'
import { ListGroup } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'

import { VroomContext } from '../../Common/VroomContext';

const ExistingPolls = (props) => {

    const {
        polls,
        setPolls,
        setPollPage,
    } = useContext(VroomContext);
    
    const deletePoll = (index) => {
        const copy = [...polls];
        copy.splice(index, 1);
        setPolls(copy);
    }
    
    const addPoll = () => {
        setPollPage("build")
        console.log("add poll clicked");
        
    }

    return (
        <div>
            <h4>Existing Polls</h4>
            <ListGroup defaultActiveKey="">
           
            {polls.map((poll, index) => (<ExistingPoll key={index} poll={poll} index={index} deletePoll={deletePoll}/>))}
        
            </ListGroup>
            <Button variant="primary" onClick={addPoll}>Add Poll</Button>
        </div>
    )
}

export default ExistingPolls