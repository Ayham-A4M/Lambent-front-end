// HighlightPlugin.tsx
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";
import { createCommand, $getSelection, $isRangeSelection, } from "lexical";
import { $patchStyleText } from "@lexical/selection";

export const TOGGLE_HIGHLIGHT_COMMAND = createCommand<string>("TOGGLE_HIGHLIGHT_COMMAND");

export function HighlightPlugin() {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            TOGGLE_HIGHLIGHT_COMMAND,
            (color: string) => {
                editor.update(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        $patchStyleText(selection, { "background-color": color });
                    }
                });
                return true;
            },
            0
        );
    }, [editor]);

    return null;
}
