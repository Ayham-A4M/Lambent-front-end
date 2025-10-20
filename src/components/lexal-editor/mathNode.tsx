import { $getNodeByKey, DecoratorNode, type LexicalNode, type NodeKey } from "lexical";
import katex from "katex";
import { useEffect, useState, useRef, type JSX } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import MathEquationDialog from "../dialogs/math-equation-dialog";
export class MathNode extends DecoratorNode<JSX.Element> {
    __latex: string;

    static getType(): string {
        return "math";
    }
    getLatex(): string {
        return this.__latex;
    }
    setLatex(latex: string): void {
        const writable = this.getWritable(); // ensures we're mutating the writable instance
        writable.__latex = latex;
    }
    static clone(node: MathNode): MathNode {
        return new MathNode(node.__latex, node.__key);
    }

    constructor(latex: string, key?: NodeKey) {
        super(key);
        this.__latex = latex;
    }

    createDOM(): HTMLElement {
        const div = document.createElement("div");
        div.className = "math-node";
        return div;
    }

    updateDOM(): boolean {
        return false;
    }

    decorate(): JSX.Element {
        return <MathComponent latex={this.__latex} nodeKey={this.getKey()} />;
    }

    exportJSON(): any {
        return {
            type: "math",
            latex: this.__latex,
            version: 1,
        };
    }

    static importJSON(serializedNode: any): MathNode {
        return new MathNode(serializedNode.latex);
    }
}

export function MathComponent({
    latex,
    nodeKey,
}: {
    latex: string;
    nodeKey: string;
}): JSX.Element {
    const ref = useRef<HTMLSpanElement>(null);
    const [editor] = useLexicalComposerContext();
    const [equation, setEquation] = useState(latex);
    const [open, setOpen] = useState<boolean>(false)
    useEffect(() => {
        if (ref.current) {
            katex.render(latex, ref.current, {
                throwOnError: false,
                displayMode: true,
            });
        }
    }, [latex]);

    return (
        <>

            <span
                ref={ref}
                className="cursor-pointer flex items-start p-[2px] outline-none bg-transparent [&_.katex-display]:overflow-x-auto"
                title="Click to edit"
                onClick={() => { setOpen(true) }}
            />
            <MathEquationDialog open={open} setEquation={setEquation}
                onSubmit={() => {
                    if (equation !== null) {
                        if (editor) {
                            editor.update(() => {
                                const node = $getNodeByKey(nodeKey);
                                if ($isMathNode(node))
                                    node.setLatex(equation)
                            });
                        }
                    }
                }}
                equation={equation}
                onClose={() => { setOpen(false) }} />
        </>
    );
}

export function $createMathNode(latex: string): MathNode {
    return new MathNode(latex);
}

export function $isMathNode(
    node: LexicalNode | null | undefined
): node is MathNode {
    return node instanceof MathNode;
}
