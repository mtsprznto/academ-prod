"use client";
import html2canvas from "html2canvas-pro";
import { useRef } from "react";
import { Download } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { DownloadCertificateProps } from "./DownloadCertificate.types";

export function DownloadCertificate(props: DownloadCertificateProps) {
  const { titleCourse } = props;

  const certRef = useRef<HTMLDivElement>(null);
  const handleDownload = async () => {
    if (!certRef.current) return;
    const canvas = await html2canvas(certRef.current, {
      scale: 1,
    });

    const link = document.createElement("a");
    link.download = `certificado-${titleCourse}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="cursor-pointer" variant={"outline"}>
          <Download className="w-4 h-4"></Download>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-full !max-w-[900px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Download your certificate</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <p>En proceso...</p>
            {/* <Certificate
              certRef={certRef}
              userName={userName}
              titleCourse={titleCourse}
            ></Certificate> */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDownload}>
            Download
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
