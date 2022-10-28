import { Box, BoxProps } from "@chakra-ui/layout";
import { useClipboard } from "@chakra-ui/react";
import { Tooltip } from "@chakra-ui/tooltip";

type CopyProps = {
  labelBeforeCopy?: string;
  labelAfterCopy?: string;
  copy: string;
} & BoxProps;

export default function Copy({
  labelBeforeCopy = "Copy to clipboard",
  labelAfterCopy = "Copied!",
  copy,
  children,
  onClick,
  ...rest
}: CopyProps) {
  const { hasCopied, onCopy } = useClipboard(copy);
  return (
    <Tooltip
      hasArrow
      isOpen={hasCopied ? hasCopied : undefined}
      label={hasCopied ? labelAfterCopy : labelBeforeCopy}
    >
      <Box
        cursor="pointer"
        onClick={(event) => {
          onCopy();
          if (onClick !== undefined) {
            onClick(event);
          }
        }}
        {...rest}
      >
        {children}
      </Box>
    </Tooltip>
  );
}
