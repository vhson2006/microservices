import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Progress,
  Stack,
  Text,
  Image,
  Icon,
} from "@chakra-ui/react";
import {
  FiBarChart2,
  FiBookmark,
  FiCheckSquare,
  FiLogOut,
  FiHome,
  FiUsers,
} from "react-icons/fi";
import { NavButton } from "./NavButton";
import { UserProfile } from "./UserProfile";
import useTranslation from "next-translate/useTranslation";
import { logout } from "../../../utils/api";
import { common } from "../../../configs/consts";
import { useEffect, useState } from "react";

export const DashboardSidebar = () => {
  const { t, lang } = useTranslation("common");
  const logoutHandler = async () => {
    const response = await logout();
    if (response.status === common.INCORRECT) {
      console.log(response.message);
    }
    localStorage.removeItem("token");
    window.location.assign("/");
  };
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user") === "vhson2006@gmail.com") {
      setIsOwner(true);
    }
  }, []);

  return (
    <Flex
      flex="1"
      bg="bg-accent"
      color="on-accent"
      overflowY="auto"
      maxW={{ base: "full", sm: "xs" }}
      py={{ base: "6", sm: "8" }}
      px={{ base: "4", sm: "6" }}
    >
      <Stack justify="space-between" spacing="1">
        <Stack spacing={{ base: "5", sm: "6" }} shouldWrapChildren>
          <Image src="/logo.png" height="8" alt="Yugioh" />
          <Stack spacing="1">
            <NavButton label={t("menu#dashboard#home")} icon={FiHome} url="" />
            <NavButton
              label={t("menu#dashboard")}
              icon={FiBarChart2}
              url="dashboard"
            />
            <NavButton
              label={t("menu#dashboard#package")}
              icon={FiCheckSquare}
              url="dashboard/package"
            />
            {isOwner ? (
              <NavButton
                label={t("menu#dashboard#news")}
                icon={FiBookmark}
                url="dashboard/news"
              />
            ) : (
              <></>
            )}
          </Stack>
        </Stack>
        <Stack spacing={{ base: "5", sm: "6" }}>
          <Stack spacing="1">
            <NavButton
              label={t("menu#user#profile")}
              icon={FiUsers}
              url="dashboard/user"
            />
            <Button
              variant="ghost-on-accent"
              justifyContent="start"
              onClick={logoutHandler}
            >
              <HStack spacing="3">
                <Icon as={FiLogOut} boxSize="6" color="on-accent-subtle" />
                <Text>{t("menu#user#logout")}</Text>
              </HStack>
            </Button>
          </Stack>
          <Box bg="bg-accent-subtle" px="4" py="5" borderRadius="lg">
            <Stack spacing="4">
              <Stack spacing="1">
                <Text fontSize="sm" fontWeight="medium">
                  {t("dashboard#sidebar#subject")}
                </Text>
                <Text fontSize="sm" color="on-accent-muted">
                  {t("dashboard#sidebar#content")}
                </Text>
              </Stack>
              <Progress
                value={80}
                size="sm"
                variant="on-accent"
                aria-label="Profile Update Progress"
              />
            </Stack>
          </Box>
          <Divider borderColor="bg-accent-subtle" />
          <UserProfile
            name="TCG Player Administrator"
            image="https://tinyurl.com/yhkm2ek8"
            email="admin@tcgplayer.online"
          />
        </Stack>
      </Stack>
    </Flex>
  );
};
