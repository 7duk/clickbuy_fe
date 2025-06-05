import React, { memo } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = memo(() => {
  return (
    <main className="flex-1 flex flex-col w-full overflow-auto">
      <Outlet />
    </main>
  );
});

export default MainLayout;
