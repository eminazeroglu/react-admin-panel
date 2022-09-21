import React from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {useAppState} from "store/module/app.store";
import FileManagementApi from 'api/file-management.api'

function FormHtmlEditor({value, onChange, height = 300}) {
    const {theme} = useAppState();
    const config = {
        height,
        menubar: false,
        automatic_uploads: true,
        images_upload_url: process.env.REACT_APP_API_URL + FileManagementApi.photoEditorUpload,
        plugins: [
            'advlist',
            'autolink',
            'link',
            'image',
            'charmap',
            'emoticons',
            'hr',
            'insertdatetime',
            'template',
            'save',
            'charmap',
            'print',
            'preview',
            'hr',
            'anchor',
            'pagebreak',
            'searchreplace',
            'wordcount',
            'visualblocks',
            'visualchars',
            'insertdatetime',
            'media',
            'nonbreaking',
            'table',
            'directionality',
            'emoticons',
            'paste',
            'code',
            'fullscreen'
        ],
        toolbar: [
            'undo redo | bold italic underline | template save insertdatetime | alignleft aligncenter alignright alignjustify hr | bullist numlist outdent indent | styleselect | responsivefilemanager | link unlink anchor | file image media  | forecolor backcolor  | print preview code | emoticons charmap | fullscreen'
        ],
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
