import React, {useContext} from 'react'
import LessonPlanItem from './LessonPlanItem'
import { VroomContext } from '../../Common/VroomContext';
import { Button, Accordion } from 'react-bootstrap';

const ViewLessonPlan = () => {
    const {
        lessonPlan, 
        setLessonPlan,
    } = useContext(VroomContext);

    const clickExit = () => {
        setLessonPlan(null);
    }

    const clickStart = () => {
        console.log("Start");
    }

    console.log(lessonPlan)
    
    return (
        <div>
            <h4 className="pt-5">Lesson Plan</h4>
            <div className="p-1 your-meeting-button">
                <Button onClick={clickExit}>Exit</Button>
            </div>
            <div className="p-1 your-meeting-button">
                <Button onClick={clickStart}>Start</Button>
            </div>
            <h6>{lessonPlan.title}</h6>
            <Accordion defaultActiveKey="0">
                {lessonPlan.contents.map((item, index) => <LessonPlanItem index={index} name={item.name} description={item.description} time={item.time}></LessonPlanItem>)}
            </Accordion>
            
        </div>
    )
}

export default ViewLessonPlan
