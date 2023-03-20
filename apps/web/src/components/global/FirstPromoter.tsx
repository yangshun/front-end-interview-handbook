import Script from 'next/script';

export default function FirstPromoter() {
  return (
    <>
      <Script id="first-promoter">
        {`(function(w){w.fpr=w.fpr||function(){w.fpr.q = w.fpr.q||[];w.fpr.q[arguments[0]=='set'?'unshift':'push'](arguments);};})(window);
  fpr("init", {cid:"9rm4n3c5"});fpr("click");`}
      </Script>
      <Script async={true} src="https://cdn.firstpromoter.com/fpr.js"></Script>
    </>
  );
}
