---
name: rpg-mechanika
description: Tworzenie i edycja mechanik systemu RPG zombie postapo. Używaj gdy pracujesz nad mechanikami systemu, tworzysz nowe zasady, edytujesz istniejące pliki systemu, projektujesz ekwipunek, cechy, umiejętności, testy lub inne elementy mechaniczne gry.
---

# RPG Mechaniki — Zombie Postapo

## Zasady naczelne

- Cała treść **po polsku**
- Mechaniki są **narracyjne przede wszystkim** — zasada powinna być prosta do zapamiętania i naturalna w użyciu
- Nowe mechaniki muszą być spójne z istniejącym systemem

## Krok 1 — Załaduj kontekst systemu

Użyj skilla **`rpg-mechanika-lookup`** — przeskanuje `system/`, znajdzie nowe pliki i dostarczy potrzebny kontekst mechanik.

Jeśli potrzebujesz kontekstu fabularnego, użyj skilla **`rpg-lore-lookup`**.

## Krok 2 — Projektuj mechanikę

### Filtr jakości dla każdej nowej zasady

Przed dodaniem zadaj sobie te pytania:
1. Czy można to wyjaśnić jednym zdaniem?
2. Czy pasuje do istniejącej struktury (cechy → umiejętności → właściwości → kości)?
3. Czy nie duplikuje istniejącej zasady?

## Krok 3 — Format nowej treści

Każdy element mechaniczny dokumentuj według wzorca:

```markdown
**Nazwa**
- Kategoria: [kategoria]
- [Kluczowy atrybut mechaniczny]: [wartość]
- Właściwości:
  - Atut: Nazwa - krótki opis (wartość 1 domyślna, bez nawiasu; od 2: Nazwa (N))
  - Wada: Nazwa - krótki opis
```

W tagach ekwipunku: `@pros:Cichy` (=1), `@pros:Cichy(2)` (od 2 wzwyż).

Dla nowych zasad systemowych (nie ekwipunku):
- Zacznij od jednozdaniowego opisu czym jest zasada
- Podaj wzór obliczeniowy jeśli potrzebny
- Dodaj przykład narracyjny

## Uwagi końcowe

- Pliki `.wip.md` mogą mieć niespójności — sygnalizuj je zamiast cicho naprawiać
- Jeśli mechanika wymaga nowego pliku, utwórz go w `system/` z końcówką `.wip.md`
- `DoZrobienia.wip.md` zawiera planowane mechaniki — sprawdź przed dodaniem czegoś nowego
