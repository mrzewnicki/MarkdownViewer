---
name: rpg-lore-lookup
description: Wyszukiwanie i interpretacja lore świata zombie postapo. Używaj gdy potrzebujesz informacji o historii świata, frakcjach, technologiach, zombie, postaciach, lokacjach lub innych elementach fabularnych. Używaj też gdy skill rpg-mechaniki potrzebuje kontekstu lore do projektowania zasad.
---

# RPG Lore — Zombie Postapo

## Mapa wiki

Wszystkie pliki lore są w katalogu `wiki/`. Przed wyszukiwaniem sprawdź strukturę:

```
wiki/
├── Wprowadzenie.md          ← historia świata, geneza epidemii, DeathNet i LiveCore
├── DeathNet.md              ← organizacja DeathNet: historia, technologia, cele
├── LiveCore.md              ← wirus LiveCore: działanie, etapy zakażenia, mutacje
├── Oś czasu.md              ← chronologia wydarzeń
├── Updatek USA.md           ← stan Stanów Zjednoczonych po zagładzie
├── Phantomy.wip.md          ← frakcja/zjawisko Phantomów (WIP)
├── Psionika.wip.md          ← zdolności psioniczne w świecie (WIP)
├── bestiariusz/
│   ├── Klasyfikacja Wrogów.md        ← ogólny podział przeciwników
│   ├── Spis przeciwników.wip.md      ← indeks wszystkich wrogów (WIP)
│   ├── zombie/
│   │   ├── Zombie.md                 ← opis zwykłego zombie
│   │   ├── Alpha.wip.md              ← wariant Alpha (WIP)
│   │   └── ZombieZałożenia.wip.md    ← zasady projektowania zombie (WIP)
│   ├── fauna/                        ← zmutowane zwierzęta jako wrogowie
│   └── ludzie/                       ← ludzie jako wrogowie (frakcje, bandyci itd.)
├── fauna/
│   └── Fauna.md             ← zmutowana fauna świata
└── flora/
    └── Flora.md             ← zmutowana flora świata
```

> Pliki `.wip.md` to materiały robocze — mogą być niekompletne lub zawierać sprzeczności.

## Bloki ```ai

Znacznik ` ```ai ` chowa treść przed użytkownikiem (podgląd / Viewer), ale zostawia ją w źródle dla modelu.

- Przy czytaniu i edycji wiki **uwzględniaj bloki `ai`** — instrukcje i meta dla AI, niewidoczne w UI
- Nowe wskazówki procesu / ToDo / uzasadnienia designu pakuj w ` ```ai `, nie w widoczny lore

## Jak szukać informacji

**Nie wiesz gdzie szukać?** Zacznij od `wiki/Wprowadzenie.md` — zawiera zarys świata i linki do szczegółów.

**Szukasz konkretnego tematu?**

| Pytanie | Gdzie szukać |
|---|---|
| Skąd pochodzi wirus? | `Wprowadzenie.md` → `LiveCore.md` |
| Kim jest DeathNet? | `DeathNet.md` |
| Jak działa zakażenie? | `LiveCore.md` |
| Jakie są typy zombie? | `bestiariusz/Klasyfikacja Wrogów.md` → `bestiariusz/zombie/` |
| Jakie zwierzęta zamieszkują świat? | `fauna/Fauna.md` |
| Co z roślinami? | `flora/Flora.md` |
| Psionika i zdolności mentalne? | `Psionika.wip.md` |
| Historia USA po epidemii? | `Updatek USA.md` |
| Oś czasu wydarzeń? | `Oś czasu.md` |

## Nowe pliki lore

Wiki będzie rosnąć. Przed odpowiedzią na pytanie o lore zawsze sprawdź czy nie pojawiły się nowe pliki — szczególnie w podkatalogach `bestiariusz/ludzie/` i `bestiariusz/fauna/`, które mogą mieć nowych wpisów.

## Zasady świata — skrót dla mechanik

Przydatne przy projektowaniu mechanik:

- **DeathNet** stworzył modyfikacje biologiczne żołnierzy (szybsza regeneracja, ulepszone zmysły)
- **LiveCore** to broń biologiczna uderzająca w prymitywne instynkty — zombie nie są martwi, są przejęci
- Zakażenie przenosi się przez wymianę płynów
- Świat ma aktywną psionikę — wciąż projektowaną (`Psionika.wip.md`)
- Mutacje są efektem ubocznym LiveCore — mogą dotknąć ludzi, zwierząt i zombie
- Zombie mają hierarchię — zwykłe, Alphowie, prawdopodobnie więcej typów (patrz WIP)
