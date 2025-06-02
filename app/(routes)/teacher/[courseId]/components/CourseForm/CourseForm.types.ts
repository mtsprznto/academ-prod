import { Course } from "@prisma/client";

export type CourseFormProps = {
    course: Course;
}

//type CourseWithRelations = Course & {chapters: Chapter[]}