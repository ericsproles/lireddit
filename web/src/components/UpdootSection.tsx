import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment } from "../generated/graphql";

interface UpdootSectionProps {
  // Alternate method without using a Fragment
  //   post: PostsQuery["posts"]["posts"][0];
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  return (
    <Flex mr={4} direction="column" alignItems="center" justifyContent="center">
      <IconButton size="sm" aria-label="updoot post" icon={<ChevronUpIcon />} />
      {post.points}
      <IconButton
        size="sm"
        aria-label="downdoot post"
        icon={<ChevronDownIcon />}
      />
    </Flex>
  );
};
