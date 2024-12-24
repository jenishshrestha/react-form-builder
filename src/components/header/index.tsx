//core
import { FC } from "react";
import Link from "next/link";

// library
import { GitHubLogoIcon } from "@radix-ui/react-icons";

/**
 * ===============================================================================
 * Header Component
 * @returns
 * ===============================================================================
 */
const Header: FC = () => {
  return (
    <header
      role="banner"
      className="p-4 border-b border-gray-100 border-opacity-10"
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">
          <Link href="/" aria-label="Homepage">
            ReactFormBuilder
          </Link>
        </div>
        <nav
          role="navigation"
          aria-label="Main navigation"
          className="flex gap-6 items-center"
        >
          <Link
            href="https://ui.shadcn.com/docs/installation/next"
            target="_blank"
            aria-label="Install ShadCN/UI"
          >
            Install shadcn/ui
          </Link>
          <Link
            href="https://github.com/jenishshrestha/react-form-builder"
            target="_blank"
            className="text-white text-lg flex p-2 border border-[#262626] rounded-full hover:text-gray-400 transition-all"
            aria-label="Go to GitHub repository"
          >
            <GitHubLogoIcon className="h-[1em] text-lg w-auto" />
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
