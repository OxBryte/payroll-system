import Features from "../ui/Features";
import Hero from "../ui/Hero";

export default function Home() {
  return (
    <div>
      <div className="min-h-[90dvh] flex bg-gradient-to-b from-white to-purple-50 items-center justify-center">
        <Hero />
      </div>
      <Features />
    </div>
  );
}
