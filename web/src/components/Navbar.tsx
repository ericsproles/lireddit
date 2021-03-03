import { Box, Button, Flex, Heading, Link, MenuItem } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const router = useRouter();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  let body = null;

  // data is loading
  if (fetching) {
    // user is not logged in
  } else if (!data?.me) {
    body = (
      <>
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1.5rem"
          bg="gray.700"
          color="white"
        >
          <Flex align="center" mr={5}>
            <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
              <NextLink href="/">
                <Link>
                  <Heading>NewReddit</Heading>
                </Link>
              </NextLink>
            </Heading>
          </Flex>

          <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
            <svg
              fill="white"
              width="12px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </Box>

          <Box
            display={{ sm: show ? "block" : "none", md: "flex" }}
            width={{ sm: "full", md: "auto" }}
            alignItems="center"
            flexGrow={1}
          ></Box>

          <Box
            display={{ sm: show ? "block" : "none", md: "block" }}
            mt={{ base: 4, md: 0 }}
          >
            <Button bg="transparent" border="1px" mr={3}>
              <NextLink href="/login">
                <Link color="white" mr={2}>
                  Login
                </Link>
              </NextLink>
            </Button>
            <Button bg="transparent" border="1px">
              <NextLink href="/register">
                <Link color="white" mr={2}>
                  Register
                </Link>
              </NextLink>
            </Button>
          </Box>
        </Flex>
      </>
    );
    // user is logged in
  } else {
    body = (
      <>
        <Flex
          as="nav"
          align="center"
          justify="space-between"
          wrap="wrap"
          padding="1.5rem"
          bg="gray.700"
          color="white"
        >
          <Flex align="center" mr={5}>
            <NextLink href="/">
              <Link>
                <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
                  NewReddit
                </Heading>
              </Link>
            </NextLink>
          </Flex>

          <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
            <svg
              fill="white"
              width="12px"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </Box>

          <Box
            display={{ sm: show ? "block" : "none", md: "flex" }}
            width={{ sm: "full", md: "auto" }}
            alignItems="center"
            flexGrow={1}
          ></Box>

          <Box
            display={{ sm: show ? "block" : "none", md: "block" }}
            mt={{ base: 4, md: 0 }}
          >
            <Flex>
              <Box mr={2}>hi, {data.me.username}</Box>
              <Button
                isLoading={logoutFetching}
                onClick={async () => {
                  await logout();
                  router.reload();
                }}
                variant="link"
              >
                logout
              </Button>
            </Flex>
          </Box>
        </Flex>
      </>
    );
  }
  return <Box>{body}</Box>;
};
