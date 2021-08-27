import React, {useContext} from 'react';
import ExistingPolls from './ExistingPolls';

import { VroomContext } from '../../Common/VroomContext';

const DefaultPollPage = (props) => {
    
    const {
        showPoll,
    } = useContext(VroomContext);

    return (
        <div>
            {showPoll ? console.log("view poll") : <ExistingPolls />}
        </div>
    )
}

export default DefaultPollPage
