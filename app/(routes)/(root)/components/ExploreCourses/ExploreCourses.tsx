"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function ExploreCourses() {
  const router = useRouter();
  

  return (
    <div className="my-4 mx-6 border rounded-lg bg-white">
      <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-4">
        <div className="p-6 flex flex-col gap-3">
          <h1 className="md:text-4xl font-semibold">Explore all course 👋</h1>
          <p className="text-balance max-w-2xl">
            Empieza a aprender desde cero con estos cursos. No necesitas
            experiencia previa 🔥
          </p>
          <Button
            className="cursor-pointer w-fit"
            onClick={() => router.push("/courses")}
          >
            Start learning
          </Button>
        </div>
        <div className="flex items-end">
          {/* Arreglar imagen se desborda */}
          <Image
            src={"/example.jpg"}
            width={300}
            height={300}
            alt="Explore all courses"
          ></Image>
        </div>
      </div>
    </div>
  );
}
