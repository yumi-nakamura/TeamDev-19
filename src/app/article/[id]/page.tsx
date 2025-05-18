import React from "react";
import ArticleDetail from "@/components/ArticleDetail";
import Header from "@/components/Header";

export default async function ArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <>
      <Header />
      <ArticleDetail id={id} />
    </>
  );
}
