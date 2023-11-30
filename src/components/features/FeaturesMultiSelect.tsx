"use client";
import { X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Command, CommandGroup, CommandItem } from "../ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Feature } from "@/lib/db/schema/features";
import { useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";

type Props = {
  features: Feature[];
  field: any;
};

export function FeaturesMultiSelect({ features, field }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const t = useTranslations("Product");

  const { value: selectedFeatures, onChange: setSelectedFeatures } = field;
  
  const handleUnselect = useCallback((feature: Feature) => {
    setSelectedFeatures(
      selectedFeatures.filter((s: any) => s.id !== feature.id)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            const newSelected = [...selectedFeatures];
            newSelected.pop();
            setSelectedFeatures(newSelected);
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const selectables = features.filter(
    (feature) =>
      !selectedFeatures.some(
        (selectedFeature: any) => selectedFeature.id === feature.id
      )
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selectedFeatures.map((feature: any) => {
            return (
              <Badge key={feature.id} variant="secondary">
                {feature.name}
                <button
                  className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(feature);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(feature)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          {/* Avoid having the "Search" Icon */}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={`${t("selectFeatures")}...`}
            className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
          />
        </div>
      </div>
      <div className="relative mt-2">
        {open && selectables.length > 0 && (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            <CommandGroup className="h-full overflow-auto">
              {selectables.map((feature) => {
                return (
                  <CommandItem
                    key={feature.id}
                    onMouseDown={(e: any) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      setInputValue("");
                      setSelectedFeatures([...selectedFeatures, feature]);
                    }}
                    className={"cursor-pointer"}
                  >
                    {feature.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </div>
        )}
      </div>
    </Command>
  );
}
