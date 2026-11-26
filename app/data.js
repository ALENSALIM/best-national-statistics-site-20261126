// NusaStats data — every figure is a rounded published figure.
// Sources: World Bank World Development Indicators (WDI) and Statistics Indonesia (BPS).
// Each figure carries its year; sources.html lists the full source for every figure.

const NUSA = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],

  // GDP growth, % per year (BPS)
  gdpGrowth: [4.88, 5.03, 5.07, 5.17, 5.02, -2.07, 3.70, 5.31, 5.05, 5.03],

  // Inflation, CPI annual average, % (BPS)
  inflation: [3.35, 3.02, 3.61, 3.13, 2.72, 1.68, 1.87, 5.51, 2.61, 1.57],

  // Population, millions, mid-year (World Bank, rounded)
  population: [258, 261, 264, 267, 270, 272, 275, 277, 280, 283],

  // Life expectancy at birth, years (World Bank, approx; selected years)
  lifeExpectancy: [
    { year: 2015, value: 71.1 },
    { year: 2017, value: 71.4 },
    { year: 2019, value: 71.7 },
    { year: 2021, value: 71.4 },
    { year: 2023, value: 71.8 },
  ],

  // Infant mortality, deaths per 1,000 live births (World Bank, approx; selected years)
  infantMortality: [
    { year: 2015, value: 21 },
    { year: 2017, value: 20 },
    { year: 2019, value: 19 },
    { year: 2021, value: 18 },
    { year: 2023, value: 17 },
  ],

  // Headline figures, latest year available
  headline: {
    population2024: { value: '283.5 million', label: 'Population', year: 2024, source: 'World Bank' },
    gdp2024: { value: 'US$1.40 trillion', label: 'GDP (nominal)', year: 2024, source: 'World Bank' },
    gdpPerCapita2024: { value: 'US$4,925', label: 'GDP per capita', year: 2024, source: 'World Bank' },
    gdpGrowth2024: { value: '5.03%', label: 'GDP growth', year: 2024, source: 'BPS' },
    inflation2024: { value: '1.57%', label: 'Inflation (CPI avg)', year: 2024, source: 'BPS' },
    unemployment2024: { value: '4.86%', label: 'Unemployment', year: 2024, source: 'BPS, Aug 2024' },
    lifeExpectancy2023: { value: '71.8 years', label: 'Life expectancy', year: 2023, source: 'World Bank' },
    poverty2024: { value: '8.57%', label: 'Poverty rate', year: 2024, source: 'BPS, Sep 2024' },
  },

  // Sector shares of GDP 2024, % (approx, BPS)
  sectors2024: [
    { name: 'Manufacturing', share: 19 },
    { name: 'Trade', share: 13 },
    { name: 'Agriculture', share: 12 },
    { name: 'Construction', share: 10 },
    { name: 'Mining', share: 8 },
    { name: 'Transport & storage', share: 4 },
    { name: 'Information & communication', share: 4 },
    { name: 'Finance', share: 4 },
    { name: 'Other services', share: 26 },
  ],

  // Age structure 2024, % of population (approx, BPS)
  ageStructure2024: [
    { group: '0–14 years', share: 24 },
    { group: '15–64 years', share: 68 },
    { group: '65+ years', share: 7 },
  ],

  // Trade 2024, US$ billion (BPS, rounded)
  trade2024: { exports: 265, imports: 234, surplus: 31 },

  // Education (BPS)
  education: {
    meanSchooling2024: { value: 9.1, unit: 'years', label: 'Mean years of schooling', year: 2024 },
    expectedSchooling2024: { value: 13.3, unit: 'years', label: 'Expected years of schooling', year: 2024 },
    adultLiteracy: { value: 96, unit: '%', label: 'Adult literacy rate', year: 2024 },
    primaryNetEnrolment: { value: 99, unit: '%', label: 'Primary net enrolment', year: 2024 },
    secondaryNetEnrolment: { value: 82, unit: '%', label: 'Secondary net enrolment', year: 2024 },
    tertiaryGrossEnrolment: { value: 36, unit: '%', label: 'Tertiary gross enrolment', year: 2024 },
  },

  // Health indicators
  health: {
    lifeExpectancy2023: 71.8,
    infantMortality2023: 17,
    underFiveMortality2023: 21,
    maternalMortality2020: 173,
    hospitalBedsPer10k: 10,
    physiciansPer10k: 5,
  },

  // Provinces, 2024 mid-year population in millions (BPS, rounded)
  provinces2024: [
    { name: 'West Java', population: 48.8 },
    { name: 'East Java', population: 41.8 },
    { name: 'Central Java', population: 37.9 },
    { name: 'North Sumatra', population: 15.6 },
    { name: 'Banten', population: 12.4 },
    { name: 'Jakarta', population: 10.7 },
    { name: 'South Sulawesi', population: 9.4 },
    { name: 'Lampung', population: 9.3 },
    { name: 'South Sumatra', population: 8.9 },
    { name: 'Riau', population: 6.7 },
    { name: 'West Sumatra', population: 6.0 },
    { name: 'West Kalimantan', population: 5.9 },
    { name: 'West Nusa Tenggara', population: 5.7 },
    { name: 'East Nusa Tenggara', population: 5.7 },
    { name: 'Aceh', population: 5.5 },
    { name: 'Bali', population: 4.4 },
    { name: 'South Kalimantan', population: 4.4 },
    { name: 'East Kalimantan', population: 4.0 },
    { name: 'Yogyakarta', population: 3.8 },
    { name: 'Central Sulawesi', population: 3.1 },
    { name: 'North Sulawesi', population: 2.7 },
  ],
};
