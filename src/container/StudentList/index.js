import React, { useEffect, useState } from 'react'
import {useHistory} from 'react-router-dom'
import { Table, PageHeader, Button, Spin, Tooltip, Row, Col } from 'antd';
import { useDispatch } from 'react-redux'
import 'antd/dist/antd.css';
import '../../Assets/container/StudentList.css'
import { getStudentList, getStudentListByFirstName, getStudentListByLastName, } from '../../services/Student'
import SearchFilter from '../../components/StudentList/SearchFilter'
import {assignStudents} from '../../Action-Reducer/Student/action'

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
        title: 'Subject',
        dataIndex: 'subject',
        key: 'subject',
    }
    ,
    {
        title: 'Grades',
        render: (record) => {
            const indexGrade = () => {
                var min = record.teacher.grades[0];
                record.teacher.grades.map(iteam => {
                    const gradeindex = Math.sqrt(Math.pow(iteam - record.grade, 2))
                    if (gradeindex < min) {
                        min = gradeindex;
                    }
                    return null;
                })
                return min;
            }
            return (
                <span>{indexGrade() > 0 ? `${record.grade} (${indexGrade()})` : record.grade}</span>
            )
        },
        key: 'grade',
    }
    ,
    {
        title: 'Teacher Name',
        render: (record) => {
            var isSubjectContains = record.teacher.subjects.includes(record.subject)
            const text = <div className="grade-coloumn-tooltip">
                <h4>Details :</h4>
                <Row>Subjects : {record.teacher.subjects.join(', ')}</Row>
                <Row>Grades : {record.teacher.grades.join(', ')}</Row>
            </div>
            return (
                <Tooltip placement="topLeft" title={text} color={"white"}>
                    <div style={{ color: !isSubjectContains ? 'orange' : '' }}>
                        {record.teacher.firstName + " " + record.teacher.lastName + " (" + record.teacher.studentCount + ")"}
                    </div>
                </Tooltip>
            )
        },
        key: 'studentCount',
    },
    {
        title: 'Action',
        key: 'operation',
        fixed: 'right',
        render: (record) => <Button>Edit</Button>,
    },
];

function StudentList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [studentList, setStudentList] = useState();
    const [tableProps, setTableProps] = useState({
        totalCount: 0,
        pageIndex: 0,
        pageSize: 30,
    });
    const [search, setSearch] = useState({
        searchValue: "",
        searchType: "firstName",
    })
    const [selectedRow, setSelectedRow] = useState([]);
    const rowSelection = {
        selectedRow,
        onChange: (selectedrow, records) => {
            console.log('selectedRowKeys changed: ', records);
            var recordIdArray = [];
            records.map(record => {
                recordIdArray.push({id:record.id,firstName:record.firstName,lastName:record.lastName})
            })
            setSelectedRow(recordIdArray);
            console.log(selectedRow);
        }
    };
    useEffect(() => {
        getListView();
    }, [tableProps.pageIndex]);

    const getListView = () => {
        if (search.searchValue === "") {
            getStudentList(tableProps.pageIndex, tableProps.pageSize).then(data => {
                setStudentList(data._embedded.students)
                setTableProps({
                    ...tableProps,
                    totalCount: data.page.totalElements,
                });
            })
        }
        else {
            if (search.searchType === "firstName") {
                getStudentListByFirstName(search.searchValue).then(data => {
                    setStudentList(data._embedded.students)
                    setTableProps({
                        totalCount: 0,
                        pageIndex: 0,
                        pageSize: 30,
                    });
                })
            }
            else if (search.searchType === "lastName") {
                getStudentListByLastName(search.searchValue).then(data => {
                    setStudentList(data._embedded.students)
                    setTableProps({
                        totalCount: 0,
                        pageIndex: 0,
                        pageSize: 30,
                    });
                })
            }
        }
    }
    const changeSearch = (e) => {
        const { name, value } = e.target;
        setSearch({ ...search, [name]: value });
    };
    const searchList = () => {
        getListView();
    }
    const handleTableChange = (pagination, filters, sorter) => {
        setTableProps({
            ...tableProps,
            pageIndex: pagination.current,
            pageSize: pagination.pageSize,
        });
    };
    return (
        <PageHeader
            ghost={false}
            title="Student List View"
            extra={[
                <Button key="1" type="primary">Genrate Calender</Button>,
                <Button key="2" type="primary">Launch Schedule</Button>,
                <Button key='3' type="primary"
                    disabled={selectedRow.length > 0 ? false : true}
                    onClick={()=>{
                        dispatch(assignStudents(selectedRow))
                        history.push('/teacherlist');
                    }}
                >
                    ASSIGN STUDENT
                </Button>
            ]}
        >
            <SearchFilter
                changeInput={changeSearch}
                searchList={searchList}
                defultType={search.searchType}
            />
            {!studentList ? <Spin className="loading-table" /> :
                <Table
                    className="table-padding"
                    columns={columns}
                    dataSource={studentList}
                    onChange={handleTableChange}
                    pagination={{
                        total: tableProps.totalCount,
                        pageSize: tableProps.pageSize,
                        showTotal: (total, range) => `${range[0]}-${range[1]} out of ${total}`,
                    }}
                    rowSelection={rowSelection}
                    rowKey="id"
                />}

        </PageHeader>
    )
}
export default StudentList
