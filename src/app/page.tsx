"use client";

import { If, Then, Else } from "react-if";

import FieldListings from "@/components/form/field-listing";

//context
import { useAppContext } from "@/context/AppContextProvider";

// assets
import EmptyListSvg from "@/assets/oc-thinking.svg";
import Preview from "@/components/form/preview";

/**
 * ===============================================================================
 * Homepage componenet
 * ===============================================================================
 * @returns
 */
export default function Home() {
  const { formFields } = useAppContext();

  return (
    <div className="flex gap-3 w-full px-4 py-20">
      {/* Left sidebar */}
      <div className="w-[250px] h-full border-r border-neutral-800 pr-4 overflow-auto">
        <FieldListings />
      </div>

      {/* dynamic components */}
      <If condition={formFields.length > 0}>
        <Then>
          <div className="flex w-full h-full overflow-auto">
            <div className="w-1/2 basis-auto flex-shrink-0 flex-grow-0">
              {/* Draggable Area */}
            </div>
            <div className="w-1/2 basis-auto flex-shrink-0 flex-grow-0">
              <Preview />
            </div>
          </div>
        </Then>
        <Else>
          <div className="flex w-full items-center justify-center">
            <EmptyListSvg className="h-[1em] text-[251px]" />
          </div>
        </Else>
      </If>
    </div>
  );
}
