import $ from "jquery";

const visitNode = (node: any, accpet: Function) => {
  if (!node.hasChildNodes()) {
    if (accpet(node)) {
      return [node];
    } else {
      return [];
    }
  }

  let acceptedNodes = [];
  for (let cnode of node.childNodes) {
    acceptedNodes = acceptedNodes.concat(visitNode(cnode, accpet));
  }
  return acceptedNodes;
};

export const getAllTextNodes = () => {
  const seedTags = "p,h1,h2,h3,h4,h5";
  let nodes = [];
  $(seedTags).each((_, node) => {
    //console.log(node);
    nodes = nodes.concat(
      visitNode(node, (node: any) => node.nodeName === "#text")
    );
  });
  return nodes;
};

export const segment = (text: string, onlyEnWord = false) => {
  // @ts-ignore
  const segmenter = new Intl.Segmenter("en", { granularity: "word" });
  // @ts-ignore
  const tokens = Array.from(segmenter.segment(text)).map((o) => o.segment);
  if (!onlyEnWord) {
    return tokens;
  }

  //只保留单词
  const re = /^[A-Za-z]+$/;
  const enWords: string[] = [];
  for (let token of tokens) {
    if (re.test(token)) {
      enWords.push(token);
    }
  }
  return enWords;
};

export const extractWords = () => {
  const ewords = new Set();
  for (let arr of getAllTextNodes().map((node) =>
    segment(node.nodeValue, true)
  )) {
    arr.forEach((w) => ewords.add(w.toLowerCase()));
  }
  //console.log(enWordsSet);
  return Array.from(ewords);
};
