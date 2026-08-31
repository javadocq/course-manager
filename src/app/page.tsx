import { prisma } from "@/app/lib/prisma";
import { createCourse, deleteCourse } from "@/app/actions";

export default async function Home() {
  const courses = await prisma.course.findMany();

  return (
    <main className="bg-white text-black w-dvw h-dvh">
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
              <form action={deleteCourse}>
                <input type="hidden" name="id" value={course.id} />
                <button type="submit">삭제</button>
              </form>
            </li>
          ))}
        </ul>
      )}

      <br />
      <form action={createCourse}>
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
          <input id="capacity" name="capacity" type="number" min="1" required />
        </div>

        <div>
          <label htmlFor="startDate">시작일</label>
          <input id="startDate" name="startDate" type="date" required />
        </div>

        <div>
          <label htmlFor="endDate">종료일</label>
          <input id="endDate" name="endDate" type="date" required />
        </div>

        <button type="submit">등록하기</button>
      </form>
    </main>
  );
}
