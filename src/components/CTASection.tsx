import Link from "next/link";

export default function CTASection() {
  return (
    <section className="background_video_cta_variation relative py-[120px] md:py-[200px] bg-black text-foreground overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-b from-black via-[#050510] to-black flex items-center justify-center">
          <div className="text-white/[0.03] text-[clamp(80px,12vw,180px)] font-bold select-none tracking-[-0.04em]">
            CLM
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1340px] mx-auto px-[25px] text-center">
        <h2 className="font-[family-name:var(--font-heading)] text-[clamp(36px,5vw,72px)] font-semibold leading-[1.05] tracking-[-0.02em] mb-6 max-w-[800px] mx-auto">
          准备好了吗？
        </h2>
        <p className="font-[family-name:var(--font-text)] text-[clamp(16px,1.4vw,22px)] text-foreground/40 mb-10 max-w-[500px] mx-auto leading-[1.4]">
          让我们一起用 AI 的力量，创造下一个让人惊叹的作品。
        </p>
        <Link
          href="/contact"
          className="btn btn-primary btn-fill inline-block rounded-full border-2 border-white px-8 py-4 font-[family-name:var(--font-text)] text-[16px] font-medium text-foreground hover:bg-white hover:text-black transition-all duration-300"
        >
          <span className="fill-overlay bg-white" />
          <span>开启对话 →</span>
        </Link>
      </div>
    </section>
  );
}
