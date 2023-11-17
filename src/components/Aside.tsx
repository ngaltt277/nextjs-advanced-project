"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

enum PathnameEnum {
  Admin = "/admin",
  Products = "/admin/products",
  Keys = "/admin/keys",
  Customers = "/admin/customers",
}

export default function Aside() {
  const pathname = usePathname();

  const getClassName = (value: string) => {
    return `w-full flex items-center space-x-2 ${
      pathname === value
        ? "bg-gray-200 text-gray-800"
        : "text-gray-500 dark:text-white"
    } hover:bg-gray-200 dark:hover:text-gray-800 active:bg-gray-300 py-2 px-2 rounded-lg `;
  };

  const items = useMemo(
    () => [
      {
        label: "Home",
        path: PathnameEnum.Admin,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className=" w-4 h-4"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
        ),
      },
      {
        label: "Products",
        path: PathnameEnum.Products,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className=" w-4 h-4"
          >
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
          </svg>
        ),
      },
      {
        label: "Customers",
        path: PathnameEnum.Customers,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className=" w-4 h-4"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        ),
      },
      {
        label: "Keys",
        path: PathnameEnum.Keys,
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className=" w-4 h-4"
          >
            <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path>
            <path d="M13 5v2"></path>
            <path d="M13 17v2"></path>
            <path d="M13 11v2"></path>
          </svg>
        ),
      },
    ],
    []
  );

  return (
    <aside className="sticky top-0 h-screen w-56 bg-gray-100 text-gray-800 p-4 dark:bg-gray-800 dark:text-white">
      <div className="flex items-center mb-4 space-x-1">
        <h1 className="text-2xl mb-4">Dashboard</h1>
      </div>
      <nav className="space-y-2">
        {items.map((item) => (
          <Link
            key={item.label}
            href={item.path}
            className={getClassName(item.path)}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
}
