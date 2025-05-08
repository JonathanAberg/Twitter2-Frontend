# Twitter clone

For placeholders: https://placehold.co/

## Dependencies

To run this part of the twitter clone you must install the following dependencies:

### Core Dependencies

```bash
npm install react react-dom
```

### Routing

```bash
npm install react-router-dom
```

### Icons

```bash
npm install react-icons
```

### Optional Dependencies

```bash
# For advanced date formatting
npm install date-fns

# For styling options
npm install styled-components

# For API calls
npm install axios

# For state management (if needed later)
npm install @reduxjs/toolkit react-redux
```

## Terminal Location

You should run all installation and development commands from the root of your project directory:

```bash
cd /Users/jonathanaberg/Developer/Twitter Grupparbete//
```

From this location, you can run `npm install` to install dependencies and `npm run dev` to start the development server.

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Project Structure

- `/src/components` - Reusable components (Tweet, ProfileHeader, etc.)
- `/src/pages` - Main page components
- `/src/styles` - CSS files for styling
- `/src/mockData.js` - Mock data for development

## Beskrivning av Twitter-klonen

### Övergripande projektstruktur

#### Projektarkitektur

- **Ramverk**: React med Vite som byggverktyg
- **Styling**: CSS-moduler och variabelbaserat temastöd (ljust/mörkt läge)
- **Struktur**: Komponentbaserad uppdelning med återanvändbara UI-element

### Huvudkomponenter

#### Tweet-komponenten

```jsx
const Tweet = ({ tweet }) => {
  const [likes, setLikes] = useState(tweet.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [retweets, setRetweets] = useState(tweet.retweets);
  const [isRetweeted, setIsRetweeted] = useState(false);

  // Interaktionshantering...
};
```

"Tweet-komponenten är en av de viktigaste byggblocken i vår Twitter-klon. Den hanterar visning av individuella inlägg med följande funktioner:

- Använder React Hooks (useState) för att hantera lokalt tillstånd för likes och retweets
- Renderar användarens profilbild, namn och användarnamn
- Visar inläggets innehåll och eventuella bifogade medier
- Implementerar interaktiva knappar för likes, retweets, kommentarer och delning
- Uppdaterar visuellt när användaren interagerar med inlägget"

#### Temahantering

```jsx
// ThemeContext.jsx och ThemeToggle.jsx
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(getSavedTheme);
  // ...
};
```

"Jag har implementerat ett komplett temastöd i appen genom Context API:

- En ThemeContext som lagrar och hanterar det aktuella temat (ljust eller mörkt)
- CSS-variabler i theme.css för konsekvent styling genom hela appen
- En ThemeToggle-komponent för enkel växling mellan teman
- Persistent lagring av användarens temainställning i localStorage
- Automatisk detektion av systemets temainställning vid första besöket"

#### Profilsidan

```jsx
// ProfilePage.jsx
const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("tweets");
  const [filteredTweets, setFilteredTweets] = useState([]);
  const [userData, setUserData] = useState(mockUserData);

  // Filtrering av tweets baserat på flik...
};
```

"Profilsidan samlar flera komponenter för att visa användares profiler:

- Visar användarens profilbild, omslagsbild, bio och följarstatistik
- Implementerar flikbaserad navigering för att visa olika kategorier av inlägg
- Filtrerar tweets baserat på aktiv flik (tweets, svar, media, likes)
- Innehåller en modal för att redigera profilinformation
- Använder React state för att hantera UI-uppdateringar när användaren interagerar med sidan"

### Tekniska lösningar

#### Responsiv design

"Jag har byggt gränssnittet med responsivitet i åtanke:

- Flexibel layout som anpassar sig till olika skärmstorlekar
- CSS-variabler för konsekvent styling och enkla temajusteringar
- Mobilanpassad interaktion för grundläggande Twitter-funktionalitet"

#### Mockdata och utvecklingsmiljö

"För att underlätta utveckling tills vi har en backend har jag:

- Skapat en mockData-modul med exempelanvändare och tweets
- Implementerat filtreringsfunktioner som efterliknar server-side filtrering
- Använt debuggläge för att visualisera applikationsflödet under utveckling"

#### Komponentstruktur

"För att göra koden underhållbar och skalbar har jag:

- Delat upp användargränssnittet i återanvändbara komponenter
- Använt props för att skicka data mellan komponenter
- Implementerat centraliserad tillståndshantering där det behövs
- Skapat väl avgränsade komponenter med tydliga ansvarsområden"
