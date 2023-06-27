import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
// @ts-ignore
import gettingStartedMarkdown from '../../getting-started-markdown.md';
import { Box, Heading } from "@chakra-ui/react";
import { useActions } from "../../hooks/useActions";
import env from "../../env";

export const GettingStarted = () => {
  const { setActions } = useActions();

  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    getMarkdownContent();
    setContextActions();
  }, []);

  const setContextActions = () => {
    setActions({
      'Download': () => window.open(env.chromeStoreUrl, '_blank'),
    })
  }

  const getMarkdownContent = async () => {
    try {
      const response = await fetch(gettingStartedMarkdown);
      const content = await response.text();
      setMarkdownContent(content);
    } catch (error) {
      console.error('Error fetching markdown content:', error);
    }
  }

  const components = {
    h2: ({ children }: { children: any }) => (
        <Heading as="h2" size="lg" mb="4" fontFamily={'Lato'}>
          {children}
        </Heading>
    ),
    h3: ({ children }: { children: any }) => (
        <Heading as="h3" size="md" mb="4">
          {children}
        </Heading>
    ),
    p: ({ children }: { children: any }) => <p style={{ marginBottom: '1rem' }}>{children}</p>,
  };

  return (
      <Box
          w={'95%'}
          p={3}
          pl={6}
          overflowY="auto"
          height="100vh"
          flex="0 0 100%"
      >
        <ReactMarkdown children={markdownContent} components={components} />
      </Box>
  )
};
