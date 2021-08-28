import React from "react";
import Bar from "./Bar";

const PollBarObject = (props) => {

    let options = props.options;
    let question = props.question;

    return (
        <div className="d-flex flex-column align-items-center w-100">
            <p className="mb-0">{question}</p>
            {options.map((option, index) => (
                <Bar 
                    index={index}
                    value={0}
                    name={option.option}
                    
                />
            ))}

        </div>
    );
}

export default PollBarObject;