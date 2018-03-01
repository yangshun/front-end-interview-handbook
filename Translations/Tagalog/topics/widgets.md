Mga Widget
==

Narito ang ilang karaniwang nakikitang mga widget / sangkap at ang mga konsiderasyon na dapat nating isaalang-alang kapag iginuhit ang mga ito.

### Autocomplete

Kilala sa tawag na typeahead box.

#### UX

- Mag-type ng isang katamtamang bilang ng mga karakter (karaniwan ay dalawa) para maipakita ang mga resulta. Ito ay dahil ang mga maikling kataga sa paghahanap ay maaaring magresulta sa napakaraming mga tugma at ang mga walang kwenta na resulta ay maaaring ibalik.
- Ang bilang ng mga suhestiyon sa tanong ay dapat panatilihing maikli at ang mga scrollbar ay dapat na iwasan. Ang mas maikling listahan ng mga resulta ay mas madaling pamahalaan at binabawasan nito ang kognitibong bigat sa gumagamit. Kung mayroon kang  mga scrollbar ito ay marahil  nangangahulugang nagpapakita ka ng napakaraming resulta!
- I-highlight ang mga non-search na mga termino (iminungkahing mga termino) sa mga resulta. Ito ay tumutulong sa gumagamit na iibahin ang mga suhestiyon ng autocomplete, para gawing mas madali ang paghahambing.
- Ang mga shortcut sa keyboard na pang-suporta: Pataas / pababa upang mag-navigate at enter upang maghanap.
- Nagpapakita ng isang kasaysayan ng kama-kailan na paghahanap.
- Gumamit ng teksto ng placeholder sapatlang ng input upang turuan ang mga gumagamit, tulad ng "Mag-type upang tingnan ang mga mungkahi".

#### Pagsasagawa

- Gumamit ng pag-window o virtual na listahan kapag masyadong mahaba ang mga resulta ng paghahanap.
- I-debounce ang input ng gumagamit at maghanap lamang kapag huminto ang pag-type ng gumagamit ng ibang oras (karaniwang 300ms).

###### Mga Reperensiya

- https://baymard.com/blog/autocomplete-design

### Carousel

#### UX

- Isaalang-alang ang pag-preload ng ilang mga larawan sa kaliwa o kanan ng ipinapakita na imahe sa panahon ng idle upang ang gumagamit ay magna-navigate, hindi niya na kailangang maghintay pa na ma-download ang imahe.
- Payagan ang kaliwa o kanang pag-navigate ng keyboard ng carousel.

#### Pagsasagawa

- mabagal na pag-load ng mga imahe. I-load lamang ang mga tipo ng gumagamit na may  na posibilidad ng na ito'y kanyang titingnan 
- Kasalukuyang imahe at ilan sa kaliwa at kanan.

### Dropdown

- Ang mga dropdown na ipinapakita sa hover ay hindi kasiya-siya sa mobile na walang hover na kaganapan sa mobile.
- Maaaring mag-iba ang pagpoposisyon ng dropdown batay sa posisyon ng elemento sa screen. Kung ang elemento ay malapit sa gilid at ang ipinapakita na dropdown ay matatakpan sa labas ng viewport, ang posisyon ng dropdown ay maaari at dapat mabago.
- Kung ang taas ng dropdown ay masyadong mahaba, maaari itong pahabain sa labas ng screen. Siguraduhin na gawing pwede sa pag-scroll ang mga nilalaman ng dropdown sa pamamagitan ng pagtatakda ng `max-height`.

### Modal

- Ang mga Modal ay karaniwang maaaring ma-dismiss sa pamamagitan ng pag-click sa backdrop. Kung ang gumagamit ay nakikipag-ugnayan sa nilalaman ng modal sa pamamagitan ng pag-click dito, ang backdrop ay maaaring makatanggap din ng pag-click sa kaganapan at ma-dismiss bilang resulta nito.

###### Mga Reperensiya

- https://css-tricks.com/dangers-stopping-event-propagation/

### Tooltip

-Ang mga tool na ipinapakita sa hover ay hindi kasiya-siya sa mobile kung walang hover na kaganapan sa mobile.
- Maaaring mag-iba ang pagpoposisyon ng tooltip batay sa posisyon ng elemento sa screen. Kung ang elemento ay malapit sa gilid at ang ipinapakita tooltip ay matatakpan sa labas ng viewport, ang posisyon ng tooltip ay maaari at dapat mabago.
