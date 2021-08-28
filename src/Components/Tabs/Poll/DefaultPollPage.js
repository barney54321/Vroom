import React, {useContext} from 'react';
import BuildPoll from './BuildPoll';
import ExistingPolls from './ExistingPolls'
import DefaultViewPoll from './DefaultViewPoll'
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
        page = <DefaultViewPoll />;
    }

    return (
        <div>
            {page}
        </div>
    )
}

export default DefaultPollPage
