// import { Button, Row } from 'antd';
// import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
// import { useForgetPasswordMutation, useGetUserIdByEmailQuery } from '../redux/features/auth/authApi';
// import PHForm from '../components/form/PHForm';
// import PHInput from '../components/form/PHInput';
// import { toast } from 'sonner';

// const ForgetPassword = () => {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const [forgetPassword] = useForgetPasswordMutation();

//   // Use the hook to fetch userId based on email
//   const { data: userId, error, isLoading } = useGetUserIdByEmailQuery('', { skip: true }); // skip until email is provided

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     const toastId = toast.loading('Processing request...');
//     try {
//       if (!data.email) {
//         toast.error('Please provide a valid email address', { id: toastId });
//         return;
//       }

//       // Fetch userId when email is provided
//       const { data: fetchedUserId, error: fetchError } = useGetUserIdByEmailQuery(data.email);

//       if (fetchError) {
//         toast.error('Error fetching user ID', { id: toastId });
//         return;
//       }

//       if (isLoading) {
//         toast.loading('Loading user ID...');
//       }

//       const userIdToUse = fetchedUserId || '';
//       if (userIdToUse) {
//         const res = await forgetPassword({ id: userIdToUse }).unwrap();
//         if (res?.success) {
//           toast.success('Password reset link sent to your email', { id: toastId });
//         } else {
//           toast.error(res?.message || 'Failed to send reset link', { id: toastId });
//         }
//       }
//     } catch (error) {
//       toast.error('Something went wrong', { id: toastId });
//     }
//   };

//   return (
//     <Row justify="center" align="middle" style={{ height: '100vh' }}>
//       <PHForm onSubmit={handleSubmit(onSubmit)}>
//         <PHInput
//           type="email"
//           name="email"
//           label="Email Address"
//           {...register('email', { required: true })}
//           error={errors.email}
//         />
//         <Button htmlType="submit" disabled={isLoading}>Send Reset Link</Button>
//       </PHForm>
//     </Row>
//   );
// };

// export default ForgetPassword;
