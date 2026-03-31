import { useRef, useCallback } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ color: [] }, { background: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    ['blockquote', 'code-block'],
    ['link', 'image'],
    ['clean'],
  ],
}

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'color', 'background',
  'list', 'bullet',
  'align',
  'blockquote', 'code-block',
  'link', 'image',
]

export default function RichTextEditor({ value, onChange, placeholder, className }) {
  const quillRef = useRef(null)

  const imageHandler = useCallback(() => {
    const editor = quillRef.current.getEditor()
    const input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()

    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return

      const range = editor.getSelection()
      editor.insertText(range.index, 'Caricamento immagine...')

      try {
        const reader = new FileReader()
        reader.onload = () => {
          editor.deleteText(range.index, 'Caricamento immagine...'.length)
          editor.insertEmbed(range.index, 'image', reader.result)
        }
        reader.readAsDataURL(file)
      } catch (err) {
        editor.deleteText(range.index, 'Caricamento immagine...'.length)
        console.error('Errore caricamento immagine:', err)
      }
    }
  }, [])

  return (
    <div className={`rich-text-editor ${className || ''}`}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder || 'Scrivi il tuo articolo qui...'}
        className="quill-editor"
      />
      <style>{`
        .rich-text-editor .ql-container {
          font-family: inherit;
          font-size: 1rem;
          border-bottom-left-radius: 0.5rem;
          border-bottom-right-radius: 0.5rem;
          min-height: 300px;
        }
        .rich-text-editor .ql-toolbar {
          border-top-left-radius: 0.5rem;
          border-top-right-radius: 0.5rem;
          background: #f9fafb;
        }
        .rich-text-editor .ql-editor {
          min-height: 300px;
        }
        .rich-text-editor .ql-editor h1,
        .rich-text-editor .ql-editor h2,
        .rich-text-editor .ql-editor h3 {
          margin-top: 1em;
          margin-bottom: 0.5em;
        }
        .rich-text-editor .ql-editor p {
          margin-bottom: 0.75em;
        }
        .rich-text-editor .ql-editor blockquote {
          border-left: 4px solid #e5e7eb;
          padding-left: 1rem;
          color: #6b7280;
        }
        .rich-text-editor .ql-editor img {
          max-width: 100%;
          border-radius: 0.5rem;
        }
      `}</style>
    </div>
  )
}
