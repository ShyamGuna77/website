

import { Header } from "./Header";
import { Footer } from "./Footer";
import { ReactNode } from "react";


export function Layout ({children} :{children:ReactNode}){
    return (
      <>
        <div className="fixed inset-0 flex ">
          <div>
            <div />
          </div>
        </div>
        <div className="relative flex w-full flex-col">
          <Header />
          <main className="flex-auto">{children}</main>
          <Footer />
        </div>
      </>
    );
}