import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import {
  Box,
  Text,
  Button,
  Collapse,
  Container,
  VStack,
} from "@chakra-ui/react";

import { type RouterOutputs } from "@/utils/api";

type Note = RouterOutputs["note"]["getAll"][0];

const NoteCard: React.FC<{
  note: Note;
  onDelete: () => void;
}> = ({ note, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  return (
    <Container maxW="xl" mt={5} boxShadow="xl" bg="gray.200">
      <VStack spacing={0} alignItems="stretch">
        <Box
          p={3}
          bg="white"
          borderBottomWidth="1px"
          borderBottomColor="gray.200"
          onClick={() => setIsExpanded(!isExpanded)}
          cursor="pointer"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Text fontSize="xl" fontWeight="bold">
            {note.title}
          </Text>
          <Button colorScheme="yellow" size="sm" onClick={onDelete} ml={2}>
            Delete
          </Button>
        </Box>

        <Collapse in={isExpanded}>
          <Box p={3} bg="white">
            <article>
              <ReactMarkdown>{note.content}</ReactMarkdown>
            </article>
          </Box>
        </Collapse>
      </VStack>
    </Container>
  );
};

export default NoteCard;
