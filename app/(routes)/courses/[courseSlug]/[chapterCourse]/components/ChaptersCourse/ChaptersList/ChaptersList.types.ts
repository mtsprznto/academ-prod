import { Chapter, UserProgress } from "@prisma/client"

export type ChaptersListProps = {
    chapters: Chapter[] | null
    courseSlug: string
    currentChapter: string
    userProgress: UserProgress[];
    
}