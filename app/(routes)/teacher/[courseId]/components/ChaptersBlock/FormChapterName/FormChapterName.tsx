"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { FormChapterNameProps } from "./FormChapterName.types";
import { formSchema } from "./FormChapterName.form";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function FormChapterName(props: FormChapterNameProps) {
  const { idCourse, setShowInputChapter } = props;
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      axios.post(`/api/course/${idCourse}/chapter`, {
        title: values.title,
      });
      toast("Chapter created 🎈");
      setShowInputChapter(false);
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("There was an error creating the chapter ❌")
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mb-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Ex: Introduction to programming"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!form.formState.isValid}
          className="cursor-pointer"
        >
          Create
        </Button>
      </form>
    </Form>
  );
}
