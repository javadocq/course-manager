import { prisma } from "@/app/lib/prisma";
import { createEnrollment } from "../actions";

export default async function EnrollmentsPage() {
  const [students, courses, enrollments] = await Promise.all([
    prisma.student.findMany({
      orderBy: {
        name: "asc",
      },
    }),

    prisma.course.findMany({
      orderBy: {
        title: "asc",
      },
    }),

    prisma.enrollment.findMany({
      include: {
        student: true,
        course: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    }),
  ]);

  const cannotEnroll = students.length === 0 || courses.length === 0;

  return (
    <main>
      <h1>수강 신청 관리</h1>

      <form action={createEnrollment}>
        <div>
          <label htmlFor="studentId">교육생</label>

          <select id="studentId" name="studentId" required>
            <option value="">교육생을 선택하세요</option>

            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} ({student.email})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="courseId">교육 과정</label>

          <select id="courseId" name="courseId" required>
            <option value="">교육 과정을 선택하세요</option>

            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" disabled={cannotEnroll}>
          수강 신청
        </button>
      </form>

      {cannotEnroll && (
        <p>수강 신청을 위해 교육생과 교육 과정을 먼저 등록해 주세요.</p>
      )}

      <h2>수강 신청 목록</h2>

      {enrollments.length === 0 ? (
        <p>아직 수강 신청이 없습니다.</p>
      ) : (
        <ul>
          {enrollments.map((enrollment) => (
            <li key={enrollment.id}>
              <strong>{enrollment.student.name}</strong>
              <span> → {enrollment.course.title}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
