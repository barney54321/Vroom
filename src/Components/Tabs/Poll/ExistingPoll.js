import React from 'react'
import { ListGroup } from 'react-bootstrap';

const ExistingPoll = (props) => {
    const poll = props.poll;
    return (
        <div>
            <ListGroup.Item action href={poll.link}>{poll.name}</ListGroup.Item>
        </div>
    )
}

export default ExistingPoll
