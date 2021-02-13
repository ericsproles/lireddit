import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  // Alternate method without using a Fragment
  //   post: PostsQuery["posts"]["posts"][0];
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [{ operation }, vote] = useVoteMutation();
  return (
    <Flex mr={4} direction="column" alignItems="center" justifyContent="center">
      <IconButton
        isLoading={loadingState === "updoot-loading"}
        size="sm"
        colorScheme={post.voteStatus === 1 ? "green" : undefined}
        aria-label="updoot post"
        icon={<ChevronUpIcon />}
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState("updoot-loading");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
      />
      {post.points}
      <IconButton
        isLoading={loadingState === "downdoot-loading"}
        size="sm"
        colorScheme={post.voteStatus === -1 ? "red" : undefined}
        aria-label="downdoot post"
        icon={<ChevronDownIcon />}
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
      />
    </Flex>
  );
};
