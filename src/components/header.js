
import React from "react";
import styled from 'styled-components';
import { Link } from "gatsby";


const Contained = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-variant: small-caps;
  border-bottom: 1px solid rgb(76, 86, 106);
  padding-left: 0.6em;
  padding-right: 0.6em;
  padding-bottom: 0.2em;
  font-size: 20px;
`;

class Header extends React.Component {
  constructor(props) {
    super(props);
    let {title, description} = props.siteMetaData;
    this.title = title;
    this.description = description ? description : null;
  }

  render () {
    let description, title;
    if (this.description){
      description = <div id="description" dangerouslySetInnerHTML={{__html: this.description}} />;
    }
    if (this.title){
      title = <div dangerouslySetInnerHTML={{__html: this.title}} />;
    }
    return (
        <Contained id='Header'>
          <Link id="main_title" to="/">
            {title}
          </Link>
          {description}
        </Contained>
    )
  }
}

export default Header;
