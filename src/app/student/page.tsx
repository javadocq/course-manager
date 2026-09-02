import { prisma } from "@/lib/prisma";
import { createStudent, deleteStudent } from "@/app/actions";

export default async function StudentsPage() {
    const students = await prisma.student.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });

    return (
        <main>
            <h1>교육생 관리</h1>

            <p>등록된 교육생: {students.length}명</p>

            {students.length === 0 ? (
                <p>아직 등록된 교육생이 없습니다.</p>
            ) : (
                <ul>
                    {students.map((student) => (
                        <li key={student.id}>
                            <strong>{student.name}</strong>
                            <span> · {student.email}</span>

                            <form action={deleteStudent}>
                                <input
                                    type="hidden"
                                    name="id"
                                    value={student.id}
                                />
                                <button type="submit">삭제</button>
                            </form>
                        </li>
                    ))}
                </ul>
            )}

            <form action={createStudent}>
                <div>
                    <label htmlFor="name">이름</label>
                    <input id="name" name="name" type="text" required />
                </div>

                <div>
                    <label htmlFor="email">이메일</label>
                    <input id="email" name="email" type="email" required />
                </div>

                <button type="submit">교육생 등록</button>
            </form>
        </main>
    );
}
