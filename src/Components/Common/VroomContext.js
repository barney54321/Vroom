import React, {useState, useContext, createContext } from "react";

export const VroomContext = createContext({});

export const VroomContextProvider = (props) => {
    const [polls, setPolls] = useState([{name: "Poll 1"},{name: "Poll 2"}, {name: "Poll 3"} ])

    return (
        <VroomContext.Provider
            value={{
                polls,
                setPolls
            }}
        >
            {props.children}
        </VroomContext.Provider>
    )
}