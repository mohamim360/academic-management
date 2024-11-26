import { useGetAllEnrolledCoursesQuery } from '../../redux/features/student/studentCourseManagement.api';
import { Card, Row, Col, Typography, Divider, Tag } from 'antd';
import { UserOutlined, ScheduleOutlined, BookOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MySchedule = () => {
  const { data } = useGetAllEnrolledCoursesQuery(undefined);
  console.log(data);

  return (
    <div style={{ padding: '20px' }}>
      {data?.data?.map((item : any) => (
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

            {/* Schedule Info */}
            <Col span={24}>
              <Divider orientation="left">Schedule</Divider>
              <Row gutter={16}>
                <Col span={12}>
                  <Text><ScheduleOutlined /> Semester: {item.academicSemester.name} {item.academicSemester.year}</Text>
                  <br />
                  <Text>Start: {item.offeredCourse?.startTime}</Text>
                  <br />
                  <Text>End: {item.offeredCourse?.endTime}</Text>
                </Col>
                <Col span={12}>
                  <Text>Days: </Text>
                  {item.offeredCourse?.days ? (
                    item.offeredCourse.days.map((day: any, index : any) => (
                      <Tag key={index}>{day}</Tag>
                    ))
                  ) : (
                    <Text>No schedule available</Text>
                  )}
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default MySchedule;
