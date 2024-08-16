export default function ImageCarousel({ images }) {
  return (
    <div>
      {images.map(({ alt, src }) => (
        <img key={src} alt={alt} src={src} width="100%" />
      ))}
    </div>
  );
}
