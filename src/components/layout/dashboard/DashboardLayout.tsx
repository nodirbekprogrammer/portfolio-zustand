import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  DashboardOutlined,
  BookOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ReadOutlined,
  StarOutlined,
  CheckSquareOutlined,
  // LogoutOutlined,
} from "@ant-design/icons";
import {
  Layout,
  Menu,
  Button,
  theme,
  // Dropdown,
  // Badge,
  // Avatar,
  // Modal,
} from "antd";

import "./dashboardLayout.scss";
// import { useAuth } from "../../../states/auth";

const { Header, Sider, Content } = Layout;

const DashboardLayout = () => {
  // const { logOut } = useAuth();
  // const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // const handleLogout = () => {
  //   Modal.confirm({
  //     title: "Do you want to exit",
  //     onOk: () => {
  //       logOut(navigate);
  //     },
  //   });
  // };

  const location = useLocation();

  // const items = [
  //   {
  //     key: "1",
  //     label: (
  //       <a
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         href="https://www.antgroup.com"
  //       >
  //         {"Your Name"}
  //       </a>
  //     ),
  //   },
  //   {
  //     type: "divider",
  //   },
  //   {
  //     key: "2",
  //     label: <p style={{ marginBottom: "0" }}>Unclient users</p>,
  //   },
  //   {
  //     key: "3",
  //     label: <Link to="/account">Account</Link>,
  //   },
  //   {
  //     type: "divider",
  //   },
  //   {
  //     key: "4",
  //     icon: <LogoutOutlined />,
  //     label: (
  //       <Button
  //         danger
  //         type="primary"
  //         onClick={() =>
  //           Modal.confirm({
  //             title: "Do you want to log out ?",
  //             onOk: () => handleLogout(),
  //           })
  //         }
  //       >
  //         Logout
  //       </Button>
  //     ),
  //   },
  // ];

  return (
    <Layout>
      <Sider
        className="admin-aside"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="admin-logo">{collapsed ? "NN" : "Nodirbek"}</div>
        <Menu
          theme="dark"
          // mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: "/dashboard",
              icon: <DashboardOutlined />,
              label: <Link to="/dashboard">Dashboard</Link>,
            },
            {
              key: "/education",
              icon: <ReadOutlined />,
              label: <Link to="/educations">Educations</Link>,
            },
            {
              key: "/portfolios",
              icon: <BookOutlined />,
              label: <Link to="/portfolios">Portfolios</Link>,
            },
            {
              key: "/skills",
              icon: <StarOutlined />,
              label: <Link to="/skills">Skills</Link>,
            },
            {
              key: "/experience",
              icon: <CheckSquareOutlined />,
              label: <Link to="/experience">Experience</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="admin-header"
          style={{ padding: 0, background: colorBgContainer }}
        >
          <div className="userName">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </div>
          <div className="user">
            <h2>{"Your Name"}</h2>
            {/* <Dropdown
              // menu={items}
              placement="bottomRight"
              arrow={{ pointAtCenter: true }}
              trigger={["click"]}
            >
              <Badge count={"50"}>
                <Avatar
                  shape="square"
                  src={
                    "https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                  }
                />
              </Badge>
            </Dropdown> */}
          </div>
        </Header>
        <Content
          className="admin-main"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
