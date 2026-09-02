import { NextResponse } from "next/server";
import { createCourse, getCourse } from "@/lib/courses/courses.repository";
import { courseSchema } from "@/schemas/course.schemas";

export async function GET() {
    try {
        const course = await getCourse();

        return NextResponse.json({
            course,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                Message: "교육 과정 조회 중 서버 오류가 발생했습니다.",
            },
            {
                status: 500,
            },
        );
    }
}

export async function POST(request: Request) {
    try {
        const body: unknown = await request.json();
        const parsed = courseSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    message:
                        parsed.error.issues[0]?.message ??
                        "입력값이 올바르지 않습니다.",
                },
                {
                    status: 400,
                },
            );
        }

        const course = await createCourse(parsed.data);

        return NextResponse.json(
            {
                course,
            },
            {
                status: 201,
            },
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                message: "교육 과정 등록 중 서버 오류가 발생했습니다.",
            },
            {
                status: 500,
            },
        );
    }
}
