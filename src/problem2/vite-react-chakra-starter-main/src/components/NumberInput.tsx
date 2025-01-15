import { ChangeEventHandler } from "react";
import { Box, Field, Input, defineStyle } from "@chakra-ui/react";
import { useColorMode } from "./ui/color-mode";

interface Props {
  name?: string;
  value?: number;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  isDisabled?: boolean;
  initialRef?: React.LegacyRef<HTMLInputElement>;
}

const MyNumberInput: React.FC<Props> = ({
  name,
  value,
  handleChange,
  isDisabled,
  initialRef,
}) => {
  const { colorMode } = useColorMode();
  return (
    <Field.Root>
      <Box pos="relative" w="full">
        <Input
          className="peer"
          placeholder=""
          onChange={handleChange}
          value={value || 0}
          disabled={isDisabled}
          ref={initialRef}
          py={5}
        />
        <Field.Label
          css={floatingStyles}
          bg={colorMode === "dark" ? "gray.900" : "white"}
        >
          {name}
        </Field.Label>
      </Box>
    </Field.Root>
  );
};

const floatingStyles = defineStyle({
  pos: "absolute",
  px: "0.5",
  top: "-3",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    top: "2.5",
    insetStart: "3",
    zIndex: 5,
  },
  _peerFocusVisible: {
    top: "-3",
    insetStart: "2",
    zIndex: 5,
  },
});

export default MyNumberInput;
