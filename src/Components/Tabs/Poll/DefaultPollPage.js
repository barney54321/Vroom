import React from 'react'
import ExistingPoll from './ExistingPoll'
import { ListGroup } from 'react-bootstrap'
const DefaultPollPage = (props) => {
    // const polls = [{id: 1, description: "Poll 1"}]
    const polls = props.polls;
    
    const deletePoll = (index) => {
        const copy = [...polls];
        copy.splice(index, 1);
        props.setPolls(copy);
    }

    return (
        <div>
            <ListGroup defaultActiveKey="">

            {polls.map((poll) => (<ExistingPoll key={polls.id} poll={poll}/>))}
        
            </ListGroup>
        </div>
    )
}

export default DefaultPollPage
