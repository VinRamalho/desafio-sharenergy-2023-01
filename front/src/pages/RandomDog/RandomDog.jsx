import React, { useEffect, useState } from "react";
import ApiRandomDog from "../../services/ApiRandomDog";
import { Col, Row, Button, Image } from "antd";
import MenuHeader from "../../components/MenuHeader";
import "./RandomDog.css";

const StatusCat = () => {
  const [dogImage, setDogImage] = useState("");

  const fetchApi = async () => {
    try {
      const response = await ApiRandomDog.get();
      setDogImage(null);
      const dogData = response.data;
      console.log(dogData);
      setDogImage(dogData.url);
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
            <h1 style={{ color: "white" }}>Random dog</h1>
            <Button
              type="primary"
              style={{ marginTop: 50, marginBottom: 50 }}
              onClick={fetchApi}
            >
              Atualizar
            </Button>
            {dogImage.includes("mp4") ? (
              <video className="dog-image" src={dogImage} controls></video>
            ) : (
              <Image
                className="dog-image"
                src={dogImage}
                preview={{
                  src: dogImage,
                }}
              />
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default StatusCat;
