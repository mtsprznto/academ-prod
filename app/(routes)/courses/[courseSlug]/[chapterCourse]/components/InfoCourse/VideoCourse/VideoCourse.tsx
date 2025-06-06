"use client";
import { VideoCourseProps } from "./VideoCourse.types";

export function VideoCourse(props: VideoCourseProps) {
  const { videoUrl, chapterId, courseId } = props;

  return <video src={videoUrl} controls className="w-full rounded-md"></video>;
}
