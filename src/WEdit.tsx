import React from "react";
import {
  CheckCircleOutlined,
  CheckCircleTwoTone,
  StarTwoTone,
  StarOutlined
} from "@ant-design/icons";
import { Typography, Dropdown, Space, Button } from "antd";

const items = [
  {
    key: "0",
    label: "不认识"
  },
  {
    key: "1",
    label: "模糊"
  },
  {
    key: "2",
    label: "认识"
  }
];

const WEdit = (props) => {
  //console.log("----WListItem Load----");
  const { tag, fav } = props.item;
  const item = props.item;
  const onTagChanged = ({ key }) => {
    return (
      props.onChange &&
      props.onChange({ word: props.item.word, tag: key, fav: fav })
    );
  };
  const onFavChanged = () => {
    const newFav = fav === "0" ? "1" : "0";
    return (
      props.onChange &&
      props.onChange({ word: props.item.word, tag: tag, fav: newFav })
    );
  };

  return (
    <Space size={5}>
      <Dropdown
        menu={{
          items,
          onClick: onTagChanged,
          selectable: true,
          defaultSelectedKeys: [String(item.tag)]
        }}
      >
        <Typography.Text>
          {item.tag === "0" && (
            <Button size="small" icon={<CheckCircleOutlined />} />
          )}
          {item.tag === "1" && (
            <Button
              size="small"
              icon={<CheckCircleTwoTone twoToneColor="#eb2f96" />}
            />
          )}
          {item.tag === "2" && (
            <Button
              size="small"
              icon={<CheckCircleTwoTone twoToneColor="#52c41a" />}
            />
          )}
        </Typography.Text>
      </Dropdown>
      <Typography.Text onClick={(e) => e.preventDefault()}>
        <span onClick={onFavChanged}>
          {item.fav === "0" && <Button size="small" icon={<StarOutlined />} />}
          {item.fav === "1" && (
            <Button
              size="small"
              icon={<StarTwoTone twoToneColor="#52c41a" />}
            />
          )}
        </span>
      </Typography.Text>
    </Space>
  );
};

export default WEdit;
