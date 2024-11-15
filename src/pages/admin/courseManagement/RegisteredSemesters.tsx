import { Button, Dropdown, Table, TableColumnsType, Tag } from 'antd';
import {
  useGetAllRegisteredSemestersQuery,
  useUpdateRegisteredSemesterMutation,
} from '../../../redux/features/admin/courseManagement';
import moment from 'moment';
import { TSemester } from '../../../types';
import { useState } from 'react';

export type TTableData = Pick<TSemester, 'startDate' | 'endDate' | 'status'> & {
  key: string;
  name: string;
};

const items = [
  {
    label: 'Upcoming',
    key: 'UPCOMING',
  },
  {
    label: 'Ongoing',
    key: 'ONGOING',
  },
  {
    label: 'Ended',
    key: 'ENDED',
  },
];

const RegisteredSemesters = () => {
  const [semesterId, setSemesterId] = useState('');
  const { data: semesterData, isFetching } =
    useGetAllRegisteredSemestersQuery(undefined);

  const [updateSemesterStatus] = useUpdateRegisteredSemesterMutation();

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate: moment(new Date(startDate)).format('MMMM'),
      endDate: moment(new Date(endDate)).format('MMMM'),
      status,
    })
  );

  const handleStatusUpdate = async (data) => {
    const updateData = {
      id: semesterId,
      data: {
        status: data.key,
      },
    };

    try {
      await updateSemesterStatus(updateData).unwrap();
      setSemesterId(''); // Clear the selected semester ID after update
    } catch (error) {
      console.error('Failed to update semester status', error);
    }
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        let color;
        if (status === 'UPCOMING') {
          color = 'blue';
        }
        if (status === 'ONGOING') {
          color = 'green';
        }
        if (status === 'ENDED') {
          color = 'red';
        }

        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: 'Start Date',
      key: 'startDate',
      dataIndex: 'startDate',
    },
    {
      title: 'End Date',
      key: 'endDate',
      dataIndex: 'endDate',
    },
    {
      title: 'Action',
      key: 'x',
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={['click']}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
    />
  );
};

export default RegisteredSemesters;
