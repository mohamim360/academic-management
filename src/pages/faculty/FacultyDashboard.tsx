
import { Card, Spin, Alert } from 'antd';
import { useGetFacultyDataQuery } from '../../redux/features/faculty/facultyCourses.api';

const FacultyDashboard = () => {
  const { data: facultyData, isLoading, error } = useGetFacultyDataQuery();

  if (isLoading) return <Spin tip="Loading faculty data..." />;
  if (error) return <Alert message="Error loading faculty data" type="error" />;

  return (
    <div>
      <h1>Faculty Dashboard</h1>
      
      {/* Basic Faculty Information */}
      <Card title="Faculty Information" style={{ marginBottom: 20 }}>
        <p><strong>Name:</strong> {facultyData?.fullName}</p>
        <p><strong>Email:</strong> {facultyData?.email}</p>
        <p><strong>Role:</strong> {facultyData?.role}</p>
      </Card>
    </div>
  );
};

export default FacultyDashboard;
