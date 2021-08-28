import React, {useState, createContext } from "react";
import axios from "axios";

export const VroomContext = createContext({});

/*
[{
    name: "Poll 1",
    question: "What project is more awesome?",
    options: [ 
        {option: "Vroom",
        names: ["amy", "bob"]},
        {option: "Vroom but in blue",
        names: ["steven", "someone"]}
    ],
    hasLaunched: false   
}]
*/

export const VroomContextProvider = (props) => {

    const [inMeeting, setInMeeting] = useState(false);
    const [tutorName, setTutorName] = useState("");
    const [pollPage, setPollPage] = useState("existing");
    const [currentPoll, setCurrentPoll] = useState("");
    const [polls, setPolls] = useState([{
        name: "Poll 1",
        question: "What project is more awesome?",
        options: [ 
            {option: "Vroom",
            names: ["amy", "bob"]},
            {option: "Vroom but in blue",
            names: ["steven", "someone"]}
        ],
        hasLaunched: false   
    }])
    const [lessonPlan, setLessonPlan] = useState({
        name: "", 
        contents: [
            {name: "",
                description: "",
                time:""
            }
        ]
    })
    const [viewLessonPlan, setViewLessonPlan] = useState(false);
    const [progress, setProgress] = useState(null);
    const [activePoll, setActivePoll] = useState(null);
    const [commands, setCommands] = useState([{command: "now", response: "Questions"}, {command: "attend", response: "bitly.qwerty"}])

    const getProgress = () => {
        // refresh button 
        axios.get("http://127.0.0.1:8080/getprogress").then(res => {
            setProgress(res.data.questions)
        }).catch(err => {
            console.log(err)
        });
    }

    if (progress === null) {
        getProgress();
    }


    return (
        <VroomContext.Provider
            value={{
                polls,
                setPolls,
                inMeeting,
                setInMeeting,
                pollPage,
                setPollPage,
                currentPoll,
                setCurrentPoll,
                lessonPlan,
                setLessonPlan,
                progress,
                setProgress,
                activePoll,
                setActivePoll,
                commands,
                setCommands,
                getProgress,
                tutorName,
                setTutorName,
                viewLessonPlan,
                setViewLessonPlan
            }}
        >
            {props.children}
        </VroomContext.Provider>
    )
}