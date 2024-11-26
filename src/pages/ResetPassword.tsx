// import React from 'react';
// import { Button, Row } from 'antd';
// import { FieldValues, SubmitHandler } from 'react-hook-form';
// import { useResetPasswordMutation } from '../redux/features/auth/authApi';
// import PHForm from '../components/form/PHForm';
// import PHInput from '../components/form/PHInput';
// import { toast } from 'sonner';
// import { useParams, useNavigate } from 'react-router-dom';

// const ResetPassword = () => {
//   const { token } = useParams(); // Assuming token is passed in the route
//   const [resetPassword] = useResetPasswordMutation();
//   const navigate = useNavigate();

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     const toastId = toast.loading('Resetting password...');
//     try {
//       const res = await resetPassword({ data, token }).unwrap();
//       if (res?.success) {
//         toast.success('Password reset successfully', { id: toastId });
//         navigate('/login');
//       } else {
//         toast.error('Failed to reset password', { id: toastId });
//       }
//     } catch (error) {
//       toast.error('Something went wrong', { id: toastId });
//     }
//   };

//   return (
//     <Row justify="center" align="middle" style={{ height: '100vh' }}>
//       <PHForm onSubmit={onSubmit}>
//         <PHInput type="password" name="newPassword" label="New Password" />
//         <PHInput type="password" name="confirmPassword" label="Confirm Password" />
//         <Button htmlType="submit">Reset Password</Button>
//       </PHForm>
//     </Row>
//   );
// };

// export default ResetPassword;
