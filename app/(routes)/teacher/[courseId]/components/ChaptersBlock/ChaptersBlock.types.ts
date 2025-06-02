import { Chapter } from "@prisma/client"

export type ChaptersBlockProps = {
    idCourse: string
    chapters: Chapter[] | null
}