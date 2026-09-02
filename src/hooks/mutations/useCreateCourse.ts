import { useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "@/services/course.service";

export const useCreateCourse = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: courseService.createCourse,
        onSuccess: async () => {
            await queryClient.invalidateQueries({ queryKey: ["courses"] });
        },
    });
};
