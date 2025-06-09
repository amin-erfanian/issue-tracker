import Link from "next/link";
import React from "react";

const Issues = () => {
  return (
    <div>
      <Link
        href="/issues/new"
        className="py-2 px-4 rounded-md bg-violet-400 text-white"
      >
        new issue
      </Link>
    </div>
  );
};

export default Issues;
