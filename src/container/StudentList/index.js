import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Table, PageHeader, Button, Spin, Tooltip, Row, Col } from 'antd';
import { useDispatch } from 'react-redux'
import 'antd/dist/antd.css';
import '../../Assets/container/StudentList.css'
import { getStudentList, findStudentListByFirstNameAndLastName, } from '../../services/Student'
import SearchFilter from '../../components/StudentList/SearchFilter'
import { assignStudents } from '../../Action-Reducer/Student/action'
import LayoutOfApp from '../../components/Layout'
//icon

import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from "@ant-design/icons"


function StudentList() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [studentList, setStudentList] = useState();
    const [sortingName, setSortingName] = useState("");
    const [sortingType, setSortingType] = useState("");
    const [tableProps, setTableProps] = useState({
        totalCount: 0,
        pageIndex: 0,
        pageSize: 30,
    });
    const [search, setSearch] = useState({
        name: "",
        firstName: "",
        lastName: "",
    })
    const [selectedRow, setSelectedRow] = useState([]);
    const [loading, setLoading] = useState(false);
    const rowSelection = {
        selectedRow,
        onChange: (selectedrow, records) => {
            console.log('selectedRowKeys changed: ', records);
            var recordIdArray = [];
            records.map(record => {
                recordIdArray.push({ id: record.id, firstName: record.firstName, lastName: record.lastName })
            })
            setSelectedRow(recordIdArray);
            console.log(selectedRow);
        }
    };

    const columns = [
        {
            title: <div><span>Name </span>
                {sortingName === "firstName" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "firstName" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "firstName" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("firstName");
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType(""); setSortingName(""); }
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
            title: <div><span>Subject </span>
                {sortingName === "subject" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "subject" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "subject" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("subject");
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType(""); setSortingName(""); }
                    }
                };
            },
            dataIndex: 'subject',
            key: 'subject',
        }
        ,
        {
            title: <div><span>Grade </span>
                {sortingName === "grade" && sortingType === "asc" && <VerticalAlignBottomOutlined />}
                {sortingName === "grade" && sortingType === "desc" && <VerticalAlignTopOutlined />}
                {sortingName === "grade" && sortingType === "" && ""}
            </div>,
            onHeaderCell: (column) => {
                return {
                    onClick: () => {
                        setSortingName("grade");
                        if (sortingType == "") { setSortingType("asc") }
                        else if (sortingType == "asc") { setSortingType("desc") }
                        else if (sortingType == "desc") { setSortingType(""); setSortingName(""); }
                    }
                };
            },
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
            render: (record) => <Tooltip title={record.teacher.conferenceUrl ? record.teacher.conferenceUrl : "Link Not Found"}>
                <Button
                    style={{backgroundColor:"transparent",border:"0px",color:"#1890FF"}}
                    onClick={(e) => {
                        e.stopPropagation();
                        window.open(record.teacher.conferenceUrl)
                    }}
                    disabled={!record.teacher.conferenceUrl}><u>Google Meet</u></Button>
            </Tooltip>,
        },
    ];

    useEffect(() => {
        getListView();
    }, [tableProps.pageIndex]);
    useEffect(() => {
        getListView();
    }, [sortingType, sortingName]);
    const getListView = () => {
        if (search.firstName === "" && search.lastName === "") {
            getStudentList(tableProps.pageIndex, tableProps.pageSize, sortingName, sortingType).then(data => {
                setStudentList(data._embedded.students)
                setTableProps({
                    ...tableProps,
                    totalCount: data.page.totalElements,
                });
                setLoading(false);
            })
        }
        else {
            findStudentListByFirstNameAndLastName(search.firstName, search.lastName, sortingName, sortingType).then(data => {
                setStudentList(data._embedded.students)
                setTableProps({
                    totalCount: 1,
                    pageIndex: 0,
                    pageSize: 30,
                });
                setLoading(false);
            })
        }
    }
    const changeSearch = (e) => {
        const { name, value } = e.target;
        setSearch({ ...search, [name]: value });
        if (e.target.name === "name") {
            var nameData = value.split(" ");
            if (nameData.length > 1) {
                setSearch({ ...search, firstName: nameData[0], lastName: nameData[1] });
            }
            else {
                setSearch({ ...search, firstName: nameData[0], lastName: nameData[0] });
            }
        }
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
        setLoading(true);
        setStudentList([]);
    };
    return (
        <React.Fragment>
            
        {/* <LayoutOfApp> */}
        <PageHeader
            ghost={false}
            title="Student List View"
            extra={[
                <Button key="1" type="primary">Genrate Calender</Button>,
                <Button key="2" type="primary">Launch Schedule</Button>,
                <Button key='3' type="primary"
                    disabled={selectedRow.length > 0 ? false : true}
                    onClick={() => {
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
            />
            {!studentList ? <Spin className="loading-table" /> :
                <Table
                    className="table-padding"
                    columns={columns}
                    loading={loading}
                    dataSource={studentList}
                    onChange={handleTableChange}
                    pagination={{
                        total: tableProps.totalCount,
                        pageSize: tableProps.pageSize,
                        showTotal: (total, range) => `${range[0]}-${range[1]} out of ${total}`,
                    }}
                    rowSelection={rowSelection}
                    rowKey="id"
                    onRow={(record) => ({
                        onClick: () => (history.push(`/studentlist/studentDetail/${record.id}`))
                    })}
                />}

        </PageHeader>
        {/* </LayoutOfApp> */}
        </React.Fragment>
    )
}
export default StudentList
