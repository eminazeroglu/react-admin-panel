import React from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {useAppState} from "store/module/app.store";

function FormHtmlEditor({value, onChange}) {
    const {theme} = useAppState();
    const config = {
        height: 300,
        menubar: false,
        plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
        ],
        toolbar: 'undo redo | blocks | bold italic | bullist numlist outdent indent | alignleft aligncenter alignright alignjustify | removeformat | fullscreen | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
    }

    if (theme === 'dark') {
        config.content_css = 'dark';
        config.skin = 'oxide-dark'
    }

    return (
        <Editor
            initialValue={value}
            onEditorChange={e => onChange(e)}
            init={config}
        />
    );
}

export default FormHtmlEditor;
