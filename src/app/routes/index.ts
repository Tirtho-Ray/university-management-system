import {Router} from "express"
import { StudentRoutes } from "../modules/student/student.route";
import { UserRoutes } from "../modules/user/user.route";
import { AcademySemesterRoutes } from "../modules/academicSemister/academySemesterRoute";
import { AcademicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRoutes } from "../modules/academicDepartment/academicDepartmentId.route";
import { CourseRoutes } from "../../Course/course.route";
import { FacultyRoutes } from "../Faculty/faculty.route";
import { SemesterRegistrationRouter } from "../modules/semesterRegistration/semesterRegistration.route";
import { OfferedCourseRoute } from "../modules/OfferedCourse/offeredCourse.route";
import { LoginRouter } from "../modules/auth/auth.route";
import { AdminRoutes } from "../Admin/admin.route";

const router = Router();


const modulesRoutes = [
    {
        path:'/students',
        route:StudentRoutes,
    },
    {
        path:'/users',
        route:UserRoutes,
    },
    {
        path:'/admin',
        route:AdminRoutes,
    },
    {
        path:'/academy-semesters',
        route:AcademySemesterRoutes,
    },
    {
        path:'/academy-faculties',
        route:AcademicFacultyRoutes,
    },
    {
        path:'/academy-departments',
        route:AcademicDepartmentRoutes,
    },
    {
        path:'/faculty',
        route:FacultyRoutes,
    },
    {
        path:'/courses',
        route:CourseRoutes,
    },
    {
        path:'/semester-Registration',
        route:SemesterRegistrationRouter,
    },
    {
        path:'/OfferedCourse',
        route:OfferedCourseRoute,
    },
    {
        path:'/auth',
        route:LoginRouter,
    },
]

modulesRoutes.forEach(route => router.use(route.path, route.route));






export default router;