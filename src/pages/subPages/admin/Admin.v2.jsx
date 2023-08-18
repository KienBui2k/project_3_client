import React, { useState } from "react";
import "./admin.v2.scss";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    SketchOutlined,
    partmentOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { ApartmentOutlined } from "@ant-design/icons";
import { Layout, Menu, Button, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const Admin2 = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const navigate = useNavigate();
    return (
        <div className="admin_page">
            <Layout className="admin_container">
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["0"]}
                        items={[
                            {
                                icon: SketchOutlined,
                                title: "Home",
                                url: "/",
                            },
                            {
                                icon: SketchOutlined,
                                title: "List Product",
                                url: "/admin.v2/",
                            },
                            {
                                icon: SketchOutlined,
                                title: "Add Product",
                                url: "/admin.v2/addProduct",
                            },
                            {
                                icon: SketchOutlined,
                                title: "Receipts",
                                url: "/admin.v2/receipts",
                            },
                            {
                                icon: TeamOutlined,
                                title: "users",
                                url: "/admin.v2/users",
                            },
                        ].map((item, index) => ({
                            key: String(index + 1),
                            icon: React.createElement(item.icon),
                            label: `${item.title}`,
                            onClick: () => {
                                navigate(`${item.url}`);
                            },
                        }))}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: 0,
                            background: colorBgContainer,
                        }}
                    >
                        <Button
                            type="text"
                            icon={
                                collapsed ? (
                                    <MenuUnfoldOutlined />
                                ) : (
                                    <MenuFoldOutlined />
                                )
                            }
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: "16px",
                                width: 64,
                                height: 64,
                            }}
                        />
                    </Header>
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                        }}
                    >
                        <Outlet></Outlet>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};
export default Admin2;
