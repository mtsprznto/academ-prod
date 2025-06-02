"use client";
import { Button } from "@/components/ui/button";
import { ActionsProps } from "./Actions.type";
import { Edit, Trash } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export function Actions(props: ActionsProps) {
  const { courseId } = props;

  const router = useRouter();

  const onEdit = () =>{
    router.push(`/teacher/${courseId}`);
  }

  const deleteCourse = () =>{
    axios.delete(`/api/course/${courseId}`)
    toast("Course successfully deleted ⭕")
    router.refresh();
  }


  return (
    <div className="flex flex-col gap-2 items-center w-full lg:max-w-42">
      <Button className="cursor-pointer w-full" onClick={onEdit}>
        Edit <Edit className="w-4 h-4"></Edit>
      </Button>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant={"outline"}
            className="w-full text-red-500 border-red-500 hover:bg-red-100 hover:text-red-500 cursor-pointer"
          >
            Delete <Trash className="w-4 h-4"></Trash>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This deletes the entire course and its data
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={deleteCourse} className="cursor-pointer">
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
