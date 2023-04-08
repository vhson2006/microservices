import { Flex, Text, useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import useTranslation from "next-translate/useTranslation";
import { BlogAuthor } from "./BlogAuthor";
import { NewPreview } from "./NewPreview";
import { Tags } from "./Tags";

export const NewsGrid = (props: any) => {
  const { data } = props;
  const { lang } = useTranslation("common");

  return (
    <>
      {data.map((post: any) => (
        <Flex
          key={post.id}
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent="space-between"
        >
          <NewPreview post={post} />
          <Flex
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: "3", sm: "0" }}
          >
            <Tags tags={["Engineering", "Product"]} />
            <Text fontSize="3xl" marginTop="1" noOfLines={1}>
              <NextLink
                aria-current="page"
                href={
                  lang === "en"
                    ? `/${lang}/news/${post.id}`
                    : `/news/${post.id}`
                }
                passHref
              >
                {post.title}
              </NextLink>
            </Text>
            <Text
              className="ql-editor"
              as="p"
              noOfLines={6}
              marginTop="2"
              color={useColorModeValue("gray.700", "gray.200")}
              fontSize="lg"
            >
              {post.content.replace(/<[^>]*>/g, "")}
            </Text>
            <BlogAuthor name={post.author} date={new Date(post.publishDate)} />
          </Flex>
        </Flex>
      ))}
    </>
  );
};
