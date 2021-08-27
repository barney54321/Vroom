import React, { useContext } from 'react'
import { VroomContext } from '../../Common/VroomContext';
import OpeningLessonPlan from './OpeningLessonPlan';
import BuildLessonPlan from './BuildLessonPlan';


const DefaultLessonPlan = () => {

    const {
        lessonPlanPage,
    } = useContext(VroomContext);

    let page;

    if (lessonPlanPage === "opening") {
        page = <OpeningLessonPlan />;
    } else if (lessonPlanPage === "build") {
        page = <BuildLessonPlan />;
    }

    return (
        <div>
            {page}
        </div>
    )
}

export default DefaultLessonPlan
