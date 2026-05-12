"use client"
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Combobox } from "@/components/ui/combobox";




import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CategoryFormProps {
    initialData: {
        categoryId: string | null;
    };
    courseId: string;
    options: { label: string; value: string; }[],

};
const formSchema = z.object({
    categoryID: z.string().min(1),
});

export const CategoryForm = (
    { initialData,
        courseId,
        options,
    }: CategoryFormProps
) => {
    const [isEditing, setEditing] = useState(false);

    const toggleEdit = () => setEditing((current) => !current)
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryID: initialData.categoryId ?? "",
        }

    });
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/courses/${courseId}`, values)
            toast.success("course updated")
            toggleEdit();
            router.refresh();
        } catch {
            toast.error("something went wrong")
        }
    }
    

    const selectedOption = options.find((option) => option.value === initialData.categoryId);

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                course category
                <Button onClick={toggleEdit} variant={"ghost"}>
                    {isEditing ? (
                        <>cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            edit category
                        </>
                    )}

                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData.categoryId && "text-slate-500 italic",

                )}>
                    {selectedOption?.label || "no category "}
                </p>
            )}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="categoryID"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>

                                        <Combobox
                                            options={options}
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"

                            >
                                save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
}

