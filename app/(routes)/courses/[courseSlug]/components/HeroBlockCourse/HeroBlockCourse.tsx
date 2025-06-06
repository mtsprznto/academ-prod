"use client";
import { useRouter } from "next/navigation";
import { HeroBlockCourseProps } from "./HeroBlockCourse.types";
import { useEffect, useState } from "react";
import { IconBadge } from "@/components/Shared";
import { Calendar, ChartNoAxesColumn, Timer } from "lucide-react";
import { formatPrice } from "@/lib/formatPrice";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import { getTotalDuration } from "@/actions/getTotalDuration";

export function HeroBlockCourse(props: HeroBlockCourseProps) {
  const { course, purchaseCourse } = props;
  const {
    title,
    id,
    description,
    price,
    level,
    imageUrl,
    updatedAt,
    slug,
    chapters,
  } = course;

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const enrollCourse = async () => {
    setIsLoading(true);
    if (price === "Free") {
      try {
        await axios.post(`/api/course/${id}/enroll`);
        toast("Successful registration 🎉");
        router.push(`/courses/${slug}/${chapters[0].id}`);
      } catch (error) {
        console.log(error);
        toast.error("Error subscribing ❌");
      } finally {
        setIsLoading(true);
      }
    } else {
      try {
        const response = await axios.post(`/api/course/${id}/checkout`);

        window.location.assign(response.data.url);
      } catch (error) {
        toast.error("Error when registering ❌");
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  const redirectToCourse = () => {
    router.push(`/courses/${slug}/${chapters[0].id}`);
  };
  const formattedDuration = getTotalDuration(chapters);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      <div>
        <h2 className="text-3xl font-semibold">{title}</h2>
        <p className="text-balance mt-2">{description}</p>

        <div className="flex flex-col gap-3 mt-5 text-gray-600">
          <IconBadge icon={Timer} text={formattedDuration}></IconBadge>
          <IconBadge
            icon={Calendar}
            text={`Last update: ${new Date(updatedAt).toLocaleDateString(
              "es-ES"
            )}`}
          ></IconBadge>
          <IconBadge icon={ChartNoAxesColumn} text={level || ""}></IconBadge>
        </div>

        <h2 className="text-xl font-semibold my-4">{formatPrice(price)}</h2>
        {purchaseCourse ? (
          <Button
            onClick={redirectToCourse}
            className="hover:bg-violet-400 text-white font-semibold cursor-pointer"
            disabled={isLoading}
          >
            View course
          </Button>
        ) : (
          <Button
            onClick={enrollCourse}
            className="hover:bg-violet-400 text-white font-semibold cursor-pointer"
            disabled={isLoading}
          >
            Register now
          </Button>
        )}
      </div>
      <Image
        src={imageUrl || "/default-courses.jpg"}
        width={500}
        height={500}
        alt={title}
      ></Image>
    </div>
  );
}
