import { prisma } from "@/lib/prisma";
import type { CourseInput } from "@/schemas/course.schemas";

export const getCourse = async () => {
    return prisma.course.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
};

export const createCourse = async (data: CourseInput) => {
    return prisma.course.create({
        data: {
            title: data.title,
            description: data.description || null,
            instructor: data.instructor,
            capacity: data.capacity,
            startDate: data.startDate,
            endDate: data.endDate,
        },
    });
};
