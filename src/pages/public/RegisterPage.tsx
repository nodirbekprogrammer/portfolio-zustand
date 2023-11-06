import { Button, Form, Input, Flex } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../states/auth";
import { Register } from "../../types/auth";

import "./registerSucces.scss"

// type Register = {
//   firstname?: string;
//   lastname?: string;
//   username?: string;
//   password?: string;
// };



const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const submit = async (values: Register) => {
    register(values, navigate);
  };
  return (
    <Flex align="center" justify="center" style={{ height: "90vh" }}>
      <Form
        wrapperCol={{ span: 24 }}
        style={{ width: 400 }}
        initialValues={{ remember: true }}
        onFinish={submit}
        autoComplete="off"
        layout="vertical"
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h1>
        <Form.Item<Register>
          label="Firstname"
          name="firstName"
          rules={[{ required: true, message: "Please input your firstname!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<Register>
          label="Lastname"
          name="lastName"
          rules={[{ required: true, message: "Please input your lastname!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<Register>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<Register>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
            Register
          </Button>
        </Form.Item>
        <p>
          <Link to="/login">Back to login</Link>
        </p>
      </Form>
    </Flex>
  );
};

export default RegisterPage;
