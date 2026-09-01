import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { updateCourse } from "@/app/actions";

interface EditCoursePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCoursePage({ params }: EditCoursePageProps) {
  const { id } = await params;
  const courseId = Number(id);

  if (!Number.isInteger(courseId) || courseId <= 0) {
    notFound();
  }

  const course = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
  });

  if (!course) {
    notFound();
  }

  return (
    <main>
      <h1>교육 과정 수정</h1>

      <form action={updateCourse}>
        <input type="hidden" name="id" value={course.id} />

        <div>
          <label htmlFor="title">과정명</label>
          <input
            id="title"
            name="title"
            type="text"
            defaultValue={course.title}
            required
          />
        </div>

        <div>
          <label htmlFor="description">과정 설명</label>
          <textarea
            id="description"
            name="description"
            defaultValue={course.description ?? ""}
          />
        </div>

        <div>
          <label htmlFor="instructor">강사명</label>
          <input
            id="instructor"
            name="instructor"
            type="text"
            defaultValue={course.instructor}
            required
          />
        </div>

        <div>
          <label htmlFor="capacity">모집 정원</label>
          <input
            id="capacity"
            name="capacity"
            type="number"
            min="1"
            defaultValue={course.capacity}
            required
          />
        </div>

        <div>
          <label htmlFor="startDate">시작일</label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            defaultValue={course.startDate.toISOString().split("T")[0]}
            required
          />
        </div>

        <div>
          <label htmlFor="endDate">종료일</label>
          <input
            id="endDate"
            name="endDate"
            type="date"
            defaultValue={course.endDate.toISOString().split("T")[0]}
            required
          />
        </div>

        <button type="submit">수정 완료</button>
      </form>
    </main>
  );
}
