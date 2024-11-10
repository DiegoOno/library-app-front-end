"use client";
import React, { memo } from "react";
import Layout from "@/components/layout";

const withLayout = (Component: React.ComponentType) => {
  // eslint-disable-next-line react/display-name, @typescript-eslint/no-explicit-any
  const MemoizedComponent = memo((componentProps: any) => {
    return (
      <Layout>
        <Component {...componentProps} />
      </Layout>
    );
  }); // Add a display name here

  return MemoizedComponent;
};

export default withLayout;
