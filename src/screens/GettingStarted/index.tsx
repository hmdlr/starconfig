import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
// @ts-ignore
import gettingStartedMarkdown from "../../getting-started-markdown.md";
import {
  Box,
  Button,
  Heading,
  Tag,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useActions } from "../../hooks/useActions";
import env from "../../env";
import { Link } from "react-router-dom";

export const GettingStarted = () => {
  const { setActions } = useActions();

  const [markdownContent, setMarkdownContent] = useState("");

  const accentTextColor = useColorModeValue("secondary", "gray.400");

  useEffect(() => {
    getMarkdownContent();
    setContextActions();
  }, []);

  const setContextActions = () => {
    setActions({
      Download: () => window.open(env.chromeStoreUrl, "_blank"),
    });
  };

  const getMarkdownContent = async () => {
    try {
      const response = await fetch(gettingStartedMarkdown);
      const content = await response.text();
      setMarkdownContent(content);
    } catch (error) {
      console.error("Error fetching markdown content:", error);
    }
  };

  const components = {
    h2: ({ children }: { children: any }) => (
      <Heading
        as="h2"
        size="lg"
        mb="4"
        fontFamily={"Lato"}
        color={accentTextColor}
      >
        {children}
      </Heading>
    ),
    h3: ({ children }: { children: any }) => (
      <Heading as="h3" size="md" mb="4">
        {children}
      </Heading>
    ),
    p: ({ children }: { children: any }) => (
      <p
        style={{ marginBottom: "1rem", fontFamily: "Lato", fontSize: "1.2rem" }}
      >
        {children}
      </p>
    ),
    ul: ({ children }: { children: any }) => (
      <ul style={{ marginBottom: "1rem" }}>{children}</ul>
    ),
    ol: ({ children }: { children: any }) => (
      <ol style={{ marginBottom: "1rem", marginLeft: "1rem" }}>{children}</ol>
    ),
    li: ({ children }: { children: any }) => (
      <li style={{ marginBottom: "0.5rem" }}>{children}</li>
    ),
    code: ({ children }: { children: any }) => <Tag>{children}</Tag>,
    strong: ({ children }: { children: any }) => (
      <strong
        style={{ marginBottom: "0.5rem", color: accentTextColor }}
        color={accentTextColor}
      >
        {children}
      </strong>
    ),
    em: ({ children }: { children: any }) => (
      <em style={{ marginBottom: "0.5rem" }}>{children}</em>
    ),
    hr: () => <hr style={{ marginBottom: "1rem" }} />,
  };

  return (
    <Box w={"95%"} p={3} pl={6} overflowY="auto" height="100vh" flex="0 0 100%">
      <ReactMarkdown children={markdownContent} components={components} />
      <Link to={"/configurations"}>
        <Button colorScheme="teal" variant="link">
          Get started
        </Button>
      </Link>
      {/* <button */}
      {/*   style={{ */}
      {/*     backgroundColor: "#f5f5f5", */}
      {/*     borderRadius: "0.2rem", */}
      {/*     padding: "0.5rem", */}
      {/*     border: "none", */}
      {/*     fontFamily: "Lato", */}
      {/*     fontSize: "1.2rem", */}
      {/*     cursor: "pointer", */}
      {/*     color: "#000", */}
      {/*   }} */}
      {/* > */}
      {/*   Get started */}
      {/* </button> */}
    </Box>
  );
};
