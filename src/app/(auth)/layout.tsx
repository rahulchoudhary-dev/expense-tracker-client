import MinimalLayout from "@/components/layouts/MinimalLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MinimalLayout>{children}</MinimalLayout>;
}
