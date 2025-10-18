import {
    LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { MathNode } from "./mathNode";
import { exampleTheme } from "./index"; // reuse your theme
import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode } from "@lexical/rich-text";

export default function LexicalViewer({ jsonState }: { jsonState: string }) {
    const initialConfig = {
        namespace: "LexicalViewer",
        editable: false,
        theme: exampleTheme,
        nodes: [HeadingNode, LinkNode, AutoLinkNode, MathNode, ListNode, ListItemNode],
        onError: (error: Error) => console.error(error),
        editorState: (editor: any) => {
            try {
                const parsed = editor.parseEditorState(jsonState);
                editor.setEditorState(parsed);
            } catch (err) {
                console.error("Failed to parse editor state:", err);
            }
        },
    };
    const LoadState = ({ jsonState }: { jsonState: string }) => {
        const [editor] = useLexicalComposerContext();
        useEffect(() => {
            if (!jsonState) return;
            try {
                const parsed = editor.parseEditorState(jsonState);
                console.log(parsed)
                editor.setEditorState(parsed);
            } catch (err) {
                console.error("Failed to parse editor state:", err);
            }
        }, [jsonState, editor]);
        return <></>
    }
    return (
        <LexicalComposer  initialConfig={initialConfig as any} >
            <LoadState jsonState={jsonState} />
            <RichTextPlugin

                contentEditable={
                    <ContentEditable  className="p-2 outline-none bg-transparent min-h-[80px]" />
                }
                placeholder={null}
                ErrorBoundary={LexicalErrorBoundary}
            />
        </LexicalComposer>
    );
}
