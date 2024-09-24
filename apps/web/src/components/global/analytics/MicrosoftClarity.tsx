import Script from 'next/script';

export default function MicrosoftClarity() {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
    return null;
  }

  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: `(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "o74q4pirft")`,
      }}
      id="microsoft-clarity"
      strategy="afterInteractive"
    />
  );
}
