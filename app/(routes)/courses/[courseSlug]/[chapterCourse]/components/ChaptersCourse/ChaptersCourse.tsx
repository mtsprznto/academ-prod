import { ChaptersCourseProps } from "./ChaptersCourse.types";
import { ChaptersList } from "./ChaptersList";

export function ChaptersCourse(props: ChaptersCourseProps) {
  const { chapterCourse, chapters, courseSlug, userProgress } = props;
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 h-fit">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Chapters</h2>

      <ChaptersList
        chapters={chapters}
        courseSlug={courseSlug}
        currentChapter={chapterCourse}
        userProgress={userProgress}
      ></ChaptersList>
    </div>
  );
}
