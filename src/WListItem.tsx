import React from "react";
import { Row, Col, Typography } from "antd";
import { useEffect, useState } from "react";
import WEdit from "./WEdit";

const WListItem = (props) => {
  //console.log("----WListItem Load----");
  const { word, phonetic, translation } = props.item;
  const [mask, setMask] = useState(props.mask);

  const item = props.item;
  const onChange = (data) => {
    return props.onChange && props.onChange(data);
  };
  useEffect(() => {
    setMask(props.mask);
  }, [props.mask]);

  const maskStyle = mask
    ? { width: "100%", color: "gray", backgroundColor: "gray" }
    : {};
  return (
    <div style={{ width: "100%" }}>
      <Row>
        <Col span={20}>
          <Row>
            <Col span={8}>
              <Row>
                <b>{word}&nbsp;</b>
              </Row>
              {phonetic ? `[${phonetic}]` : ""}
              <Typography.Text></Typography.Text>
            </Col>
            <Col onClick={() => setMask(!mask)} span={15} style={maskStyle}>
              {mask ? "" : translation.split("\n").map((n) => <div>{n}</div>)}
            </Col>
          </Row>
        </Col>
        <Col span={4}>
          <Row justify={"end"}>
            <WEdit onChange={onChange} item={item} />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default WListItem;
