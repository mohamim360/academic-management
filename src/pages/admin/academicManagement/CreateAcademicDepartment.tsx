import { FieldValues, SubmitHandler } from 'react-hook-form';
import PHForm from '../../../components/form/PHForm';
import { Button, Col, Flex, Card } from 'antd'; // Import Card from 'antd'
import PHSelect from '../../../components/form/PHSelect';
import PHInput from '../../../components/form/PHInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddAcademicDepartmentMutation } from '../../../redux/features/admin/academicManagement.api';
import { toast } from 'sonner';
import { academicDepartmentSchema } from '../../../schemas/academicManagement.schema';
import { useGetAcademicFacultiesQuery } from '../../../redux/features/admin/academicManagement.api';

const CreateAcademicDepartment = () => {
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();
  const { data: faculties } = useGetAcademicFacultiesQuery();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating...');

    const departmentData = {
      name: data.name,
      academicFaculty: data.academicFaculty,
    };

    try {
      const res = await addAcademicDepartment(departmentData);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success('Department created', { id: toastId });
      }
    } catch (err) {
      toast.error('Something went wrong', { id: toastId });
    }
  };

  const facultyOptions = faculties?.data.map((faculty) => ({
    value: faculty._id,
    label: faculty.name,
  }));

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <Card title="Create Academic Department"> {/* Added Card component */}
          <PHForm
            onSubmit={onSubmit}
            resolver={zodResolver(academicDepartmentSchema)}
          >
            <PHInput label="Department Name" name="name" />
            <PHSelect label="Faculty" name="academicFaculty" options={facultyOptions} />
            <Button htmlType="submit">Submit</Button>
          </PHForm>
        </Card>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
