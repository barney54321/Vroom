import React, {useState} from "react";
import PercentageBar from "./PercentageBar";

const BarObject = (props) => {
    const activeIndex = props.activeIndex
    const setActiveIndex = props.setActiveIndex

    let values = props.results == null ? [{value: 42, name: "Zoom"},{value: 58, name: "Teams"}] : props.results;
    let question = props.question == null ? "What's better?" : props.question;
    let votes = props.votes == null ? false : props.votes;

    const handleClick = (index) => {
        setActiveIndex(index)
    }
    
    return (
        <div>
            <p>{question}</p>
            {values.map((result, index) => (
                <PercentageBar 
                    index={index}
                    value={result.value}
                    name={result.name}
                    active={index === activeIndex} 
                    handleClick={handleClick}
                />
            ))}
            <div className="total-votes">
                <p>{votes === false ? "": `${votes} votes`}</p>
            </div>
        </div>
    );
}

export default BarObject;