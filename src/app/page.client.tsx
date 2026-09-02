"use client";

import { createCourse } from "./actions";

const HomePageClient = () => {
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        await createCourse(formData);
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

            <button type="submit">등록하기</button>
        </form>
    );
};

export default HomePageClient;
