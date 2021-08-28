import React, {useContext, useState } from 'react';
import PollNotLaunched from './PollNotLaunched'
import ViewPoll from './ViewPoll'
import { VroomContext } from '../../Common/VroomContext';
import axios from 'axios'
import LoadingBar from '../../Common/LoadingBar';


const DefaultViewPoll = (props) => {
    
    const {
        currentPoll,
        polls,
        setPolls,
        setActivePoll,
    } = useContext(VroomContext);

    const [update, setUpdate] = useState(true);
    const [showLoading, setShowLoading] = useState(false);

    const poll = polls[currentPoll];

    // need to get these values
    let options = poll.options;
    let question = poll.question;

    //  Send JSON body with question and options: {question: "1+1=2", options: ["True", "False"]}
    const launchPoll = () => {
        setShowLoading(true);
        let optionsWithoutStudents = [];
        for (let i = 0; i < options.length; i++) {
            optionsWithoutStudents.push(options[i].option)
        }

        const sendOptions = {
            question: question,
            options: optionsWithoutStudents
        }
        axios.post("http://127.0.0.1:8080/launchpoll", sendOptions).then(res => {
            setPollLaunched();
            setUpdate(!update);
            setActivePoll(currentPoll);
            setShowLoading(false);
            
        }).catch(err => {
            console.log(err)
        });
    }

    const setPollLaunched = () => {
        const copy = [...polls];
        copy[currentPoll].hasLaunched = true; 
    }

    const page = poll.hasLaunched ? <ViewPoll launchPoll={launchPoll}/> : <PollNotLaunched launchPoll={launchPoll} />

    return (
        <div>
            {showLoading ? <LoadingBar text="Wait for poll!"/> : page}
        </div>
    )
}

export default DefaultViewPoll;