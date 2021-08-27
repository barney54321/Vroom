import React, {useState, useContext, createContext } from "react";

export const VroomContext = createContext({});

export const VroomContextProvider = (props) => {

    const [polls, setPolls] = useState("HelloWorld");

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