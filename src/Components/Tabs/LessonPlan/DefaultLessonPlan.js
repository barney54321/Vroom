import React, { useContext } from 'react'
import { VroomContext } from '../../Common/VroomContext';
import BuildLessonPlan from './BuildLessonPlan';
import ViewLessonPlan from './ViewLessonPlan'


const DefaultLessonPlan = () => {

    const {
        viewLessonPlan,
    } = useContext(VroomContext);
    
    return (
        <div>
            {viewLessonPlan ? <ViewLessonPlan /> : <BuildLessonPlan />}
        </div>
    )
}

export default DefaultLessonPlan
