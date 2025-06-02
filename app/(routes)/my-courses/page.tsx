import { getPurchasedCourses } from "@/actions/getPurchasedCourses";
import { ListCourses } from "@/components/Shared";

export default async function MyCoursesPage() {
  const courses = await getPurchasedCourses();

  //console.log(courses);

  return (
    <div>
      <ListCourses title="My courses" courses={courses}></ListCourses>
    </div>
  );
}
