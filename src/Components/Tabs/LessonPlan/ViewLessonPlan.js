import React, {useContext} from 'react'
import LessonPlanItem from './LessonPlanItem'
import { VroomContext } from '../../Common/VroomContext';
import { Button, Accordion } from 'react-bootstrap';

const ViewLessonPlan = () => {
    const {
        lessonPlan, 
        setViewLessonPlan,
    } = useContext(VroomContext);

    const clickEdit = () => {
        // update this function 
        setViewLessonPlan(false);
    }


    console.log(lessonPlan)
    
    return (
        <div className="tab-container">
            <div className="d-flex justify-content-between align-items-center">
                <h4>Lesson Plan</h4>
                <Button onClick={clickEdit}>Edit</Button>
            </div>
            <h6>{lessonPlan.title}</h6>
            <Accordion defaultActiveKey="0">
                {lessonPlan.contents.map((item, index) => <LessonPlanItem index={index} name={item.name} description={item.description} time={item.time}></LessonPlanItem>)}
            </Accordion>
            
        </div>
    )
}

export default ViewLessonPlan
