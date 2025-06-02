import { ReceiptText } from "lucide-react";

import { currentUser } from "@clerk/nextjs/server";


import { getUserReceipts } from "@/actions/getReceipStripe";
import { getUserPurchases } from "@/actions/getUserPurchases";

import { OrdersList } from "./components";

export default async function OrdersPage() {
  const user = await currentUser();
  if (!user) {
    return <p className="text-xs">Not signed in</p>;
  }

  const purchases = await getUserPurchases(user.id);
  const receipts = await getUserReceipts(user.id);

  return (
    <div className="my-4 mx-6 border rounded-lg bg-white p-6">
      <div className="flex items-center mb-6 gap-1">
        <div className="p-2 rounded-full bg-violet-400">
          <ReceiptText className="w-5 h-5 text-white"></ReceiptText>
        </div>
        <h1 className="text-xl font-semibold">All Orders</h1>
      </div>

      <OrdersList purchases={purchases} receipts={receipts}></OrdersList>
    </div>
  );
}
