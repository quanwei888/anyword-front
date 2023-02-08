import React, { forwardRef, useState } from "react";
import { Col, Dropdown, Row, Space, Switch, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
const orderConds = [
  {
    key: "-1",
    label: "默认",
    id: 0
  },
  {
    key: "0",
    label: "时间↑",
    id: 1
  },
  {
    key: "1",
    label: "时间↓",
    id: 2
  },
  {
    key: "2",
    label: "Ab↑",
    id: 3
  },
  {
    key: "3",
    label: "Ab↓",
    id: 4
  }
];
const favConds = [
  {
    key: "-1",
    label: "全部",
    id: 0
  },
  {
    key: "0",
    label: "未收藏",
    id: 1
  },
  {
    key: "1",
    label: "收藏",
    id: 2
  }
];
const tagConds = [
  {
    key: "-1",
    label: "全部",
    id: 0
  },
  {
    key: "0",
    label: "未标记",
    id: 1
  },
  {
    key: "1",
    label: "模糊",
    id: 2
  },
  {
    key: "2",
    label: "认识",
    id: 3
  }
];

const WHeader = forwardRef((props: any, ref) => {
  const [cond, setCond] = useState(props.cond);
  const [mask, setMask] = useState(false);

  const onOrderUpdate = ({ key }) => {
    const newCond = Object.assign({}, cond);
    newCond.order = key;
    setCond(newCond);
    return props.onCondChange && props.onCondChange(newCond);
  };

  const onFavUpdate = ({ key }) => {
    const newCond = Object.assign({}, cond);
    newCond.fav = key;
    setCond(newCond);
    return props.onCondChange && props.onCondChange(newCond);
  };

  const onTagUpdate = ({ key }) => {
    const newCond = Object.assign({}, cond);
    newCond.tag = key;
    setCond(newCond);
    return props.onCondChange && props.onCondChange(newCond);
  };

  const onMaskUpdate = () => {
    const newMask = !mask;
    setMask(newMask);
    console.log(props);
    return props.onMaskChange && props.onMaskChange(newMask);
  };

  console.log(mask);
  const orderIdx = cond.order === "-1" ? 0 : Number(cond.order) + 1;
  const favIdx = Number(cond.fav) + 1;
  const tagIdx = cond.tag === "-1" ? 0 : Number(cond.tag) + 1;

  return (
    <Row>
      <Col span={20}>
        <Space size={18}>
          <Dropdown
            menu={{
              items: orderConds,
              onClick: onOrderUpdate,
              selectable: true,
              defaultSelectedKeys: [cond.order]
            }}
          >
            <Typography.Link>
              {orderConds[orderIdx].label}
              <DownOutlined />
            </Typography.Link>
          </Dropdown>
          <Dropdown
            menu={{
              items: favConds,
              onClick: onFavUpdate,
              selectable: true,
              defaultSelectedKeys: [cond.fav]
            }}
          >
            <Typography.Link>
              {favConds[favIdx].label}
              <DownOutlined />
            </Typography.Link>
          </Dropdown>
          <Dropdown
            menu={{
              items: tagConds,
              onClick: onTagUpdate,
              selectable: true,
              defaultSelectedKeys: [cond.tag]
            }}
          >
            <Typography.Link>
              {tagConds[tagIdx].label}
              <DownOutlined />
            </Typography.Link>
          </Dropdown>
        </Space>
      </Col>

      <Col span={4}>
        <Row>
          <Switch checked={mask} onChange={onMaskUpdate} />
        </Row>
      </Col>
    </Row>
  );
});

export default WHeader;
