import { FieldValues, SubmitHandler } from 'react-hook-form';
import PHForm from '../../../components/form/PHForm';
import { Button, Card, Col, Flex } from 'antd';
import PHInput from '../../../components/form/PHInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicFacultySchema } from '../../../schemas/academicManagement.schema';
import { useAddAcademicFacultyMutation } from '../../../redux/features/admin/academicManagement.api';
import { toast } from 'sonner';

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...');

    const facultyData = {
      name: data.name,
    };

    try {
      const res = (await addAcademicFaculty(facultyData)) as TResponse;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success('Faculty created', { id: toastId });
      }
    } catch (err) {
      toast.error('Something went wrong', { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
      <Card title="Create Academic Faculty">
      <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultySchema)}
        >
          <PHInput label="Faculty Name" name="name" />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Card>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
