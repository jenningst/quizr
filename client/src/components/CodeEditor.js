import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/edit/closebrackets';

const CodeEditor = () => {
  const [js, setJs] = useState("");
  const codeMirrorOptions = {
    theme: 'dracula',
    lineNumbers: true,
    scrollbarStyle: null,
    lineWrapping: true,
    matchBrackets: true,
    autoCloseBrackets: true,
  };

  return (
    <div className="code-editor js-code">
      <div className="editor-header">JavaScript</div>
      <CodeMirror
        value={js}
        options={{
          mode: 'javascript',
          ...codeMirrorOptions,
        }}
        onBeforeChange={(editor, data, js) => {
          // console.log(editor);
          // console.log(data);
          setJs(js);
        }}
      />
    </div>
  );
}

export default CodeEditor;