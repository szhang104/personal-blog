import React from "react";
import styled from 'styled-components';
import { Link } from "gatsby";

const asciidoctor = require(`asciidoctor`)();


class Header_ extends React.Component {
  constructor(props) {
    super(props);
    let {title, description} = props.siteMetaData;
    description = asciidoctor.convert(description, {});
    title = asciidoctor.convert(title, {});
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
        <div id='header' className={this.props.className}>
          <Link id="main_title" to="/">
            {title}
          </Link>
          {description}
        </div>
    )
  }
}

const Header = styled(Header_)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-variant: small-caps;
  border-bottom: 1px solid rgb(76, 86, 106);
  padding-left: 0.6em;
  padding-right: 0.6em;
  padding-bottom: 0.2em;
  font-size: 1.3rem;
  width: ${props => props.theme.mainWidth};
`;

export default Header;
