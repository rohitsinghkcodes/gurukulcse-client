import {useEffect,useState} from 'react';
import axios from 'axios';

export default function useCourse(){
    const [courses, setCourses] = useState([])

    //get Courses
    const getAllCourses = async () => {
        try {
          const { data } = await axios.get("/api/v1/courses/get-courses");
          if (data?.success) {
            setCourses(data?.courses);
          }
        } catch (err) {
          console.log(err);
        }
      };

      useEffect(() => {
        getAllCourses();
        // eslint-disable-next-line
      }, []);

      return courses;
}
