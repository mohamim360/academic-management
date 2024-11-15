import { useParams } from 'react-router-dom';
import {
  useAddMarkMutation,
  useGetAllFacultyCoursesQuery,
} from '../../redux/features/faculty/facultyCourses.api';
import { Button, Modal, Table, TableColumnsType } from 'antd';
import { useState } from 'react';
import PHForm from '../../components/form/PHForm';
import PHSelect from '../../components/form/PHSelect';
import PHInput from '../../components/form/PHInput';

const MyStudents = () => {
  const { registerSemesterId, courseId } = useParams();
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery([
    { name: 'semesterRegistration', value: registerSemesterId },
    { name: 'course', value: courseId },
  ]);

  console.log(facultyCoursesData);

  const tableData = facultyCoursesData?.data?.map(
    ({ _id, student, semesterRegistration, offeredCourse, courseMarks, grade }) => ({
      key: _id,
      name: student.fullName,
      roll: student.id,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
      classTest1: courseMarks.classTest1,
      classTest2: courseMarks.classTest2,
      midTerm: courseMarks.midTerm,
      finalTerm: courseMarks.finalTerm,
      grade: grade,
    })
  );

  const columns = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Roll',
      key: 'roll',
      dataIndex: 'roll',
    },
    { title: 'Class Test 1', dataIndex: 'classTest1', key: 'classTest1' },
    { title: 'Class Test 2', dataIndex: 'classTest2', key: 'classTest2' },
    { title: 'Midterm', dataIndex: 'midTerm', key: 'midTerm' },
    { title: 'Final Term', dataIndex: 'finalTerm', key: 'finalTerm' },
    { title: 'Grade', dataIndex: 'grade', key: 'grade' },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];

  return <Table columns={columns} dataSource={tableData} />;
};

const AddMarksModal = ({ studentInfo }) => {
  console.log(studentInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarkMutation();

  const handleSubmit = async (data) => {
    const studentMark = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };

    console.log(studentMark);
    const res = await addMark(studentMark);

    console.log(res);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Marks</Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <PHForm onSubmit={handleSubmit}>
          <PHInput type="text" name="classTest1" label="Class Test 1" />
          <PHInput type="text" name="classTest2" label="Class Test 2" />
          <PHInput type="text" name="midTerm" label="Midterm" />
          <PHInput type="text" name="finalTerm" label="Final" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Modal>
    </>
  );
};

export default MyStudents;
