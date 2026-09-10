import { Metadata } from "next";
import { LegalDocumentLayout } from "@/components/legal/LegalDocumentLayout";
import GdprRequestClient from "./GdprRequestClient";

export const metadata: Metadata = {
  title: "Exercitarea Drepturilor GDPR — AIR",
  description:
    "Formular oficial și protocol de transmitere a cererilor de acces, rectificare, ștergere sau portabilitate a datelor conform Regulamentului UE 2016/679.",
};

export default function GdprRequestsPage() {
  return (
    <LegalDocumentLayout
      titleRo="Exercitarea Drepturilor Persoanelor Vizate (GDPR)"
      titleEn="Data Subject Rights Protocol & Submission Portal"
      documentNumber="DOC-10 // GDPR-RIGHTS"
      category="PROTECȚIA DATELOR (GDPR)"
    >
      <GdprRequestClient />
    </LegalDocumentLayout>
  );
}
