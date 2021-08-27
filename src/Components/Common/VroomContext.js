import React, {useState, useContext, createContext } from "react";

export const VroomContext = createContext({});

export const VroomContextProvider = (props) => {

    const [inMeeting, setInMeeting] = useState(false);
    const [pollPage, setPollPage] = useState("existing");
    const [currentPoll, setCurrentPoll] = useState("");
    const [polls, setPolls] = useState([{name: "Poll 1"},{name: "Poll 2"}, {name: "Poll 3"} ])
    const [lessonPlan, setLessonPlan] = useState({title: "Week 1", contents: [{name: "Java intro", description: "teachers notes", time:"10"}]})
    const [lessonPlanPage, setLessonPlanPage] = useState("build");


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

            }}
        >
            {props.children}
        </VroomContext.Provider>
    )
}