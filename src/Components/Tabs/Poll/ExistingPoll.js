import React from 'react'
import { ListGroup } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton'
const ExistingPoll = (props) => {
    const poll = props.poll;
  
    return (
        <div>
            <ListGroup.Item action href={poll.link}>{poll.name} <CloseButton onClick={() => props.deletePoll(props.index)}></CloseButton></ListGroup.Item>
        </div>
    )
}

export default ExistingPoll
