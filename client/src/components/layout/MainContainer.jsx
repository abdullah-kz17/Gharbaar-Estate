import React from "react";

const MainContainer = ({ children }) => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-20 py-6 max-w-screen-xl mx-auto">
      {children}
    </div>
  );
};

export default MainContainer;
