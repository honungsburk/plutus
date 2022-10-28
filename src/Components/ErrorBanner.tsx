import { HStack, Text, Spinner } from "@chakra-ui/react";

export type CriticalError = {
  title: string;
  message: string;
  action: string;
};

export function ErrorBanner({
  err,
  size = "lg",
}: {
  err: CriticalError;
  size?: "sm" | "md" | "lg";
}): JSX.Element {
  const showMessage = size === "lg";
  return (
    <HStack
      width={"100%"}
      bgColor={"red.100"}
      p={2}
      rounded={8}
      color="red.600"
      borderWidth={"2px"}
      borderColor="red.300"
      justify={"space-between"}
    >
      <HStack>
        <Text>{err.title}</Text>
        {showMessage && <Text>-</Text>}
        {showMessage && <Text>{err.message}</Text>}
      </HStack>
      <HStack>
        <Text>{err.action}</Text>
        <Spinner speed="0.8s" size={"sm"} />
      </HStack>
    </HStack>
  );
}
