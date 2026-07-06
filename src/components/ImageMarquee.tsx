const MARQUEE_IMAGES = [
  { src: "https://grzpj.vercel.app/images/marquee/01.png", alt: "轮播图 01" },
  { src: "https://grzpj.vercel.app/images/marquee/02.png", alt: "轮播图 02" },
  { src: "https://grzpj.vercel.app/images/marquee/03.png", alt: "轮播图 03" },
  { src: "https://grzpj.vercel.app/images/marquee/04.png", alt: "轮播图 04" },
  { src: "https://grzpj.vercel.app/images/marquee/05.png", alt: "轮播图 05" },
  { src: "https://grzpj.vercel.app/images/marquee/06.jpg", alt: "轮播图 06" },
  { src: "https://grzpj.vercel.app/images/marquee/07.jpg", alt: "轮播图 07" },
  { src: "https://grzpj.vercel.app/images/marquee/08.jpg", alt: "轮播图 08" },
];

export default function ImageMarquee() {
  const images = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES];

  return (
    <section className="py-10 bg-background text-foreground overflow-hidden">
      <div className="relative w-full" style={{ height: "340px" }}>
        <div
          className="flex gap-1 absolute"
          style={{
            animation: "marqueeScroll 40s linear infinite",
            width: "max-content",
          }}
        >
          {images.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[604px] h-[340px] bg-neutral-200 dark:bg-[#1a1a1a] rounded-md overflow-hidden"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
