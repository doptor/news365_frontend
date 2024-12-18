"use client";

import fetcher from "@/utils/fetcher";
import React, { createContext, ReactNode } from "react";
import useSWR from "swr";

interface WebSettingProviderProps {
  children: ReactNode;
}

export const WebSettingContext = createContext<any>(undefined);

const WebSettingProvider: React.FC<WebSettingProviderProps> = ({
  children,
}) => {
  const {
    data,
    error,
    isLoading,
  }: { data: any; error: any; isLoading: boolean } = useSWR(
    "/web-setting",
    fetcher
  );


  return (
    <WebSettingContext.Provider value={{ data, error, isLoading }}>
      {children}
    </WebSettingContext.Provider>
  );
};

export default WebSettingProvider;
