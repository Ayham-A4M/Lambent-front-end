import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createParagraphNode, $createTextNode, $getRoot, $getSelection, $insertNodes, $isRangeSelection, COMMAND_PRIORITY_LOW, type ElementFormatType } from "lexical";
import { type HeadingTagType } from "@lexical/rich-text"
import { FaListUl, FaListOl } from "react-icons/fa";
import { Button } from "../ui/button";
import { handlers } from "./handler";
import { RxTransparencyGrid } from "react-icons/rx";
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
import { useState } from "react";
import MathEquationDialog from "../dialogs/math-equation-dialog";
import {
    INSERT_UNORDERED_LIST_COMMAND,
    INSERT_ORDERED_LIST_COMMAND,
    REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { FORMAT_ELEMENT_COMMAND } from "lexical";
import { TOGGLE_HIGHLIGHT_COMMAND } from "./HighlightPlugin";
import { CiTextAlignRight, CiTextAlignCenter, CiTextAlignLeft } from "react-icons/ci";

import { LiaRulerHorizontalSolid } from "react-icons/lia";
import {
    $createHorizontalRuleNode,

} from "@lexical/extension";
export default function Toolbar() {
    const colors = [
        { name: "Yellow", value: "yellow" },
        { name: "Green", value: "#b2fab4" },
        { name: "Pink", value: "#ffc0cb" },
        { name: "None", value: "transparent" },
    ];
    const { handleHeading, applyStyle } = handlers()
    const [editor] = useLexicalComposerContext();
    const [equation, setEquation] = useState<string>("");
    const [openMathDialog, setOpenMathDialog] = useState<boolean>(false);
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
        const latex = equation;
        if (latex) {
            editor.update(() => {
                const node = $createMathNode(latex);
                $insertNodes([node]);
            });
        }
    }

    const insertUnorderedList = () => {
        editor.update(() => {
            const root = $getRoot();
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
                // Create a new paragraph node at the end
                const paragraph = $createParagraphNode();
                paragraph.append($createTextNode("")); // empty line
                root.append(paragraph);

                // Move cursor into it
                paragraph.select();

                // Then turn that paragraph into a list
                editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
            }
        });
    };


    const applyAlignment = (alignment: ElementFormatType) => {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, alignment);
    };
    const insertOrderedList = () => {
        editor.update(() => {
            const root = $getRoot();
            const selection = $getSelection();

            if ($isRangeSelection(selection)) {
                // Create a new paragraph node at the end
                const paragraph = $createParagraphNode();
                paragraph.append($createTextNode("")); // empty line
                root.append(paragraph);

                // Move cursor into it
                paragraph.select();

                // Then turn that paragraph into a list
                editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
            }
        });
    };
    const removeList = () => {
        editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    };

    const insertRule = () => {
        editor.update(() => {
            const hrNode = $createHorizontalRuleNode();
            const selection = editor.getEditorState().read(() => $getSelection());
            if (selection) {
                selection.insertNodes([hrNode]);
            }
        });
    };
    return (
        <div className="flex gap-2 p-2 border-b flex-wrap w-full bg-background z-30">
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
                onClick={() => { setOpenMathDialog(prev => !prev) }}
            >
                <span className="font-bold">Eq</span>
            </Button>

            <Button size="icon" type="button" variant="outline" className="rounded-xl text-[.8rem] size-8 cursor-pointer"
                onClick={() => handleInsertLink()}
            >
                <Link />
            </Button>

            <Button size="icon" type="button" variant="outline" className="rounded-xl text-[.8rem] size-8 cursor-pointer"
                onClick={() => insertUnorderedList()}
            >
                <FaListUl />
            </Button>
            <Button size="icon" type="button" variant="outline" className="rounded-xl text-[.8rem] size-8 cursor-pointer"
                onClick={() => insertOrderedList()}
            >
                <FaListOl />
            </Button>
            <Button size="icon" type="button" variant="outline" className="rounded-xl text-[.8rem] size-8 cursor-pointer"
                onClick={() => insertRule()}
            >
                <LiaRulerHorizontalSolid />
            </Button>

            <Select onValueChange={(value: HeadingTagType) => { editor.dispatchCommand(TOGGLE_HIGHLIGHT_COMMAND, value) }} defaultValue="transparent">
                <SelectTrigger className="rounded-[2px] w-fit">
                    <SelectValue placeholder="Higlighter" />
                </SelectTrigger>
                <SelectContent >
                    <SelectGroup >
                        <SelectLabel>Higlighter</SelectLabel>
                        {
                            colors.map((e) => (
                                <SelectItem key={e.name} value={e.value} className="flex items-center gap-3">
                                    {
                                        e.name
                                    }
                                    {
                                        e.value === "transparent" ?
                                            <RxTransparencyGrid />
                                            :
                                            <div className={`size-4 rounded-[2px] `} style={{ backgroundColor: e.value }}></div>
                                    }
                                </SelectItem>
                            ))
                        }

                    </SelectGroup>
                </SelectContent>
            </Select>

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
            <Select onValueChange={(value: ElementFormatType) => { applyAlignment(value) }} defaultValue="left">

                <SelectTrigger className="rounded-[2px] w-fit">
                    <SelectValue placeholder="Text Align" />
                </SelectTrigger>
                <SelectContent >
                    <SelectGroup >
                        <SelectLabel>Text Align</SelectLabel>
                        <SelectItem value="left" className="flex items-center gap-3">
                            <CiTextAlignLeft />
                            Align Left
                        </SelectItem>
                        <SelectItem value="right" className="flex items-center gap-3">
                            <CiTextAlignRight />
                            Align Right
                        </SelectItem>
                        <SelectItem value="center" className="flex items-center gap-3">
                            <CiTextAlignCenter />
                            Align Center
                        </SelectItem>

                    </SelectGroup>
                </SelectContent>
            </Select>

            <MathEquationDialog open={openMathDialog} onClose={() => { setOpenMathDialog(false); setEquation("") }} equation={equation} setEquation={setEquation} onSubmit={handleInsertEquation} />
        </div >
    );
}
