import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Contexs/auth";
import { Card, Skeleton, Input, Form, Checkbox, Button } from "antd";
import "./Login.css";

const Login = () => {
  //   const [values, setValues] = useState();
  const [loading, setLoading] = useState(true);
  const { loginPage } = useContext(AuthContext);

  const onFinish = (values) => {
    console.log("Success:", values.password);
    loginPage(values.username, values.password, values.remember);
  };
  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <>
      <div className="container" style={{ marginTop: 0 }}>
        <Card
          className="card-login"
          key={""}
          style={{ minWidth: "50%", marginTop: 30, marginBottom: 30 }}
          hoverable
        >
          <Skeleton
            loading={loading}
            active
            paragraph={{
              rows: 3,
            }}
          >
            <h1 className="title-h1">DESAFIO SHARENERGY</h1>
            <br />
            <br />
            <Form
              className="form"
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Form.Item
                label=""
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Por favor insira seu username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label=""
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Por favor insira sua senha!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Mantenha-me conectado</Checkbox>
              </Form.Item>

              <Form.Item>
                <Button
                  className="buttom-login"
                  type="primary"
                  htmlType="submit"
                >
                  Entrar
                </Button>
              </Form.Item>
            </Form>
          </Skeleton>
        </Card>
      </div>
    </>
  );
};

export default Login;
