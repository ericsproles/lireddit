import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useDeletePostMutation, usePostsQuery } from "../generated/graphql";
import { Layout } from "../components/Layout";
import NextLink from "next/link";
import {
  Stack,
  Box,
  Heading,
  Text,
  Flex,
  Button,
  Link,
  Spacer,
  IconButton,
} from "@chakra-ui/react";

import React, { useState } from "react";
import { UpdootSection } from "../components/UpdootSection";
import { DeleteIcon } from "@chakra-ui/icons";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  const [, deletePost] = useDeletePostMutation();

  if (!fetching && !data) {
    return <div> no posts </div>;
  }
  return (
    <Layout>
      <Flex>
        <Heading px={4} size="md">
          Posts
        </Heading>
        <Spacer />
        <NextLink href="/create-post">
          <Button as={Link}>Create Post</Button>
        </NextLink>
      </Flex>
      <br />
      {!data && fetching ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8} px={4}>
          {data!.posts.posts.map((post) =>
            !post ? null : (
              <Flex key={post.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={post} />
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${post.id}`}>
                    <Link>
                      <Heading fontSize="xl">{post.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>posted by {post.creator.username}</Text>
                  <Flex align="center">
                    <Text mt={4}>{post.textSnippet}...</Text>
                    <Spacer />
                    <IconButton
                      size="sm"
                      aria-label="updoot post"
                      icon={<DeleteIcon />}
                      onClick={() => {
                        deletePost({ id: post.id });
                      }}
                      colorScheme="red"
                    />
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex justify="center">
          <Button
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
            my={6}
          >
            load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
