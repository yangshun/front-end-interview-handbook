import Script from 'next/script';

import gdprCountryCodes from '../hiring/gdprCountries';

type Props = Readonly<{
  countryCode: string;
}>;

export default function SmartLook({ countryCode }: Props) {
  if (gdprCountryCodes.has(countryCode)) {
    return null;
  }

  return (
    <Script id="smartlook" type="text/javascript">
      {`window.smartlook||(function(d) {
    var o=smartlook=function(){ o.api.push(arguments)},h=d.getElementsByTagName('head')[0];
    var c=d.createElement('script');o.api=new Array();c.async=true;c.type='text/javascript';
    c.charset='utf-8';c.src='https://web-sdk.smartlook.com/recorder.js';h.appendChild(c);
    })(document);smartlook('init', 'd85c735d2ace56279232d15db29502c8bc533ca2', { region: 'eu' });`}
    </Script>
  );
}
