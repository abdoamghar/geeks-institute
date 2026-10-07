import { useState } from 'react';
import ErrorBoundary from '../ErrorBoundary.js';

const originalText = '{"function":"I live to crash"}';

function ColumnRight() {
  const [text, setText] = useState(originalText);

  function replaceStringWithObject() {
    setText({ function: 'I live to crash' });
  }

  function invokeEventHandler() {
    throw new Error('This error was thrown by an event handler.');
  }

  return (
    <section className="column column-right">
      <h1>Right column</h1>
      <p>
        There are two types of errors we can trigger inside this component: A
        rendering error and a regular javascript error.
      </p>

      <hr />

      <p>
        Clicking this button will replace the <code>stringified</code> object,{' '}
        <code>{originalText}</code>, with the original object. This will result
        in a rendering error.
      </p>
      <ErrorBoundary>
        <p className="value">{text}</p>
      </ErrorBoundary>
      <button
        className="button button-red"
        onClick={replaceStringWithObject}
      >
        Replace string with object
      </button>

      <hr />

      <p>
        Clicking this button will invoke an event handler, inside of which an
        error is thrown.
      </p>
      <button className="button button-red" onClick={invokeEventHandler}>
        Invoke event handler
      </button>
    </section>
  );
}

export default ColumnRight;
