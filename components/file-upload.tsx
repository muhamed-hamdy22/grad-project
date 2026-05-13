"use client";
import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import toast from "react-hot-toast";

interface FileUploadProps {
    onChange: (url?: string) => void;
    endpoint: keyof typeof ourFileRouter;
}

export const FileUpload = ({
    onChange,
    endpoint,
}: FileUploadProps) => {
    return (
        <UploadDropzone
            endpoint={endpoint}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url);
            }}
            onUploadError={(error: Error) => {
                toast.error(`${error?.message}`);
            }}
            appearance={{
                container: "border-2 border-dashed border-slate-300 rounded-md p-8 flex flex-col items-center justify-center cursor-pointer hover:border-slate-400 transition",
                uploadIcon: "text-slate-400 w-12 h-12",
                label: "text-sky-600 font-medium hover:text-sky-700",
                allowedContent: "text-slate-400 text-sm",
                button: "bg-sky-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-sky-700 transition mt-2",
            }}
        />
    );
};