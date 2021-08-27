import React, {useContext} from 'react'
import ExistingPoll from './ExistingPoll'
import { ListGroup } from 'react-bootstrap'

import { VroomContext } from '../../Common/VroomContext';

const ExistingPolls = (props) => {

    const {
        polls,
        setPolls,
    } = useContext(VroomContext);
    
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

export default ExistingPolls