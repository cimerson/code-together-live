import { Box } from '@chakra-ui/react'

import { Editor } from '@monaco-editor/react'
import { useState } from 'react'


interface CodeEditorProps {
  language: string
  code: string 
}

const CodeEditor = ({ language, code }: CodeEditorProps) => {

  const [value, setValue] = useState<string>()

  return (
    <Box h='100%'>
      <Editor 
        height='calc(100vh - 354px)'
        theme='vs-dark'
        defaultLanguage={language}
        defaultValue={code}
        value={value}
        onChange={(value) => setValue(value)}
      />
    </Box>
  )
}

export default CodeEditor