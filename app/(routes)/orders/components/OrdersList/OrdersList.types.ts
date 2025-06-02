export type PurchaseWithCourse = {
    id: string
    userId: string
    courseId: string
    course: {
        id: string
        title: string
        price: string | null
    }
}

type PurchaseWithFormattedDate = PurchaseWithCourse & {
    createdAtFormatted: string
};

export type OrderListProps = {
    purchases: PurchaseWithFormattedDate[];
    receipts: {
        paymentIntentId: string
        receiptUrl: string | null
    }[];
}