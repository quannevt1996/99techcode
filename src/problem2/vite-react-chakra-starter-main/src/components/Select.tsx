"use client";

import { HStack, createListCollection, Input } from "@chakra-ui/react";
import { Avatar } from "@/components/ui/avatar";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { useState } from "react";
import { Option } from "@/types/option";

function SelectValueItem({ name }: { name?: string }) {
  return (
    <SelectValueText placeholder={name}>
      {(items: Array<{ name: string; avatar: string }>) => {
        const { name, avatar } = items[0];
        return (
          <HStack>
            <Avatar name={name} size="xs" src={avatar} />
            {name}
          </HStack>
        );
      }}
    </SelectValueText>
  );
}

interface Props {
  value?: string;
  name?: string;
  options?: (Option<string> & { iconUrl?: string })[];
  placeholder?: string;
  handleChange?: (value?: string) => void;
}

export default function Select({
  value,
  name,
  options,
  handleChange,
  placeholder,
}: Props) {
  const [searchString, setSearchString] = useState<string>("");

  const collection = createListCollection({
    items: (options || []).map((option) => {
      return {
        name: option.label,
        id: option.value,
        avatar: option.iconUrl,
      };
    }),
    itemToString: (item) => item.name,
    itemToValue: (item) => item.id,
  });

  return (
    <SelectRoot
      collection={collection}
      size="lg"
      defaultValue={[options?.[0].value] as string[]}
      positioning={{ sameWidth: true }}
      inputMode="search"
      onValueChange={(e) => {
        if (handleChange) handleChange(e.value[0]);
      }}
      value={value ? [value] : ([options?.[0].value] as string[])}
    >
      <SelectLabel>{name}</SelectLabel>
      <SelectTrigger>
        <SelectValueItem name={placeholder} />
      </SelectTrigger>
      <SelectContent portalled={false}>
        <Input
          placeholder="Search for currency"
          border={"none"}
          outline={"none"}
          py={4}
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        />
        {collection.items
          .filter((item) => item.name.includes(searchString))
          .map((item) => (
            <SelectItem item={item} key={item.id} justifyContent="flex-start">
              <Avatar name={item.name} src={item.avatar} size="xs" />
              {item.name}
            </SelectItem>
          ))}
      </SelectContent>
    </SelectRoot>
  );
}
