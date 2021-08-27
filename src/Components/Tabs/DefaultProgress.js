import React, {useContext} from 'react';
import { VroomContext } from '../Common/VroomContext';

const DefaultProgress = () => {

    const {
        polls,
        setPolls
    } = useContext(VroomContext);
    
    return (
        <div>
            {polls}
        </div>
    )
}

export default DefaultProgress;