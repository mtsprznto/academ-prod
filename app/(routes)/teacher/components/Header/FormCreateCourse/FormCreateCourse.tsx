"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner"

import { z } from "zod";
import axios from 'axios';

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formSchema } from "./FormCreateCourse.form";
import { useRouter } from "next/navigation";

export function FormCreateCourse() {


  const router = useRouter();


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseName: "",
      slug: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await axios.post("/api/course", values)

      toast("Course successfully created 🎆")
      router.push(`/teacher/${res.data.id}`);

    } catch (error) {
      toast.error("An error has occurred ⭕")
      console.log(error);
    }

  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
        <FormField
          control={form.control}
          name="courseName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course name</FormLabel>
              <FormControl>
                <Input placeholder="ReactJs course" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug name</FormLabel>
              <FormControl>
                <Input placeholder="reactjs-course" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="cursor-pointer">Create course</Button>
      </form>
    </Form>
  );
}
