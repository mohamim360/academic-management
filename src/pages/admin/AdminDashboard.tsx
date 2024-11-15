import { Card, Col, Row, List } from 'antd';
import { useGetAllStudentsQuery } from '../../redux/features/admin/userManagement.api';
import { useGetAllCoursesQuery } from '../../redux/features/admin/courseManagement';
import { useGetAllRegisteredSemestersQuery } from '../../redux/features/admin/courseManagement';

const AdminDashboard = () => {
  const { data: studentData, isLoading: isLoadingStudents } = useGetAllStudentsQuery();
  const { data: coursesData, isLoading: isLoadingCourses } = useGetAllCoursesQuery();
  const { data: semesterData, isLoading: isLoadingSemesters } = useGetAllRegisteredSemestersQuery();

  const totalStudents = studentData?.meta?.total || 0;
  const courses = coursesData?.data || [];
  const semesters = semesterData?.data || [];

  const ongoingSemesters = semesters.filter(semester => semester.status === 'ONGOING');
  const upcomingSemesters = semesters.filter(semester => semester.status === 'UPCOMING');
  const endedSemesters = semesters.filter(semester => semester.status === 'ENDED');

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Row gutter={30} style={{ marginTop: '16px' }}>
        <Col span={8} style={{ marginTop: '16px' }}>
          <Card loading={isLoadingStudents} title="Total Students" bordered={false}>
            {totalStudents}
          </Card>
        </Col>
        <Col span={8} style={{ marginTop: '16px' }}>
          <Card loading={isLoadingCourses} title="Courses" bordered={false}>
            <List
              size="small"
              dataSource={courses}
              renderItem={(item, index) => (
                <List.Item>
                  {index + 1}. {item.title}
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8} style={{ marginTop: '16px' }}>
          <Card loading={isLoadingSemesters} title="Ongoing Semesters" bordered={false}>
            <List
              size="small"
              dataSource={ongoingSemesters}
              renderItem={(item, index) => (
                <List.Item>
                  {index + 1}. {item.academicSemester.name}
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8} style={{ marginTop: '16px' }}>
          <Card loading={isLoadingSemesters} title="Upcoming Semesters" bordered={false}>
            <List
              size="small"
              dataSource={upcomingSemesters}
              renderItem={(item, index) => (
                <List.Item>
                  {index + 1}. {item.academicSemester.name}
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={8} style={{ marginTop: '16px' }}>
          <Card loading={isLoadingSemesters} title="Ended Semesters" bordered={false}>
            <List
              size="small"
              dataSource={endedSemesters}
              renderItem={(item, index) => (
                <List.Item>
                  {index + 1}. {item.academicSemester.name}
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AdminDashboard;
