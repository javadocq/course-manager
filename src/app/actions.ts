"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createCourse(formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const instructor = formData.get("instructor");
  const capacity = formData.get("capacity");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof instructor !== "string" ||
    typeof capacity !== "string" ||
    typeof startDate !== "string" ||
    typeof endDate !== "string"
  ) {
    throw new Error("Invalid form data");
  }

  await prisma.course.create({
    data: {
      title: title.trim(),
      description: description.trim(),
      instructor: instructor.trim(),
      capacity: Number(capacity),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    },
  });

  revalidatePath("/");
}

export async function deleteCourse(formData: FormData) {
  const courseId = Number(formData.get("id"));

  if (!Number.isInteger(courseId) || courseId <= 0) {
    throw new Error("올바르지 않은 과정 ID입니다.");
  }

  const result = await prisma.course.deleteMany({
    where: {
      id: courseId,
    },
  });

  if (result.count === 0) {
    console.log(`이미 삭제됐거나 존재하지 않는 과정입니다: ${courseId}`);
  }

  revalidatePath("/");
}

export async function updateCourse(formData: FormData) {
  const courseId = Number(formData.get("id"));
  const title = formData.get("title");
  const description = formData.get("description");
  const instructor = formData.get("instructor");
  const capacity = formData.get("capacity");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");

  if (
    !Number.isInteger(courseId) ||
    courseId <= 0 ||
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof instructor !== "string" ||
    typeof capacity !== "string" ||
    typeof startDate !== "string" ||
    typeof endDate !== "string"
  ) {
    throw new Error("Invalid form data");
  }

  await prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      title: title.trim(),
      description: description.trim(),
      instructor: instructor.trim(),
      capacity: Number(capacity),
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    },
  });

  revalidatePath(`/course/${courseId}/edit`);
}
