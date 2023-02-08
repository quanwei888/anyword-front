import React, { useEffect, useState } from "react";
import { Col, Popover, Row, Spin } from "antd";
import { useTextSelection } from "ahooks";
import { doGetWord, doUpdateWord } from "./Dao";
import WEdit from "./WEdit";
import $ from "jquery";

let inCard = false;
const WCard = () => {
  const {
    text = "",
    left = 0,
    top = 0,
    height = 0,
    width = 0
  } = useTextSelection(() => document.body);

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(undefined);

  useEffect(() => {
    if (text.trim() === "") {
      //setVisible(false);
      return;
    }
    setVisible(true);
    setLoading(true);
    doGetWord(text)
      .then((data) => {
        setLoading(false);
        setItem(data);
      })
      .catch(() => {
        setLoading(false);
        setItem(undefined);
      });
  }, [text]);

  const onChange = (word) => {
    doUpdateWord(word).then((data) => {
      console.log(33, data);
      setItem(data);
    });
  };

  console.log($("#_card_"));
  $("#_card_").mouseenter(() => {
    console.log(222);
    inCard = true;
  });
  $("#_card_").mousedown((e) => {
    console.log(555);
    inCard = true;
    e.stopPropagation();
  });
  $("#_card_").mouseleave(() => {
    console.log(333);
    inCard = false;
  });

  console.log(item);
  let content: any = "未找到";
  if (item) {
    content = (
      <div id="_card_">
        <Row>
          <Col span={16}>
            <b>{item.word}</b>
          </Col>
          <Col span={8}>
            <Row justify="end">
              <WEdit onChange={onChange} item={item} />
            </Row>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>{item.phonetic ? `[${item.phonetic}]` : ""}</Row>
            {item.translation.split("\n").map((n) => (
              <div>{n}</div>
            ))}
          </Col>
        </Row>
      </div>
    );
  }

  return (
    <Popover content={loading ? <Spin /> : content} open={visible}>
      <span
        style={{
          position: "fixed",
          top: `${top}px`,
          left: `${left}px`,
          height: `${height}px`,
          width: `${width}px`,
          pointerEvents: "none"
        }}
      />
    </Popover>
  );
};

export default WCard;
