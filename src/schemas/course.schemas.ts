import { z } from "zod";

export const courseSchema = z
  .object({
    title: z.string().trim().min(1, "과정명을 입력해주세요."),
    description: z.string().trim().optional(),
    instructor: z.string().trim().min(1, "강사명을 입력해주세요."),
    capacity: z.coerce
      .number()
      .int()
      .min(1, "모집 정원은 1명 이상이어야 합니다."),
    startDate: z.coerce.date({
      error: "올바른 시작일을 입력해주세요.",
    }),
    endDate: z.coerce.date({
      error: "올바른 종료일을 입력해주세요.",
    }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "종료일은 시작일보다 빠를 수 없습니다.",
    path: ["endDate"],
  });

export type CourseInput = z.infer<typeof courseSchema>;