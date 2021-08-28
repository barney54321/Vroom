import React from "react";
import Card from 'react-bootstrap/Card';


const Bar = (props) => {


    return (
        <Card className="poll-result" border={"primary"}>
            <div className={"color-result"} id={`x ${props.index}`}>
                <Card.Body className="poll-bar">{props.name}</Card.Body>
            </div>
        </Card>
    );
}

export default Bar;