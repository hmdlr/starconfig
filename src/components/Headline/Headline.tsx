import { Flex, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import './Headline.css';

interface HeadlineProps {
  imgSrc: string;
  headline: string;
}

export const Headline = (props: HeadlineProps) => {
  const {
    imgSrc,
    headline
  } = props;

  const headlineColor = useColorModeValue("#000", "#fff");

  return (
    <Flex
      gap={'0.5rem'}
      mb={'1rem'}
    >
      <img src={imgSrc} alt="👾"/>
      <h1
        color={headlineColor}
        className={'headline'}
      >
        {headline}
      </h1>
    </Flex>
  )
}
