import { Chapter, Course } from "@prisma/client"

export type HeroBlockCourseProps = {
    course: Course & { chapters: Chapter[] }
    purchaseCourse: boolean
}