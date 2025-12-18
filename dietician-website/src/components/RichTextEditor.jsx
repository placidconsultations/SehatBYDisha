import React, { useRef, useCallback } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const RichTextEditor = ({ value, onChange, placeholder = 'Start typing here...' }) => {
  const editorRef = useRef(null);

  // Memoize the change handler
  const handleEditorChange = useCallback((content) => {
    if (onChange) {
      onChange(content);
    }
  }, [onChange]);

  return (
    <div className="rich-text-editor">
      <Editor
        key="editor"  // Add key to help React identify the editor
        apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value || ''}
        init={{
          height: 400,
          menubar: false,
          plugins: [
            'advlist autolink lists link image charmap print preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table paste code help wordcount',
          ],
          toolbar:
            'undo redo | formatselect | ' +
            'bold italic backcolor forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Inter,sans-serif; font-size:14px }',
          placeholder: placeholder,
          skin: 'oxide',
          content_css: 'default',
          auto_focus: true,
          fixed_toolbar_container: '#toolbar',
          setup: (editor) => {
            editor.on('focus', function() {
              const content = editor.getContent();
              editor.setContent(' ' + content);
              editor.selection.setCursorLocation(editor.getBody(), 0);
              editor.setContent(content);
            });
          }
        }}
        onEditorChange={handleEditorChange}
      />
    </div>
  );
};

export default React.memo(RichTextEditor);