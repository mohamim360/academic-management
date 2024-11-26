import { Button, Table, TableColumnsType, TableProps } from 'antd';
import { useGetAcademicDepartmentsQuery } from '../../../redux/features/admin/academicManagement.api';
import { TAcademicDepartment } from '../../../types/academicManagement.type';
import { useState } from 'react';
import { TQueryParam } from '../../../types';

export type TTableData = Pick<TAcademicDepartment, 'name'> & {
  academicFaculty: string; // Change to string
};

const AcademicDepartment = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: departmentData,
    isLoading,
    isFetching,
  } = useGetAcademicDepartmentsQuery(params);

  console.log({ isLoading, isFetching });

  const tableData: TTableData[] = departmentData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty.name, // Now valid
    })
  ) || [];

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Department Name',
      key: 'name',
      dataIndex: 'name',
      filters: departmentData?.data?.map((dept) => ({
        text: dept.name,
        value: dept.name,
      })),
    },
    {
      title: 'Faculty Name',
      key: 'academicFaculty',
      dataIndex: 'academicFaculty',
      filters: departmentData?.data?.map((dept) => ({
        text: dept.academicFaculty.name,
        value: dept.academicFaculty.name,
      })),
    },
    {
      title: 'Action',
      key: 'x',
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>['onChange'] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === 'filter') {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: 'name', value: item })
      );

      filters.academicFaculty?.forEach((item) =>
        queryParams.push({ name: 'academicFaculty', value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
    />
  );
};

export default AcademicDepartment;
