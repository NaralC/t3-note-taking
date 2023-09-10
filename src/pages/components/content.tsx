import { api, type RouterOutputs } from "@/utils/api";
import {
  Box,
  Divider,
  Grid,
  GridItem,
  Input,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

type Topic = RouterOutputs["topic"]["getAll"][0];

const Content: React.FC = () => {
  const { data: sessionData } = useSession();

  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const { data: topics, refetch: refetchTopics } = api.topic.getAll.useQuery(
    undefined,
    {
      enabled: sessionData?.user !== undefined,
      onSuccess: (data) => {
        setSelectedTopic(selectedTopic ?? data[0] ?? null);
      },
    }
  );

  const { mutate: createTopic } = api.topic.create.useMutation({
    onSuccess: () => {
      void refetchTopics();
    },
  });

  //   const { data: notes, refetch: refetchNotes } = api.note.getAll.useQuery(
  //     {
  //       topicId: selectedTopic?.id ?? "",
  //     },
  //     {
  //       enabled: sessionData?.user !== undefined && selectedTopic !== null,
  //     }
  //   );

  //   const createNote = api.note.create.useMutation({
  //     onSuccess: () => {
  //       void refetchNotes();
  //     },
  //   });

  //   const deleteNote = api.note.delete.useMutation({
  //     onSuccess: () => {
  //       void refetchNotes();
  //     },
  //   });

  return (
    <Grid m={"5"} mb={"0"} templateColumns="repeat(4, 1fr)" gap={"2"}>
      <GridItem px={"2"} w={"56"} p={"2"}>
        <UnorderedList>
          {topics?.map((topic) => (
            <ListItem
              _hover={{ cursor: "pointer", fontSize: "lg" }}
              key={topic.id}
              onClick={(e) => {
                e.preventDefault();
                setSelectedTopic(topic);
              }}
            >
              {topic.title}
            </ListItem>
          ))}
        </UnorderedList>

        <Divider border={"1px"} my={"3"} rounded={"full"} />

        <Input
          type="text"
          w={"100%"}
          placeholder="New Topic"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              createTopic({
                title: e.currentTarget.value,
              });
              e.currentTarget.value = "";
            }
          }}
        />
      </GridItem>
      <GridItem colSpan={3}></GridItem>
    </Grid>
  );
};

export default Content;
