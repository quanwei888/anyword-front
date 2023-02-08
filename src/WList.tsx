import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from "react";
import WListItem from "./WListItem";
import { doFilter, goGetWordList, doUpdateWord } from "./Dao";
import { Spin, List } from "antd";

const WList = forwardRef((props: any, ref) => {
  console.log("----WList Load----");
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [cond, setCond] = useState(props.cond);
  const mask = props.mask;

  const startFilterData = (cond) => {
    console.log("startFilterData");
    doFilter(cond).then((data) => {
      setCond(cond);
      setWords(data);
    });
  };
  useImperativeHandle(ref, () => ({
    filter: (cond) => {
      startFilterData(cond);
    }
  }));

  useEffect(() => {
    setLoading(true);
    goGetWordList(props.ws).then((data) => {
      setLoading(false);
      startFilterData(cond);
      props.onWordListLoaded && props.onWordListLoaded(data);
    });
  }, []);

  const handlerWordUpdate = (word) => {
    console.log("handlerWordUpdate", word);
    doUpdateWord(word).then(() => {});
    startFilterData(cond);
  };

  if (loading) {
    return <Spin />;
  }

  return (
    <List
      size="large"
      dataSource={words}
      renderItem={(item, key) => (
        <List.Item key={key} style={{ paddingLeft: 0, paddingRight: 0 }}>
          <WListItem item={item} mask={mask} onChange={handlerWordUpdate} />
        </List.Item>
      )}
    />
  );
});
export default WList;
