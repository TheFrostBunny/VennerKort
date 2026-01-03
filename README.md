# 💌 HappySend v1.0.0

**HappySend** (VennerKort Upgrade) er en moderne web-applikasjon for å lage, tilpasse og sende digitale hilsener med en "WOW"-faktor. Appen er bygget for å gi en følelse av å åpne et ekte, fysisk kort, komplett med 3D-konvolutt, animasjoner og konfetti.

## ✨ Egenskaper

- **Interaktiv 3D-opplevelse**: En animert 3D-konvolutt som reagerer på musebevegelser og åpner seg for å avdekke kortet.
- **Full Tilpasning**: Velg mellom ulike korttyper (Venn, Kjærlighet, Hemmelig Beundrer), farger, skrifttyper, rammer og effekter (hjerter, stjerner, bølger).
- **Ultra-kompakte lenker**: Bruker avansert Base64-posisjonell koding for å komprimere alt kort-innholdet til én ekstremt kort URL.
- **Fler-språklig støtte**: Full støtte for både Norsk og Engelsk (i18n).
- **Dashbord & Historikk**: Oversikt over mottatte kort og din egen sendehistorikk (lagret lokalt).
- **Om HappySend**: Integrert seksjon i innstillinger med informasjon om misjon, visjon og skaper.
- **Responsivt Design**: Optimalisert for en "null-scroll"-opplevelse på alle skjermstørrelser.
- **Mørk/Lys Modus**: Full støtte for systemvalgt eller manuelt tema.

## 🛠 Teknologi

- **Framework**: [Next.js 16.1+](https://nextjs.org/) (App Router med stabil **Turbopack**)
- **UI Logikk**: [React 19](https://reactjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animasjoner**: [Framer Motion](https://www.framer.com/motion/)
- **Ikoner**: [Lucide React](https://lucide.dev/) & [Hugeicons](https://hugeicons.com/)
- **Effekter**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Type-sikkerhet**: [TypeScript 5+](https://www.typescriptlang.org/)

## 🚀 Kom i gang

### Forutsetninger

- Node.js og pnpm (eller npm/yarn) installert.

### Installasjon

1. Klon prosjektet:

   ```bash
   git clone https://github.com/TheFrostBunny/HappySend.git
   cd HappySend
   ```

2. Installer avhengigheter:

   ```bash
   pnpm install
   ```

3. Kjør utviklingsserveren:

   ```bash
   pnpm dev
   ```

4. Åpne [http://localhost:3000](http://localhost:3000) i nettleseren din.

## 📁 Prosjektstruktur

- `/app`: Next.js ruter og sider (`/send`, `/receive`, `/history`, etc.)
- `/components`: Gjenbrukbare React-komponenter.
- `/components/Pages`: Hovedlogikken for de forskjellige seksjonene.
- `/lib/i18n`: Internasjonalisering og oversettelsesfiler.
- `/public`: Statiske filer som logoer og favicon.

---

Laget med ❤️ av David
