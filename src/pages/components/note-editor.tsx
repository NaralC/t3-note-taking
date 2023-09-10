import React, { useState } from "react";
import { Box, Input, Button, Container } from "@chakra-ui/react";
import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";

const NoteEditor: React.FC<{
  onSave: (note: { title: string; content: string }) => void;
}> = ({ onSave }) => {
  const [code, setCode] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  return (
    <Box boxShadow="xl" bg="gray.200" p={5}>
      <Box>
        <Input
          type="text"
          placeholder="Note title"
          size="lg"
          fontWeight="bold"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
      </Box>
      <Box>
        <CodeMirror
          value={code}
          width="500px"
          height="30vh"
          minWidth="100%"
          minHeight="30vh"
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={(value) => setCode(value)}
          className="border border-gray-300"
        />
      </Box>
      <Box mt={3} display="flex" justifyContent="flex-end">
        <Button
          _active={{ transform: "scale(0.95)" }}
          onClick={() => {
            onSave({
              title,
              content: code,
            });
            setCode("");
            setTitle("");
          }}
          colorScheme="blue"
          disabled={title.trim().length === 0 || code.trim().length === 0}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default NoteEditor;
