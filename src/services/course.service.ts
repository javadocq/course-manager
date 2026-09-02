import { fetcher } from "@/lib/fetcher";
import { CourseResponse, createCourseRequest } from "@/types/course";

export const courseService = {
    createCourse: (courseData: createCourseRequest) => {
        return fetcher<CourseResponse>("/api/course", {
            method: "POST",
            body: JSON.stringify(courseData),
        });
    },
};
