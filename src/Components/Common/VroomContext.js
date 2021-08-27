import React, {useState, useContext, createContext } from "react";

export const VroomContext = createContext({});

export const VroomContextProvider = (props) => {

    const [inMeeting, setInMeeting] = useState(false);
    const [showPoll, setShowPoll] = useState(false);
    const [currentPoll, setCurrentPoll] = useState("");
    const [polls, setPolls] = useState([{name: "Poll 1"},{name: "Poll 2"}, {name: "Poll 3"} ])

    return (
        <VroomContext.Provider
            value={{
                polls,
                setPolls,
                inMeeting,
                setInMeeting,
                showPoll,
                setShowPoll,
                currentPoll,
                setCurrentPoll,
            }}
        >
            {props.children}
        </VroomContext.Provider>
    )
}