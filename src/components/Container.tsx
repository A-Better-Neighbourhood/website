/** @format */

import React, { PropsWithChildren } from "react";

interface ContainerProps extends PropsWithChildren {
  className?: string;
}

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={`px-2 sm:px-8 md:px-16 lg:px-32 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
