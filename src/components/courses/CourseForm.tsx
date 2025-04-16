import React from 'react';
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileVideo, FileText, BookOpen } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  videoUrl: z.string().url({
    message: "Please enter a valid video URL.",
  }),
  notes: z.string().min(10, {
    message: "Notes must be at least 10 characters.",
  }),
  quizQuestions: z.string().min(10, {
    message: "Quiz questions must be at least 10 characters.",
  }),
});

export function CourseForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      videoUrl: "",
      notes: "",
      quizQuestions: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Save course data to localStorage
    const courses = JSON.parse(localStorage.getItem('courses') || '[]');
    const newCourse = {
      ...values,
      id: `course-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    courses.push(newCourse);
    localStorage.setItem('courses', JSON.stringify(courses));
    
    // Show success message with copy link option
    toast.success(
      <div className="flex flex-col gap-2">
        <p>Course created successfully!</p>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            const link = `${window.location.origin}/courses/${newCourse.id}`;
            navigator.clipboard.writeText(link);
            toast.success("Course link copied to clipboard!");
          }}
          className="w-full"
        >
          <Link className="h-4 w-4 mr-2" />
          Copy Course Link
        </Button>
      </div>
    );
    
    form.reset();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Course</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Course</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter course title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter course description" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <FileVideo className="h-4 w-4" />
                      Video URL
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter video URL" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a URL to your course video
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      Course Notes
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter course notes" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="quizQuestions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4" />
                      Quiz Questions
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter quiz questions" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Enter quiz questions separated by new lines
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">Create Course</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
