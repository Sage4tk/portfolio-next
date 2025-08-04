"use client";

import ContactForm from "./ContactForm";

interface ContactFormWrapperProps {
  isOpen: boolean;
}

export default function ContactFormWrapper({
  isOpen,
}: ContactFormWrapperProps) {
  return <>{isOpen && <ContactForm />}</>;
}
