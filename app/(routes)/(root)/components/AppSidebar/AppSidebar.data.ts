import { Award, BookOpen, ChartArea, GraduationCap, House, ReceiptText, SquareTerminal } from "lucide-react";

export const routes = [
    {
        title: "Home",
        url: "/",
        icon: House
    },
    {
        title: "Courses",
        url: "/courses",
        icon: SquareTerminal
    },
    {
        title: "My courses",
        url: "/my-courses",
        icon: BookOpen
    },
    {
        title: "Orders",
        url: "/orders",
        icon: ReceiptText
    },
    {
        title: "Certificates",
        url: "/certificates",
        icon: Award
    },

]

export const routesTeacher = [
    {
        title: "Courses",
        url: "/teacher",
        icon: GraduationCap
    },
    {
        title: "Analitycs",
        url: "/analitycs",
        icon: ChartArea
    },
]