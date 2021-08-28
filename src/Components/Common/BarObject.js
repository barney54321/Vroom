import React from "react";
import PercentageBar from "./PercentageBar";

/*
Poll
{
    name: "Poll 1",
    question: "What project is more awesome?",
    options: [ 
        {option: "Vroom",
        names: ["amy", "bob"]},
        {option: "Vroom but in blue",
        names: ["steven", "someone"]}
    ]   
}
*/

const BarObject = (props) => {
    const activeIndex = props.activeIndex
    const setActiveIndex = props.setActiveIndex

    // let values = props.results == null ? [{value: 42, name: "Zoom"},{value: 58, name: "Teams"}] : props.results;
    // let question = props.question == null ? "What's better?" : props.question;
    // let votes = props.votes == null ? false : props.votes;

    let options =  props.options;
    let question = props.question;
    let values = [];

    const getVotes = () => {
        let sum = 0;
        if (options) {
            for (let i =0; i < options.length; i++) {
                sum = sum + options[i].names.length;
            }
            for (let i =0; i < options.length; i++) {
                let percentage = sum === 0 ? 0: options[i].names.length/sum*100;
                const name = props.showVotes === false ? "Question " + options[i].question : options[i].option;
                values.push({name: name, value: percentage})
            }
        }
        return sum;
    }

    let votes = getVotes();

    const handleClick = (index) => {
        setActiveIndex(index)
        props.setShowStudents(true);
    }

    console.log("values", values)
    
    return (
        <div className="d-flex flex-column align-items-center w-100">
            <p className="mb-0">{question}</p>
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
                <p>{props.showVotes === false ? "": `${votes} votes`}</p>
            </div>
        </div>
    );
}

export default BarObject;