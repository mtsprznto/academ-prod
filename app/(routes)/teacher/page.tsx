import { currentUser } from "@clerk/nextjs/server";
import { Header, ListCourses } from "./components";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function TeacherPage() {
  const user = await currentUser();
  if (!user) {
    return <p className="px-7">Not signed in</p>;
  }
  const userData = await prisma.user.findUnique({
    where: { userId: user.id },
    select: { role_id: true },
  });


  if (userData?.role_id === 2) {
    return redirect("/"); 
  }

  const courses = await prisma.course.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <div>
      <Header></Header>
      <ListCourses courses={courses}></ListCourses>
    </div>
  );
}
