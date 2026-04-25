---
title: Notatka z sesji
tags: [npc, strefa-zero, combat]
---

# Sandbox konfiguracji RPG

Krótki akapit z inline: @npc:test-npc, @location:ruiny, @faction:iron-crows, @item:stimpak, @beast:kruker, @rule:cover, @zombie:shambler, @mutant:phase-rat oraz wiki [[Strefa Zero]].

---

## Bloki encji (::: … :::)

:::npc
name: Raven
role: Zwiadowca
:::

:::location
name: Czerwony most
region: Północ
:::

:::faction
name: Żelazne Wrony
stance: Neutralni
:::

:::item
name: Stimpak
qty: 2
:::

:::beast
name: Kruker
threat: Wysoka
:::

:::rule
name: Cover
text: +2 do obrony w terenie
:::

:::zombie
name: Shambler
infection: Niska
:::

:::mutant
name: Phase Rat
ability: Krótki teleport
:::

---

## Callouty (> [!typ])

> [!info] Ogólna informacja
> To jest treść calloutu **info** na dwóch liniach.

> [!warning]
> Ostrzeżenie bez tytułu w nagłówku — sam typ w pierwszej linii.

> [!danger] Zagrożenie
> Treść **danger** z `inline code`.

> [!lore] Fragment świata
> Ktoś kiedyś zapisał, że most był stary już przed wojną.

> [!rule] Zasada sesji
> Przerwa co 90 minut.

> [!npc] Ważna postać
> NPC powiązany z calloutem (ten sam styl co encja).

> [!location] Miejsce kluczowe
> Lokacja w calloucie.

> [!faction] Frakcja w polu
> Frakcja jako callout.

> [!quest] Główny wątek
> Cel: dotrzeć do bunkra. Nagroda: dostęp do archiwum.

---

## Wiki + kod

Link: [[Archiwum bunkra]] i drugi: [[NPC — Raven]].

// highlightCode (jeśli włączone w rendererze)
const roll = () => Math.floor(Math.random() * 20) + 1

**Uwagi przy wklejaniu:**

- W **hybrydzie Lexical** tylko **`:::npc`** i **`:::location`** zamieniają się w karty w edytorze; pozostałe bloki z tej listy w trybie hybrydowym mogą zostać jako surowy tekst — **pełny rendering** (wszystkie typy) zobaczysz w **podglądzie** / `MarkdownPreview`.
- Callout wymaga kontynuacji linii z prefiksem `> ` (jak wyżej).
- Id po `@` musi pasować do `[\w-]+` (litery, cyfry, `_`, `-`).