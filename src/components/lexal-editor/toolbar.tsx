import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getSelection, $insertNodes, $isRangeSelection, FORMAT_TEXT_COMMAND } from "lexical";
import { $createHeadingNode, type HeadingTagType } from "@lexical/rich-text"
import type { TextFormatType } from "lexical";
import { Button } from "../ui/button";
import { $setBlocksType } from "@lexical/selection";
import { handlers } from "./handler";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Link } from "lucide-react";
import { $toggleLink } from "@lexical/link";
import { $createMathNode } from "./mathNode";

export default function Toolbar() {
    const { handleHeading, applyStyle } = handlers()
    const [editor] = useLexicalComposerContext();


    const handleInsertLink = () => {
        editor.update(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {

                const url = prompt('Enter URL:');
                if (url) {
                    $toggleLink(url);
                }
            }
        });
    };
    const handleInsertEquation = () => {
        const latex = prompt("Enter LaTeX (e.g. E = mc^2):", "E=mc^2");
        if (latex) {
            editor.update(() => {
                const node = $createMathNode(latex);
                $insertNodes([node]);
            });
        }
    }
    return (
        <div className="flex gap-2 p-2 border-b">
            <Button size="icon" type="button" variant="outline" className="rounded-xl text-[.8rem] size-8 cursor-pointer"
                onClick={() => { applyStyle("bold") }}
            >
                <span className="font-bold">B</span>
            </Button>

            <Button size="icon" type="button" variant="outline" className="rounded-xl text-[.8rem] size-8 cursor-pointer"
                onClick={() => { applyStyle("italic") }}
            >
                <span className="italic">I</span>
            </Button>
            <Button size="icon" type="button" variant="outline" className="rounded-xl text-[.8rem] size-8 cursor-pointer"
                onClick={() => { applyStyle("underline") }}
            >
                <span className="underline">U</span>
            </Button>
            <Button size="icon" type="button" variant="outline" className="rounded-xl text-[.8rem] size-8 cursor-pointer"
                onClick={() => { applyStyle("code") }}
            >
                <span className="font-bold">&lt; &gt;</span>
            </Button>
            <Button size="icon" type="button" variant="outline" className="rounded-xl text-[.8rem] size-8 cursor-pointer"
                onClick={() => { handleInsertEquation() }}
            >
                <span className="font-bold">Eq</span>
            </Button>

            <Button size="icon" type="button" variant="outline" className="rounded-xl text-[.8rem] size-8 cursor-pointer"
                onClick={() => handleInsertLink()}
            >
                <Link />
            </Button>
            <Select onValueChange={(value: HeadingTagType) => { handleHeading(value) }}>

                <SelectTrigger className="rounded-[2px] w-fit">
                    <SelectValue placeholder="select heading" />
                </SelectTrigger>
                <SelectContent >
                    <SelectGroup >
                        <SelectLabel>heading</SelectLabel>
                        <SelectItem value="h1">h1</SelectItem>
                        <SelectItem value="h2">h2</SelectItem>
                        <SelectItem value="h3">h3</SelectItem>
                        <SelectItem value="h4">h4</SelectItem>
                        <SelectItem value="h5">h5</SelectItem>
                        <SelectItem value="h6">h6</SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
}
