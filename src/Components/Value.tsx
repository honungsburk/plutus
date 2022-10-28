import { Center, Text, TextProps } from "@chakra-ui/react";

type ValueProps = StringValueProps | NumberValueProps;

type StringValueProps = {
  format?: "string";
  children?: string;
};

type NumberValueProps = {
  format?: "number";
  children?: number;
};

/**
 * A formated value.
 *
 * @remarks Extends this component rather then creating your own formatting.
 *
 *
 */
export default function Value({
  format,
  children,
  color,
  ...rest
}: ValueProps & Omit<TextProps, "children">): JSX.Element {
  let formatedValue = children + "";

  if (children === undefined) {
    return (
      <Center bg={"orange.100"} p={1} rounded={1}>
        <Text color={"orange.500"} {...rest}>
          undefined
        </Text>
      </Center>
    );
  }

  return (
    <Text color={color} {...rest}>
      {formatedValue}
    </Text>
  );
}
