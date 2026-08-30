import { prisma } from "@/app/lib/prisma";

export default async function Home() {
  const courses = await prisma.course.findMany();

  return (
    <main>
      <h1>교육 과정 관리</h1>

      <p>등록된 교육 과정: {courses.length}개</p>

      {courses.length === 0 ? (
        <p>아직 등록된 교육 과정이 없습니다.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <strong>{course.title}</strong>
              <span> · {course.instructor}</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
