export function getTotalDuration(chapters: { duration?: number }[]): string {
    const totalSeconds = Math.round(
      chapters.reduce((acc, chapter) => acc + (chapter.duration || 0), 0)
    );
  
    const totalHours = Math.floor(totalSeconds / 3600);
    const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
    const remainingSeconds = totalSeconds % 60;
  
    return `${totalHours}h ${totalMinutes}min ${remainingSeconds}s`;
  }