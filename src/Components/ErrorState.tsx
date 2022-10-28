import { Center, Text, VStack } from "@chakra-ui/react";
import { Browser, Ghost } from "react-kawaii";
import Copy from "./Copy";
import * as JSONType from "src/Lib/JSON";

export default function ErrorState({
  error,
  character = "ghost",
  colorScheme = "gray",
}: {
  character?: "ghost" | "browser" | "none";
  colorScheme?: "gray" | "whiteAlpha" | "red";
  error: unknown;
}): JSX.Element {
  let errorInfo: JSX.Element;

  if (error instanceof Error) {
    errorInfo = (
      <ErrorBox
        kind="Error"
        title={error.name}
        message={error.message}
        colorScheme={colorScheme}
      />
    );
  } else {
    errorInfo = (
      <ErrorBox
        kind="UnknownError"
        title={"Unknown Error"}
        message={error + ""}
        colorScheme={colorScheme}
      />
    );
  }

  if (character === "ghost") {
    return (
      <VStack alignContent={"center"} justifyContent="center">
        <Ghost size={240} mood="ko" color="#E0E4E8" />
        {errorInfo}
      </VStack>
    );
  } else if (character === "browser") {
    return (
      <VStack alignContent={"center"} justifyContent="center">
        <Browser size={240} mood="ko" color="#E0E4E8" />
        {errorInfo}
      </VStack>
    );
  } else {
    return errorInfo;
  }
}

function ErrorBox(props: {
  kind: string;
  title: string;
  message: string;
  extra?: JSONType.JSONObject;
  colorScheme: "gray" | "whiteAlpha" | "red";
}): JSX.Element {
  const value: JSONType.JSONObject = {
    kind: props.kind,
    title: props.title,
    message: props.message,
    extra: props.extra,
  };

  let bg = "gray.100";
  let hoverBg = "gray.200";

  if (props.colorScheme === "whiteAlpha") {
    bg = "whiteAlpha.700";
    hoverBg = "whiteAlpha.900";
  } else if (props.colorScheme === "red") {
    bg = "red.100";
    hoverBg = "red.200";
  }

  return (
    <Copy copy={JSON.stringify(value)}>
      <VStack
        bg={bg}
        spacing={4}
        rounded={16}
        padding={3}
        alignItems="start"
        _hover={{
          bg: hoverBg,
          cursor: "pointer",
        }}
      >
        <VStack alignItems="start" spacing={1}>
          <Text fontSize={12}>{props.kind}</Text>
          <Text fontSize={24}>{props.title}</Text>
        </VStack>
        <Center width="100%">
          <Text>{props.message}</Text>
        </Center>
      </VStack>
    </Copy>
  );
}
