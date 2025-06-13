"use client";

import { BubblesBackground, LinesBackground } from "@/components/AnimatedBackground";
import { BottomNav } from "@/components/BottomNav";
import { usePathname } from "next/navigation";

interface LayoutClientProps {
    children: React.ReactNode;
}

export default function LayoutClient({ children }: LayoutClientProps) {
    const pathname = usePathname();
    const isAuth = pathname.startsWith("/auth");

    if (isAuth) {
        return (
            <>
                <div>
                    <LinesBackground />
                </div>

                <div className="relative min-h-screen">
                    <main>{children}</main>
                </div>
            </>
        )
    }

    return (
        <div className="relative overflow-hidden">
            <div className="theme-default">
                <BubblesBackground />
            </div>

            <div className="relative min-h-screen">
                <main className="relative space-y-24 px-16 mt-8 pb-20">{children}</main>
                <BottomNav />
            </div>
        </div>
    );
}

