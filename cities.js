// Host-city data. Numbers: [value, label, {decimals, prefix, suffix}]
window.CITIES = [
  {
    id: "atlanta", name: "Atlanta", country: "United States",
    tagline: "Building a cross-sector model for major-event readiness",
    img: "img/atlanta.jpg", alt: "Lamar billboard in Atlanta: Human trafficking has no place in Atlanta",
    headline: [423.96, "M+", 2, "estimated reach and exposure"],
    stats: [
      [13.7, "impressions across 310 IKE smart city digital kiosks", { decimals: 1, suffix: "M" }],
      [3170469, "passengers saw the campaign at Hartsfield-Jackson Airport"],
      [728586, "Lamar billboard impressions"],
      [172565, "Instagram reach"],
      [120, "UPS package cars carrying IAP messaging"],
      [19000, "UPS employees across four facilities saw campaign materials", { suffix: "+" }],
      [167, "Metro Atlanta hotels received materials via IHG and GHLA", { suffix: "+" }],
      [348, "Georgia hoteliers trained through AAHOA"],
      [6, "languages campaign materials were provided in"]
    ],
    body: [
      "It's a Penalty partnered with Wellspring Living and the City of Atlanta Mayor's Office of Violence Reduction, and took part in the Atlanta Alliance Against Trafficking (AAAT) — a cross-sector taskforce of 65+ members created as part of the city's FIFA readiness efforts. AAAT members shaped campaign messaging and design.",
      "The campaign launched at Hartsfield-Jackson in May 2026 with Mayor Andre Dickens and Georgia First Lady Marty Kemp. Through the AAAT, Atlanta also developed an Anti-Human Trafficking Strategic Plan and contributed to the city's Human Rights Action Plan."
    ],
    ecosystem: "An HSI and GBI-led initiative resulted in 153 trafficking-related arrests and 54 victims rescued."
  },
  {
    id: "boston", name: "Boston / Massachusetts", country: "United States",
    tagline: "Mobilising public infrastructure for prevention",
    img: "img/boston.jpg", alt: "MBTA bus carrying It's a Penalty campaign advert",
    headline: [17.91, "M+", 2, "estimated reach and exposure"],
    stats: [
      [16.88, "potential media impressions from the launch", { decimals: 2, suffix: "M" }],
      [625002, "digital out-of-home impressions near Gillette Stadium"],
      [380432, "TaxiTV impressions"],
      [100000, "ten-second campaign film spots in one month", { suffix: "+" }],
      [256, "digital boards across the Commonwealth"],
      [20903, "people reached through targeted Instagram activity"]
    ],
    body: [
      "Delivered with the Massachusetts Executive Office of Public Safety and Security and Boston 26, the local Host Committee. The campaign launched on 4 June at the State House, with Lieutenant Governor Kim Driscoll among the speakers.",
      "Messaging ran on MBTA buses and trains, and a Rights for Girls demand-focused billboard stood for four weeks near Gillette Stadium."
    ],
    ecosystem: "Operation Yellow Card safely recovered 48 endangered missing children; 14 arrests were made across two Boston operations targeting child exploitation and demand."
  },
  {
    id: "kansas-city", name: "Kansas City", country: "United States",
    tagline: "Mobilising a statewide response",
    img: "img/kansas.jpg", alt: "Missouri Attorney General Catherine Hanaway speaking at the It's a Penalty launch",
    headline: [510.42, "M", 2, "estimated reach and exposure"],
    stats: [
      [500.74, "potential media impressions from launch coverage", { decimals: 2, suffix: "M" }],
      [4.9, "statewide radio gross impressions", { decimals: 1, suffix: "M+" }],
      [3.29, "digital impressions via the Missouri Attorney General's Office", { decimals: 2, suffix: "M" }],
      [1.31, "GSTV impressions, 22% above planned delivery", { decimals: 2, suffix: "M" }],
      [11400, "tracked digital clicks", { suffix: "+" }],
      [70, "Simply Report tips received May–July"]
    ],
    body: [
      "It's a Penalty formally partnered with the Missouri Attorney General's Office. Materials appeared at Kansas City's Amtrak station and on trains, and were distributed through health departments and victim advocacy organisations.",
      "Missouri's Simply Report service logged 87 tips between February and August 2026, 70 of them during May–July, coinciding with heightened World Cup awareness activity."
    ],
    ecosystem: "A separate multi-agency operation involving 15+ agencies carried out 17 operations, made 19 arrests and located nine children."
  },
  {
    id: "los-angeles", name: "Los Angeles", country: "United States",
    tagline: "Building a lasting major-event response",
    img: "img/losangeles.jpg", alt: "Digital billboard in Los Angeles: Human trafficking has no place in Los Angeles",
    headline: [29.07, "M+", 2, "estimated reach and exposure"],
    stats: [
      [1.59, "KEVANI digital billboard impressions", { decimals: 2, suffix: "M" }],
      [425442, "TaxiTV impressions"],
      [243384, "people reached through targeted Instagram"],
      [4329, "unique link clicks"],
      [587856, "delivery robot impressions"],
      [860537, "views across Hard Rock properties statewide"],
      [1000, "people reached by LARHTTF training in under 3 months", { suffix: "+" }],
      [20, "survivors accepted direct support through partners", { suffix: "+" }]
    ],
    body: [
      "Delivered with Saving Innocence and the Los Angeles Regional Human Trafficking Task Force (LARHTTF), and launched at Union Station on 27 May, where a lived-experience expert spoke on the role of public awareness.",
      "IAP took a formal coordinating role in the LARHTTF Sports and Major Events Committee, with US Campaigns Director Dana Hoyes co-chairing the Awareness Subcommittee. The structures built carry forward to the 2027 Super Bowl and LA28."
    ],
    ecosystem: "Law-enforcement partners reported 216 arrests and 35 rescues across LASD and LAPD-led operations."
  },
  {
    id: "miami", name: "Miami", country: "United States",
    tagline: "Locally led mobilisation through #OneTeam",
    img: "img/robot.jpg", alt: "Serve Robotics delivery robot in Miami with It's a Penalty branding",
    headline: [35.04, "M+", 2, "quantified opportunities for reach and exposure"],
    stats: [
      [23.71, "potential media impressions from launch coverage", { decimals: 2, suffix: "M" }],
      [250, "IKE digital kiosks carrying campaign messaging", { suffix: "+" }],
      [804608, "estimated impressions through Serve Robotics"],
      [699429, "FreeBee campaign ad views"],
      [65500, "campaign flyers and postcards distributed"],
      [114, "organisations in The Women's Fund's #OneTeam"],
      [50, "additional emergency beds prepared for survivors", { suffix: "+" }]
    ],
    body: [
      "The Women's Fund Miami-Dade led an exceptional mobilisation through #OneTeam, bringing together organisations, advocates, government, law enforcement and businesses around shared messaging. IAP joined as a campaign partner, bringing creative, ambassadors and corporate partners.",
      "Miami-Dade State Attorney Katherine Fernandez Rundle and her office connected awareness with established reporting, victim-support and enforcement infrastructure, including the local trafficking hotline."
    ],
    ecosystem: "70 law-enforcement agencies ran 28 undercover operations, resulting in 178 arrests and 17 potential victims recovered."
  },
  {
    id: "new-york", name: "New York / New Jersey", country: "United States",
    tagline: "Survivor-informed campaigning, government partnership and citywide reach",
    img: "img/timessquare.jpg", alt: "Times Square digital billboard featuring Tim Weah",
    headline: [80.04, "M+", 2, "estimated reach and exposure"],
    stats: [
      [24, "LinkNYC impressions across all five boroughs", { suffix: "M" }],
      [18.03, "Times Square billboard impressions", { decimals: 2, suffix: "M" }],
      [15.9, "TaxiTV impressions", { decimals: 1, suffix: "M" }],
      [9.31, "PATH passenger entries", { decimals: 2, suffix: "M" }],
      [3.57, "Newark Liberty passenger movements", { decimals: 2, suffix: "M" }],
      [5.73, "New Jersey digital, OOH and audio impressions", { decimals: 2, suffix: "M" }],
      [50000, "estimated Central Park Final watch party attendance"],
      [12, "members of the World Cup Survivor Leader Advisory Council"]
    ],
    body: [
      "Formal partnerships with the New Jersey Office of the Attorney General and NYC's Mayor's Office to End Domestic and Gender-Based Violence, with the New Jersey Coalition Against Human Trafficking as principal NGO partner and support from the Port Authority.",
      "Through NJCAHT, Gina Cavallo created and led a 12-member Survivor Leader Advisory Council that met for more than a year to shape messaging and training."
    ],
    quote: ["The strength of this campaign came from bringing survivors to the table throughout its development.", "Gina Cavallo, NJCAHT"],
    ecosystem: "New Jersey operations recovered 97 suspected victims with 71 arrests; the NYPD Special Victims Unit made 89 arrests and offered support to 43 survivors."
  },
  {
    id: "mexico", name: "Mexico", country: "Mexico",
    tagline: "A nationally connected, locally led campaign",
    img: "img/mexico-metro.jpg", alt: "Campaign posters in the Zaragoza Metro Station showcase, Mexico City",
    headline: [188.5, "M+", 1, "quantified opportunities for reach and exposure"],
    stats: [
      [685, "reports of possible trafficking to the national hotline"],
      [60, "increase in reports during the wider prevention effort", { prefix: "↑", suffix: "%" }],
      [280, "bus-station placements across eight cities"],
      [16, "screens across four GAP airports"],
      [950063, "people reached via targeted Instagram"],
      [46333, "unique link clicks"],
      [10.8, "potential audience via coalition metro and billboard placements", { decimals: 1, suffix: "M+" }]
    ],
    body: [
      "IAP worked closely with lead partner Fin de la Esclavitud to build a coalition spanning civil society, government, transport, tourism, hospitality, businesses and universities — reaching well beyond the three host cities.",
      "Coverage ran across N+, Milenio, Animal Político, Forbes México, Excélsior and Proceso, alongside Reuters-distributed video."
    ],
    quote: ["We made something important that hadn't happened before in Mexico.", "Diana Flores, Fin de la Esclavitud"],
    ecosystem: "Consejo Ciudadano reported that World Cup prevention campaigns contributed to an increase of up to 60% in reports of possible trafficking."
  },
  {
    id: "guadalajara", name: "Guadalajara", country: "Mexico",
    tagline: "Building momentum before the World Cup",
    img: "img/guadalajara.jpg", alt: "Campaign screen featuring Oribe Peralta in Guadalajara airport",
    headline: [279627, "+", 0, "people reached through targeted Instagram"],
    stats: [
      [399322, "Instagram impressions"],
      [9072, "unique link clicks"],
      [3.9, "potential audience via an A21 LATAM billboard in Jalisco", { decimals: 1, suffix: "M" }],
      [72949, "opportunities for exposure through 20 IMU placements"],
      [500, "attended the 2025 International Congress", { suffix: "+" }]
    ],
    body: [
      "Built on more than a year of locally led mobilisation through a three-stage programme: the July 2025 Congress, intensive training for authorities, then the public campaign, launched at Tecnológico de Monterrey on 18 May 2026.",
      "Ambassador Oribe Peralta spoke at the launch. You could hear a pin drop as he spoke."
    ],
    shift: ["5th", "2nd", "Jalisco moved from fifth to second nationally for trafficking reports during the World Cup."],
    ecosystem: "Consejo Ciudadano linked Jalisco's rise to strengthened awareness campaigns and greater citizen participation."
  },
  {
    id: "mexico-city", name: "Mexico City", country: "Mexico",
    tagline: "From preparation to national visibility",
    img: "img/mexico-poster.jpg", alt: "Campaign poster featuring Oribe Peralta on a Mexico City street",
    headline: [5.4, "M+", 1, "potential audience through the AGAPE billboard"],
    stats: [
      [1.5, "potential audience at the Zaragoza Metro showcase", { decimals: 1, suffix: "M+" }],
      [474524, "people reached through targeted Instagram"],
      [605273, "Instagram impressions"],
      [20602, "unique link clicks"],
      [388000, "opportunities for exposure through 40 IMU placements"],
      [233070, "views across Hard Rock properties"]
    ],
    body: [
      "In February 2026 IAP led a session on trafficking at mass events at the Zero Tolerance Congress, convened with the U.S. Embassy, HSI and INL. The public campaign launched on 19 May 2026.",
      "Reuters distributed international video, and Fin de la Esclavitud described the media response as exceeding expectations."
    ],
    ecosystem: "Post-tournament, Mexico City's Interinstitutional Commission against Trafficking reviewed the measures and prioritised continued coordination."
  },
  {
    id: "monterrey", name: "Monterrey", country: "Mexico",
    tagline: "Building prevention into education",
    img: "img/oribe.jpg", alt: "Oribe Peralta with an It's a Penalty representative",
    headline: [338753, "", 0, "people reached through targeted Instagram"],
    stats: [
      [473291, "Instagram impressions"],
      [16659, "unique link clicks"],
      [214400, "opportunities for exposure through 20 IMU placements"],
      [8, "unique click-through rate in the 65+ audience", { suffix: "%" }],
      [1, "direct safeguarding concern raised and signposted"]
    ],
    body: [
      "Working with Fin de la Esclavitud and Educando en Red, the campaign opened a route into the school system, with training and education now under way.",
      "Educando en Red also opened a new dialogue with INEGI on identifying forced labour in its workforce surveys — early evidence of influence, not yet a confirmed methodology change."
    ],
    ecosystem: "Fin de la Esclavitud is now recognised as the lead coordinating organisation in a previously fragmented local response."
  },
  {
    id: "vancouver", name: "Vancouver", country: "Canada",
    tagline: "Connecting lived-experience insight, visibility and coordination",
    img: "img/vancouver.jpg", alt: "Vancouver waterfront with the Canadian flag",
    headline: [5.8, "M+", 1, "opportunities for exposure across YVR and billboards"],
    stats: [
      [2.25, "impressions at Vancouver International Airport", { decimals: 2, suffix: "M" }],
      [19660, "airport-screen plays"],
      [3.55, "in-market circulation across two billboards", { decimals: 2, suffix: "M" }],
      [40, "Canada Line SkyTrain interior cards"],
      [650, "bilingual bathroom stickers for frontline partners"],
      [47, "organisations (108 members) in phase two of Host City Connections"],
      [2500, "campaign hang tags for Red Car Service, Toronto"]
    ],
    body: [
      "Delivered in partnership with Ally Global Foundation. The Canadian Centre to End Human Trafficking convened workshops with people with lived experience, who reviewed messaging, imagery and language.",
      "Ally Global Foundation, Public Safety Canada and Druwitt Consulting convened Host City Connections, growing from 32 to around 47 organisations across Vancouver and Toronto."
    ],
    ecosystem: "The network continued beyond the campaign as a Community of Practice for future major events."
  }
];
