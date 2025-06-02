"use client";

import { FileImage, Pencil } from "lucide-react";
import { TitleBlock } from "../TitleBlock";
import { CourseImageProps } from "./CourseImage.types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { UploadButton } from "@/utils/uploadthing";
import { toast } from "sonner";
import axios from "axios";

export function CourseImage(props: CourseImageProps) {
  const { idCourse, imageCourse } = props;
  const [isEditing, setIsEditing] = useState(false);

  const [image, setImage] = useState(imageCourse);

  useEffect(() => {
    setImage(imageCourse);
  }, [imageCourse]);

  const onChangeImage = async (imageUrl: string) => {
    console.log(imageUrl);
    try {
      axios.patch(`/api/course/${idCourse}`, {
        imageUrl: imageUrl,
      });
      toast("Image uploaded 🥳");
    } catch (error) {
      console.log(error);
      toast.error("Something has gone wrong ❌");
    }
  };

  return (
    <div className="p-4 rounded-lg bg-white h-fit">
      <TitleBlock title="Course Image" icon={FileImage}></TitleBlock>

      {isEditing ? (
        <div className="bg-slate-300 p-4 mt-2 rounded-lg">
          <UploadButton
            endpoint={"imageUploader"}
            onClientUploadComplete={(res) => {
              const uploadedUrl = res[0]?.ufsUrl;
              if (uploadedUrl) {
                onChangeImage(uploadedUrl);
                setImage(uploadedUrl); // ✅ Actualiza el estado `image`
              }
              setIsEditing(false);
            }}
            onUploadError={() => {
              toast.error("An error has occurred ❌");
            }}
          ></UploadButton>
        </div>
      ) : (
        <Image
          src={image ? image : "/default-courses.jpg"}
          alt=""
          width={500}
          height={250}
          className="w-full h-full rounded-md"
        ></Image>
      )}

      <Button
        className="w-full mt-4 cursor-pointer"
        variant={"outline"}
        size={"sm"}
        onClick={() => setIsEditing(!isEditing)}
      >
        <Pencil className="w-4 h-4"></Pencil>
        Edit image
      </Button>
    </div>
  );
}
