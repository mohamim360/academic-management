import AdminDashboard from '../pages/admin/AdminDashboard';
import CreateStudent from '../pages/admin/userManagement/CreateStudent';
import AcademicDepartment from '../pages/admin/academicManagement/AcademicDepartment';
import AcademicFaculty from '../pages/admin/academicManagement/AcademicFaculty';
import AcademicSemester from '../pages/admin/academicManagement/AcademicSemester';
import CreateAcademicDepartment from '../pages/admin/academicManagement/CreateAcademicDepartment';
import CreateAcademicFaculty from '../pages/admin/academicManagement/CreateAcademicFaculty';
import CreateAcademicSemester from '../pages/admin/academicManagement/CreateAcademicSemester';
import StudentData from '../pages/admin/userManagement/StudentData';
import SemesterRegistration from '../pages/admin/courseManagement/SemesterRegistration';
import RegisteredSemesters from '../pages/admin/courseManagement/RegisteredSemesters';
import CreateCourse from '../pages/admin/courseManagement/CreateCourse';
import Courses from '../pages/admin/courseManagement/Courses';
import OfferCourse from '../pages/admin/courseManagement/OfferCourse';
import OfferedCourses from '../pages/admin/courseManagement/OfferedCourses';
import StudentDetails from '../pages/admin/userManagement/StudentDetails';
import StudentUpdate from '../pages/admin/userManagement/StudentUpdate';
import Profile from '../pages/Profile';

export const adminPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <AdminDashboard />,
  },
  {
    name: 'My Profile',
    path: 'profile',
    element: <Profile />,
  },
  {
    name: 'Academic Management',
    
    children: [
      {
        name: 'Semester',
     
        children: [
          {
            name: 'Create Semester',
            path: 'create-academic-semester',
            element: <CreateAcademicSemester />,
          },
          {
            name: 'View All Semester',
            path: 'academic-semester',
            element: <AcademicSemester />,
          },
        ],
      },
      {
        name: 'Faculty',
        children: [
          {
            name: 'Create Faculty',
            path: 'create-academic-faculty',
            element: <CreateAcademicFaculty />,
          },
          {
            name: 'View All Faculty',
            path: 'academic-faculty',
            element: <AcademicFaculty />,
          },
        ],
      },
      {
        name: 'Department',
        children: [
          {
            name: 'Create Department',
            path: 'create-academic-department',
            element: <CreateAcademicDepartment />,
          },
          {
            name: 'View All Department',
            path: 'academic-department',
            element: <AcademicDepartment />,
          },
        ],
      },
    ],
  },
  {
    name: 'User Management',
    children: [
      {
        name: 'Student',
        children: [
          {
            name: 'Create Student',
            path: 'create-student',
            element: <CreateStudent />,
          },
          {
            name: 'View All Student',
            path: 'students-data',
            element: <StudentData />,
          },
        ],
      },
      {
        name: 'Student Details',
        path: 'student-data/:studentId',
        element: <StudentDetails />,
      },
      {
        name: 'Student Update',
        path: 'student-update/:studentId',
        element: <StudentUpdate />,
      }
    ],
  },
  {
    name: 'Course Management',
    children: [
      {
        name: 'Registration',
        children: [
          {
            name: 'Semester Registration',
            path: 'semester-registration',
            element: <SemesterRegistration />,
          },
          {
            name: 'View All Registered Semester',
            path: 'registered-semesters',
            element: <RegisteredSemesters />,
          },
        ],
      },
      {
        name: 'Course',
        children: [
          {
            name: 'Create Course',
            path: 'create-course',
            element: <CreateCourse />,
          },
          {
            name: 'View All Course',
            path: 'courses',
            element: <Courses />,
          },
        ],
      },
      {
        name: 'Offer',
        children: [
          {
            name: 'Offer Course',
            path: 'offer-course',
            element: <OfferCourse />,
          },
          {
            name: 'Offered Courses',
            path: 'offered-courses',
            element: <OfferedCourses />,
          },
        ],
      },
    ],
  },
];




// export const adminSidebarItems = adminPaths.reduce(
//   (acc: TSidebarItem[], item) => {
//     if (item.path && item.name) {
//       acc.push({
//         key: item.name,
//         label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
//       });
//     }

//     if (item.children) {
//       acc.push({
//         key: item.name,
//         label: item.name,
//         children: item.children.map((child) => ({
//           key: child.name,
//           label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//         })),
//       });
//     }

//     return acc;
//   },
//   []
// );

//* Programatical way

// export const adminRoutes = adminPaths.reduce((acc: TRoute[], item) => {
//   if (item.path && item.element) {
//     acc.push({
//       path: item.path,
//       element: item.element,
//     });
//   }

//   if (item.children) {
//     item.children.forEach((child) => {
//       acc.push({
//         path: child.path,
//         element: child.element,
//       });
//     });
//   }

//   return acc;
// }, []);

//! Hard coded way

// export const adminPaths = [
//   {
//     path: 'dashboard',
//     element: <AdminDashboard />,
//   },
//   {
//     path: 'create-student',
//     element: <CreateStudent />,
//   },
//   {
//     path: 'create-admin',
//     element: <CreateAdmin />,
//   },
//   {
//     path: 'create-faculty',
//     element: <CreateFaculty />,
//   },
// ];
