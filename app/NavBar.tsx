"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";

const NavBar = () => {
  const navItems = [
    {
      label: "Dashboard",
      link: "/",
    },
    {
      label: "Issues",
      link: "/issues",
    },
  ];

  const currentPathname = usePathname();
  return (
    <div className="flex items-center space-x-6 px-5 h-14 border-b border-b-gray-200">
      <div>
        <AiFillBug />
      </div>
      <ul className="flex items-center space-x-4">
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.link}
              className={classNames({
                "text-blue-400": currentPathname === item.link,
                "text-gray-500": currentPathname !== item.link,
                "hover:text-gray-800 transition-colors": true,
              })}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NavBar;
