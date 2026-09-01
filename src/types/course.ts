export interface Course {
  id: number;
  title: string;
  description?: string;
  instructor: string;
  capacity: number;
  startDate: string;
  endDate: string;
  updatedAt: string;
}

export interface createCourseRequest {
  title: string;
  description?: string;
  instructor: string;
  capacity: number;
  startDate: string;
  endDate: string;
}

export interface CoursesResponse {
  course: Course[];
}

export interface CourseResponse {
  course: Course;
}
