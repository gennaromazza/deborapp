\# TECH ARCHITECTURE — VITE REACT



\## STACK



\- Vite

\- React

\- TypeScript



\---



\## ROUTING



\- /

\- /world/:id

\- /backpack

\- /trophy



\---



\## DATA MODEL



WordItem:



\- id

\- word

\- translation

\- image

\- world

\- audioText



\---



\## STATE



UserProgress:



\- collectedWords

\- backpackItems

\- unlockedWorlds



\---



\## COMPONENTI



\- WorldMap

\- WordCard

\- Backpack

\- DropZone

\- AudioButton

\- RewardPopup



\---



\## LOGICA ZAINO



\- drag → drop

\- aggiunta item

\- animazione



\---



\## STORAGE



localStorage:



\- progressi

\- parole raccolte



\---



\## PERFORMANCE



\- lazy loading mondi

\- immagini leggere

\- evitare re-render inutili



\---



\## ANTI-HALLUCINATION



\- NON introdurre backend

\- NON usare database

\- NON creare sistemi non richiesti



\---



\## PERSEVERANCE



Se qualcosa non funziona:

\- semplificare

\- mantenere UX funzionante



\---



\## AUDIT



\- build funziona? (SI/NO)

\- app offline base? (SI/NO)

\- localStorage attivo? (SI/NO)

