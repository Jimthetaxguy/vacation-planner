// ═══════════════════════════════════════════
// GETAWAY — Data Layer
// All destination data for snow + warm modes
// ═══════════════════════════════════════════

const SNOW_DESTINATIONS = [
  {
    id: "jackson-hole",
    name: "Jackson Hole",
    location: "Teton Village, Wyoming",
    lat: 43.5877, lng: -110.828,
    ikonAccess: "Unlimited",
    closingDate: "Apr 12",
    season: { total: 311, unit: "in" },
    base: { depth: 99, unit: "in", label: "Summit" },
    lifts: { open: 11, total: 13 },
    trails: { open: 99, total: 130, pctOpen: 76 },
    conditions: "Wind-blown powder upper, packed powder lower",
    tempF: { summit: 24, mid: 37, base: 48 },
    forecast: "Snow arriving — storm cycle through weekend. 1\" overnight, more Sat-Mon.",
    notes: "Leading western US in season snowfall at 311\" summit. Rendezvous Music Festival Mar 28. JH Downhill race Mar 13–15.",
    flights: { est: "$350–500 RT", airline: "Delta via SLC", direct: false, time: "~5h" },
    hotels: [
      { name: "Hotel Terra (Tribute)", rate: "$400–600/nt", bonvoy: true },
      { name: "Four Seasons JH", rate: "$800+/nt", bonvoy: false }
    ],
    dining: "The Rose, Persephone Bakery, Cafe Genevieve, Snake River Grill",
    village: "Teton Village has shops, bars, dining at the base. Town of Jackson is 15 min drive — excellent restaurant scene.",
    estBudgetPerNight: 600,
    estFlightPP: 425
  },
  {
    id: "aspen",
    name: "Aspen Snowmass",
    location: "Aspen, Colorado",
    lat: 39.1911, lng: -106.8175,
    ikonAccess: "Unlimited",
    closingDate: "Apr 19 (Aspen Mtn)",
    season: { total: "53\" base (Snowmass)", unit: "" },
    base: { depth: 53, unit: "in", label: "Snowmass Base" },
    lifts: { open: 31, total: 38 },
    trails: { open: 322, total: 363, pctOpen: 89 },
    conditions: "Groomed, spring corn developing by afternoon",
    tempF: { summit: null, mid: null, base: null },
    forecast: "Sunny spring days. 7–9\" last 7 days. Most terrain open in Colorado.",
    notes: "4 mountains, most terrain open in CO. Alex Ferreira celebration Sat. Buttermilk closes Apr 5. Great village scene.",
    flights: { est: "$350–550 RT", airline: "Delta via DEN to ASE", direct: false, time: "~6h" },
    hotels: [
      { name: "The Limelight (Marriott)", rate: "$500–800/nt", bonvoy: true },
      { name: "W Aspen", rate: "$700+/nt", bonvoy: true }
    ],
    dining: "Matsuhisa, Ajax Tavern, Element 47, White House Tavern, Bosq",
    village: "One of the best ski town village experiences in North America. Walkable, world-class dining, galleries, nightlife.",
    estBudgetPerNight: 750,
    estFlightPP: 450
  },
  {
    id: "mammoth",
    name: "Mammoth Mountain",
    location: "Mammoth Lakes, California",
    lat: 37.6308, lng: -118.9923,
    ikonAccess: "Unlimited",
    closingDate: "June (TBD)",
    season: { total: 244, unit: "in" },
    base: { depth: 76, unit: "in", label: "Main Lodge" },
    lifts: { open: 24, total: 25 },
    trails: { open: 175, total: 180, pctOpen: 97 },
    conditions: "Hard/fast morning, softening afternoon (spring)",
    tempF: { summit: null, mid: null, base: 45 },
    forecast: "Sunny, H: 45–48°F. No new snow in forecast — classic spring.",
    notes: "February was exceptional (87\" at Main Lodge). 97% terrain open. Runs through June. 9 terrain parks open.",
    flights: { est: "$300–450 RT", airline: "Delta/United to MMH or LAX+drive", direct: false, time: "~6–7h" },
    hotels: [
      { name: "The Westin Monache", rate: "$300–500/nt", bonvoy: true },
      { name: "Mammoth Mountain Inn", rate: "$200–350/nt", bonvoy: false }
    ],
    dining: "The Mogul, Petra's, Campo, Good Life Cafe, Toomey's",
    village: "Small-town vibe with growing food scene. Village at Mammoth has shops and restaurants. Not as walkable as Aspen but charming.",
    estBudgetPerNight: 450,
    estFlightPP: 375
  },
  {
    id: "zermatt",
    name: "Zermatt",
    location: "Zermatt, Valais, Switzerland",
    lat: 46.0207, lng: 7.7491,
    ikonAccess: "7 days (Ikon Full)",
    closingDate: "Year-round (glacier)",
    season: { total: 111, unit: "in" },
    base: { depth: 40, unit: "in", label: "Top Lift" },
    lifts: { open: null, total: 54 },
    trails: { open: null, total: 360, pctOpen: null },
    conditions: "Light snow top, freeze-thaw base",
    tempF: { summit: 10, mid: 21, base: 32 },
    forecast: "MAJOR STORM: 13\" Sat + 10\" Sun at mid-mountain. 26\" total in 7 days.",
    notes: "Major powder dump incoming Mar 14–15. Year-round glacier skiing. Cervinia (Italy) on same pass. Car-free village. Delta companion cert NOT valid for Europe.",
    flights: { est: "$700–1100 RT", airline: "Delta/Swiss to ZRH + train", direct: false, time: "~10–12h" },
    hotels: [
      { name: "The Omnia", rate: "CHF 500–800/nt", bonvoy: false },
      { name: "Grand Hotel Zermatterhof", rate: "CHF 600+/nt", bonvoy: false }
    ],
    dining: "Chez Vrony (on-mountain), Whymper Stube, Snowboat, After the Race Bar",
    village: "Iconic car-free alpine village. Stunning Matterhorn views. World-class dining and après. One of the best village experiences globally.",
    estBudgetPerNight: 900,
    estFlightPP: 900
  },
  {
    id: "big-sky",
    name: "Big Sky",
    location: "Big Sky, Montana",
    lat: 45.2838, lng: -111.4013,
    ikonAccess: "Unlimited",
    closingDate: "Apr 26",
    season: { total: "62\" base (122% avg)", unit: "" },
    base: { depth: 62, unit: "in", label: "Base" },
    lifts: { open: 35, total: 40 },
    trails: { open: 246, total: 320, pctOpen: 77 },
    conditions: "Cloudy, wind grooming. 34°F mid-mountain.",
    tempF: { summit: null, mid: 34, base: null },
    forecast: "3\" Saturday, more Mon. Storm arriving. Powder Alert issued Mar 13.",
    notes: "Base at 122% of March 13 average. Lone Peak Tram open. 5,850 skiable acres — largest in US. Less village vibe but improving.",
    flights: { est: "$350–500 RT", airline: "Delta via MSP to BZN", direct: false, time: "~6h" },
    hotels: [
      { name: "Huntley Lodge (Big Sky Resort)", rate: "$250–400/nt", bonvoy: false },
      { name: "Residence Inn Big Sky", rate: "$200–350/nt", bonvoy: true }
    ],
    dining: "Lone Peak Brewery, Lotus Pad, Andiamo, Everett's 8800 (on-mountain)",
    village: "Emerging village — Town Center has restaurants and shops. Not as developed as Aspen or JH. More of a resort experience.",
    estBudgetPerNight: 400,
    estFlightPP: 425
  },
  {
    id: "steamboat",
    name: "Steamboat",
    location: "Steamboat Springs, Colorado",
    lat: 40.4572, lng: -106.8045,
    ikonAccess: "Unlimited",
    closingDate: "Apr 19",
    season: { total: 155, unit: "in" },
    base: { depth: 36, unit: "in", label: "Mid Mountain" },
    lifts: { open: 18, total: 23 },
    trails: { open: 166, total: 184, pctOpen: 90 },
    conditions: "Packed Powder. Night skiing available.",
    tempF: { summit: 28, mid: 36, base: 40 },
    forecast: "3–6\" possible Sat night. Then very warm week (upper 40s–50s). Full spring.",
    notes: "Champagne Powder® trademark. Night skiing 5:30–8:30pm. 71% of 30-year median snowpack — below avg but 90% runs open. Warm spring pattern coming.",
    flights: { est: "$350–500 RT", airline: "Delta via DEN to HDN", direct: false, time: "~6h" },
    hotels: [
      { name: "Steamboat Grand (Marriott)", rate: "$250–400/nt", bonvoy: true },
      { name: "The Lodge at Steamboat", rate: "$200–350/nt", bonvoy: false }
    ],
    dining: "Cafe Diva, Aurum, Laundry Kitchen & Cocktails, Ore House",
    village: "Authentic Western town feel. Lincoln Ave has shops, bars, and restaurants. Hot springs (Old Town). Great family vibe.",
    estBudgetPerNight: 400,
    estFlightPP: 425
  },
  {
    id: "palisades",
    name: "Palisades Tahoe",
    location: "Olympic Valley, California",
    lat: 39.1968, lng: -120.2354,
    ikonAccess: "Unlimited",
    closingDate: "TBD (typically April)",
    season: { total: 278, unit: "in" },
    base: { depth: 34, unit: "in", label: "Palisades Base" },
    lifts: { open: 29, total: 39 },
    trails: { open: 139, total: 296, pctOpen: 47 },
    conditions: "Machine groomed, variable off-piste. Spring.",
    tempF: { summit: null, mid: null, base: 53 },
    forecast: "Warming trend. H: 48–59°F through Mon. No snow in forecast.",
    notes: "Only 47% trails open but 84% terrain accessible. KT-22 and Aerial Tram open. 278\" season total is strong. Race events in progress.",
    flights: { est: "$250–400 RT", airline: "Delta to RNO + 45min drive", direct: true, time: "~6h" },
    hotels: [
      { name: "Resort at Squaw Creek (Marriott)", rate: "$300–500/nt", bonvoy: true },
      { name: "PlumpJack Inn", rate: "$250–400/nt", bonvoy: false }
    ],
    dining: "PlumpJack Cafe, Le Chamois, Trokay, Wolfdale's (Tahoe City)",
    village: "The Village at Palisades has restaurants, shops, ice rink. Lake Tahoe towns nearby (Tahoe City, Truckee) add great dining/culture.",
    estBudgetPerNight: 450,
    estFlightPP: 325
  },
  {
    id: "chamonix",
    name: "Chamonix",
    location: "Chamonix, Haute-Savoie, France",
    lat: 45.9237, lng: 6.8694,
    ikonAccess: "7 days (Ikon Full, via CMBV)",
    closingDate: "Late Apr/May (Grands Montets)",
    season: { total: "208cm at 2758m", unit: "" },
    base: { depth: 82, unit: "in", label: "Le Couvercle 2758m" },
    lifts: { open: null, total: null },
    trails: { open: null, total: 170, pctOpen: null },
    conditions: "Spring freeze-thaw lower; full winter above 2500m",
    tempF: { summit: 14, mid: 28, base: 36 },
    forecast: "Storm approaching Alps for mid-March — significant fresh snow expected for Mont Blanc massif.",
    notes: "Multi-mountain valley: Brévent, Flégère, Grands Montets, Balme, Les Houches. Vallée Blanche accessible with guides. Delta companion cert NOT valid for Europe. Deep bases from Feb storms.",
    flights: { est: "$700–1000 RT", airline: "Delta to GVA + 1h transfer", direct: false, time: "~10h" },
    hotels: [
      { name: "Le Refuge des Aiglons", rate: "€200–350/nt", bonvoy: false },
      { name: "Grand Hôtel des Alpes", rate: "€300–500/nt", bonvoy: false }
    ],
    dining: "La Cabane, Munchie, Poco Loco, Le Cap Horn, Le Panier des 4 Saisons",
    village: "Legendary alpine town. Vibrant pedestrian center, excellent restaurants, bars, shops. One of the most authentic mountain towns in the world.",
    estBudgetPerNight: 700,
    estFlightPP: 850
  }
];

