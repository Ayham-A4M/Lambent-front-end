import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createHeadingNode, type HeadingTagType } from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND, type TextFormatType } from "lexical";

export  const handlers = () => {
    const [editor] = useLexicalComposerContext()
    const handleHeading = (heading: HeadingTagType) => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                // $setBlocksType(selection, () => $createHeadingNode(heading))
                $setBlocksType(selection as any, () => $createHeadingNode(heading) as any)


            }
        })
    }
     const applyStyle = (style: TextFormatType) => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, style)
    }
    
    return { handleHeading,applyStyle }
}