import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView, lineNumbers, highlightActiveLineGutter } from '@codemirror/view';
import { oneDark } from '@codemirror/theme-one-dark';
// import { HighlightStyle, tags } from '@codemirror/highlight';
// import { syntaxHighlighting } from '@codemirror/language';

import { StreamLanguage } from '@codemirror/language';
import type { StreamParser } from '@codemirror/stream-parser';

import { foldGutter, foldKeymap } from '@codemirror/language';
import { keymap } from '@codemirror/view';

import { createTheme } from '@uiw/codemirror-themes';
import { tags as t } from '@lezer/highlight';

// Define your simple language
// --- Custom Stream Parser ---
const myParser: StreamParser<{}> = {
  startState: () => ({}),
  token: (stream) => {
    // Comments
    if (stream.match(/\/\/.*/)) return "comment";

    // Keywords starting with @
    if (stream.match(/@\w*/)) return "keyword";

    // Identifiers starting with ~
    if (stream.match(/\~[\~\+\-\*\/A-Za-z_]+/)) return "operator";

    // Strings
    if (stream.match(/"([^"]*)"/)) return "string";

    // Numbers (integer or float)
    if (stream.match(/\b\d+(\.\d+)?\b/)) return "number";

    // Brackets
    if (stream.match(/[()\[\]{}]/)) return "bracket";

    // Move forward if nothing matched
    stream.next();
    return null;
  },
  blankLine: () => {},
};

// const myTheme = createTheme({
//   theme: 'light',
//   settings: {
//     background: '#ffffff',
//     backgroundImage: '',
//     foreground: '#75baff',
//     caret: '#5d00ff',
//     selection: '#036dd626',
//     selectionMatch: '#036dd626',
//     lineHighlight: '#8a91991a',
//     gutterBackground: '#fff',
//     gutterForeground: '#8a919966',
//   },
//   styles: [
//     { tag: t.comment, color: '#787b8099' },
//     { tag: t.variableName, color: '#0080ff' },
//     { tag: [t.string, t.special(t.brace)], color: '#5c6166' },
//     { tag: t.number, color: '#5c6166' },
//     { tag: t.bool, color: '#5c6166' },
//     { tag: t.null, color: '#5c6166' },
//     { tag: t.keyword, color: '#5c6166' },
//     { tag: t.operator, color: '#5c6166' },
//     { tag: t.className, color: '#5c6166' },
//     { tag: t.definition(t.typeName), color: '#5c6166' },
//     { tag: t.typeName, color: '#5c6166' },
//     { tag: t.angleBracket, color: '#5c6166' },
//     { tag: t.tagName, color: '#5c6166' },
//     { tag: t.attributeName, color: '#5c6166' },
//   ],
// });

// import { createTheme, tags as t } from "@uiw/codemirror-themes";
// import { StreamParser } from "@codemirror/stream-parser";
// import { StreamLanguage } from "@codemirror/language";

// // --- Custom Stream Parser ---
// export const myParser: StreamParser<{}> = {
//   startState: () => ({}),
//   token: (stream) => {
//     if (stream.match(/\/\/.*/)) return "comment";        // comments
//     if (stream.match(/@\w+/)) return "keyword";         // keywords starting with @
//     if (stream.match(/~\w+/)) return "variableName";    // identifiers starting with ~
//     if (stream.match(/"([^"]*)"/)) return "string";     // strings
//     if (stream.match(/\b\d+(\.\d+)?\b/)) return "number"; // numbers/floats
//     if (stream.match(/[()\[\]{}]/)) return "bracket";   // brackets
//     stream.next();
//     return null;
//   },
//   blankLine: () => {},
// };

// export const myLanguage = StreamLanguage.define(myParser);

// --- Dark Theme with createTheme ---
export const myTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#1e1e1e",
    foreground: "#d4d4d4",
    caret: "#ffcc00",
    selection: "#55555566",
    selectionMatch: "#55555566",
    lineHighlight: "#333333",
    gutterBackground: "#2b2b2b",
    gutterForeground: "#888888",
  },
  styles: [
    { tag: t.comment, color: "#5c6370", fontStyle: "italic" },  // comments
    { tag: t.keyword, color: "#ffa0ff", fontWeight: "bold" },   // @keywords
    { tag: t.variableName, color: "#00dfff" },                  // ~identifiers
    { tag: [t.string, t.special(t.brace)], color: "#98c379" },  // strings & special braces
    { tag: t.number, color: "#d19a66" },                        // numbers/floats
    { tag: t.bracket, color: "#a0f000", fontWeight: "bold" },   // brackets
    { tag: t.bool, color: "#d19a66" },
    { tag: t.null, color: "#d19a66" },
    { tag: t.operator, color: "#a4a4f4" },
    { tag: t.className, color: "#d4d4d4" },
    { tag: t.definition(t.typeName), color: "#d4d4d4" },
    { tag: t.typeName, color: "#d4d4d4" },
    { tag: t.angleBracket, color: "#c678dd" },
    { tag: t.tagName, color: "#d4d4d4" },
    { tag: t.attributeName, color: "#d4d4d4" },
  ],
});


