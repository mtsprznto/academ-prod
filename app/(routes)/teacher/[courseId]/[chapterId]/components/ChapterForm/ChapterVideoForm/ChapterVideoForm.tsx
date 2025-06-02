"use client";
import { Pencil, Video } from "lucide-react";
import { TitleBlock } from "../../../../components";
import { ChapterVideoFormProps } from "./ChapterVideoForm.types";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export function ChapterVideoForm(props: ChapterVideoFormProps) {
  const { chapterId, courseId, videoUrl } = props;
  const [onEditVideo, setOnEditVideo] = useState(false);
  const router = useRouter();

  const onSubmit = async (url: string) => {
    try {
      await axios.patch(`/api/course/${courseId}/chapter/${chapterId}`, {
        videoUrl: url,
      });
      toast("Updated video 😉");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Something has gone wrong");
    }
  };

  return (
    <div className="mt-6 p-6 bg-white rounded-md">
      <TitleBlock title="Add or modify the video" icon={Video}></TitleBlock>
      {videoUrl ? (
        <video src={videoUrl} controls className="rounded-md"></video>
      ) : (
        <p>There is no video</p>
      )}

      <div className="mt-4 p-2 rounded-md border">
        <Button
          className="cursor-pointer"
          variant={"secondary"}
          onClick={() => setOnEditVideo(true)}
        >
          {onEditVideo ? "Drag or select the video" : "Edit video"}
          <Pencil className="w-4 h-4"></Pencil>
        </Button>

        {onEditVideo && (
          <UploadButton
            className="w-full bg-slate-200 rounded-md p-2 mt-2"
            endpoint="chapterVideo"
            onClientUploadComplete={(url) => {
              console.log(url);
              if (url) {
                onSubmit(url[0].serverData.url);
              }
            }}
          ></UploadButton>
        )}
      </div>
    </div>
  );
}
