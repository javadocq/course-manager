import { prisma } from "@/lib/prisma";
import { deleteCourse } from "@/app/actions";
import Link from "next/link";

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

                            <Link href={`/course/${course.id}/edit`}>수정</Link>
                            <form action={deleteCourse}>
                                <input
                                    type="hidden"
                                    name="id"
                                    value={course.id}
                                />
                                <button type="submit">삭제</button>
                            </form>
                        </li>
                    ))}
                </ul>
            )}

            <br />
        </main>
    );
}
