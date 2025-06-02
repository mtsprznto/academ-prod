import Link from "next/link";
import { ListCoursesProps } from "./ListCourses.types";
import Image from "next/image";
import { IconBadge } from "../IconBadge";
import { Book, ChartNoAxesColumn } from "lucide-react";
import { ProgressCourse } from "./ProgressCourse";

export function ListCourses(props: ListCoursesProps) {
  const { courses, title } = props;

  return (
    <div>
      <div className="my-4 mx-6 border rounded-lg bg-white p-6">
        <h2 className="text-2xl font-normal">{title}</h2>
        <div className="border-b[1px] py-2"></div>
        {courses && courses.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-3 mt-4">
            {courses.map(
              ({
                id,
                imageUrl,
                title,
                level,
                price,
                slug,
                category,
                chapters,
              }) => (
                <Link
                  key={id}
                  href={`/courses/${slug}`}
                  className="border rounded-lg relative transition-shadow hover:shadow-lg shadow-violet-300/40 shadow-md"
                >
                  <span className="absolute top-2 right-2 z-10 px-2 py-1 bg-white text-violet-500 font-medium rounded-full text-xs shadow-md">
                    {category}
                  </span>
                  <div className="w-full h-[180px] relative">
                    <Image
                      src={imageUrl || "/default-courses.jpg"}
                      alt={title}
                      fill
                      className="object-cover object-center rounded-t-lg"
                      sizes="(max-width:500px) 100vw, 1200px"
                    ></Image>
                  </div>
                  <div className="p-2">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
                      {title}
                    </h3>
                    <div className="flex items-center gap-2 justify-between mt-2">
                      <IconBadge
                        icon={Book}
                        text={`${chapters.length} chapters`}
                      ></IconBadge>
                      <IconBadge
                        icon={ChartNoAxesColumn}
                        text={level || ""}
                      ></IconBadge>
                    </div>

                    <ProgressCourse
                      courseId={id}
                      totalChapters={chapters.length}
                      price={price}
                    ></ProgressCourse>
                  </div>
                </Link>
              )
            )}
          </div>
        ) : (
          <p className="text-gray-500 text-center">
            No courses available at this time
          </p>
        )}
      </div>
    </div>
  )
}
