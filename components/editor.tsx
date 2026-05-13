"use client";

import dynamic from "next/dynamic";

const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

interface EditorProps {
    value: string;
    onChange: (value: string) => void;
}

export const Editor = ({ value, onChange }: EditorProps) => {
    return (
        <div className="bg-white">
            <MDEditor
                value={value}
                onChange={(val) => onChange(val || "")}
            />
        </div>
    );
};