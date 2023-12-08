"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Feature } from "@/lib/db/schema/features";
import { CompleteProduct } from "@/lib/db/schema/products";
import { CheckCircleIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

type Props = {
  product: CompleteProduct;
};

export default function ProductCard({ product }: Props) {
  const t = useTranslations("Product");

  return (
    <Card className="flex flex-col dark:border-white">
      <CardHeader className="mt-2">
        <CardTitle>
          <Link href={`/${product.id}`}>
            <Button variant="link" className="text-lg p-0">
              {product.name}
            </Button>
          </Link>
        </CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="mt-2 mb-8">
          <h3 className="font-bold">
            <span className="text-3xl">${product.price / 100}</span> /
            {t("year")}
          </h3>
          {product.features.slice(0, 3).map((feature: Feature) => (
            <div className="mt-4 flex gap-2" key={feature.id}>
              <CheckCircleIcon className="text-green-600" />
              <span className="text-base">{feature.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-end justify-center">
        <Link href={`/${product.id}`}>
          <Button className="text-center" variant="default">
            Order
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
