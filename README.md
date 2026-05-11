# Global Infectious Diseases: Interactive Infographic Hub

An educational, single-page static site that visualizes the global burden of the 9 most impactful infectious diseases. Built entirely with HTML, CSS and vanilla JavaScript.

## What's Inside

- **Global Burden Rankings**: Top infectious diseases ranked by DALYs (GBD/IHME data)
- **9 Disease Deep Dives**: Lower respiratory infections, diarrhoeal diseases, HIV/AIDS, malaria, TB, hepatitis B and C, influenza, dengue and norovirus
- **Side-by-Side Comparison**: Pathogen type, transmission, deaths and vaccine availability in a single comparison table
- **Co-Infection Interactions**: Dangerous disease pairings (HIV + TB, flu + bacterial pneumonia, dengue serotype shift, etc.)
- **Transmission Routes**: Airborne, fecal-oral, vector-borne and bloodborne infographics
- **Cruise Ship Outbreaks**: Why cruise ships are hotspots, with CDC-tracked 2024–2025 gastrointestinal outbreak timeline
- **Seasonal Patterns**: How climate and human behavior drive disease seasonality across temperate and tropical regions
- **Universal Prevention**: Evidence-based strategies that work across diseases, plus a myths vs. facts section

## Data Sources

CDC, WHO, Global Burden of Disease Study (IHME), ECDC and peer-reviewed research.

> **Disclaimer:** This site is for educational purposes only and does not provide medical advice. Always consult healthcare professionals for medical concerns.

## Tech Stack

- **HTML5**: Semantic structure, anchor-based scrolling navigation
- **CSS3**: Dark-themed responsive UI (~1,500 lines), glassmorphism cards, animated gradients, CSS custom properties
- **Vanilla JS**: Scroll-triggered animations, animated counters, IntersectionObserver, mobile nav toggle (~200 lines)

Zero dependencies. No build step required.

## File Structure

```
norovirus-info/
├── index.html    (860 lines). Main page with all content and structure
├── style.css     (1582 lines). All styles, responsive breakpoints, animations
└── script.js     (204 lines). Interactive features and scroll behavior
```

## License

This project is intended for public health education and awareness. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions, corrections and data updates are welcome. Please open an issue or submit a pull request.