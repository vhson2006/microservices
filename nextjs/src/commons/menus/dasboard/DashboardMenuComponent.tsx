import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Image,
  useDisclosure,
} from "@chakra-ui/react";
import { DashboardSidebar } from "./DashboardSidebar";
import { ToggleButton } from "./ToggleButton";

export const DashboardMenuComponent = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  return (
    <Box width="full" py="4" px={{ base: "4", md: "8" }} bg="bg-accent">
      <Flex justify="space-between">
        <Image src="/logo.png" height="8" alt="Yugioh" />
        <ToggleButton
          isOpen={isOpen}
          aria-label="Open Menu"
          onClick={onToggle}
        />
        <Drawer
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          isFullHeight
          preserveScrollBarGap
          trapFocus={false}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DashboardSidebar />
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
};
