import {
  chakra,
  Box,
  Flex,
  VisuallyHidden,
  HStack,
  Button,
  useDisclosure,
  VStack,
  IconButton,
  CloseButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { BsList } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export function Header() {
  const bg = useColorModeValue("gray.300", "gray.800");

  const mobileNav = useDisclosure();
  const navigate = useNavigate();

  const handleNavigateToProducts = () => {
    navigate("/products");
  };

  const handleNavigateToDashboard = () => {
    navigate("/");
  };

  return (
    <chakra.header w="full" p={4} shadow={"md"}>
      <Flex alignItems="center" justifyContent="space-between" mx="auto">
        <HStack display="flex" spacing={3} alignItems="center">
          <Box display={{ base: "inline-flex", md: "none" }}>
            <IconButton
              display={{ base: "flex", md: "none" }}
              aria-label="Open menu"
              fontSize="20px"
              variant="ghost"
              icon={<AiOutlineMenu />}
              onClick={mobileNav.onOpen}
            />
            <VStack
              pos="absolute"
              top={0}
              left={0}
              right={0}
              display={mobileNav.isOpen ? "flex" : "none"}
              flexDirection="column"
              p={2}
              pb={4}
              spacing={3}
              rounded="sm"
              shadow="md"
              bg={bg}
            >
              <CloseButton
                aria-label="Close menu"
                justifySelf="self-start"
                onClick={mobileNav.onClose}
              />
              <Button
                onClick={handleNavigateToDashboard}
                w="full"
                variant="ghost"
                leftIcon={<AiFillHome />}
              >
                Dashboard
              </Button>

              <Button
                onClick={handleNavigateToProducts}
                w="full"
                variant="ghost"
                leftIcon={<BsList />}
              >
                Produtos
              </Button>
            </VStack>
          </Box>
          <chakra.a
            href="/"
            title="Choc Home Page"
            display="flex"
            alignItems="center"
          >
            <VisuallyHidden>Choc</VisuallyHidden>
          </chakra.a>

          <HStack spacing={3} display={{ base: "none", md: "inline-flex" }}>
            <Button
              onClick={handleNavigateToDashboard}
              variant="ghost"
              leftIcon={<AiFillHome />}
              size="sm"
            >
              Dashboard
            </Button>
            <Button
              onClick={handleNavigateToProducts}
              variant="ghost"
              leftIcon={<BsList />}
              size="sm"
            >
              Produtos
            </Button>
          </HStack>
        </HStack>
      </Flex>
    </chakra.header>
  );
}
