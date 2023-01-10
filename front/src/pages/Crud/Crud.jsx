import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Card, Skeleton, Avatar, Button, Modal, Input } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  UserOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import MenuHeader from "../../components/MenuHeader";
import ApiCrud from "../../services/ApiCrud";
const { confirm } = Modal;

const Crud = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(null);
  const [values, setValues] = useState();
  const [data, setData] = useState([]);

  const handleSetValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Deseja mesmo excluir este usuario?",
      icon: <ExclamationCircleFilled />,
      content: "Você apagara esse usuario",
      okText: "Sim",
      okType: "danger",
      cancelText: "Não",
      onOk() {
        console.log("OK");
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const requestFetch = () => {
    axios
      .post("http://localhost:8000/api/create", values)
      .then((res) => {
        console.log(res);
        fetchApi();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchApi = async () => {
    setLoading(true);
    try {
      const response = await ApiCrud.get("/read");
      const userData = response.data;
      setData(userData.reverse());
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <>
      <Row>
        <Col push={1}>
          <MenuHeader />
        </Col>
        <Col push={3}>
          <div className="container">
            <Button
              type="primary"
              shape="round"
              icon={<UserAddOutlined />}
              size={"large"}
              style={{ width: "100%" }}
              onClick={() => {
                setOpen(true);
                setTitle("Adicionar usuario");
              }}
            />

            {data.map((user, i) => {
              // console.log(user);
              return (
                <>
                  <Card
                    className="card"
                    key={i}
                    style={{ width: 550, marginTop: 16 }}
                    actions={[
                      <EditOutlined
                        key="edit"
                        onClick={() => {
                          setOpen(true);
                          setTitle("Editar usuario");
                        }}
                      />,
                      <DeleteOutlined
                        key="delete"
                        onClick={showDeleteConfirm}
                      />,
                    ]}
                  >
                    <Skeleton
                      loading={loading}
                      avatar
                      active
                      paragraph={{
                        rows: 3,
                      }}
                    >
                      <div className="avatar-group">
                        <Avatar shape="circle" icon={<UserOutlined />} />
                        <p>
                          <b>{user.name}</b>
                        </p>
                      </div>

                      <p>Email: {user.email}</p>
                      <p>Telefone: {user.phone}</p>
                      <p>Endereço: {user.address}</p>
                      <p>CPF: {user.cpf}</p>
                    </Skeleton>
                  </Card>
                </>
              );
            })}

            <Modal
              title={title}
              centered
              open={open}
              onOk={() => {
                setOpen(false);
                requestFetch();
              }}
              onCancel={() => setOpen(false)}
              width={1000}
              okText="Enviar"
              style={{
                top: 20,
              }}
            >
              <Input
                name="name"
                size="large"
                placeholder="Nome"
                prefix={<UserOutlined />}
                onChange={handleSetValues}
              />
              <br />
              <br />
              <Input
                name="email"
                size="large"
                placeholder="Email"
                prefix={<UserOutlined />}
                onChange={handleSetValues}
              />
              <br />
              <br />
              <Input
                name="phone"
                size="large"
                placeholder="Telefone"
                prefix={<UserOutlined />}
                onChange={handleSetValues}
              />
              <br />
              <br />
              <Input
                name="address"
                size="large"
                placeholder="Endereço"
                prefix={<UserOutlined />}
                onChange={handleSetValues}
              />
              <br />
              <br />

              <Input
                size="large"
                placeholder="CPF"
                name="cpf"
                prefix={<UserOutlined />}
                onChange={handleSetValues}
              />
            </Modal>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default Crud;
