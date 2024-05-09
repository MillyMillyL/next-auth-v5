import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import LoginButton from "@/components/auth/login-button";

const font = Poppins({ subsets: ["latin"], weight: ["600"] });

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200 to to-blue-800">
      <div className="space-y-8 text-center">
        <h1
          className={cn(
            " text-6xl font-semibold text-white drop-shadow-lg",
            font.className
          )}
        >
          Next Auth V5 🔐
        </h1>
        <p className="text-white text-xl">A simple authentication service</p>
        <div>
          <LoginButton>
            <Button size="lg" variant="secondary">
              Sign In
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
