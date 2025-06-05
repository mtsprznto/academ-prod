import { CourseCard } from "./CourseCard";
import { ListCoursesProps } from "./ListCourses.types";

export function ListCourses(props: ListCoursesProps) {
  const { courses } = props;
  if (courses.length === 0) {
    return <p className="px-7">No courses created 🔍</p>;
  }
  
  return (
    <div className="flex flex-col my-4 mx-6 border rounded-lg bg-white p-4 gap-10">
      {courses.map((course) => (
        <div key={course.id}>
          <CourseCard course={course}></CourseCard>
          <div className="border-t border-gray-200 w-full mt-4"></div>
        </div>
      ))}
    </div>
  );
}
