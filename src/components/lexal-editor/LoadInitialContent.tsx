import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect, useRef } from 'react'

const LoadInitialContent: React.FC<{ content: any }> = ({ content }) => {
    const [editor] = useLexicalComposerContext();
    const isLoaded = useRef(false);

    useEffect(() => {
        if (isLoaded.current || !content) return;
        const timeout = setTimeout(() => {

            try {
                editor.update(() => {
                    const editorState = editor.parseEditorState(content);
                    editor.setEditorState(editorState);
                });
                isLoaded.current = true;
            } catch (err) {
                console.error("Failed to parse lexical data:", err);
            }

        }, 0)
        return () => clearTimeout(timeout)
    }, [content, editor]);
    return null;
};

export default LoadInitialContent