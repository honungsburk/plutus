import { Center, Heading, VStack } from "@chakra-ui/react";
import { Browser } from "react-kawaii";

export default function NotFound() {
  return (
    <Center h="90vh" width={"100%"}>
      <VStack>
        <Browser size={200} mood="sad" color="#E0E4E8"></Browser>
        <Heading size={"xl"}>404 - Page Not Found</Heading>
      </VStack>
    </Center>
  );
}