const WARM_DESTINATIONS = [
  {
    id: "turks-caicos", name: "Turks & Caicos", region: "Caribbean", lat: 21.7741, lng: -72.2857,
    summary: "World-class turquoise water with surprisingly strong restaurant scene. Grace Bay is consistently ranked among the world's best beaches.",
    weather: { highF: 84, lowF: 74, oceanF: 79, rain: "Low (end of dry season)" },
    flights: { est: "$400–600 RT", airline: "Delta JFK–PLS direct", time: "3.5h", companionCert: true },
    hotels: [{ name: "The Ritz-Carlton, Turks & Caicos", rate: "$1,200–1,800/nt", bonvoy: true }, { name: "The Palms Turks and Caicos", rate: "$600–900/nt", bonvoy: false }],
    dining: "Coco Bistro, Da Conch Shack, Infiniti, Grace's Cottage, Kalooki's",
    activities: "Snorkeling at Smith's Reef, stand-up paddleboarding, Chalk Sound kayaking, boat tour to private islands",
    bestFor: "Beach perfection, luxury, great food",
    estBudgetPerNight: 800, estFlightPP: 500
  },
  {
    id: "anguilla", name: "Anguilla", region: "Caribbean", lat: 18.2206, lng: -63.0686,
    summary: "Low-key Caribbean luxury. 33 pristine beaches, outstanding food scene per capita, no cruise ships. The anti-St. Martin.",
    weather: { highF: 84, lowF: 76, oceanF: 80, rain: "Very low" },
    flights: { est: "$400–550 RT to SXM + ferry", airline: "Delta JFK–SXM + 20min ferry", time: "4h total", companionCert: true },
    hotels: [{ name: "Aurora Anguilla Resort (Marriott Autograph)", rate: "$800–1,200/nt", bonvoy: true }, { name: "Malliouhana", rate: "$900+/nt", bonvoy: false }],
    dining: "Blanchard's, Jacala Beach, Hibernia, Veya, Straw Hat",
    activities: "Beach hopping, sunset sailing, snorkeling Shoal Bay, heritage tours, live music at Bankie Banx's Dune Preserve",
    bestFor: "Quiet luxury, world-class dining, pristine beaches",
    estBudgetPerNight: 900, estFlightPP: 475
  },
  {
    id: "barbados", name: "Barbados", region: "Caribbean", lat: 13.1939, lng: -59.5432,
    summary: "Rich culture meets stunning beaches. Oistins fish fry, rum distilleries, vibrant Bridgetown. More personality than most Caribbean islands.",
    weather: { highF: 86, lowF: 75, oceanF: 80, rain: "Low" },
    flights: { est: "$450–700 RT", airline: "JetBlue/American JFK–BGI direct", time: "4.5h", companionCert: false },
    hotels: [{ name: "Hilton Barbados Resort", rate: "$300–500/nt", bonvoy: false }, { name: "Sandals Barbados", rate: "$500+/nt (AI)", bonvoy: false }],
    dining: "Oistins Friday Night Fish Fry, The Cliff, Champers, Tapas, Naru",
    activities: "Harrison's Cave, Mount Gay rum distillery, surfing at Bathsheba, catamaran cruises, swimming with sea turtles",
    bestFor: "Culture + beach, food lovers, authentic Caribbean",
    estBudgetPerNight: 500, estFlightPP: 575
  },
  {
    id: "aruba", name: "Aruba", region: "Caribbean", lat: 12.5211, lng: -69.9683,
    summary: "Reliably sunny (outside hurricane belt), windsurfing mecca, great nightlife, and a surprising food scene on Palm Beach.",
    weather: { highF: 88, lowF: 78, oceanF: 80, rain: "Very low (desert island)" },
    flights: { est: "$350–550 RT", airline: "Delta/JetBlue JFK–AUA direct", time: "4.5h", companionCert: true },
    hotels: [{ name: "The Ritz-Carlton Aruba", rate: "$600–900/nt", bonvoy: true }, { name: "Hyatt Regency Aruba", rate: "$400–600/nt", bonvoy: false }],
    dining: "Barefoot, Gasparito, The Old Man and the Sea, Yemanja Woodfired Grill, Infini",
    activities: "Natural Pool hike, windsurfing/kiteboarding, Arikok National Park, flamingo beach, sunset sailing",
    bestFor: "Guaranteed sun, active beach, nightlife",
    estBudgetPerNight: 600, estFlightPP: 450
  },
  {
    id: "tulum", name: "Tulum", region: "Mexico", lat: 20.2115, lng: -87.4654,
    summary: "Bohemian-chic beach town with Mayan ruins, cenotes, and a restaurant scene that rivals major cities. Jungle meets Caribbean.",
    weather: { highF: 87, lowF: 73, oceanF: 80, rain: "Low (dry season)" },
    flights: { est: "$300–500 RT", airline: "Delta JFK–CUN + 2h drive", time: "5h total", companionCert: true },
    hotels: [{ name: "Kempinski Hotel Cancun (Marriott)", rate: "$400–600/nt", bonvoy: false }, { name: "Papaya Playa Project", rate: "$300–500/nt", bonvoy: false }],
    dining: "Hartwood, Arca, MUME, Kitchen Table, Raw Love",
    activities: "Cenote swimming (Gran Cenote, Cenote Dos Ojos), Tulum ruins, Sian Ka'an biosphere, snorkeling reef",
    bestFor: "Boho-chic, cenotes, ruins, Instagram-worthy",
    estBudgetPerNight: 450, estFlightPP: 400
  },
  {
    id: "oaxaca", name: "Oaxaca City", region: "Mexico", lat: 17.0732, lng: -96.7266,
    summary: "Mexico's culinary capital. Colonial architecture, mezcal, mole, indigenous textiles, art galleries. One of the world's great food cities.",
    weather: { highF: 86, lowF: 57, oceanF: null, rain: "Very low (dry season)" },
    flights: { est: "$350–550 RT", airline: "Delta via MEX to OAX", time: "~7h", companionCert: true },
    hotels: [{ name: "Quinta Real Oaxaca", rate: "$200–350/nt", bonvoy: false }, { name: "Hotel Palacio Borghese", rate: "$150–250/nt", bonvoy: false }],
    dining: "Los Danzantes, Casa Oaxaca, Criollo (Enrique Olvera protege), Itanoni, La Biznaga",
    activities: "Monte Albán ruins, mezcal distillery tours, Hierve el Agua petrified waterfalls, textile workshops, cooking classes",
    bestFor: "Food lovers, culture, artisan crafts, value",
    estBudgetPerNight: 300, estFlightPP: 450
  },
  {
    id: "san-miguel", name: "San Miguel de Allende", region: "Mexico", lat: 20.9144, lng: -100.7452,
    summary: "UNESCO World Heritage colonial town. Cobblestone streets, art galleries, rooftop bars, hot springs. Mexico's most beautiful town.",
    weather: { highF: 82, lowF: 52, oceanF: null, rain: "Very low" },
    flights: { est: "$350–550 RT", airline: "Delta via MEX or DFW to BJX", time: "~7h", companionCert: true },
    hotels: [{ name: "Rosewood San Miguel", rate: "$500–800/nt", bonvoy: false }, { name: "Belmond Casa de Sierra Nevada", rate: "$400–700/nt", bonvoy: false }],
    dining: "Moxi, Aperi, Lavanda, The Restaurant at Rosewood, Café Rama",
    activities: "Hot air balloon rides, hot springs at La Gruta, artisan market, cooking classes, wine tasting (Guanajuato vineyards)",
    bestFor: "Romance, architecture, art, food",
    estBudgetPerNight: 500, estFlightPP: 450
  },
  {
    id: "sayulita", name: "Sayulita", region: "Mexico", lat: 20.8684, lng: -105.4410,
    summary: "Laid-back surf town north of Puerto Vallarta. Colorful streets, taco stands, great waves, and a relaxed vibe. Mexico's best beach town.",
    weather: { highF: 85, lowF: 66, oceanF: 78, rain: "Very low (dry season)" },
    flights: { est: "$300–450 RT", airline: "Delta JFK–PVR direct", time: "5h", companionCert: true },
    hotels: [{ name: "Villa Amor", rate: "$200–350/nt", bonvoy: false }, { name: "Playa Escondida", rate: "$250–400/nt", bonvoy: false }],
    dining: "Don Pedro's, Sayulita Cafe, ChocoBanana, Mary's, Tierra Viva",
    activities: "Surfing, whale watching (tail end of season), Islas Marietas snorkeling, jungle hiking, yoga retreats",
    bestFor: "Surf, chill vibes, budget-friendly, taco paradise",
    estBudgetPerNight: 300, estFlightPP: 375
  },
  {
    id: "amalfi", name: "Amalfi Coast", region: "Europe", lat: 40.6340, lng: 14.6027,
    summary: "Iconic Italian coastline — Positano, Amalfi, Ravello. Pre-peak season in early April means fewer crowds, mild weather, and blooming lemon groves.",
    weather: { highF: 63, lowF: 50, oceanF: 60, rain: "Moderate (spring showers)" },
    flights: { est: "$550–900 RT", airline: "Delta JFK–NAP direct", time: "9h", companionCert: false },
    hotels: [{ name: "NH Collection Grand Hotel Convento di Amalfi", rate: "€300–500/nt", bonvoy: false }, { name: "Hotel Santa Caterina", rate: "€400–700/nt", bonvoy: false }],
    dining: "La Sponda (Positano), Il Ritrovo (Montepertuso), Da Adolfo, Ristorante Max, Lo Smeraldino",
    activities: "Path of the Gods hike, Ravello gardens, boat tour to Capri, limoncello tasting, cooking classes",
    bestFor: "Romance, hiking, Italian food, shoulder season value",
    estBudgetPerNight: 600, estFlightPP: 725
  },
  {
    id: "lisbon", name: "Lisbon", region: "Europe", lat: 38.7223, lng: -9.1393,
    summary: "One of Europe's coolest cities. Pastéis de nata, fado music, street art, tile-covered buildings. Affordable and endlessly walkable.",
    weather: { highF: 66, lowF: 52, oceanF: 60, rain: "Moderate" },
    flights: { est: "$450–700 RT", airline: "Delta/TAP JFK–LIS direct", time: "7h", companionCert: false },
    hotels: [{ name: "The Ritz Four Seasons Lisbon", rate: "€350–600/nt", bonvoy: false }, { name: "Marriott Lisbon", rate: "€150–250/nt", bonvoy: true }],
    dining: "Belcanto (Michelin), Time Out Market, Cervejaria Ramiro, Ponto Final, A Cevicheria",
    activities: "Tram 28, Belém Tower, Alfama neighborhood, day trip to Sintra, wine tasting in Alentejo",
    bestFor: "City culture, food, nightlife, value for Europe",
    estBudgetPerNight: 350, estFlightPP: 575
  },
  {
    id: "santorini", name: "Santorini", region: "Europe", lat: 36.3932, lng: 25.4615,
    summary: "Iconic white-and-blue caldera views. Pre-season in early April means mild weather, open restaurants, and zero cruise ship crowds.",
    weather: { highF: 64, lowF: 52, oceanF: 62, rain: "Low (end of wet season)" },
    flights: { est: "$600–900 RT", airline: "Delta via ATH to JTR", time: "~12h", companionCert: false },
    hotels: [{ name: "Mystique (Marriott Luxury Collection)", rate: "€500–900/nt", bonvoy: true }, { name: "Canaves Oia Suites", rate: "€400–700/nt", bonvoy: false }],
    dining: "Selene, Ammoudi Fish Taverna, Metaxi Mas, Aktaion, Salt & Sea Oia",
    activities: "Caldera sunset (Oia), volcanic hot springs boat tour, wine tasting (Assyrtiko), hike Fira to Oia, Akrotiri ruins",
    bestFor: "Romance, photography, pre-season calm, sunsets",
    estBudgetPerNight: 600, estFlightPP: 750
  },
  {
    id: "charleston", name: "Charleston, SC", region: "US", lat: 32.7765, lng: -79.9311,
    summary: "America's most charming city. James Beard Award-winning restaurants, historic architecture, cobblestone streets, and warm Southern hospitality.",
    weather: { highF: 74, lowF: 55, oceanF: 65, rain: "Low" },
    flights: { est: "$200–350 RT", airline: "Delta JFK–CHS direct", time: "2h", companionCert: true },
    hotels: [{ name: "The Spectator Hotel (Marriott)", rate: "$300–500/nt", bonvoy: true }, { name: "Hotel Bennett", rate: "$400–600/nt", bonvoy: false }],
    dining: "FIG, Husk, The Ordinary, Edmund's Oast, Rodney Scott's BBQ, Le Farfalle",
    activities: "Historic district walking tours, Fort Sumter, Folly Beach, plantation gardens, horse-drawn carriage tours",
    bestFor: "Food capital, history, Southern charm, easy weekend trip",
    estBudgetPerNight: 400, estFlightPP: 275
  },
  {
    id: "maui", name: "Maui", region: "US", lat: 20.7984, lng: -156.3319,
    summary: "Diverse island: world-class beaches, Road to Hana, Haleakala sunrise, whale watching (tail end), and farm-to-table dining.",
    weather: { highF: 82, lowF: 67, oceanF: 76, rain: "Low (dry season starting)" },
    flights: { est: "$500–750 RT", airline: "Delta JFK–OGG (1 stop)", time: "~11h", companionCert: true },
    hotels: [{ name: "The Ritz-Carlton Kapalua", rate: "$700–1,200/nt", bonvoy: true }, { name: "Andaz Maui at Wailea", rate: "$500–800/nt", bonvoy: false }],
    dining: "Mama's Fish House, Merriman's, Lineage, Star Noodle, Monkeypod Kitchen",
    activities: "Road to Hana, Haleakala sunrise, snorkeling Molokini, whale watching (last weeks), zip-lining",
    bestFor: "Adventure + beach, diverse landscapes, bucket list",
    estBudgetPerNight: 700, estFlightPP: 625
  }
];

// Combine for comparison tool
const ALL_DESTINATIONS = [
  ...SNOW_DESTINATIONS.map(d => ({ ...d, type: "snow" })),
  ...WARM_DESTINATIONS.map(d => ({ ...d, type: "warm" }))
];
