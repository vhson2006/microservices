import {
  Avatar,
  Badge,
  Box,
  Checkbox,
  HStack,
  Icon,
  IconButton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Link,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { IoArrowDown } from "react-icons/io5";

export const MemberTable = (props: any) => {
  const { data, deleteUserProduct, editUserProduct } = props;
  const { t, lang } = useTranslation("common");

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>
            <HStack spacing="3">
              <Checkbox />
              <HStack spacing="1">
                <Text>{t("dashboard#table#name")}</Text>
                <Icon as={IoArrowDown} color="muted" boxSize="4" />
              </HStack>
            </HStack>
          </Th>
          <Th>{t("dashboard#table#type")}</Th>
          <Th>{t("dashboard#table#code")}</Th>
          <Th>{t("dashboard#table#price")}</Th>
          <Th>{t("dashboard#table#quantity")}</Th>
          <Th>{t("dashboard#table#rarity")}</Th>
          <Th>{t("dashboard#table#action")}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((member: any) => (
          <Tr key={member.id}>
            <Td>
              <HStack spacing="3">
                <Checkbox />
                <Avatar name={member.image} src={member.image} boxSize="10" />
                <Box>
                  <Link
                    href={
                      lang === "vi"
                        ? `/product/${member.cardId}`
                        : `/${lang}/product/${member.cardId}`
                    }
                  >
                    <Text fontWeight="medium">{member.name}</Text>
                  </Link>
                  <Text as="p" color="muted" noOfLines={1}></Text>
                </Box>
              </HStack>
            </Td>
            <Td>
              <Badge
                size="sm"
                colorScheme={member.status === "active" ? "green" : "red"}
              >
                {member.type}
              </Badge>
            </Td>
            <Td>
              <Text color="muted">{member.code}</Text>
            </Td>
            <Td>
              <Text color="muted">{member.price}</Text>
            </Td>
            <Td>
              <Text color="muted">{member.quantity}</Text>
            </Td>
            <Td>
              <Text color="muted">{member.rarity}</Text>
            </Td>
            <Td>
              <HStack spacing="1">
                <IconButton
                  icon={<FiTrash2 fontSize="1.25rem" />}
                  variant="ghost"
                  aria-label={t("common#button#delete")}
                  onClick={() => deleteUserProduct(member.id)}
                />
                <IconButton
                  icon={<FiEdit2 fontSize="1.25rem" />}
                  variant="ghost"
                  aria-label={t("common#button#update")}
                  onClick={() => editUserProduct(member)}
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};
