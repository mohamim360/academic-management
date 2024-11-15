import { Button, Table, TableColumnsType, TableProps } from 'antd';
import { useGetAcademicFacultiesQuery } from '../../../redux/features/admin/academicManagement.api';
import { TAcademicFaculty } from '../../../types/academicManagement.type';
import { useState } from 'react';
import { TQueryParam } from '../../../types';

export type TTableData = Pick<TAcademicFaculty, 'name'>;

const AcademicFaculty = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: facultyData,
    isLoading,
    isFetching,
  } = useGetAcademicFacultiesQuery(params);

  console.log({ isLoading, isFetching });

  const tableData = facultyData?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Engineering',
          value: 'Engineering',
        },
        {
          text: 'Business',
          value: 'Business',
        },
        {
          text: 'Arts',
          value: 'Arts',
        },
      ],
      onFilter: (value, record) => record.name.includes(value as string),
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

      if (filters.name) {
        filters.name.forEach((item) =>
          queryParams.push({ name: 'name', value: item })
        );
      }

      setParams(queryParams.length > 0 ? queryParams : undefined);
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

export default AcademicFaculty;
