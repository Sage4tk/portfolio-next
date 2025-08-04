"use client";

import { useRouter } from "next/navigation";
import ContactForm from "./ContactForm";

interface ContactFormWrapperProps {
  isOpen: boolean;
}

export default function ContactFormWrapper({
  isOpen,
}: ContactFormWrapperProps) {
  const router = useRouter();

  const handleClose = () => {
    router.push("?");
  };

  return <>{isOpen && <ContactForm />}</>;
}
