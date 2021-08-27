import React, {useContext} from 'react';
import { VroomContext } from '../../Common/VroomContext';

import LeaveMeeting from './LeaveMeeting';
import Meeting from './Meeting'

const DefaultMeeting = () => {

    const {
        inMeeting,
    } = useContext(VroomContext);

    return (
        <div>
            {inMeeting ? <LeaveMeeting/> : <Meeting />}
        </div>
    )
}

export default DefaultMeeting