import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CourseProgressProps {
    value: number;
    variant?: "default" | "success";
    size?: "default" | "sm";
}

const colorByVariant = {
    default: "text-sky-700",
    success: "text-emerald-700",
};

const progressColorByVariant = {
    default: "[&>div]:bg-sky-700",
    success: "[&>div]:bg-emerald-700",
};

const sizeByVariant = {
    default: "text-sm",
    sm: "text-xs",
};

export const CourseProgress = ({
    value,
    variant,
    size,
}: CourseProgressProps) => {
    return (
        <div>
            <Progress
                className={cn(
                    "h-2",
                    progressColorByVariant[variant || "default"]
                )}
                value={value}
            />
            <p className={cn(
                "font-medium mt-2",
                colorByVariant[variant || "default"],
                sizeByVariant[size || "default"],
            )}>
                {Math.round(value)}% Complete
            </p>
        </div>
    );
};