"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const options = [
    // 1.8.9
    {
        value: "1.8.9_win_x64",
        label: "1.8.9 | Windows x64",
    },
    {
        value: "1.8.9_win_x86",
        label: "1.8.9 | Windows x86",
    },
    {
        value: "1.8.9_win_arm64",
        label: "1.8.9 | Windows ARM64",
    },
    {
        value: "1.8.9_mac_x64",
        label: "1.8.9 | macOS (Intel)",
    },
    {
        value: "1.8.9_mac_arm64",
        label: "1.8.9 | macOS (Apple Silicon)",
    },
    {
        value: "1.8.9_linux_x64",
        label: "1.8.9 | Linux x64",
    },
    {
        value: "1.8.9_linux_arm64",
        label: "1.8.9 | Linux ARM64",
    },

    // 1.21.4
    {
        value: "1.21.4_win_x64",
        label: "1.21.4 | Windows x64",
    },
    {
        value: "1.21.4_win_x86",
        label: "1.21.4 | Windows x86",
    },
    {
        value: "1.21.4_win_arm64",
        label: "1.21.4 | Windows ARM64",
    },
    {
        value: "1.21.4_mac_x64",
        label: "1.21.4 | macOS (Intel)",
    },
    {
        value: "1.21.4_mac_arm64",
        label: "1.21.4 | macOS (Apple Silicon)",
    },
    {
        value: "1.21.4_linux_x64",
        label: "1.21.4 | Linux x64",
    },
    {
        value: "1.21.4_linux_arm64",
        label: "1.21.4 | Linux ARM64",
    },
];

export function SCCombobox() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[264px] cursor-pointer text-md bg-gradient-to-b hover:text-gray-400 from-[#3a2a5a] via-[#4a3a6a] to-[#3a2a5a] hover:from-[#4a3a6a] hover:to-[#3a2a5a] border-2 border-gray-950 px-6 py-2.5 rounded-md font-normal text-white shadow-[0_0_20px_-5px_rgba(90,50,150,0.6)] transition-all flex items-center gap-2"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : "Select an option..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
        <PopoverContent className="w-[264px] p-0">
            <Command>
                <CommandInput placeholder="Search a download..." className="h-9" />
                <CommandList>
                    <CommandEmpty>No options found.</CommandEmpty>

                    <CommandGroup heading="Scythe Client 1.8.9">
                        {options
                            .filter((option) => option.value.startsWith("1.8.9"))
                            .map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {option.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                    </CommandGroup>

                    <CommandGroup heading="Scythe Client 1.21.4">
                        {options
                            .filter((option) => option.value.startsWith("1.21.4"))
                            .map((option) => (
                                <CommandItem
                                    key={option.value}
                                    value={option.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {option.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === option.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>
  )
}
