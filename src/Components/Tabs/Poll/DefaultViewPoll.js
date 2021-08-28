import React, {useContext, useState } from 'react';
import PollNotLaunched from './PollNotLaunched'
import ViewPoll from './ViewPoll'
import { VroomContext } from '../../Common/VroomContext';
import axios from 'axios'


const DefaultViewPoll = (props) => {
    
    const {
        currentPoll,
        polls,
        setPolls,
        setActivePoll,
    } = useContext(VroomContext);

    const [update, setUpdate] = useState(true);

    const poll = polls[currentPoll];

    // need to get these values
    const options = poll.options;
    const question = poll.question;

    //  Send JSON body with question and options: {question: "1+1=2", options: ["True", "False"]}
    const launchPoll = () => {

        const sendOptions = {
            question: question,
            options: options
        }
        axios.post("http://127.0.0.1:8080/launchpoll", {options: sendOptions}).then(res => {
            console.log(res)
            // let copy = []
            // for (let i = 0; i < options.length; i++) {
            //     copy[i] = {options: options[i], names: []}
            // }
            // const copyPolls = [...polls]
            // copyPolls[currentPoll] = {
            //     name: poll.name,
            //     question: poll.question,
            //     options: copy,
            //     hasLaunched: poll.hasLaunched
            // }; 
            // console.log(copyPolls);
            // setPolls(copyPolls);
            setPollLaunched();
            setUpdate(!update);
            setActivePoll(currentPoll);
            
        }).catch(err => {
            console.log(err)
        });
    }

    const setPollLaunched = () => {
        const copy = [...polls];
        copy[currentPoll].hasLaunched = true; 
    }

    return (
        <div>
            {poll.hasLaunched ? <ViewPoll launchPoll={launchPoll}/> : <PollNotLaunched launchPoll={launchPoll} />}
        </div>
    )
}

export default DefaultViewPoll;