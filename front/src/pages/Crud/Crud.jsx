import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  Skeleton,
  Avatar,
  Button,
  Modal,
  Input,
  notification,
} from "antd";
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
  const [editId, setEditId] = useState([]);
  const [delId, setDelId] = useState();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [title, setTitle] = useState(null);
  const [values, setValues] = useState();
  const [data, setData] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const handleSetValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement, type, tittle, message) => {
    api[type]({
      message: `${tittle}`,
      description: `${message}`,
      placement,
    });
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
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          deleteUser();
          console.log("OK");
        });
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const createUser = () => {
    setConfirmLoading(true);
    ApiCrud.post("/create", values)
      .then((res) => {
        console.log(res);
        openNotification(
          "top",
          "success",
          "Cadastrar usuario",
          "Usuario cadastrado com sucesso!"
        );
        setTimeout(() => {
          setOpen(false);
          setConfirmLoading(false);
        }, 1000);
        fetchApi();
      })
      .catch((err) => {
        console.log(err);
        openNotification(
          "top",
          "error",
          "Cadastrar usuario",
          "Usuario não foi cadastrado!"
        );
      });
  };

  const fetchApi = async () => {
    setLoading(true);
    setConfirmLoading(true);
    try {
      const response = await ApiCrud.get("/read");
      const userData = response.data;
      setData(userData.reverse());
      setTimeout(() => {
        setConfirmLoading(false);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = () => {
    console.log(values);
    setConfirmLoading(true);
    ApiCrud.patch(`/read/${editId._id}`, values)
      .then((res) => {
        console.log(res);
        openNotification(
          "top",
          "success",
          "Editar usuario",
          "Usuario editado com sucesso!"
        );

        setTimeout(() => {
          setOpenEdit(false);
          setConfirmLoading(false);
        }, 1000);

        fetchApi();
      })
      .catch((err) => {
        console.log(err);
        openNotification(
          "top",
          "error",
          "Editar usuario",
          "Usuario não foi editado!"
        );
      });
  };

  const deleteUser = () => {
    setConfirmLoading(true);
    ApiCrud.delete(`/read/${delId}`)
      .then((res) => {
        console.log(delId);
        console.log(res);
        openNotification(
          "top",
          "success",
          "Excluir usuario",
          "Usuario apagado com sucesso!"
        );
        setTimeout(() => {
          setOpenEdit(false);
          setConfirmLoading(false);
        }, 1000);
        fetchApi();
      })
      .catch((err) => {
        console.log(err);
        openNotification(
          "top",
          "error",
          "Excluir usuario",
          "Usuario Não foi apagado!"
        );
      });
  };

  useEffect(() => {
    fetchApi();
  }, []);
  return (
    <>
      {contextHolder}
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
                setEditId("");
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
                          setEditId(user);
                          setOpenEdit(true);
                          setTitle("Editar usuario");
                        }}
                      />,
                      <DeleteOutlined
                        key="delete"
                        onClick={() => {
                          setDelId(user._id);
                          showDeleteConfirm();
                        }}
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
              open={openEdit}
              onOk={() => {
                editUser();
              }}
              confirmLoading={confirmLoading}
              onCancel={() => setOpenEdit(false)}
              width={1000}
              okText="Atualizar"
              style={{
                top: 0,
              }}
            >
              <Card
                className=""
                key={""}
                style={{ width: "100%", marginTop: 16, marginBottom: 30 }}
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
                      <b>{editId.name}</b>
                    </p>
                  </div>

                  <p>Email: {editId.email}</p>
                  <p>Telefone: {editId.phone}</p>
                  <p>Endereço: {editId.address}</p>
                  <p>CPF: {editId.cpf}</p>
                </Skeleton>
              </Card>
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

            <Modal
              title={title}
              open={open}
              onOk={() => {
                createUser();
              }}
              onCancel={() => setOpen(false)}
              width={1000}
              confirmLoading={confirmLoading}
              okText="Cadastrar"
              style={{
                top: 0,
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
