import {useState, useEffect} from 'react';
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { IDomEditor, IEditorConfig, IToolbarConfig } from '@wangeditor/editor'

const Editor = () => {
    const [editor, setEditor] = useState(null)   
    const [html, setHtml] = useState('<p>hello</p>')

    const toolbarConfig = { }
    const editorConfig = {                   
        placeholder: 'Type here...',
    }
    
    useEffect (() => {
        setAdd(GetProjectFundingAddress(home))
        return () => {
            if (editor == null) return
            editor.destroy()
            setEditor(null)
        }
    },[editor])

    return   <>
     <div style={{ border: '1px solid #ccc', zIndex: 100}}>
            <Toolbar
                editor={editor}
                defaultConfig={toolbarConfig}
                mode="default"
                style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
                defaultConfig={editorConfig}
                value={html}
                onCreated={setEditor}
                onChange={editor => setHtml(editor.getHtml())}
                mode="default"
                style={{ height: '500px', overflowY: 'hidden' }}
        />
        </div>
        <div style={{ marginTop: '15px' }}>
            {html}
        </div>
</>}

export default Editor 