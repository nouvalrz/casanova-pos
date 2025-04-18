"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import clsx from "clsx";

type AppComboboxProps = {
  placeholder: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
  value: string;
};

export const AppCombobox: React.FC<AppComboboxProps> = ({
  placeholder,
  onChange,
  options,
  className,
  value,
}) => {
  const [open, setOpen] = React.useState(false);
  // const [value, setValue] = React.useState("");

  const selected = options.find((option) => option.value === value)?.label;

  const handleSelect = (currentValue: string) => {
    // setValue(currentValue === value ? "" : currentValue);
    onChange(currentValue === value ? "" : currentValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={clsx(
            "justify-between font-normal",
            {
              "text-muted-foreground": !value,
            },
            className
          )}
        >
          {value ? selected : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command
          filter={(value, search) => {
            if (
              options
                .find((item) => item.value === value)
                ?.label.toLowerCase()
                .includes(search.toLowerCase())
            ) {
              return 1;
            }
            return 0;
          }}
        >
          <CommandInput placeholder="Cari Kategori..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    handleSelect(currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
