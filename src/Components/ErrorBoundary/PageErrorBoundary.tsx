import { Heading, VStack, Text, Spacer } from "@chakra-ui/react";
import React from "react";
import ErrorState from "../ErrorState";
import BasicErrorBoundary from "./BasicErrorBoundary";

export default class PageErrorBoundary extends BasicErrorBoundary {
  constructor(props: any) {
    super(props);
  }

  render(): React.ReactNode {
    if (this.state.error !== undefined) {
      // You can render any custom fallback UI
      return (
        <VStack spacing={8}>
          <Heading>The app crashed!</Heading>
          <ErrorState
            error={this.state.error}
            colorScheme="red"
            character="browser"
          />
        </VStack>
      );
    }

    // @ts-ignore
    return this.props.children as any;
  }
}