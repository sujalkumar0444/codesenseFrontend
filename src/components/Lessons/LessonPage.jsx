import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLessonData } from '../../redux/Courseslice';
import { useParams } from 'react-router-dom';
import EditorComponent from '../Ide/EditorComponent';
import { ClipLoader } from 'react-spinners';

function LessonPage() {
  const { lessonId } = useParams();
  const dispatch = useDispatch();
  const currentLesson = useSelector((state) => state.course.currentLesson);
  const lessonStatus = useSelector((state) => state.course.lessonStatus);
  const lessonError = useSelector((state) => state.course.lessonError);

  useEffect(() => {
    if (lessonId) {
      dispatch(fetchLessonData(lessonId));
    }
  }, [lessonId, dispatch]);

  if (lessonStatus === 'loading') {
    return <div className="loading-container">
    <ClipLoader size={50} color={"#123abc"} loading={true} />
</div>;
  }

  if (lessonStatus === 'failed') {
    return <div>Error: {lessonError}</div>;
  }

//   alert(JSON.stringify(currentLesson));
  return (

    <div >
      {currentLesson.lesson_title && 
      <div>
      <h1>{currentLesson.lesson_title}</h1>
      {currentLesson.text_content ? (
        <div dangerouslySetInnerHTML={{ __html: currentLesson.text_content }} />
      ) : (
        <>
        <div dangerouslySetInnerHTML={{ __html: currentLesson.problem_id.problem_description }} />
        <EditorComponent problem_id={currentLesson.problem_id.problem_id} lessonPoints={currentLesson.lesson_points} lessonId={lessonId}></EditorComponent>
        </>


      )}
      </div>
      
      }
    </div>
  );
}

export default LessonPage;
