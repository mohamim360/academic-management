import { Card, Descriptions } from 'antd';
import { useParams } from 'react-router-dom';
import { useGetSingleStudentQuery } from '../../../redux/features/admin/userManagement.api';

const StudentDetails = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const { data: studentData, isLoading } = useGetSingleStudentQuery(studentId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!studentData) {
    return <div>No student data found.</div>;
  }

  const { fullName, id, email, contactNo, gender, dateOfBirth, guardian, permanentAddress, presentAddress, academicDepartment, academicFaculty, admissionSemester, bloogGroup, emergencyContactNo, localGuardian } = studentData.data;

  return (
    <Card title="Student Details" bordered={false} style={{ width: 600 }}>
      <Descriptions bordered column={1}>
        <Descriptions.Item label="Name">{fullName}</Descriptions.Item>
        <Descriptions.Item label="Roll No.">{id}</Descriptions.Item>
        <Descriptions.Item label="Email">{email}</Descriptions.Item>
        <Descriptions.Item label="Contact No.">{contactNo}</Descriptions.Item>
        <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
        <Descriptions.Item label="Date of Birth">{new Date(dateOfBirth).toLocaleDateString()}</Descriptions.Item>
        <Descriptions.Item label="Blood Group">{bloogGroup}</Descriptions.Item>
        <Descriptions.Item label="Emergency Contact">{emergencyContactNo}</Descriptions.Item>
        <Descriptions.Item label="Guardian's Name">{guardian.fatherName} & {guardian.motherName}</Descriptions.Item>
        <Descriptions.Item label="Guardian's Contact">{guardian.fatherContactNo}</Descriptions.Item>
        <Descriptions.Item label="Local Guardian">{localGuardian.name} ({localGuardian.contactNo})</Descriptions.Item>
        <Descriptions.Item label="Permanent Address">{permanentAddress}</Descriptions.Item>
        <Descriptions.Item label="Present Address">{presentAddress}</Descriptions.Item>
        <Descriptions.Item label="Department">{academicDepartment.name}</Descriptions.Item>
        <Descriptions.Item label="Faculty">{academicFaculty.name}</Descriptions.Item>
        <Descriptions.Item label="Admission Semester">{admissionSemester.name} {admissionSemester.year}</Descriptions.Item>
      </Descriptions>
    </Card>
  );
};

export default StudentDetails;
