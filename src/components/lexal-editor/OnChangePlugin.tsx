import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { useEffect } from "react";

function OnChangePlugin({ onChange }:{onChange:any}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerUpdateListener(({ editorState }) => {
      // Convert Lexical state to JSON
      const json = editorState.toJSON();
      onChange(json);
    });
  }, [editor, onChange]);

  return null;
}

export default OnChangePlugin;
