import React, { useState, useEffect } from 'react'
import { getStudentDetail } from '../../services/Student'
import { Row, Col, PageHeader, Button, Card, Divider } from 'antd';
function StudentDetail(props) {
    const { params } = props.match;
    const [studentDetail, setStudentDetail] = useState();
    useEffect(() => {
        getDetailView();
    }, []);
    const getDetailView = () => {
        getStudentDetail(params.id).then(data => {
            setStudentDetail(data)
        })
    }
    return (
        <div>
            <PageHeader
                ghost={false}
                title={studentDetail && `STUDENT DETAIL :`}
                extra={[
                    <Button key="1" type="primary">Genrate Calender</Button>,
                    <Button key="2" type="primary">Launch Schedule</Button>
                ]}
            >
                <Row gutter={24}>
                                    <Card hoverable={true} title={studentDetail && `Student Name : ${studentDetail.firstName} ${studentDetail.lastName}`} bordered={false} style={{ width: "50%" }}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <h4>Period</h4>
                        </Col>
                        <Col className="gutter-row" span={20}>
                            <h4 >{studentDetail && studentDetail.period}</h4>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <h4 >Subject</h4>
                        </Col>
                        <Col className="gutter-row" span={20}>
                            <h4 >{studentDetail && studentDetail.subject}</h4>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <h4>Grade</h4>
                        </Col>
                        <Col className="gutter-row" span={20}>
                            <h4 >{studentDetail && studentDetail.grade}</h4>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <h4 >Email</h4>
                        </Col>
                        <Col className="gutter-row" span={20}>
                            <h4 >{studentDetail && studentDetail.email}</h4>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <h4>Phone</h4>
                        </Col>
                        <Col className="gutter-row" span={20}>
                            <h4 >{studentDetail && studentDetail.phone}</h4>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <h4 >Comment</h4>
                        </Col>
                        <Col className="gutter-row" span={20}>
                            <h4 >{studentDetail && studentDetail.comment}</h4>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <h4 >resources</h4>
                        </Col>
                        <Col className="gutter-row" span={20}>
                            <h4 >{studentDetail && studentDetail.resources}</h4>
                        </Col>
                    </Row>
                </Card>
                </Row>

                <Card hoverable={true} title={studentDetail && `Teacher Name : ${studentDetail.teacher.firstName} ${studentDetail.teacher.lastName}`} bordered={false} style={{ width: "50%" }}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <h4>Subjects</h4>
                        </Col>
                        <Col className="gutter-row" span={20}>
                            <h4 >{studentDetail && studentDetail.teacher.subjects.join(', ')}</h4>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <h4 >Grades</h4>
                        </Col>
                        <Col className="gutter-row" span={20}>
                            <h4 >{studentDetail && studentDetail.teacher.grades.join(', ')}</h4>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <h4>ConferenceUrl</h4>
                        </Col>
                        <Col className="gutter-row" span={20}>
                            <h4 >{studentDetail && studentDetail.teacher.conferenceUrl}</h4>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <h4 >Email</h4>
                        </Col>
                        <Col className="gutter-row" span={20}>
                            <h4 >{studentDetail && studentDetail.teacher.email}</h4>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <h4>Phone</h4>
                        </Col>
                        <Col className="gutter-row" span={20}>
                            <h4 >{studentDetail && studentDetail.teacher.phone}</h4>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={4}>
                            <h4 >Comment</h4>
                        </Col>
                        <Col className="gutter-row" span={20}>
                            <h4 >{studentDetail && studentDetail.teacher.studentCount}</h4>
                        </Col>
                    </Row>
                </Card>
            </PageHeader>
        </div>
    )
}

export default StudentDetail
