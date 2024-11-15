import { Controller, FieldValues, SubmitHandler } from 'react-hook-form';
import PHForm from '../../../components/form/PHForm';
import PHInput from '../../../components/form/PHInput';
import { Button, Card, Col, Divider, Row } from 'antd';
import PHSelect from '../../../components/form/PHSelect';
import PHDatePicker from '../../../components/form/PHDatePicker';
import { bloodGroupOptions, genderOptions } from '../../../constants/global';
import { useGetAcademicDepartmentsQuery, useGetAllSemestersQuery } from '../../../redux/features/admin/academicManagement.api';
import { useUpdateStudentMutation, useGetSingleStudentQuery } from '../../../redux/features/admin/userManagement.api';
import { useParams } from 'react-router-dom';
import moment from 'moment';

const StudentUpdate = () => {
  const { studentId } = useParams<{ studentId: string }>();  // Get student ID from route params

  // Fetch single student data by ID
  const { data: studentData, isLoading: studentLoading } = useGetSingleStudentQuery(studentId);
  console.log(studentData);
  // Get academic departments and semesters for dropdown options
  const { data: sData, isLoading: sIsLoading } = useGetAllSemestersQuery(undefined);
  const { data: dData, isLoading: dIsLoading } = useGetAcademicDepartmentsQuery(undefined);

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  // Mutation hook for updating the student
  const [updateStudent, { isLoading: updating }] = useUpdateStudentMutation();

  // Submit handler
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (!studentId) {
        console.error('Student ID is missing');
        return;
    }

    // Construct the updated student data
    const updatedStudentData = {
        student: {}
    };

    // Only add fields that are non-empty or have values
    if (data.name && (data.name.firstName || data.name.middleName || data.name.lastName)) {
        updatedStudentData.student.name = {
            firstName: data.name.firstName || undefined,
            middleName: data.name.middleName || undefined,
            lastName: data.name.lastName || undefined,
        };
    }

    if (data.gender) {
        updatedStudentData.student.gender = data.gender;
    }
    
    if (data.dateOfBirth) {
        updatedStudentData.student.dateOfBirth = data.dateOfBirth;
    }

    if (data.bloogGroup) {
        updatedStudentData.student.bloogGroup = data.bloogGroup;
    }

    if (data.email) {
        updatedStudentData.student.email = data.email;
    }

    if (data.contactNo) {
        updatedStudentData.student.contactNo = data.contactNo;
    }

    if (data.emergencyContactNo) {
        updatedStudentData.student.emergencyContactNo = data.emergencyContactNo;
    }

    if (data.presentAddress) {
        updatedStudentData.student.presentAddress = data.presentAddress;
    }

    if (data.permanentAddress) {
        updatedStudentData.student.permanentAddress = data.permanentAddress;
    }

    if (data.guardian && (data.guardian.fatherName || data.guardian.fatherOccupation || data.guardian.fatherContactNo)) {
        updatedStudentData.student.guardian = {
            fatherName: data.guardian.fatherName || undefined,
            fatherOccupation: data.guardian.fatherOccupation || undefined,
            fatherContactNo: data.guardian.fatherContactNo || undefined,
            motherName: data.guardian?.motherName || undefined,
            motherOccupation: data.guardian?.motherOccupation || undefined,
            motherContactNo: data.guardian?.motherContactNo || undefined,
        };
    }

    if (data.admissionSemester) {
        updatedStudentData.student.admissionSemester = data.admissionSemester;
    }

    if (data.academicDepartment) {
        updatedStudentData.student.academicDepartment = data.academicDepartment;
    }

    // Trigger the update mutation with correctly structured data
    updateStudent({ id: studentId, student: updatedStudentData });
    console.log('Form Data:', data);
    console.log('Updated Student Data:', updatedStudentData);
};


  
  

  if (studentLoading) {
    return <div>Loading student data...</div>;
  }

  const studentDefaultValues = {
    name: {
      firstName: studentData?.data?.name?.firstName || '',
      middleName: studentData?.data?.name?.middleName || '',
      lastName: studentData?.data?.name?.lastName || '',
    },
    gender: studentData?.data?.gender || '',
    dateOfBirth: studentData?.data?.dateOfBirth ? moment(studentData.data.dateOfBirth) : null,
    bloogGroup: studentData?.data?.bloogGroup || '',
    email: studentData?.data?.email || '',
    contactNo: studentData?.data?.contactNo || '',
    emergencyContactNo: studentData?.data?.emergencyContactNo || '',
    presentAddress: studentData?.data?.presentAddress || '',
    permanentAddress: studentData?.data?.permanentAddress || '',
    guardian: {
      fatherName: studentData?.data?.guardian?.fatherName || '',
      fatherOccupation: studentData?.data?.guardian?.fatherOccupation || '',
      fatherContactNo: studentData?.data?.guardian?.fatherContactNo || '',
      motherName: studentData?.data?.guardian?.motherName || '',
      motherOccupation: studentData?.data?.guardian?.motherOccupation || '',
      motherContactNo: studentData?.data?.guardian?.motherContactNo || '',
    },
    admissionSemester: studentData?.data?.admissionSemester?._id || '',
    academicDepartment: studentData?.data?.academicDepartment?._id || '',
  };

  return (
    <Row justify="center">
      <Col span={24}>
        <PHForm onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Divider>Personal Info</Divider>
          <Card>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="name.firstName" label="First Name" value="name.firstName" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="name.middleName" label="Middle Name" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="name.lastName" label="Last Name" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect options={genderOptions} name="gender" label="Gender" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHDatePicker name="dateOfBirth" label="Date of Birth" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect options={bloodGroupOptions} name="bloogGroup" label="Blood Group" />
              </Col>
            </Row>
          </Card>

          <Divider>Contact Info</Divider>
          <Card>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="email" label="Email" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="contactNo" label="Contact No" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="emergencyContactNo" label="Emergency Contact No" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="presentAddress" label="Present Address" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="permanentAddress" label="Permanent Address" />
              </Col>
            </Row>
          </Card>

          <Divider>Guardian Info</Divider>
          <Card>
            <Row gutter={8}>
              {/* Guardian Fields */}
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="guardian.fatherName" label="Father Name" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="guardian.fatherOccupation" label="Father Occupation" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="guardian.fatherContactNo" label="Father Contact No" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="guardian.motherName" label="Mother Name" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="guardian.motherOccupation" label="Mother Occupation" />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHInput type="text" name="guardian.motherContactNo" label="Mother Contact No" />
              </Col>
            </Row>
          </Card>

          <Divider>Academic Info</Divider>
          <Card>
            <Row gutter={8}>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect options={semesterOptions} name="admissionSemester" label="Admission Semester" disabled={sIsLoading} />
              </Col>
              <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                <PHSelect options={departmentOptions} name="academicDepartment" label="Academic Department" disabled={dIsLoading} />
              </Col>
            </Row>
          </Card>

          <Button htmlType="submit" loading={updating}>Update</Button>
        </PHForm>
      </Col>
    </Row>
  );
};

export default StudentUpdate;
