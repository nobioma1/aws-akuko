import React, { useEffect, useState } from 'react';
import {
  Heading,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Flex,
  Scale,
  Box,
  Text,
  Divider,
  Spinner,
} from '@chakra-ui/core';
import moment from 'moment';

import { useRequest } from '../hooks/useRequest';
import { URL } from '../config';
import { CreatePost } from './CreatePost';

export const Posts = () => {
  const btnRef = React.useRef();
  const [posts, setPosts] = useState([]);
  const initialRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { doRequest, isLoading } = useRequest({
    url: URL,
    method: 'get',
  });

  const getPosts = () => {
    doRequest({
      onSuccess: (data) => {
        const body = JSON.parse(data.body);
        setPosts(body.Items);
      },
    });
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <Flex w="full" direction="column" alignItems="center">
        <Box w={['full', 'full', '880px']}>
          <Flex justifyContent="space-between">
            <Heading>Posts</Heading>
            <Button
              ref={btnRef}
              leftIcon="plus-square"
              variantColor="blue"
              variant="outline"
              onClick={onOpen}
            >
              Create Post
            </Button>
          </Flex>

          <Box w="full" h="85vh" overflowY="auto">
            {isLoading ? (
              <Spinner />
            ) : posts.length === 0 ? (
              <Text color="gray.700">
                No Akuko!!! All Posts have expired, Create New.
              </Text>
            ) : (
              posts.map((post) => {
                return (
                  <Box
                    minH={20}
                    my={3}
                    p={3}
                    w="full"
                    key={post.PostId}
                    borderColor="blue.400"
                    borderWidth="1px"
                    borderRadius={3}
                  >
                    <Text fontSize={20} wordBreak="break-word" lineHeight={1.8}>
                      {post.Post}
                    </Text>
                    <Divider />
                    <Text color="gray.500">
                      expires {moment(post.ExpiresIn).fromNow()}
                    </Text>
                  </Box>
                );
              })
            )}
          </Box>
        </Box>
      </Flex>
      <Scale in={isOpen}>
        {() => (
          <Modal
            finalFocusRef={btnRef}
            initialFocusRef={initialRef}
            onClose={onClose}
            isOpen={true}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <CreatePost
                onClose={onClose}
                initialRef={initialRef}
                getPosts={getPosts}
              />
            </ModalContent>
          </Modal>
        )}
      </Scale>
    </>
  );
};
