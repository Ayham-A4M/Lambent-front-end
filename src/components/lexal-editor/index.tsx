import {
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import Toolbar from "./toolbar";
import { $getRoot } from "lexical";
import type { EditorState } from "lexical"
import { HeadingNode } from "@lexical/rich-text";
import { LinkNode } from '@lexical/link';
import { AutoLinkNode } from "@lexical/link";
import { AutoLinkPlugin } from '@lexical/react/LexicalAutoLinkPlugin';
import type { LinkMatcherResult } from "node_modules/@lexical/link/LexicalAutoLinkExtension";
import ClickableLinkPlugin from "./clickableLinkPlugin";
import { MathNode } from "./mathNode";
interface LexicalEditorProps {
  onChange?: (text: string) => void;
}
export const exampleTheme = {
  paragraph: 'text-blue-500', //like css class 
  quote: 'editor-quote',
  heading: {
    h1: 'font-extrabold text-2xl',
    h2: 'font-bold text-xl',
    h3: 'font-medium text-md',
    h4: 'font-medium text-md',
    h5: 'font-light text-light',
    h6: 'font-light text-extralight',
  },
  list: {
    nested: {
      listitem: 'editor-nested-listitem',
    },
    ol: 'editor-list-ol',
    ul: 'editor-list-ul',
    listitem: 'editor-listItem',
    listitemChecked: 'editor-listItemChecked',
    listitemUnchecked: 'editor-listItemUnchecked',
  },
  hashtag: 'editor-hashtag',
  image: 'editor-image',
  link: 'text-blue-300 underline cursor-pointer hover:text-blue-700',
  text: {
    bold: 'editor-textBold',
    code: 'editor-textCode',
    italic: 'italic',
    strikethrough: 'editor-textStrikethrough',
    subscript: 'editor-textSubscript',
    superscript: 'editor-textSuperscript',
    underline: 'underline',
    underlineStrikethrough: 'editor-textUnderlineStrikethrough',
  },
  code: 'editor-code',
  codeHighlight: {
    atrule: 'editor-tokenAttr',
    attr: 'editor-tokenAttr',
    boolean: 'editor-tokenProperty',
    builtin: 'editor-tokenSelector',
    cdata: 'editor-tokenComment',
    char: 'editor-tokenSelector',
    class: 'editor-tokenFunction',
    'class-name': 'editor-tokenFunction',
    comment: 'editor-tokenComment',
    constant: 'editor-tokenProperty',
    deleted: 'editor-tokenProperty',
    doctype: 'editor-tokenComment',
    entity: 'editor-tokenOperator',
    function: 'editor-tokenFunction',
    important: 'editor-tokenVariable',
    inserted: 'editor-tokenSelector',
    keyword: 'editor-tokenAttr',
    namespace: 'editor-tokenVariable',
    number: 'editor-tokenProperty',
    operator: 'editor-tokenOperator',
    prolog: 'editor-tokenComment',
    property: 'editor-tokenProperty',
    punctuation: 'editor-tokenPunctuation',
    regex: 'editor-tokenVariable',
    selector: 'editor-tokenSelector',
    string: 'editor-tokenSelector',
    symbol: 'editor-tokenProperty',
    tag: 'editor-tokenProperty',
    url: 'editor-tokenOperator',
    variable: 'editor-tokenVariable',
  },
};

export default function LexicalEditor({ onChange }: LexicalEditorProps) {
  const initialConfig = {
    namespace: "MyLexicalEditor",
    theme: exampleTheme,
    onError: (error: Error) => console.error(error),
    nodes: [HeadingNode, LinkNode, AutoLinkNode, MathNode],
  };




  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const text = root.getTextContent();
      onChange?.(text);
    });
  };
  // const MATCHER = [(text: string) => {
  //     const match = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.exec(text);
  //     return match ? { index: match.index, length: match[0].length, url: match[0] } : null;
  //   },]
  return (
    <LexicalComposer initialConfig={initialConfig as any}>
      <div className="border rounded-md">
        <Toolbar />
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="p-2 min-h-[120px] outline-none" />
          }
          placeholder={<div className="text-gray-400 p-2">Type here...</div>}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <LinkPlugin />
        <AutoLinkPlugin matchers={[
          (text: string): LinkMatcherResult | null => {
            const match = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.exec(text);
            return match
              ? {
                index: match.index,
                length: match[0].length,
                text: match[0],
                url: match[0],
              }
              : null;
          },
        ]}

        />
        <ClickableLinkPlugin />
        <HistoryPlugin />
        <OnChangePlugin onChange={handleChange} />
      </div>
    </LexicalComposer>
  );
}

