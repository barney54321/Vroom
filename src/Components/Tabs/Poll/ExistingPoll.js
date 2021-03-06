import React, { useContext } from 'react';
import { VroomContext } from '../../Common/VroomContext';
import { ListGroup } from 'react-bootstrap';
import CloseButton from 'react-bootstrap/CloseButton'
const ExistingPoll = (props) => {

    const {
        setPollPage,
        setCurrentPoll,
    } = useContext(VroomContext);

    const poll = props.poll;

    const handleClick = () => {
        console.log("handle click")
        setPollPage("view");
        setCurrentPoll(props.index);
    }
  
    return (
        <ListGroup.Item action className="d-flex">
            <div className="existing-poll-text" onClick={handleClick}>
                {poll.name}
            </div>
            <CloseButton onClick={() => props.deletePoll(props.index)}/>
        </ListGroup.Item>
    )
}

export default ExistingPoll
