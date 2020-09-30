import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import 'antd/dist/antd.css';
import { useHistory } from 'react-router-dom'
import { Table, PageHeader, Button, Spin, Popconfirm, message } from 'antd';
import { getTeacherList, findTeacherListByFirstNameAndLastName } from '../../services/Teacher'
import { assignStudentlistToTeacher } from '../../services/Student'
import { assignStudents } from '../../Action-Reducer/Student/action'
import SearchFilter from '../../components/TeacherList/SearchFilter'
//import AssignStudent from '../../components/TeacherList/AssignStudent'
//icon

import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from "@ant-design/icons"
function TeacherList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const assignStudentList = useSelector((state) => {
        return state.Student.assignStudent;
    })
    const [teacherList, setTeacherList] = useState();
    const [sortingName, setSortingName] = useState("");
    const [sortingType, setSortingType] = useState("");
    const [tableProps, setTableProps] = useState({
        totalCount: 0,
        pageIndex: 0,
        pageSize: 30,
    });
    const [search, setSearch] = useState({
        name:"",
        firstName:"",
        lastName:"",
    })
    const Assigntitle = <div>
        <h3>Assign Student List</h3>
        {assignStudentList.map((student, index) => {
            return <div key={student.id}>
                <spann>{index + 1}. {student.firstName} {student.lastName}</spann>
            </div>
        })}
    </div>
    const columns = [
        {
            title: <div><span>Name </span>
                {sortingName === "firstName" && sortingType==="asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "firstName" && sortingType==="desc" && <VerticalAlignTopOutlined />}
                {sortingName === "firstName" && sortingType==="" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("firstName");
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType("");setSortingName(""); }
                    }
                };
            },
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
            // onHeaderCell: (column) => {
            //     return {
            //         onClick: () => {
            //             setSortingName("subject");
            //             if (sortingType == "") { setSortingType("asc") }
            //             else if (sortingType == "asc") { setSortingType("desc") }
            //             else if (sortingType == "desc") { setSortingType("") }
            //         }
            //     };
            // },
            render: (record) => (
                <div>
                    {
                        record.subjects.join(', ')
                    }
                </div>
            )
        }
        ,
        {
            title: 'Grades',
            key: 'grades',
            render: (record) => (
                <div>
                    {record.grades.join(', ')}
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
            render: (record) => {
                const confirm = (e) => {
                    let studentIdArray = [];
                    assignStudentList.map((student) => {
                        studentIdArray.push(student.id)
                    })
                    let studentIds = studentIdArray.join(',');
                    assignStudentlistToTeacher(record.id, studentIds)
                        .then(res => { console.log(res) })
                }
                return (
                    <div>
                        <Popconfirm
                            icon={false}
                            title={Assigntitle}
                            placement="left"
                            onConfirm={confirm}
                            onCancel={() => { dispatch(assignStudents([])) }}
                            okText="Assign"
                            cancelText="Cancel"
                            disabled={assignStudentList.length > 0 ? false : true}
                        >
                            <Button disabled={assignStudentList.length > 0 ? false : true}>Assign Students</Button>
                        </Popconfirm>
                    </div>
                )
            },
        },
    ];
    useEffect(() => {
        getListView();
    }, [tableProps.pageIndex]);
    useEffect(() => {
        getListView();
    }, [sortingType,sortingName]);
    const getListView = () => {
        console.log(sortingType);
        setTeacherList("");
        if (search.firstName === "" && search.lastName === "") {
            getTeacherList(tableProps.pageIndex, tableProps.pageSize, sortingName, sortingType).then(data => {
                setTeacherList(data._embedded.teachers)
                setTableProps({
                    ...tableProps,
                    totalCount: data.page.totalElements,
                });
            })
        }
        else {

            findTeacherListByFirstNameAndLastName(search.firstName,search.lastName).then(data => {
                setTeacherList(data._embedded.teachers)
                setTableProps({
                    totalCount: 1,
                    pageIndex: 0,
                    pageSize: 30,
                });
            })
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
        if(e.target.name==="name"){
            var nameData = value.split(" ");
            if(nameData.length>1){
                setSearch({ ...search, firstName: nameData[0],lastName: nameData[1] });
            }
            else{
                setSearch({ ...search, firstName: nameData[0],lastName: nameData[0] });
            }
        }
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
            />
            {!teacherList ? <Spin className="loading-table" /> :
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
