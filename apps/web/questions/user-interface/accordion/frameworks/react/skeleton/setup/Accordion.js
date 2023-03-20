export default function Accordion() {
  return (
    <div>
      <div>
        <div>
          HTML{' '}
          <span
            aria-hidden={true}
            className="accordion-icon"
          />
        </div>
        <div>
          The HyperText Markup Language or HTML is the
          standard markup language for documents designed to
          be displayed in a web browser.
        </div>
      </div>
      <div>
        <div>
          CSS{' '}
          <span
            aria-hidden={true}
            className="accordion-icon"
          />
        </div>
        <div>
          Cascading Style Sheets is a style sheet language
          used for describing the presentation of a document
          written in a markup language such as HTML or XML.
        </div>
      </div>
      <div>
        <div>
          JavaScript{' '}
          <span
            aria-hidden={true}
            className="accordion-icon"
          />
        </div>
        <div>
          JavaScript, often abbreviated as JS, is a
          programming language that is one of the core
          technologies of the World Wide Web, alongside HTML
          and CSS.
        </div>
      </div>
    </div>
  );
}
