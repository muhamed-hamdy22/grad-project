"use client";

import dynamic from "next/dynamic";

const MDPreview = dynamic(() => import("@uiw/react-md-editor").then(mod => mod.default.Markdown), { ssr: false });

interface PreviewProps {
    value: string;
}

export const Preview = ({ value }: PreviewProps) => {
    return (
        <div className="bg-white">
            <MDPreview source={value} />
        </div>
    );
};