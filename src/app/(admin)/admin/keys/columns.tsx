"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CompleteSubscription } from "@/lib/db/schema/subscriptions";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

const renderInfoDetail = (label: string, value: any) => {
  return (
    <div className="grid grid-cols-3 items-center gap-4">
      <div className="font-semibold text-sm">{label}</div>
      <div className="col-span-2 text-sm">{value}</div>
    </div>
  );
};

export const columns: ColumnDef<CompleteSubscription>[] = [
  {
    accessorKey: "id",
    header: "Key",
  },
  {
    accessorKey: "user",
    header: "Customer Name",
    cell: ({ row }) => {
      const {
        user: { id, firstName, lastName },
      } = row.original;

      return (
        <Popover>
          <PopoverTrigger className="flex items-center gap-2">
            {firstName + " " + lastName}
            <Button variant="ghost" size="sm" className="rounded-full">
              <TriangleDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Customer</h4>
                <hr />
              </div>
              <div className="grid gap-2">
                {renderInfoDetail("ID", id)}
                {renderInfoDetail("First Name", firstName)}
                {renderInfoDetail("Last Name", lastName)}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      );
    },
  },
  {
    accessorKey: "product",
    header: "Product Name",
    cell: ({ row }) => {
      const {
        product: { name, price, description },
      } = row.original;
      return (
        <Popover>
          <PopoverTrigger className="flex items-center gap-2">
            {name}
            <Button variant="ghost" size="sm" className="rounded-full">
              <TriangleDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Product</h4>
                <hr />
              </div>
              <div className="grid gap-2">
                {renderInfoDetail("Name", name)}
                {renderInfoDetail("Price", price)}
                {renderInfoDetail("Description", description)}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      );
    },
  },
  {
    accessorKey: "createdDate",
    header: "Subcribed Date",
    cell: ({ row }) => row.original.createdDate?.toLocaleDateString("en-us"),
  },
  {
    accessorKey: "expiredDate",
    header: "Expired Date",
    cell: ({ row }) => row.original.expiredDate?.toLocaleDateString("en-us"),
  },
];
