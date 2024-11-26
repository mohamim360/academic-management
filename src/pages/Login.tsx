import { Button, Row, Col, Card, Typography } from 'antd';
import { FieldValues } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { TUser, setUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import PHForm from '../components/form/PHForm';
import PHInput from '../components/form/PHInput';

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const defaultValues = {
    userId: '2024020005',
    password: 'student123',
  };

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading('Logging in');

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };
      const res = await login(userInfo).unwrap();
      console.log(res);
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));

      toast.success('Logged in', { id: toastId, duration: 2000 });

      if (res.data.needsPasswordChange) {
        navigate(`/change-password`);
      } else {
        navigate(`/${user.role}/dashboard`);
      }
    } catch (err) {
      toast.error('Something went wrong', { id: toastId, duration: 2000 });
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: '100vh',
        background: 'linear-gradient(135deg, #E3F2FD, #FFF8E1)',
        padding: '16px',
      }}
    >
      <Col xs={24} sm={16} md={12} lg={8}>
        <Card
          bordered={false}
          style={{
            background: '#FFFFFF',
            boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
            borderRadius: '10px',
          }}
        >
          <Title
            level={3}
            style={{ textAlign: 'center', color: '#3F51B5', marginBottom: '24px' }}
          >
            Login
          </Title>
          <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
            <PHInput
              type="text"
              name="userId"
              label="User ID"
           
          
            />
            <PHInput
              type="password"
              name="password"
              label="Password"
            
            
            />
            <Button
              htmlType="submit"
              type="primary"
              block
              style={{
                background: '#3F51B5',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
              }}
            >
              Login
            </Button>
          </PHForm>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
