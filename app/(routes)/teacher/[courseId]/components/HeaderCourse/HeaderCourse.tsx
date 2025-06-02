"use client";
import { useRouter } from "next/navigation";
import { HeaderCourseProps } from "./HeaderCourse.types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, MoveLeft, Trash } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

export function HeaderCourse(props: HeaderCourseProps) {
  const { idCourse, isPublished } = props;
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onPublish = async (state: boolean) => {
    setIsLoading(true);
    try {
      axios.patch(`/api/course/${idCourse}`, {
        isPublished: state,
      });
      toast(state ? "Public Course 🎨" : "Hidden Course 🔍");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast("Ups, Something has gone wrong ❌");
    }
    router.refresh();
    setIsLoading(false);
  };

  const removeCourse = async () => {
    axios.delete(`/api/course/${idCourse}`);
    toast("Course successfully deleted 🎈")
  };

  return (
    <div>
      <div className="mb-4">
        <div className="flex flex-row md:flex-row justify-between items-center">
          <Button
            className="cursor-pointer"
            onClick={() => router.push("/teacher")}
          >
            <MoveLeft></MoveLeft>
            Back 
          </Button>
          <div className="gap-2 flex items-center">
            {isPublished ? (
              <Button
                className="cursor-pointer"
                variant={"outline"}
                onClick={() => onPublish(false)}
                disabled={isLoading}
              >
                Unpublish
                <EyeOff></EyeOff>
              </Button>
            ) : (
              <Button
                className="cursor-pointer"
                onClick={() => onPublish(true)}
                disabled={isLoading}
              >
                Publish
                <Eye></Eye>
              </Button>
            )}

            <Button
              variant={"destructive"}
              onClick={() => removeCourse}
              className="cursor-pointer"
            >
              <Trash></Trash>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
