

import type { Metadata } from "next";
import React from "react";
import Header from "@/components/Header/Header";


export const metadata: Metadata = {
  title: "Movie",
  description: "",
};

type Props = Readonly<{children: React.ReactNode}>

const RootMovie = ({children}: Props) => {


  return (
    <html lang="en">
      <body>
      <Header/>
        {children}
      </body>
    </html>
  );
};

export default RootMovie;