import { currentUser } from "@clerk/nextjs/server"
import { Header, ListCourses } from "./components";
import prisma from "@/lib/prisma";

export default async function TeacherPage() {
  const user = await currentUser();
  if(!user){
    return <p>Not signed in</p>
  }
  const courses = await prisma.course.findMany({
    where: {
      userId: user.id,
    }
  })
  
  
  return (
    <div>
      <Header></Header>
      <ListCourses courses={courses}></ListCourses>
    </div>
  )
}
