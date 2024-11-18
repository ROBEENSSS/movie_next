import type { Metadata } from "next";
import React from "react";
import HeaderComponent from "@/components/HeaderComponent";


export const metadata: Metadata = {
  title: "Movie",
  description: "",
};

type Props = Readonly<{children: React.ReactNode}>

const RootMovie = ({children}: Props) => {
  return (
    <html lang="en">
      <body>
      <HeaderComponent/>
        {children}
      </body>
    </html>
  );
};

export default RootMovie;