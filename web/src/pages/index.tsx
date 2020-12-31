import { Navbar } from "../components/Navbar";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = usePostsQuery();
  return (
    <div>
      <Navbar />
      <div>hello world</div>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((post) => <div key={post.id}>{post.title}</div>)
      )}
    </div>
  );
  // <Container height="100vh">
  //   <Hero />
  //   <Main>
  //     <Text>
  //       Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> +{' '}
  //       <Code>typescript</Code>.
  //     </Text>

  //     <List spacing={3} my={0}>
  //       <ListItem>
  //         <ListIcon as={CheckCircleIcon} color="green.500" />
  //         <ChakraLink
  //           isExternal
  //           href="https://chakra-ui.com"
  //           flexGrow={1}
  //           mr={2}
  //         >
  //           Chakra UI <LinkIcon />
  //         </ChakraLink>
  //       </ListItem>
  //       <ListItem>
  //         <ListIcon as={CheckCircleIcon} color="green.500" />
  //         <ChakraLink isExternal href="https://nextjs.org" flexGrow={1} mr={2}>
  //           Next.js <LinkIcon />
  //         </ChakraLink>
  //       </ListItem>
  //     </List>
  //   </Main>

  //   <DarkModeSwitch />
  //   <Footer>
  //     <Text>Next ❤️ Chakra</Text>
  //   </Footer>
  //   <CTA />
  // </Container>
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
