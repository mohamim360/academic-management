import React, { useState } from 'react';
import { Table, TableColumnsType, TableProps, Button } from 'antd';
import { useGetOfferedCourseQuery } from '../../../redux/features/admin/courseManagement';
import { TQueryParam } from '../../../types';


export type TOfferedCourseTableData = {
  name: string;
  code: number;
  credits: number;
  semester: string;
};

const OfferedCourseTable = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const {
    data: offeredCoursesData,
    isLoading,
    isFetching,
  } = useGetOfferedCourseQuery(params);

  console.log({ isLoading, isFetching });

  const tableData = offeredCoursesData?.data?.map(
    ({ _id, course, academicSemester }) => ({
      key: _id,
      name: course.title,
      code: course.code,
      credits: course.credits,
      semester: academicSemester,
    })
  );

  const columns: TableColumnsType<TOfferedCourseTableData> = [
    {
      title: 'Course Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Course Code',
      key: 'code',
      dataIndex: 'code',
    },
    {
      title: 'Credits',
      key: 'credits',
      dataIndex: 'credits',
    },
    {
      title: 'Semester',
      key: 'semester',
      dataIndex: 'semester',
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

  const onChange: TableProps<TOfferedCourseTableData>['onChange'] = (
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

export default OfferedCourseTable;
