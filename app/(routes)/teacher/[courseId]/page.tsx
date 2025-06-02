import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import {
  ChaptersBlock,
  CourseForm,
  CourseImage,
  CoursePrice,
  HeaderCourse,
} from "./components";

export default async function Course({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const { userId } = await auth();
  if (!userId) {
    return <p>You are not allowed to view this course 👋</p>;
  }
  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
      userId: userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
    },
  });

  if (!course) {
    return <p>This course does not exist</p>;
  }
  return (
    <div className="m-6">
      <HeaderCourse
        idCourse={course.id}
        isPublished={course.isPublished}
      ></HeaderCourse>

      <CourseForm course={course}></CourseForm>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <CourseImage
          idCourse={course.id}
          imageCourse={course.imageUrl}
        ></CourseImage>
        <CoursePrice
          idCourse={course.id}
          priceCourse={course.price}
        ></CoursePrice>
      </div>
      <ChaptersBlock
        idCourse={course.id}
        chapters={course.chapters}
      ></ChaptersBlock>
    </div>
  );
}
