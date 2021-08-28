import React, {useState, useContext, createContext } from "react";

export const VroomContext = createContext({});

export const VroomContextProvider = (props) => {

    const [inMeeting, setInMeeting] = useState(true);
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
    const [lessonPlan, setLessonPlan] = useState({title: "Week 1", contents: [{name: "Java intro", description: "teachers notes", time:"10"}]})
    const [lessonPlanPage, setLessonPlanPage] = useState("build");
    const [progress, setProgress] = useState([]);
    const [activePoll, setActivePoll] = useState(null);
    const [commands, setCommands] = useState([{command: "now", response: "Questions"}, {command: "attend", response: "bitly.qwerty"}])


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
                lessonPlanPage,
                setLessonPlanPage,
                progress,
                setProgress,
                activePoll,
                setActivePoll,
                commands,
                setCommands
            }}
        >
            {props.children}
        </VroomContext.Provider>
    )
}