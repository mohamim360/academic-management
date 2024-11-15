import React from 'react';
import { Descriptions, Card, Row, Col } from 'antd';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/features/auth/authSlice';

const Profile = () => {
  const user = useSelector(selectCurrentUser); // Get user data from Redux

  return (
    <Row justify="center" style={{ marginTop: '50px' }}>
      <Col span={12}>
        <Card title="User Profile" bordered={false}>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="User ID">{user?.userId}</Descriptions.Item>
            <Descriptions.Item label="Role">{user?.role}</Descriptions.Item>
            <Descriptions.Item label="Issued At">{new Date(user?.iat * 1000).toLocaleString()}</Descriptions.Item>
            <Descriptions.Item label="Expires At">{new Date(user?.exp * 1000).toLocaleString()}</Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
  );
};

export default Profile;
