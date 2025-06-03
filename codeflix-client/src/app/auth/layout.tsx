import { User } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      <div className="mx-auto min-w-[40rem]">
        <User className="w-32 h-32 mx-auto mb-6 animate-pulse" />
        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 mb-6">
          {children}
        </div>
      </div>
    </div>
  );
}
