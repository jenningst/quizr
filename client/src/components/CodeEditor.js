import React from 'react';
import PropTypes from 'prop-types';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';
import styled from 'styled-components';

const CodeEditor = ({ code, setCode }) => {
  const codeMirrorOptions = {
    theme: 'dracula',
    lineNumbers: true,
    scrollbarStyle: null,
    lineWrapping: true,
    matchBrackets: true,
    autoCloseBrackets: true,
  };

  return (
    <EditorWrapper className="code-editor js-code">
      <CodeMirror
        value={code}
        options={{
          mode: 'javascript',
          ...codeMirrorOptions,
        }}
        onBeforeChange={(editor, data, code) => {
          setCode(code);
        }}
      />
    </EditorWrapper>
  );
}

CodeEditor.prototype = {
  code: PropTypes.string.isRequired,
};

export default CodeEditor;

const EditorWrapper = styled.div`
  width: 100%;
`;