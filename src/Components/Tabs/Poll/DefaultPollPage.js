import React, {useContext} from 'react';
import ExistingPolls from './ExistingPolls';

import { VroomContext } from '../../Common/VroomContext';

const DefaultPollPage = (props) => {
    
    const {
        showPoll,
    } = useContext(VroomContext);

    const addPoll = () => {
        console.log("add poll clicked");
        
    }
    return (
        <div>
            {showPoll ? console.log("view poll") : <ExistingPolls />}
        </div>
    )
}

export default DefaultPollPage
