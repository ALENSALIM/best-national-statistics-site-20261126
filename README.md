# NusaStats — Indonesia in Numbers

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/ALENSALIM/best-national-statistics-site-20261126/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/ALENSALIM/best-national-statistics-site-20261126/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

An original national statistics website for Indonesia. It runs in a web browser from
static files, with no network request, on desktop and on a phone.

## What it is

- **Overview** (`index.html`) — headline KPI cards, GDP growth and population charts,
  and links to every section.
- **Economy** (`economy.html`) — GDP, growth, inflation, trade and sector shares.
- **Population** (`population.html`) — population trend, age structure, and a searchable
  provinces table.
- **Health** (`health.html`) — life expectancy, infant mortality and health indicators.
- **Education** (`education.html`) — literacy, schooling and enrolment.
- **Sources & Methods** (`sources.html`) — where every figure comes from and how the
  figures were rounded.

Every figure is a rounded published figure from the World Bank World Development
Indicators or Statistics Indonesia (BPS), shown with its year and source.

## Working controls

- Year selector (2015–2024) on Overview and Economy: updates the KPI cards and
  highlights the year on the charts.
- Bar/line toggle on the GDP growth chart and the inflation chart.
- Metric switcher on Health (Life expectancy / Infant mortality).
- Province search box on Population: filters the table live, with a result count and a
  "no provinces match" row.

## Run it

Serve `app/` locally (Node 22, standard library only):

```sh
node serve.ts
```

Then open http://localhost:8080.

## Hand it in

`main.ts` (Node 22, standard library only) copies `app/` and `screenshots/` to the
output directory and writes `dossier.json` with `buildDossier` from the kit's
`vendor/makefun-frontend.ts`:

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Outside the grader, `MAKEFUN_OUTPUT_DIR` stands in for `/output`. The program is
deterministic: two runs write identical bytes.

## Files

- `app/` — the site: six pages, `styles.css`, `data.js` (all figures), `charts.js`
  (inline SVG charts, no libraries).
- `screenshots/` — four real renders of the site's own code.
- `vendor/makefun-frontend.ts` — the competition kit's library, unchanged.
- `serve.ts` — tiny static server for local development.
- `main.ts` — the entry program.
