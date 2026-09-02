"use client";

import { useCreateCourse } from "@/hooks/mutations/useCreateCourse";
import type { FormEvent } from "react";

const HomePageClient = () => {
  const createCourseMutation = useCreateCourse();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      const form = e.currentTarget;
      const formData = new FormData(form);

      createCourseMutation.mutate({
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        instructor: formData.get("instructor") as string,
        capacity: Number(formData.get("capacity")),
        startDate: formData.get("startDate") as string,
        endDate: formData.get("endDate") as string,
      },
        {
          onSuccess: () => {
            form.reset();
          }
        }
      );
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">과정명</label>
                <input id="title" name="title" type="text" required />
            </div>

            <div>
                <label htmlFor="description">과정 설명</label>
                <textarea id="description" name="description" />
            </div>

            <div>
                <label htmlFor="instructor">강사명</label>
                <input id="instructor" name="instructor" type="text" required />
            </div>

            <div>
                <label htmlFor="capacity">모집 정원</label>
                <input
                    id="capacity"
                    name="capacity"
                    type="number"
                    min="1"
                    required
                />
            </div>

            <div>
                <label htmlFor="startDate">시작일</label>
                <input id="startDate" name="startDate" type="date" required />
            </div>

            <div>
                <label htmlFor="endDate">종료일</label>
                <input id="endDate" name="endDate" type="date" required />
            </div>

            <button type="submit" disabled={createCourseMutation.isPending}>
                {createCourseMutation.isPending ? "등록 중..." : "등록 하기"}
            </button>

            {createCourseMutation.isError && (
                <p className="text-red-500">
                    { createCourseMutation.error.message || "교육 과정 등록 중 오류가 발생했습니다." }
                </p>
            )}
    </form>
    );
}

export default HomePageClient;
