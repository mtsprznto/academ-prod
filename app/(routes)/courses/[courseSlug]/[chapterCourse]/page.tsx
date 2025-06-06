import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

import { getCourseBySlug } from "@/actions/getCourseBySlug";
import { getIsPurchasedCourse } from "@/actions/getPurchasedCourse";
import { getUserProgress } from "@/actions/getUserProgress";

import { ChaptersCourse, InfoCourse } from "./components";

export default async function ChapterCoursePage({
  params,
}: {
  params: Promise<{ courseSlug: string; chapterCourse: string }>;
}) {
  const { courseSlug, chapterCourse } = await params;

  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }
  const infoCourse = await getCourseBySlug(courseSlug);

  const userProgress = await getUserProgress();

  if (!infoCourse) {
    return redirect(`/courses/${courseSlug}`);
  }

  const isPurchasedCourse = await getIsPurchasedCourse(user.id, infoCourse.id);

  const videoUrl = infoCourse.chapters.find(
    (chapter) => chapter.id === chapterCourse
  )?.videoUrl;

  

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-[65%_1fr] gap-4">
        <InfoCourse
          infoCourse={infoCourse}
          chapterCourseId={chapterCourse}
          userProgress={userProgress}
          purchaseCourse={isPurchasedCourse}
          videoUrl={videoUrl}
        ></InfoCourse>

        <ChaptersCourse
          chapters={infoCourse.chapters}
          courseSlug={courseSlug}
          chapterCourse={chapterCourse}
          userProgress={userProgress}
        ></ChaptersCourse>
      </div>
    </div>
  );
}
