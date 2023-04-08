import { HStack, Tag } from "@chakra-ui/react";
import { ITags } from "../../typescripts/common";

export const Tags: React.FC<ITags> = (props) => {
  const { tags } = props;
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {tags.map((tag: string) => {
        return (
          <Tag size={"md"} variant="chip" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};
