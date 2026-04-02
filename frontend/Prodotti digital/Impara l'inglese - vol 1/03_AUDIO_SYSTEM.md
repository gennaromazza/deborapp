\# AUDIO SYSTEM — TTS STRATEGY



\## APPROCCIO



USARE:

SpeechSynthesis (Web Speech API)



NON usare:

\- API a pagamento

\- backend TTS



\---



\## OBIETTIVO



Riprodurre:

\- parola

\- parola lenta

\- frase semplice



\---



\## LOGICA



1\. controllare voci disponibili

2\. selezionare:

&#x20;  - en-GB preferito

&#x20;  - fallback en-US

3\. riprodurre audio



\---



\## BROWSER CONSIGLIATO



\- Windows: Edge

\- fallback: Chrome



\---



\## VOICE CHECK



Se non esiste voce inglese:

mostrare messaggio:



"Per una migliore esperienza audio usa Edge o installa una voce inglese"



\---



\## PARAMETRI AUDIO



\- rate: 0.85 - 0.95

\- pitch: 1.0 - 1.1

\- volume: 1



\---



\## MODALITÀ AUDIO



\### WORD

"apple"



\### SLOW

"aaaapple"



\### SENTENCE

"It's an apple"



\---



\## FALLBACK



Se TTS non disponibile:

\- mostrare testo

\- NON crashare



\---



\## ANTI-HALLUCINATION



\- NON usare API esterne

\- NON salvare audio lato server

\- NON creare sistemi complessi inutili



\---



\## PERSEVERANCE



Se voice non trovata:

\- usare prima disponibile in inglese

\- se assente → fallback UI



\---



\## AUDIT



\- TTS funziona su Chrome? (SI/NO)

\- TTS funziona su Edge? (SI/NO)

\- voce inglese trovata? (SI/NO)

\- fallback attivo? (SI/NO)

