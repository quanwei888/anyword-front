let WORDS = [];
let WORDS_MAP = new Map();

export function doFilter(cond): Promise<any> {
  console.log("doFilter", cond);
  return new Promise((resolve, reject) => {
    let data = WORDS.filter((word) => {
      if (cond.fav !== "-1" && word.fav !== cond.fav) return false;
      if (cond.tag !== "-1" && word.tag !== cond.tag) return false;
      return true;
    });
    //order
    if (cond.order !== "-1") {
      console.log("sort", cond.order);
      data.sort((a, b) => {
        let result = false;
        const op1 = new Date(Date.parse(a.modtime));
        const op2 = new Date(Date.parse(b.modtime));
        //console.log(a, b);
        if (cond.order === "0") {
          result = op1 > op2;
        }
        if (cond.order === "1") {
          result = op1 < op2;
        }
        if (cond.order === "2") {
          result = a.word > b.word;
        }
        if (cond.order === "3") {
          result = a.word < b.word;
        }
        return result ? 1 : -1;
      });
    }

    resolve(data);
  });
}

export const doGetWord = (w) => {
  console.log("doGetWord", w);

  w = w.toLowerCase().trim();
  if (WORDS_MAP.get(w)) {
    return new Promise((resolve, reject) => {
      resolve(WORDS_MAP.get(w));
    });
  }
  const url = `https://120.48.45.139:5000/getWord?word=${w}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const goGetWordList = (ws) => {
  console.log("goGetWordList", ws);
  const data = { word: ws };

  const url = `https://120.48.45.139:5000/getWordList`;
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((res) => {
      WORDS = res.data;
      WORDS_MAP = new Map(WORDS.map((w) => [w.word, w]));
      console.log(WORDS_MAP);
      return res.data;
    })
    .catch((err) => console.log(err));
};

export const doUpdateWord = (data) => {
  console.log("updateWord", data);
  const url = `https://120.48.45.139:5000/updateWord`;

  const word = WORDS_MAP.get(data["word"]);
  Object.assign(word, data);

  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then((res) => res.json())
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
