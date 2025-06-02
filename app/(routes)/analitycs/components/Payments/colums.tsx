"use client";

import { ColumnDef } from "@tanstack/react-table";

export type purchaseWithCourse = {
  id: string;
  userId: string;
  userEmail: string;
  courseId: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  course: {
    title: string;
    slug: string;
    imageUrl: string;
    price: string;
  };
};

export const columns: ColumnDef<purchaseWithCourse>[] = [
  {
    accessorKey: "createdAtFormatted",
    header: "Date of purchase",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt).toLocaleDateString("es-ES");
      return <div className="font-medium">{date}</div>;
    },
  },
  {
    accessorKey: "userEmail",
    header: "Client",
  },
  {
    accessorKey: "course.title",
    header: "Course",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.price;
      return <div>${price}</div>;
    },
  },
];
