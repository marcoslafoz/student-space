import React from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Document } from '../../../../common/types/document.vm'
import '../document.scss'

interface EditorProps {
  data: Document
  getValue: (e: string) => void
}

export const Editor: React.FC<EditorProps> = props => {
  const { data, getValue: test } = props

  const [code, setCode] = React.useState<string>(data.body)
  const handleProcedureContentChange = (content: string) => {
    setCode(content)
    test(content)
  }

  const myColors = ['purple', '#785412', '#452632', '#856325', '#963254', '#254563', 'white']
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: ['right', 'center', 'justify'] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      [{ color: myColors }],
      [{ background: myColors }],
    ],
  }

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'link',
    'color',
    'image',
    'background',
    'align',
  ]

  return (
    <>
      <ReactQuill
        theme='snow'
        modules={modules}
        formats={formats}
        value={code}
        onChange={handleProcedureContentChange}
      />
    </>
  )
}
