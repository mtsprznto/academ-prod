"use client";
import {
  GripVertical,
  ListCheck,
  Loader,
  Pencil,
  PlusCircle,
} from "lucide-react";
import { TitleBlock } from "../TitleBlock";
import { ChaptersBlockProps } from "./ChaptersBlock.types";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FormChapterName } from "./FormChapterName";

import {
  DragDropContext,
  Droppable,
  DropResult,
  Draggable,
} from "@hello-pangea/dnd";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

export function ChaptersBlock(props: ChaptersBlockProps) {
  const { chapters, idCourse } = props;
  const [chaptersList, setChaptersList] = useState(chapters ?? []);
  const [showInputChapter, setShowInputChapter] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setChaptersList(chapters ?? []);
  }, [chapters]);

  const onEditChapter = (chapterId: string) => {
    
    
    
    router.push(`/teacher/${idCourse}/${chapterId}`);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(chaptersList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setChaptersList(items);
    const bulkUpdate = items.map((chapter, index) => ({
      id: chapter.id,
      position: index,
    }));
    onReorder(bulkUpdate);
  };

  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/course/${idCourse}/chapter/reorder`, {
        list: updateData,
      });

      toast("Updated Order 🥳");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("There was an error updating the order ❌");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-md h-fit relative">
      <TitleBlock title="Course chapters" icon={ListCheck}></TitleBlock>

      <div className="flex gap-2 items-center justify-between mb-3">
        <p>Full chapters</p>
        <Button
          variant={"outline"}
          size={"sm"}
          className="cursor-pointer"
          onClick={() => setShowInputChapter(true)}
        >
          <PlusCircle className="w-4 h-4"></PlusCircle>
          Create chapter
        </Button>
      </div>
      {showInputChapter ? (
        <FormChapterName
          setShowInputChapter={setShowInputChapter}
          idCourse={idCourse}
        ></FormChapterName>
      ) : (
        showInputChapter
      )}

      {isUpdating && (
        <div className="absolute top-0 right-0 flex items-center justify-center w-full h-full bg-slate-500/20">
          <Loader className="w-6 h-6 animate-spin text-violet-500" />
        </div>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="chapters">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex flex-col gap-2"
            >
              {chaptersList?.map((chapter, index) => (
                
                
                <Draggable
                  key={chapter.id}
                  draggableId={chapter.id}
                  index={index}
                >
                  
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      className="flex gap-2 items-center bg-slate-100 rounded-md py-2 px-4 text-sm justify-between"
                    >
                      <div className="flex gap-2 items-center">
                        <GripVertical className="w-4 h-4 text-gray-500"></GripVertical>
                        <p>{chapter.title}</p>
                      </div>
                      <div className="flex gap-2 items-center px-2 py-1">
                        {chapter.isPublished ? (
                          <p className="px-2 py-1">Published</p>
                        ) : (
                          <p className="px-2 py-1">Unpublished</p>
                        )}
                        
                        
                        <div
                          className="cursor-pointer"
                          onClick={() => onEditChapter(chapter.id)}
                        >
                          <Pencil className="w-4 h-4 text-gray-500"></Pencil>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
