import React from 'react'
import { Accordion } from 'react-bootstrap'

const LessonPlanItem = (props) => {
    return (
        <div>
            <Accordion.Item eventKey={props.index}>
                <Accordion.Header>{props.name} ({props.time})</Accordion.Header>
                <Accordion.Body>{props.description}</Accordion.Body>
            </Accordion.Item>
        </div>
    )
}

export default LessonPlanItem
