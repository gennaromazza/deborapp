# Template per nuovi prodotti

Per creare un nuovo prodotto, segui questi passi:

## 1. Copia la cartella template

Copia questa cartella `templates` e rinominala con il nome del tuo prodotto, ad esempio:

```
cp -r templates ../nuovo-prodotto
```

## 2. Configura i dati del prodotto

Modifica `data/chapters.js` con:
- I tuoi capitoli (id, titolo, emoji)
- I tuoi badge
- I tuoi personaggi

## 3. Aggiungi il contenuto

Modifica `data/content.js` con:
- Le pagine di ogni capitolo
- Ogni pagina può essere:
  - `story`: solo testo narrativo
  - `activity`: testo + esercizio
  - `checklist`: lista di controllo
  - `challenge`: sfida finale con badge

## 4. Registra il prodotto nel router

Apri `ProductRouter.jsx` e aggiungi il tuo prodotto:

```javascript
import NuovoProdotto from './nuovo-prodotto'

const productComponents = {
  'libro-matematica-volume-1': LibroMatematicaVolume1,
  'nuovo-prodotto': NuovoProdotto,  // <-- Aggiungi qui
}
```

## 5. Crea il prodotto nel database Supabase

Il `productId` che usi nel router deve corrispondere a un prodotto nella tabella `products` di Supabase.
