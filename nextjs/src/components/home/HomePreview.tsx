import { Flex, Skeleton, Image } from "@chakra-ui/react";

export const HomePreview = (props: any) => {
  return (
    <Flex flex="1" overflow="hidden">
      <Image
        src="/introduction.jpg"
        alt="Lovely Image"
        fallback={<Skeleton />}
        maxH="450px"
        minW="300px"
        objectFit="cover"
        flex="1"
      />
      <Image
        display={{ base: "none", sm: "initial" }}
        src="/introduction2.jpg"
        alt="Lovely Image"
        fallback={<Skeleton />}
        maxH="450px"
        objectFit="cover"
      />
    </Flex>
  );
};
