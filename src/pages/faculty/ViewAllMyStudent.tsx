import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import { useGetAllFacultyCoursesQuery } from '../../redux/features/faculty/facultyCourses.api';

const ViewAllMyStudent = () => {
  const { registerSemesterId, courseId } = useParams();
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery([
    { name: 'semesterRegistration', value: registerSemesterId },
    { name: 'course', value: courseId },
  ]);

  // Transform the data to populate the table
  const tableData = facultyCoursesData?.data?.map(
    ({ _id, student, courseMarks, grade }) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      classTest1: courseMarks.classTest1,
      classTest2: courseMarks.classTest2,
      midTerm: courseMarks.midTerm,
      finalTerm: courseMarks.finalTerm,
      grade: grade, // Assuming the grade is included in the response
    })
  );

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Roll', dataIndex: 'roll', key: 'roll' },
    { title: 'Class Test 1', dataIndex: 'classTest1', key: 'classTest1' },
    { title: 'Class Test 2', dataIndex: 'classTest2', key: 'classTest2' },
    { title: 'Midterm', dataIndex: 'midTerm', key: 'midTerm' },
    { title: 'Final Term', dataIndex: 'finalTerm', key: 'finalTerm' },
    { title: 'Grade', dataIndex: 'grade', key: 'grade' },
  ];

  return <Table columns={columns} dataSource={tableData} />;
};

export default ViewAllMyStudent;