// --- Create language ---
const myLanguage = StreamLanguage.define(myParser);

// --- Folding helper for { } and [ ] only ---
// myLanguage.languageData = {
//   ...myLanguage.languageData,
//   fold: (state, startLine, endLine) => {
//     const line = state.doc.lineAt(startLine.from);
//     const text = line.text;
//     if (text.includes("{") || text.includes("[")) {
//       return { from: line.from, to: line.to }; // simple line-level folding
//     }
//     return null;
//   },
// };

import { foldNodeProp, foldInside, foldService } from "@codemirror/language";

// --- Folding only {} and [] ---
function bracketFold(state, pos: number) {
  const doc = state.doc;
  const char = doc.sliceString(pos, pos + 1);

  if (char !== "{" && char !== "[") return null;

  let stack = 1;
  let i = pos + 1;

  while (i < doc.length) {
    const c = doc.sliceString(i, i + 1);
    if (c === char) stack++;
    if ((char === "{" && c === "}") || (char === "[" && c === "]")) stack--;
    if (stack === 0) return { from: pos, to: i + 1 };
    i++;
  }
  return null;
}

// Attach fold service
myLanguage.languageData = {
  ...myLanguage.languageData,
  fold: foldService.of(bracketFold),
};

// --- Custom theme ---
const myEditorTheme = EditorView.theme({
"&": {
    color: "white",
    backgroundColor: "#1e1e1e",
    fontFamily: "monospace",
    fontSize: "14px",
  },
  ".cm-content": {
    caretColor: "#ccc",
  },
  ".cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: "#55f",  // visible selection
    borderRadius: "2px",      // optional rounded shape
  },
  // ".cm-gutters": {
  //   backgroundColor: "#111",
  //   color: "#888",
  //   border: "none",
  // },
  ".cm-activeLine": {
    backgroundColor: "#333",
  },  
});

// --- Custom syntax highlighting ---
// const myHighlightStyle = HighlightStyle.define([
//   { tag: tags.keyword, color: "#d73a49", fontWeight: "bold" },
//   { tag: tags.string, color: "#032f62" },
//   { tag: tags.comment, color: "#6a737d", fontStyle: "italic" },
//   { tag: tags.variableName, color: "#9cdcfe" },
//   { tag: tags.number, color: "#b5cea8" },
//   { tag: tags.operator, color: "#d4d4d4" },
// ]);

interface CodeEditorProps {
  value?: string;
  onChange?: (value: string) => void;
  height?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value = "",
  onChange,
  height = "100%",
}) => {
  // const [code, setCode] = useState(value);

  const onChange_ = React.useCallback((val, viewUpdate) => {
    onChange(val);
  }, []);

  return (
    // <div style={{ height: "50%" }}>
    <div
      style={{
        height,
        border: "1px solid #555",
        backgroundColor: "#1e1e1e", // dark background
        fontFamily: "monospace",
        fontSize: "14px",
        scrollbarWidth: "thin", // for Firefox
        scrollbarColor: "#888 #1e1e1e", // thumb / track for Firefox

      }}

    >
    <CodeMirror
      style={{
          height: "100%",
          // color: "white", // text color
          // caretColor: "#ccc",
          overflow: "auto",
          // backgroundColor: "#1e1e1e",
        }}

theme = {myTheme}
      value={value}
      height={height}
      extensions={[
        lineNumbers(),
        highlightActiveLineGutter(),
        // javascript(),
        myLanguage,
        
        // oneDark,
        myEditorTheme,
        foldGutter(),
        keymap.of(foldKeymap),
        // syntaxHighlighting(myHighlightStyle),
        // myEditorTheme,
      ]}
      onChange={onChange_}
    />
   </div>
  );
};

export default CodeEditor;

