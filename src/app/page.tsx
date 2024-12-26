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
    <div className="flex gap-3 w-full px-4 pt-20 pb-4">
      {/* Left sidebar */}
      <div className="w-[250px] h-full border-r border-neutral-800 pr-4 overflow-auto">
        <FieldListings />
      </div>

      {/* dynamic components */}
      <If condition={formFields.length > 0}>
        <Then>
          <div className="grid grid-cols-2 gap-8 w-full h-full overflow-auto">
            <div className="">{/* Draggable Area */}</div>
            <div className="">
              <Preview />
            </div>
          </div>
        </Then>
        <Else>
          <div className="flex w-full justify-center">
            <EmptyListSvg className="h-[1em] text-[251px]" />
          </div>
        </Else>
      </If>
    </div>
  );
}
