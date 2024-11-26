import { useGetAllEnrolledCoursesQuery } from '../../redux/features/student/studentCourseManagement.api';
import { Card, Row, Col, Typography, Divider, Table } from 'antd';
import { BookOutlined, ScheduleOutlined, UserOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const CourseMarks = () => {
  const { data } = useGetAllEnrolledCoursesQuery(undefined);
  console.log(data);

  // Define columns for the Table to display course marks
  const columns = [
    {
      title: 'Assessment',
      dataIndex: 'assessment',
      key: 'assessment',
    },
    {
      title: 'Marks Obtained',
      dataIndex: 'marksObtained',
      key: 'marksObtained',
    },
    {
      title: 'Total Marks',
      dataIndex: 'totalMarks',
      key: 'totalMarks',
    },
    {
      title: 'Grade',
      dataIndex: 'grade',
      key: 'grade',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      {data?.data?.map((item) => (
        <Card key={item._id} style={{ marginBottom: '20px' }} hoverable>
          <Row gutter={16}>
            {/* Course Title */}
            <Col span={24}>
              <Title level={3}>{item.course.title}</Title>
              <Text>{item.course.prefix} - {item.course.code}</Text>
            </Col>

            {/* Course Details */}
            <Col span={12}>
              <Divider orientation="left">Course Info</Divider>
              <Text><BookOutlined /> Credits: {item.course.credits}</Text>
              <br />
              <Text>Pre-requisites: {item.course.preRequisiteCourses.length > 0 ? item.course.preRequisiteCourses.join(', ') : 'None'}</Text>
            </Col>

            {/* Faculty Info */}
            <Col span={12}>
              <Divider orientation="left">Faculty Info</Divider>
              {item.faculty ? (
                <>
                  <Text><UserOutlined /> {item.faculty.fullName}</Text>
                  <br />
                  <Text>Designation: {item.faculty.designation}</Text>
                </>
              ) : (
                <Text>No faculty assigned</Text>
              )}
            </Col>

            {/* Marks and Grades Table */}
            <Col span={24}>
              <Divider orientation="left">Marks & Grades</Divider>
              <Table
                columns={columns}
                dataSource={[
                  {
                    key: '1',
                    assessment: 'Class Test 1',
                    marksObtained: item.courseMarks.classTest1,
                    totalMarks: 100, // Or adjust based on your total marks
                    grade: item.grade, // Or calculate the grade if necessary
                  },
                  {
                    key: '2',
                    assessment: 'Mid Term',
                    marksObtained: item.courseMarks.midTerm,
                    totalMarks: 100, // Adjust accordingly
                    grade: item.grade,
                  },
                  {
                    key: '3',
                    assessment: 'Class Test 2',
                    marksObtained: item.courseMarks.classTest2,
                    totalMarks: 100, // Adjust accordingly
                    grade: item.grade,
                  },
                  {
                    key: '4',
                    assessment: 'Final Term',
                    marksObtained: item.courseMarks.finalTerm,
                    totalMarks: 100, // Adjust accordingly
                    grade: item.grade,
                  },
                ]}
                pagination={false}
                bordered
              />
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default CourseMarks;