// import { useEffect, useRef } from "react";
// import { EditorState } from "@codemirror/state";
// import { EditorView, lineNumbers, highlightActiveLineGutter, keymap } from "@codemirror/view";
// import { javascript } from "@codemirror/lang-javascript";
// import { HighlightStyle, tags } from "@codemirror/highlight";
// import { syntaxHighlighting } from "@codemirror/language";

// // --- Custom theme ---
// const myEditorTheme = EditorView.theme({
//   "&": { color: "white", backgroundColor: "#1e1e1e", fontFamily: "monospace", fontSize: "14px" },
//   ".cm-content": { caretColor: "#ccc" },
//   ".cm-gutters": { backgroundColor: "#777", color: "#111", border: "none" },
//   ".cm-activeLine": { backgroundColor: "#333" }
// });

// // --- Custom syntax highlighting ---
// const myHighlightStyle = HighlightStyle.define([
//   { tag: tags.keyword, color: "#d73a49", fontWeight: "bold" },
//   { tag: tags.string, color: "#032f62" },
//   { tag: tags.comment, color: "#6a737d", fontStyle: "italic" },
//   { tag: tags.variableName, color: "#9cdcfe" },
//   { tag: tags.number, color: "#b5cea8" },
//   { tag: tags.operator, color: "#d4d4d4" },
// ]);

// interface CodeEditorProps {
//   value?: string;
//   onChange?: (value: string) => void;
//   height?: string;
// }

// export default function CodeEditor({ value = "", onChange, height = "100%" }: CodeEditorProps) {
//   const editorRef = useRef<HTMLDivElement>(null);
//   const viewRef = useRef<EditorView | null>(null);

//   useEffect(() => {
//     if (!editorRef.current) return;

//     const state = EditorState.create({
//       doc: value,
//       extensions: [
//         myEditorTheme,
//         lineNumbers(),
//         highlightActiveLineGutter(),
//         javascript(),
//         syntaxHighlighting(myHighlightStyle),
//         keymap.of([]),
//         EditorView.updateListener.of((update) => {
//           if (update.docChanged && onChange) {
//             onChange(update.state.doc.toString());
//           }
//         }),
//       ],
//     });

//     viewRef.current = new EditorView({ state, parent: editorRef.current });

//     return () => viewRef.current?.destroy();
//   }, []);

//   useEffect(() => {
//     const view = viewRef.current;
//     if (!view) return;
//     const currentValue = view.state.doc.toString();
//     if (value !== currentValue) {
//       view.dispatch({
//         changes: { from: 0, to: currentValue.length, insert: value },
//       });
//     }
//   }, [value]);

//   return <div ref={editorRef} style={{ border: "1px solid #ccc", height, overflow: "auto" }} />;
// }


// import React, { useEffect, useRef } from "react";
// // import { EditorState } from "@codemirror/state";
// // import { lineNumbers, highlightActiveLineGutter, EditorView, keymap } from "@codemirror/view";
// // import { HighlightStyle, tags , defaultHighlightStyle} from "@codemirror/highlight";
// // import { syntaxHighlighting, StreamLanguage } from "@codemirror/language";

// // import { basicSetup } from "codemirror"
// import { EditorState} from "@codemirror/state"
// import {
//   EditorView, keymap, highlightSpecialChars, drawSelection,
//   highlightActiveLine, dropCursor, rectangularSelection,
//   crosshairCursor, lineNumbers, highlightActiveLineGutter
// } from "@codemirror/view"
// // import {
// //   defaultHighlightStyle, syntaxHighlighting, indentOnInput,
// //   bracketMatching, foldGutter, foldKeymap
// // } from "@codemirror/language"

// import { foldGutter, indentOnInput, indentUnit, bracketMatching, foldKeymap, syntaxHighlighting, defaultHighlightStyle } from '@codemirror/language';


// // import {
// //   defaultKeymap, history, historyKeymap
// // } from "@codemirror/commands"
// // import {
// //   searchKeymap, highlightSelectionMatches
// // } from "@codemirror/search"
// // import {
// //   autocompletion, completionKeymap, closeBrackets,
// //   closeBracketsKeymap
// // } from "@codemirror/autocomplete"
// // import {lintKeymap} from "@codemirror/lint"

// import type { StreamParser } from "@codemirror/stream-parser";

// import { javascript } from "@codemirror/lang-javascript";

