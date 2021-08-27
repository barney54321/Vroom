import React, {useState, useContext, createContext } from "react";

export const VroomContext = createContext({});

export const VroomContextProvider = (props) => {

    const [polls, setPolls] = useState("HelloWorld");
    const [inMeeting, setInMeeting] = useState(false);
    const [showPoll, setShowPoll] = useState(false);
    const [currentPoll, setCurrentPoll] = useState("");

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