import {
  Stack,
  StackDivider,
  Text,
  Heading,
  useBreakpointValue,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";

const stats = [
  {
    value: "210+",
    label: "shop#stats#1",
  },
  {
    value: "95%",
    label: "shop#stats#2",
  },
  {
    value: "25k",
    label: "shop#stats#3",
  },
];

export const ReviewSummary = (props: any) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { t } = useTranslation("common");

  return (
    <Stack
      direction={{ base: "column", md: "row" }}
      maxW="3xl"
      width="full"
      spacing={{ base: "8", md: "4" }}
      {...(!isMobile ? { divider: <StackDivider /> } : {})}
    >
      {stats.map((stat: any, id: number) => (
        <Stack key={id} flex="1" spacing="3" textAlign="center">
          <Heading
            size={useBreakpointValue({ base: "lg", md: "xl" })}
            color="accent"
          >
            {stat.value}
          </Heading>
          <Text fontSize="lg" fontWeight="medium" color="muted">
            {t(stat.label)}
          </Text>
        </Stack>
      ))}
    </Stack>
  );
};
