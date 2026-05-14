# Global Infectious Diseases: Interactive Infographic Hub

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An educational, single-page static site that visualizes global infectious disease burden and prevention. Built entirely with HTML, CSS and vanilla JavaScript.

## What's Inside

- **Global Burden Rankings**: Leading infectious causes ranked by GBD 2023 DALYs
- **10 Disease Deep Dives**: COVID-19, lower respiratory infections, diarrhoeal diseases, HIV/AIDS, malaria, TB, hepatitis B and C, influenza, dengue and norovirus
- **Side-by-Side Comparison**: Pathogen type, transmission, deaths and vaccine availability in a single comparison table
- **Co-Infection Interactions**: Dangerous disease pairings (HIV + TB, flu + bacterial pneumonia, dengue serotype shift, etc.)
- **Transmission Routes**: Airborne, fecal-oral, vector-borne and bloodborne infographics
- **Cruise Ship Outbreaks**: Why cruise ships are hotspots, with CDC-tracked 2024–2025 gastrointestinal outbreak timeline
- **Seasonal Patterns**: How climate and human behavior drive disease seasonality across temperate and tropical regions
- **Universal Prevention**: Evidence-based strategies that work across diseases, plus a myths vs. facts section

## Data Sources

CDC, WHO, UNAIDS, Global Burden of Disease Study 2023 (IHME), ECDC and peer-reviewed research. Source years vary by disease according to the latest credible release available.

> **Disclaimer:** This site is for educational purposes only and does not provide medical advice. Always consult healthcare professionals for medical concerns.

## Tech Stack

- **HTML5**: Semantic structure, anchor-based scrolling navigation
- **CSS3**: Dark-themed responsive UI (~560 lines), glassmorphism cards, animated gradients, CSS custom properties
- **Vanilla JS**: Scroll-triggered animations, animated counters, IntersectionObserver, mobile nav toggle (~178 lines)

Zero dependencies. No build step required.

## License

This project is intended for public health education and awareness. See the [LICENSE](LICENSE) file for details.

## Deployment Notes

This site is hosted on Render. The following response headers must be configured in the Render dashboard under your service's "Redirect/Rewrite Rules & Header Settings":

- **X-Frame-Options**: `SAMEORIGIN` — prevents clickjacking by blocking the site from being embedded in iframes on other domains.
- **Strict-Transport-Security**: Set automatically by Render for custom domains (1-year max-age), but verify it is present in response headers after deployment.

These settings cannot be set via `<meta>` tags and must be applied at the hosting layer.

## Contributing

Contributions, corrections and data updates are welcome. Please open an issue or submit a pull request.
