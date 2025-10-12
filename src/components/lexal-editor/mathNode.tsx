import { $getNodeByKey, DecoratorNode, type LexicalNode, type NodeKey } from "lexical";
import katex from "katex";
import React, { useEffect, useRef, type JSX } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

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
    useEffect(() => {
        if (ref.current) {
            katex.render(latex, ref.current, {
                throwOnError: false,
                displayMode: true,
            });
        }
    }, [latex]);

    return (
        <span
            ref={ref}
            className="block text-start cursor-pointer"
            title="Click to edit"
            onClick={() => {
                const newLatex = prompt("Edit LaTeX equation:", latex);
                if (newLatex !== null) {
                    
                    if (editor) {
                        editor.update(() => {
                            const node = $getNodeByKey(nodeKey);
                            if ($isMathNode(node))
                                node.setLatex(newLatex)
                        });
                    }
                }
            }}
        />
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