// // --- Custom lightweight syntax using StreamLanguage ---
// // const myLanguage = StreamLanguage.define({
// //   startState: () => ({}), // required
// //   token: (stream) => {
// //     if (stream.match(/\/\/.*/)) return tags.comment;
// //     if (stream.match(/\b(let|mut|fn|type|if|else|while)\b/)) return tags.keyword;
// //     if (stream.match(/"([^"]*)"/)) return tags.string;
// //     stream.next();
// //     return null;
// //   },
// // blankLine: () => {},
// // });

// // const myParser: StreamParser<{}> = {
// //   startState: () => ({}),
// //   token: (stream) => {
// //     if (stream.match(/\/\/.*/)) return "comment";
// //     if (stream.match(/\b(let|mut|fn|type|if|else|while)\b/)) return "keyword";
// //     if (stream.match(/"([^"]*)"/)) return "string";
// //     stream.next();
// //     return null;
// //   },
// //   blankLine: () => {},
// // };

// // const myLanguage = StreamLanguage.define(myParser);

// // --- Custom colors using constructor (not .define) ---
// // const myHighlightStyle = HighlightStyle.define([
// //   { tag: tags.keyword, color: "#d73a49", fontWeight: "bold" },
// //   { tag: tags.string, color: "#032f62" },
// //   { tag: tags.comment, color: "#6a737d", fontStyle: "italic" },
// // ]);

// // const myHighlightStyle = HighlightStyle.define([
// //   { tag: tags.keyword, color: "#d73a49", fontWeight: "bold" },
// //   { tag: tags.string, color: "#032f62" },
// //   { tag: tags.comment, color: "#6a737d", fontStyle: "italic" },
// //   { tag: tags.variableName, color: "#9cdcfe" },
// //   { tag: tags.number, color: "#b5cea8" },
// //   { tag: tags.operator, color: "#d4d4d4" },
// // ]);

// const myEditorTheme = EditorView.theme({
//   "&": {
//     color: "white",      // base text color
//     backgroundColor: "#1e1e1e", // editor background
//     fontFamily: "monospace",
//     fontSize: "14px",
//   },
//   ".cm-content": {
//     caretColor: "#ccc",
//   },
//   ".cm-gutters": {
//     backgroundColor: "#777",
//     color: "#111",
//     border: "none",
//   },
//   ".cm-activeLine": {
//     backgroundColor: "#ccf",
//   },
//   // ".cm-keyword": { color: "#d73a49", fontWeight: "bold" },
//   // ".cm-string" :{ color: "#032f62" },
//   // ".cm-comment" :{ color: "#6a737d", fontStyle: "italic" }
// });

// interface CodeEditorProps {
//   value?: string;
//   onChange?: (value: string) => void;
//   height?: string;
// }

// export default function CodeEditor({
//   value = "",
//   onChange,
//   height = "100%",  
// }: CodeEditorProps) {
//   const editorRef = useRef<HTMLDivElement>(null);
//   const viewRef = useRef<EditorView | null>(null);

//   useEffect(() => {
//     if (!editorRef.current) return;

//     const state = EditorState.create({
//       doc: value,
//       extensions: [
//         myEditorTheme,
//         lineNumbers(),
//         highlightActiveLineGutter(),
//         // myLanguage,
//         // javascript(),      
//         javascript(),
//         syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
//         // syntaxHighlighting(defaultHighlightStyle), 
//         // defaultHighlightStyle, 
//         // syntaxHighlighting(myHighlightStyle),  
//         // myHighlightStyle,
//         highlightSpecialChars(),
//         bracketMatching(),
//         keymap.of([]),
//         EditorView.updateListener.of((update) => {
//           if (update.docChanged && onChange) {
//             onChange(update.state.doc.toString());
//           }
//         }),
//       ],
//     });

//     viewRef.current = new EditorView({
//       state,
//       parent: editorRef.current,
//     });

//     return () => {
//       viewRef.current?.destroy();
//       viewRef.current = null;
//     };
//   }, []);

//   // Update editor when `value` changes externally
//   useEffect(() => {
//     const view = viewRef.current;
//     if (!view) return;

//     const currentValue = view.state.doc.toString();
//     if (value !== currentValue) {
//       const transaction = view.state.update({
//         changes: { from: 0, to: currentValue.length, insert: value },
//       });
//       view.dispatch(transaction);
//     }
//   }, [value]);

//   return <div ref={editorRef} style={{ border: "1px solid #ccc", height , overflow:"auto"}} />;
// }
