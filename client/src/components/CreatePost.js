import React, { useState } from 'react';
import {
  Textarea,
  Button,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Progress,
} from '@chakra-ui/core';

import { useRequest } from '../hooks/useRequest';
import { URL } from '../config';

export const CreatePost = ({ onClose, getPosts, initialRef }) => {
  const TEXT_COUNT = 220;
  const [post, setPost] = useState({ text: '', percent: 0 });

  const { doRequest, isLoading } = useRequest({
    url: URL,
    method: 'post',
  });

  const onChangeHandler = (e) => {
    const target = e.target;
    setPost(() => ({
      text: target.value,
      percent: (target.value.length / TEXT_COUNT) * 100,
    }));
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    doRequest({
      values: { post: post.text },
      onSuccess: () => {
        setTimeout(getPosts, 1500);
        setPost({ text: '', percent: 0 });
        onClose();
      },
    });
  };

  return (
    <>
      <Progress
        hasStripe
        isAnimated
        value={post.percent}
        color={post.percent > 100 ? 'red' : 'blue'}
      />
      <ModalHeader>
        Say Something
        <Text fontSize={14} color="gray.400">
          Your post will be live if sentiment is not NEGETIVE
        </Text>
        <ModalCloseButton />
      </ModalHeader>

      <form onSubmit={onSubmitHandler}>
        <ModalBody>
          <Textarea
            ref={initialRef}
            placeholder="What do you have in mind?"
            value={post.text}
            onChange={onChangeHandler}
          />
          <Text textAlign="right">
            <Text as="span" color={post.percent > 100 ? 'red.500' : 'black'}>
              {post.text.length}
            </Text>
            /{TEXT_COUNT}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button
            type="submit"
            width="100%"
            isDisabled={post.percent === 0 || post.percent > 100 || isLoading}
            isLoading={isLoading}
            my={2}
            variant="outline"
            variantColor="blue"
            loadingText="Publishing"
          >
            Publish
          </Button>
        </ModalFooter>
      </form>
    </>
  );
};
