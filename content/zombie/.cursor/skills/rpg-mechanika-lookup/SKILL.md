---
name: rpg-mechanika-lookup
description: Wyszukiwanie informacji w plikach mechanik systemu RPG zombie postapo. Używaj gdy potrzebujesz znaleźć konkretną zasadę, sprawdzić jak działa element systemu, znaleźć wzór obliczeniowy lub zrozumieć istniejącą mechanikę przed jej rozbudową.
---

# RPG Mechaniki — Wyszukiwanie

## Krok 1 — Przeskanuj katalog systemu

Zawsze zaczynaj od sprawdzenia aktualnej zawartości, bo mogły pojawić się nowe pliki:

```
ls system/
ls system/Ekwipunek/
```

Porównaj wyniki z poniższą mapą. Każdy nieznany plik `.md` przeczytaj przed pracą.

## Mapa plików systemu

| Temat | Plik |
|---|---|
| Rzuty kośćmi i testy | `system/Kości i testy.md` |
| Cechy postaci | `system/Cechy.md` |
| Umiejętności postaci | `system/Umiejętności.md` |
| Właściwości (Atuty i Wady) | `system/Właściwości.md` |
| Rejestr wszystkich Atutów i Wad | `system/Lista Atutów i Wad.wip.md` |
| Życie, Zmęczenie i Stres | `system/Życie Zmęczenie i Stres.wip.md` |
| Mutacje i Skażenie | `system/Mutacje i Skażenie.md` |
| Punkty Doświadczenia (PD) | `system/Punkty Doświadczenia.wip.md` |
| Przykładowe mutacje (gotowe przykłady) | `system/Przykładowe Mutacje.wip.md` |
| Towarzysze i relacje | `system/Towarzysze i relacje.md` |
| Ekwipunek ogólny | `system/Ekwipunek/EkwipunekOgólny.md` |
| Broń | `system/Ekwipunek/Broń.md` |
| Ekwipunek ochronny | `system/Ekwipunek/EkwipunekOchronny.md` |
| Transport | `system/Ekwipunek/Transport.md` |
| Materiały i konstrukcje | `system/Ekwipunek/Materiały i Konstrukcje.md` |
| Planowane mechaniki | `system/DoZrobienia.wip.md` |

> `.wip.md` = work in progress — może być niekompletne lub zawierać niespójności. Sygnalizuj je zamiast cicho naprawiać.

## Quick-lookup — gdzie szukać czego

| Pytanie | Plik |
|---|---|
| Jak buduje się pulę kości? | `Kości i testy.md` |
| Jakie są cechy postaci i co oznaczają? | `Cechy.md` |
| Jakie umiejętności istnieją? | `Umiejętności.md` |
| Jak działają Atuty i Wady? | `Właściwości.md` |
| Jak oblicza się HP, Zmęczenie, Stres? | `Życie Zmęczenie i Stres.wip.md` |
| Jak działają mutacje i skażenie? | `Mutacje i Skażenie.wip.md` |
| Ile kosztuje rozwój postaci (PD)? | `Punkty Doświadczenia.wip.md` |
| Czy jest gotowy przykład konkretnej mutacji? | `Przykładowe Mutacje.wip.md` |
| Jak działają sojusznicy i relacje? | `Towarzysze i relacje.md` |
| Jakie są rodzaje broni i ich obrażenia? | `Ekwipunek/Broń.md` |
| Jakie są rodzaje pancerzy? | `Ekwipunek/EkwipunekOchronny.md` |
| Jakie są pojazdy i sprzęt transportowy? | `Ekwipunek/Transport.md` |
| Jakie są materiały i konstrukcje? | `Ekwipunek/Materiały i Konstrukcje.md` |
| Co jest jeszcze zaplanowane do zrobienia? | `DoZrobienia.wip.md` |

## Skrót kluczowych wartości systemu

Przydatny przy ocenie spójności nowej mechaniki bez czytania wszystkich plików:

- **Kości testów**: k10 — (1 kryt. porażka / 4–5 porażka / 6–9 sukces / 10 kryt. sukces)
- **Pula kości**: cechy + umiejętności ± właściwości (Atuty/Wady jako modyfikatory, skala 1–5)
- **HP gracza**: `(2×Kondycja) + Siła + mod. rasy` → typowo 6–16
- **Obrażenia**: d6 — lekka `1d6`, średnia `1d6+1/+2`, ciężka `2d6`, niszcząca `2d6+2`
- **Ochrona pancerza**: odzież 1–2 / uzupełniający 2–4 / główny 4–8
- **Zmęczenie/Stres**: aktywne zasoby — wydaj by +2 kości lub przerzuć niesukcesy
