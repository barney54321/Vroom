import React from "react";
import Bar from "./Bar";

const PollBarObject = (props) => {
    let values = props.results == null ? [{value: 42, name: "Zoom"},{value: 58, name: "Teams"}] : props.results;
    let question = props.question == null ? "What's better?" : props.question;

    return (
        <div>
            <p>{question}</p>
            {values.map((result, index) => (
                <Bar 
                    index={index}
                    value={0}
                    name={result.name}
                    
                />
            ))}

        </div>
    );
}

export default PollBarObject;