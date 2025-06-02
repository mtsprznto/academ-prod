import { getHomeCourses } from "@/actions/getHomeCourses";
import { ListCourses } from "@/components/Shared";

export default async function CoursePage() {
  const listCourses = await getHomeCourses();
  return (
    <div>
      <ListCourses title="All courses" courses={listCourses}></ListCourses>
    </div>
  );
}
