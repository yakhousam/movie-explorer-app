import React from "react";
import { ExclamationIcon } from "./icons/ExclamationIcon";

type InfoTooltipProps = {
  content: string;
};

export const InfoTooltip = ({ content }: InfoTooltipProps) => {
  return (
    <div className="group relative inline-flex items-center">
      <ExclamationIcon className="relative top-[0.5px] ml-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
      <div className="pointer-events-none absolute bottom-full left-1/2 z-10 w-48 -translate-x-1/2 -translate-y-2 transform rounded-md bg-gray-800 px-3 py-2 text-xs text-gray-200 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <div className="relative">
          {content}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 translate-y-1 transform border-4 border-transparent border-t-gray-800"></div>
        </div>
      </div>
    </div>
  );
};
