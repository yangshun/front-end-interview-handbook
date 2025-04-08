export default function ImageCarousel({
  images,
}: Readonly<{
  images: ReadonlyArray<{ src: string; alt: string }>;
}>) {
  return (
    <div>
      {images.map(({ alt, src }) => (
        <img key={src} alt={alt} src={src} width="100%" />
      ))}
    </div>
  );
}
