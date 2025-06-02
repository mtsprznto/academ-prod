"use client";
import { formatPrice } from "@/lib/formatPrice";
import { OrderListProps } from "./OrdersList.types";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function OrdersList(props: OrderListProps) {
  const { purchases, receipts } = props;

  const totalPurchases = purchases.reduce((acc, purchase) => {
    const rawPrice = purchase.course.price?.replace(",",".");
    const price = rawPrice && !isNaN(Number(rawPrice)) ? parseFloat(rawPrice) : 0;

    return acc + price;
  }, 0);

  const formattedTotal = formatPrice(totalPurchases.toString() || "0");

  const downloadReceipt = (index: number) => {
    const receiptUrl = receipts[index].receiptUrl;

    if (receiptUrl) {
      window.open(receiptUrl, "_blank");
    } else {
      toast.error("The receipt has not been found.");
    }
  };

  return (
    <Table className="my-6">
      <TableCaption>List of your latest orders</TableCaption>
      <TableHeader className="bg-slate-100">
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Course</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Receipt</TableHead>
          <TableHead className="text-center">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {purchases.map((purchase, index) => (
          <TableRow key={purchase.id}>
            <TableCell className="font-medium">
              {purchase.createdAtFormatted}
            </TableCell>
            <TableCell>{purchase.course.title}</TableCell>
            <TableCell>
              <span className="bg-green-100 text-green-600 py-1 px-2 rounded-md text-sm">
                Pagado
              </span>
            </TableCell>
            <TableCell className="text-center">
              <Button
                className="cursor-pointer"
                variant={"outline"}
                onClick={() => downloadReceipt(index)}
              >
                View receipt
                <ExternalLink className="w-4 h-4"></ExternalLink>
              </Button>
            </TableCell>
            <TableCell className="text-right">
              {formatPrice(purchase.course.price)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={4}>Total spent</TableCell>
          <TableCell className="text-right">{formattedTotal}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
