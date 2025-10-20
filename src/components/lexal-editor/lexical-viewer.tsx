import {
    LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";
import { MathNode } from "./mathNode";
import { exampleTheme } from "./index"; // reuse your theme
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { HeadingNode } from "@lexical/rich-text";
import { HorizontalRuleNode } from "@lexical/extension";
import { HighlightPlugin } from "./HighlightPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import ClickableLinkPlugin from "./clickableLinkPlugin";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { $createParagraphNode, $createTextNode, $getRoot } from "lexical";
import LoadInitialContent from "./LoadInitialContent";

export default function LexicalViewer({ jsonState }: { jsonState: string }) {
    const initialConfig = {
        namespace: "LexicalViewer",
        editable: false,
        theme: exampleTheme,
        nodes: [HeadingNode, LinkNode, AutoLinkNode, MathNode, ListNode, ListItemNode, HorizontalRuleNode],
        onError: (error: Error) => console.error(error),
        editorState: () => {
            const root = $getRoot();
            if (root.isEmpty()) {
                const paragraph = $createParagraphNode();
                paragraph.append($createTextNode("")); // empty paragraph
                root.append(paragraph);
            }
        },
    };

    return (
        <LexicalComposer initialConfig={initialConfig as any} >
            <div className="border-2 rounded-[2px]">
                <RichTextPlugin
                    contentEditable={
                        <ContentEditable className="p-2 outline-none bg-transparent min-h-[80px]" />
                    }
                    placeholder={(!jsonState ? <div className="text-gray-400 p-2">Nothing here...</div> : null)}
                    ErrorBoundary={LexicalErrorBoundary}
                />


                <LinkPlugin />
                <HighlightPlugin />
                <ListPlugin />
                <ClickableLinkPlugin />
                {jsonState && <LoadInitialContent content={jsonState} />}
                <HistoryPlugin />
            </div>
        </LexicalComposer>
    );
}
