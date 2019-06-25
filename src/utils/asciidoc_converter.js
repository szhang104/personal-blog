const myasciidoctor = require(`asciidoctor`)();

class ReactAsciidocConverter {
  constructor() {
    this.baseConverter = myasciidoctor.Html5Converter.$new();
  }

  convert(node, transform) {
    let content = '', text = '', res = '';
    switch (node.getNodeName()) {

        // case "section":
        //   content = node.getContent();
        //   res = `<section>${content}</section>`;
        //   break;

        // case "paragraph":
        //   res = `<p>${node.content}</p>`;
        //   break;

        // corresponds to display math
        // essentially a asciidoc block
        // generate a virtual DOM according to
        // https://github.com/MatejBransky/react-katex
      case 'stem':
      case 'latexmath':
        // content = node.getContent();
        // res = katex.renderToString(content, {
        //   throwOnError: false,
        //   displayMode: true,
        // });
        // defer to the react-katex
        // using <div>, <span> with class "math" is jsMath notation
        // need to use MathJax options
        res = `<div class='math'>${node.getContent()}</div>`;
        break;


        // asciidoctor treats inline math as inline_quoted node.
        // node.getContent() does not seem to work
        // search $convert_inline_quoted in asciidoctor.js
      case 'inline_quoted':
        if (node.type === 'latexmath' || node.type === 'stem') {
          // text = node.text;
          // res = katex.renderToString( text, {
          //   throwOnError: false,
          //   displayMode: false,
          // });
          res = `<span class='math'>${node.text}</span>`;
          break;
        }

        // default is the vanilla html5 converter
      default:
        res = this.baseConverter.convert(node, transform);
    }
    return res;
  }
}

myasciidoctor.ConverterFactory.register(new ReactAsciidocConverter(),
    ['html5']);

module.exports = myasciidoctor;