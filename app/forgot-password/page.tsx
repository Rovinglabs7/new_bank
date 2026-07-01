import { Metadata } from "next";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | Praevor",
  description: "Reset your Praevor account password.",
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
