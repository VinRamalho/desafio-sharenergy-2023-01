import React, { useState } from "react";
import { Col, Row, Image, InputNumber } from "antd";
import MenuHeader from "../../components/MenuHeader";
import "./StatusCat.css";

const StatusCat = () => {
  const [inputNumber, setInputNumber] = useState(202);

  const onChange = (value) => {
    setInputNumber(value);
  };
  return (
    <>
      <Row>
        <Col push={1}>
          <MenuHeader />
        </Col>
        <Col push={3}>
          <div className="container">
            <h1 style={{ color: "white" }}>Selecione seu status HTTPS</h1>
            <InputNumber
              className="input-number"
              defaultValue={202}
              onChange={onChange}
            />
            <Image
              className="cat-image"
              src={`https://http.cat/${inputNumber}`}
              placeholder={
                <Image
                  preview={false}
                  src={`https://http.cat/${inputNumber}`}
                />
              }
            />
          </div>
        </Col>
      </Row>
    </>
  );
};

export default StatusCat;
