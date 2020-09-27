import React from 'react'
import 'antd/dist/antd.css';
import '../../Assets/Layout.css'
import { useHistory } from 'react-router-dom'
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
const { Sider, Content } = Layout;

function LayoutOfApp({ children }, props) {
  const history = useHistory();
  // var pathname = window.location.pathname;
  //const { path, params } = props.match;
  return (
    <Layout>
      <Sider className="sider">
        <h1>Student-Schedular</h1>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["/teacherlist"]}>
          <Menu.Item key="/teacherlist" icon={<VideoCameraOutlined />} onClick={() => { history.push('/teacherlist') }}>
            Teacher List
            </Menu.Item>
          <Menu.Item key="/studentlist" icon={<UserOutlined />} onClick={() => { history.push('/studentlist') }}>
            Student List
            </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="childLayout">
        <Content className="content">
          <div className="content-div">{children}</div>
        </Content>
      </Layout>
    </Layout>
  )
}

export default LayoutOfApp
