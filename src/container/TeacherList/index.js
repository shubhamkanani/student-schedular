import React, { useEffect, useState } from 'react'
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom'
import { Table, PageHeader, Button, Spin} from 'antd';
import { getTeacherList, getTeacherListByFirstName, getTeacherListByLastName } from '../../services/Teacher'

import SearchFilter from '../../components/TeacherList/SearchFilter'

const columns = [
    {
        title: 'Name',
        render: (record) => (
            <div>
                {record.firstName + " " + record.lastName}
            </div>
        ),
        key: 'name',
        fixed: 'left',
    },
    {
        title: 'Period',
        dataIndex: 'period',
        key: 'period',
    },
    {
        title: 'Subjects',
        key: 'subjects',
        render: (record) => (
            <div>
                {record.subjects.map((sub) => {
                    return <span>{sub}, </span>
                })}
            </div>
        )
    }
    ,
    {
        title: 'Grades',
        key: 'grades',
        render: (record) => (
            <div>
                {record.grades.map((grad) => {
                    return <span>{grad}, </span>
                })}
            </div>
        )
    }
    ,
    {
        title: 'Student Count',
        dataIndex: 'studentCount',
        key: 'studentCount',
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        render: (record) => <Button>Edit</Button>,
    },
];
function TeacherList() {
    const history = useHistory();
    const [teacherList, setTeacherList] = useState();
    const [tableProps, setTableProps] = useState({
        totalCount: 0,
        pageIndex: 0,
        pageSize: 30,
    });
    const [search, setSearch] = useState({
        searchValue: "",
        searchType: "firstName",
    })
    useEffect(() => {
        getListView();
    },[tableProps.pageIndex]);

    const getListView = () => {
        if (search.searchValue === "") {
            getTeacherList(tableProps.pageIndex, tableProps.pageSize).then(data => {
                setTeacherList(data._embedded.teachers)
                setTableProps({
                    ...tableProps,
                    totalCount: data.page.totalElements,
                });
            })
        }
        else {
            if (search.searchType === "firstName") {
                getTeacherListByFirstName(search.searchValue).then(data => {
                    setTeacherList(data._embedded.teachers)
                    setTableProps({
                        totalCount: 1,
                        pageIndex: 0,
                        pageSize: 30,
                    });
                })
            }
            else if (search.searchType === "lastName") {
                getTeacherListByLastName(search.searchValue).then(data => {
                    setTeacherList(data._embedded.teachers)
                    setTableProps({
                        totalCount: 1,
                        pageIndex: 0,
                        pageSize: 30,
                    });
                })
            }
        }
    }
    const handleTableChange = (pagination, filters, sorter) => {
        setTableProps({
            ...tableProps,
            pageIndex: pagination.current,
            pageSize: pagination.pageSize,
        });
        // getListView();
    };
    const changeSearch = (e) => {
        const { name, value } = e.target;
        setSearch({ ...search, [name]: value });
    };
    const searchList = () => {
        getListView();
    }
    return (
        <PageHeader
            ghost={false}
            title="Teacher List View"
            extra={[
                <Button key="1" type="primary">Genrate Calender</Button>,
                <Button key="2" type="primary">Launch Schedule</Button>,
            ]}
        >
            <SearchFilter
                changeInput={changeSearch}
                searchList={searchList}
                defultType={search.searchType}
            />
            {!teacherList ? <Spin className="loading-table"/>: 
            <Table
                className="table-padding"
                columns={columns}
                dataSource={teacherList}
                onChange={handleTableChange}
                pagination={{
                    total: tableProps.totalCount,
                    pageSize: tableProps.pageSize,
                    showTotal: (total, range) => `${range[0]}-${range[1]} out of ${total}`,
                }}
                onRow={(record) => ({
                    onClick: () => (history.push(`/studentlist/teacher/${record.id}`))
                })}
            />}

        </PageHeader>
    )
}
export default TeacherList
