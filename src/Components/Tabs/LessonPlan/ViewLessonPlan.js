import React, {useContext} from 'react'
import LessonPlanItem from './LessonPlanItem'
import { VroomContext } from '../../Common/VroomContext';
import { Button, Accordion } from 'react-bootstrap'
const ViewLessonPlan = () => {
    const {
        lessonPlan, 
    } = useContext(VroomContext);

    const clickExit = () => {
        console.log("Exit");
    }

    const clickStart = () => {
        console.log("Start");
    }

    console.log(lessonPlan)
    
    return (
        <div>
            <h4>Lesson Plan</h4>
            <Button onClick={clickExit}>Exit</Button>
            <Button onClick={clickStart}>Start</Button>
            <h6>{lessonPlan.title}</h6>
            <Accordion defaultActiveKey="0">
                {lessonPlan.contents.map((item, index) => <LessonPlanItem index={index} name={item.name} description={item.description} time={item.time}></LessonPlanItem>)}
            </Accordion>
            
        </div>
    )
}

export default ViewLessonPlan
