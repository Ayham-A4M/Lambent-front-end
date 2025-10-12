// import { useEffect } from "react";
// import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
// import { CLICK_COMMAND, COMMAND_PRIORITY_LOW } from "lexical";

// function ClickableLinkPlugin() {
//     const [editor] = useLexicalComposerContext();

//     useEffect(() => {
//         return editor.registerCommand(
//             CLICK_COMMAND,
//             (event: MouseEvent) => {
//                 const target = event.target as HTMLElement;
//                 if (target && target.tagName === "A") {
//                     const anchor = target as HTMLAnchorElement;
//                     // Check for Ctrl (Windows/Linux) or Cmd (Mac)
//                     if (event.metaKey || event.ctrlKey) {
//                         window.open(anchor.href, "_blank");
//                         return true; // handled
//                     }
//                 }
//                 return false; // not handled
//             },
//             COMMAND_PRIORITY_LOW
//         );
//     }, [editor]);

//     return null;
// }

// export default ClickableLinkPlugin;

import { useEffect, type JSX } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CLICK_COMMAND, COMMAND_PRIORITY_LOW } from "lexical";

export default function ClickableLinkPlugin(): JSX.Element | null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        const unregister = editor.registerCommand<MouseEvent>(
            CLICK_COMMAND,
            (event) => {
                // Find nearest anchor ancestor (works if you click a span/text inside <a>)
                const target = event.target as HTMLElement | null;

                const anchor = target?.closest?.("a") as HTMLAnchorElement | null;
                if (target?.closest?.("a")) {
                    target?.classList.add("cursor-pointer")
                }
                if (anchor && anchor.href) {

                    window.open(anchor.href, "_blank", "noopener,noreferrer");
                    return true; // we handled it

                }

                return false; // not handled — let editor handle the click for selection/editing
            },
            COMMAND_PRIORITY_LOW
        );

        return unregister;
    }, [editor]);

    return null;
}
