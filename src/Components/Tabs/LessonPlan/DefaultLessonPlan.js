import React, { useContext } from 'react'
import { VroomContext } from '../../Common/VroomContext';
import BuildLessonPlan from './BuildLessonPlan';
import ViewLessonPlan from './ViewLessonPlan'


const DefaultLessonPlan = () => {

    const {
        lessonPlan,
    } = useContext(VroomContext);

    let page;
    
    return (
        <div>
            {lessonPlan ? <ViewLessonPlan /> : <BuildLessonPlan />}
        </div>
    )
}

export default DefaultLessonPlan
