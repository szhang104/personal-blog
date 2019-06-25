import React from 'react';
import {graphql, Link} from 'gatsby';
import ReactHtmlParser from 'react-html-parser';
import styled from 'styled-components';
import {convertNodeToElement, processNodes} from 'react-html-parser';
import generatePropsFromAttributes
  from 'react-html-parser/lib/utils/generatePropsFromAttributes.js';

// to avoid using the dangerouslysetinnterhtml; use this to tranform a string of html tags to React elements

class Stack {
  constructor() {
    this.items = [];
    this.count = 0;
  }

  getLength() {
    return this.count;
  }

  push(item) {
    this.items.push(item);
    this.count = this.count + 1;
  }

  pop() {
    if (this.count > 0) {
      this.count = this.count - 1;
    }

    return this.items.pop();
  }

  peek() {
    return this.items.slice(-1)[0];
  }
}

const generate_li_key = (node, index) => {
  let prehash_str, cur_node;
  prehash_str = '';
  // perform a Depth First Search over all the children of a <li> tag, concatenaing their non-empty string data
  // as the string to perform quick hash on
  let to_visit = new Stack();
  let visited = new Set();
  to_visit.push(node);
  while (to_visit.getLength()) {
    cur_node = to_visit.pop();
    if (cur_node.data && cur_node.data !== '\n') {
      prehash_str += cur_node.data; // in case two li has the same text child
    }
    if (cur_node.children) {
      cur_node.children.forEach(child => {
            if (!visited.has(child)) {
              to_visit.push(child);
            }
          },
      );
    }
    visited.add(node);
  }

  // by this point the prehash_str should be a string, possibly of zero length
  // apply the method to get a quick number
  prehash_str += index.toString();
  let hash = 0, i, chr;
  if (prehash_str.length === 0) {
    return hash;
  }
  for (i = 0; i < prehash_str.length; i++) {
    chr = prehash_str.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

// used by reacthtmlparser for custom node translation; tranform should return a valid React component or null
const transform = (node, index) => {
  // if (node.type === 'tag' && node.name === 'span' && node.attribs !== undefined && node.attribs.class === 'inline-math') {
  //   return React.createElement(TeX, {}, node.children[0].data);
  // }
  // if (node.type === 'tag' && node.name === 'div' && node.attribs !== undefined && node.attribs.class === 'block-math') {
  //   return React.createElement(TeX, {block: true }, node.children[0].data);
  // }
  if (node.type === 'tag' && node.name === 'li') {
    node.attribs['react_key'] = generate_li_key(node, index);
    return convertNodeToElement(node, index, transform);
  }
  if (node.type === 'tag' && node.name === 'table') {
    // generate props
    let props = generatePropsFromAttributes(node.attribs, index);

    let children = processNodes(node.children, transform);
    const table_body_elements = <tbody>{children}</tbody>;
    return React.createElement('table', props, table_body_elements);
  }
};

class AsciidocDisplay extends React.Component {
  render() {
    return (
        <>
          {ReactHtmlParser(
              this.props.inner,
              {transform: transform},
          )}
        </>
    );
  }
}

export default AsciidocDisplay;




