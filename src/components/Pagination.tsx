"use client";
import React, { FC } from "react";

type Props = {
  totalPages: number;
  pageSize: number; // 1ページあたりの記事数
  currentPage: number; // 親から渡された現在のページ番号
  onPageChange?: (page: number, startIndex: number, endIndex: number) => void;
};

const Pagination: FC<Props> = ({ totalPages, pageSize, currentPage, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    // 内部状態を更新せず、親のonPageChangeを呼び出す
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize - 1, totalPages * pageSize - 1);
    onPageChange?.(page, startIndex, endIndex);
  };

  const prevPage = () => goToPage(currentPage - 1);
  const nextPage = () => goToPage(currentPage + 1);

  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center w-full">
      {/* ←Previous Page */}
      <button
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`min-w-8 h-8 border border-transparent bg-transparent font-bold text-gray-900 px-6 py-2 transition-all duration-100 active:text-xs active:text-gray-400 active:font-semibold focus:outline-none focus:ring-0 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : "opacity-100"
        } justify-self-start`}
      >
        ← Previous Page
      </button>

      {/* ページ番号群を中央揃え */}
      <div className="flex justify-center">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={`w-8 h-8 mx-1 rounded-full border focus:outline-none focus:ring-0 transition-all duration-100 ${
              page === currentPage
                ? "border-2 border-gray-800 bg-gray-800 text-white"
                : "border border-gray-300 bg-white text-black"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Page→ */}
      <button
        onClick={nextPage}
        disabled={currentPage === totalPages}
        className={`min-w-8 h-8 border border-transparent bg-transparent font-bold text-gray-900 px-6 py-2 transition-all duration-100 active:text-xs active:text-gray-400 active:font-semibold focus:outline-none focus:ring-0 ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed" : "opacity-100"
        } justify-self-end`}
      >
        Next Page →
      </button>
    </div>
  );
};

export default Pagination;
