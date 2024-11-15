import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import MyCourses from '../pages/faculty/MyCourses';
import MyStudents from '../pages/faculty/MyStudents';
import ViewAllMyStudent from '../pages/faculty/ViewAllMyStudent';
export const facultyPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <FacultyDashboard />,
  },
  {
    name: 'My Courses',
    path: 'courses',
    element: <MyCourses />,
  },
  {
    
    path: 'courses/:registerSemesterId/:courseId',
    element: <MyStudents />,
  },
  {
    name: 'View All My Student',
    path: 'courses/:registerSemesterId/:courseId',
    element: <ViewAllMyStudent />,
  },
];
