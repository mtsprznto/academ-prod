"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Input } from "@/components/ui/input";

import { Cog } from "lucide-react";
import { TitleBlock } from "../TitleBlock";
import { CourseFormProps } from "./CourseForm.types";
import { formSchema } from "./CourseForm.form";
import axios from "axios";
import { toast } from "sonner";

export function CourseForm(props: CourseFormProps) {
  const { course } = props;
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: course.title ? course.title : "",
      slug: course.slug ? course.slug : "",
      description: course.description ? course.description : "",
      category: course.category ? course.category : "",
      level: course.level ? course.level : "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      //console.log(values);
      axios.patch(`/api/course/${course.id}`, values)
      toast("Updated course 🥳")
    } catch (error) {
      console.log(error);
      toast.error("Something has gone wrong ❌");
    }
  };

  return (
    <div className="p-6 bg-white rounded-md">
      <TitleBlock title="Config of the course" icon={Cog}></TitleBlock>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input placeholder="Nuevo Curso" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is what the user will see as the course title
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course url</FormLabel>
                  <FormControl>
                    <Input placeholder="course-url" {...field} disabled />
                  </FormControl>
                  <FormDescription>
                    It is unique and cannot be modified
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cateogry</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select course categories" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Frontend">Frontend</SelectItem>
                      <SelectItem value="Backend">Backend</SelectItem>
                      <SelectItem value="Fullstack">Fullstack</SelectItem>
                      <SelectItem value="Infrastructure">
                        Infrastructure
                      </SelectItem>
                      <SelectItem value="UX/UI Design">UX/UI Design</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="level"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="FullsAdvancedtack">
                        Advanced
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Put the description of the course"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Full course description</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="cursor-pointer">
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
