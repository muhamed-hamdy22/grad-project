"use client";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { toast } from "react-hot-toast";
const formSchema = z.object({
    title: z.string().min(1, "Title is required"),

});
const CreatePage = () => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });
    const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/courses", values);
            router.push(`/teacher/courses/${response.data.id}`);
            toast.success("Course Created")
        } catch  {
            toast.error("something went wrong");
        }
    };
    return (
        <div className="p-6 max-w-5xl mx-auto md:items-center md:justify-center h-full">
            <div>
                <h1 className="text-2xl ">
                    Name of the course
                </h1>
                <p className="text-sm text-slate-600">
                    what would you like to name your course? choose a name that best describes the content and purpose of your course.
                </p>
                <Form {...form}>
                    <form action=""
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="mt-8 space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        course title
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="course title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        this is the title of your course. it should be descriptive and concise.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center justify-end gap-x-2">
                            <Link href="/">
                                <Button
                                    type="button"
                                    variant="ghost"
                                >
                                    cancel
                                </Button>
                            </Link>
                            <Button
                                type="submit"
                                disabled={isSubmitting || !isValid}
                            >
                                continue
                            </Button>
                        </div>

                    </form>

                </Form>
            </div>
        </div>
    );
}
export default CreatePage;
