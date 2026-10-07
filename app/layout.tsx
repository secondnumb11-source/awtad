import type {Metadata} from "next";
import type {ReactNode} from "react";

export const metadata:Metadata={
  title:"أوتاد",
  description:"منصة أوتاد لإدارة رأس المال البشري والعمليات المرتبطة بالموظفين"
};

export default function RootLayout({children}:{children:ReactNode}){
  return <html lang="ar" dir="rtl"><body>{children}</body></html>;
}
