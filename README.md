# Webshop med Stripe

# Beskrivning 
Jag har skapat en webbshop där det går att lägga en order och genomföra en betalning med integration med Stripe. Man kan registrera sig och logga in. När man registrerar sig skapas en kund i Stripe samt  sparas i server/db/customers.json. Inloggning hanteras med hjälp av cookies och alla produkter hanteras genom Stripe.
Servern är byggd med nodeJS / express och client är byggt med React och TypeScript.
CSS för detta projekt är gjord dels egen CSS och med hjälp av MaterialUI. Applikationen är byggd för att passa desktop.

I applikationen visas en startskärm där det går att registrera sig samt logga in. Samtliga produkter från Stripe visas och går att lägga till i kundkorgen. Produkter som lagts till i kundkorgen visas när man klickar på den. Om användaren är inloggad visas knappen “Go to Checkout” -  denna knapp tar kunden vidare till Stripes checkout. Om användaren inte är inloggad går det inte att gå vidare till checkout. 

# Installation
- Se till att ha NodeJS installerat. Börja annars med att installera det enligt NodeJS dokumentation https://nodejs.org/en
- Kopiera sedan repot från GitHub https://github.com/isabellapresto/stripenew.git
- Klona ner repot på din dator såhärt:  
- git clone https://github.com/isabellapresto/stripenew.git
- Öppna upp projektet i editor Visual Studio Code för att direkt härifrån nå Terminalen.

**Server**
- Öppna en Terminal
- Navigera till server-mappen genom kommandot: cd server
- Kör kommandot: npm install
- Starta sedan servern genom något av följande kommandon: npm start (för att dra igång servern mot node server.js) eller: npm run dev för att köra med nodemon server.js
 
Servern är nu igång
 
**Client**
- Öppna en till Terminal
- Navigera till client-mappen genom kommandot: cd client
- Kör kommandot: npm install
- När installationen är klar, kör kommandot: npm run dev
 
Projektet är nu uppe och snurrar på localhost och du kan se applikationen i din webbläsare.
