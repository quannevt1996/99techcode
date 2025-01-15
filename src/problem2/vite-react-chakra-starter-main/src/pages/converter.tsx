import { useRef, useEffect, useState, useCallback } from "react";
import {
  Box,
  Center,
  Flex,
  IconButton,
  Stack,
  StatLabel,
  Skeleton,
  Text,
  StatRoot,
  StatValueText,
} from "@chakra-ui/react";
import { LuArrowUpDown } from "react-icons/lu";
import NumberInput from "@/components/NumberInput";
import SelectInput from "@/components/Select";
import currencyData from "@/lib/currencies.json";
import { CurrencyOption, Option } from "@/types/option";
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import styles from "./converter.module.css";

const currencies = (function () {
  if (!currencyData?.length) return [];
  const currencyMap = new Map<string, (typeof currencyData)[0]>();

  currencyData.forEach((entry) => {
    const existingEntry = currencyMap.get(entry.currency);

    // Check if current entry is more recent or if there's no existing entry
    if (!existingEntry || new Date(entry.date) > new Date(existingEntry.date)) {
      currencyMap.set(entry.currency, entry);
    }
  });

  const newData = Array.from(currencyMap.values());
  return newData.map((c) => ({
    label: c.currency,
    value: c.currency.toLowerCase(),
    iconUrl: `assets/tokens/${c.currency}.svg`,
    price: c.price,
  }));
})();

const getConvertedValue = (
  amount?: number,
  fromPrice = 0,
  toPrice = 0
): number => {
  if (!amount || !fromPrice || !toPrice) return 0;
  return amount * (toPrice / fromPrice);
};

export default function Converter() {
  const { colorMode } = useColorMode();
  const initialRef = useRef<HTMLInputElement>(null);

  const [firstCurrency, setFirstCurrency] = useState<CurrencyOption>(
    currencies[0]
  );

  const [secondCurrency, setSecondCurrency] = useState<CurrencyOption>(
    currencies[1]
  );

  const [firstCurrencyValue, setFirstCurrencyValue] = useState(1);
  const [secondCurrencyValue, setSecondCurrencyValue] = useState(
    getConvertedValue(1, firstCurrency.price, secondCurrency.price)
  );

  const [isConverting, setIsConverting] = useState<boolean>(true);

  const handleCurrencyChange = (
    callback: (v: Option<string>) => void,
    value?: string
  ) => {
    const currency = currencies.find((c) => c.value === value);
    if (currency) callback(currency);
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value || isNaN(parseFloat(e.target.value))) {
      setFirstCurrencyValue(0);
    } else {
      setFirstCurrencyValue(parseFloat(e.target.value));
    }
  };

  const handleSwapCurrencies = useCallback(() => {
    if (isConverting) return;
    setFirstCurrency(secondCurrency);
    setSecondCurrency(firstCurrency);
  }, [isConverting, secondCurrency, firstCurrency, firstCurrencyValue]);

  useEffect(() => {
    if (initialRef?.current) initialRef.current.focus();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConverting(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    setSecondCurrencyValue(
      getConvertedValue(
        firstCurrencyValue,
        secondCurrency.price,
        firstCurrency.price
      )
    );
  }, [firstCurrencyValue, secondCurrency.price, firstCurrency.price]);

  return (
    <Box
      backgroundColor={
        colorMode === "dark" ? ["gray.800", "gray.900"] : ["white", "gray.50"]
      }
    >
      <title>Currency Converter</title>
      <meta name="description" content="Currency converter using API" />
      <link rel="icon" href="/favicon.ico" />

      <Box as="main">
        <Flex
          direction="column"
          align="center"
          justify="center"
          height={"50vh"}
        >
          <Text as="h1" fontSize={["2xl", "4xl", "5xl"]} mb={3} zIndex={100}>
            Currency Converter
          </Text>
          <Stack
            backgroundColor={colorMode === "dark" ? "gray.900" : "white"}
            borderRadius={5}
            px={10}
            py={[8, 12]}
            gap={3}
            shadow={[null, "md"]}
            width={["auto", "400px"]}
          >
            <Box>
              <NumberInput
                name="Amount"
                value={firstCurrencyValue}
                handleChange={(value) => {
                  handleValueChange(value);
                }}
                initialRef={initialRef}
              />
            </Box>
            <Box ml={1}>
              <SelectInput
                options={currencies}
                value={firstCurrency.value}
                name="From"
                handleChange={(value) =>
                  handleCurrencyChange(setFirstCurrency, value)
                }
                placeholder="Select Currency"
              />
            </Box>

            <Center>
              <IconButton
                variant="ghost"
                aria-label="Settings"
                onClick={handleSwapCurrencies}
                className={styles.rotating}
                size={"2xl"}
              >
                <LuArrowUpDown />
              </IconButton>
            </Center>

            <Box ml={1} mt={-6}>
              <SelectInput
                options={currencies.filter(
                  (c) => c.value !== firstCurrency.value
                )}
                value={secondCurrency.value}
                name="To"
                handleChange={(value) =>
                  handleCurrencyChange(setSecondCurrency, value)
                }
                placeholder="Select Currency"
              />
            </Box>
            <Box>
              <StatRoot
                mt={2}
                padding={[5, 0]}
                borderRadius={[5, 0]}
                borderWidth={[1, 0]}
                borderColor={useColorModeValue(
                  ["gray.200"],
                  ["whiteAlpha.50", "transparent"]
                )}
              >
                <Skeleton loading={isConverting}>
                  <StatLabel mb={"2px"} css="">
                    {`${firstCurrencyValue} ${firstCurrency.label} = `}
                  </StatLabel>
                </Skeleton>
                <Skeleton loading={isConverting}>
                  <StatValueText fontSize={["xl", "2xl"]} mb={"2px"}>
                    {secondCurrencyValue} {secondCurrency.label}
                  </StatValueText>
                </Skeleton>
              </StatRoot>
            </Box>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
}
