import React from "react";

function SideBarBusStopLoading() {
  return (
    <div className="rounded-md p-2 max-w-sm w-full mx-auto">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded bg-slate-200 w-1/5 h-14 rounded"></div>
        <div className="flex-1 space-y-4 py-1">
          <div className="h-6 bg-slate-200 rounded"></div>
          <div className="space-y-3">
            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBarBusStopLoading;
