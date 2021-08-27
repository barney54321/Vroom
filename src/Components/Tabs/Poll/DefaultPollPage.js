import React, {useContext} from 'react';
import BuildPoll from './BuildPoll';
import ExistingPolls from './ExistingPolls'
import ViewPoll from './ViewPoll'
import { VroomContext } from '../../Common/VroomContext';


const DefaultPollPage = (props) => {
    
    const {
        pollPage,
    } = useContext(VroomContext);

    let page;

    if (pollPage === "existing") {
        page = <ExistingPolls />;
    } else if (pollPage === "build") {
        page = <BuildPoll />;
    } else if (pollPage === "view") {
        page = <ViewPoll />;
    }

    return (
        <div>
            {page}
        </div>
    )
}

export default DefaultPollPage
