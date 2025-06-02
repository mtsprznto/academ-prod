"use client";
import { DollarSign } from "lucide-react";
import { TitleBlock } from "../TitleBlock";
import { CoursePriceProps } from "./CoursePrice.types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "sonner";

export function CoursePrice(props: CoursePriceProps) {
  const { idCourse, priceCourse } = props;

  const [price, setPrice] = useState<string | undefined>(
    priceCourse ? priceCourse : "Free"
  );

  const onChangePrice = async () => {
    try {
      axios.patch(`/api/course/${idCourse}`, {
        price: price,
      });
      toast("Price updated 🎆");
    } catch (error) {
      console.log(error);
      toast.error("Ups... Something went wrong ❌")
    }
  };

  return (
    <div className="p-6 bg-white rounded-md h-fit">
      <TitleBlock title="Course price" icon={DollarSign}></TitleBlock>

      <Select onValueChange={setPrice} defaultValue={price}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a course price">{price}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Course price</SelectLabel>
            <SelectItem value="Free">Free</SelectItem>
            <SelectItem value="19.00">19.00</SelectItem>
            <SelectItem value="24.00">24.00</SelectItem>
            <SelectItem value="49.00">49.00</SelectItem>
            <SelectItem value="89.99">89.99</SelectItem>
            <SelectItem value="199.99">199.99</SelectItem>
            <SelectItem value="399.99">399.99</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button
        onClick={onChangePrice}
        className="mt-3 cursor-pointer"
        disabled={!price}
      >
        Save price
      </Button>
    </div>
  );
}
