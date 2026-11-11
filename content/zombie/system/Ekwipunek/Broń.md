# Broń

Każdy przedmiot opisywany jest przez następujące atrybuty:

- Nazwa
- Opis
- Ilość
- Kategoria (Dystans lub Wręcz)
- Obrażenia
- Zasięg — maksymalny zasięg z [Walki](../Walka.wip.md): `zwarcie`, `bliski`, `średni` lub `daleki`. Wyższy obejmuje wszystkie bliższe. Broń wręcz ma zwykle `zwarcie`, dystansowa `bliski` / `średni` / `daleki`.
- [Właściwości](../Właściwości.md) (skala 1–5)
- Wytworzenie — `(Materiał, Materiał) + Umiejętność`; materiały z [Materiałów](Materiały.md), ilość jest abstrakcyjną jednostką

Wytworzenie przedmiotu wymaga wskazanej umiejętności i podanych materiałów. Osobnego Płatnerstwa nie ma — pancerze metalowe i broń biała z metalu kuje się [Kowalstwem](../Umiejętności.md#kowalstwo), broń palną [Rusznikarstwem](../Umiejętności.md#rusznikarstwo). Brak umiejętności działa jak @cons:Skomplikowany przy konstrukcjach: kara do testu albo niemożność wykonania.

Wady **Naboje**, **Strzały** i **Paliwo** oznaczają abstrakcyjne zużycie nabojów, strzał lub paliwa na scenę (skala 1–5). Pistolet ręczny zużywa 1 nabój, ciężki karabin maszynowy 5, miotacz ognia 4 paliwa. Granaty i ładunki wybuchowe pomijamy — są @cons:Jednorazowy.

Narzędzia używane też jako broń (siekiera, łom, młotek, piła łańcuchowa itd.) mają **tę samą listę właściwości** w [Ekwipunku ogólnym](EkwipunekOgólny.md); tu dokładane są obrażenia i wytworzenie.

```ai
Powiązanie z mutacjami: mutacja Aktywna LiveCore `Wyrzut Kości` w `system/Mutacje.md` (sekcja Aktywne / LiveCore) opisuje obrażenia i ochronę w porównaniu z bronią z tego pliku (R1 - lekka broń 1d6, R2 - średnia 1d6+1, R3 - ciężka 2d6 + ochrona 2, R4 - niszcząca 2d6+2 + ochrona 4).
Przy każdym balansowaniu, zmianie obrażeń lub klas broni wręcz w tym pliku trzeba też wrócić do `Wyrzut Kości` i zaktualizować tam wartości obrażeń oraz opisy rang tak, by wciąż pasowały do aktualnej skali broni (oraz do tabeli pancerzy w `Ekwipunek/EkwipunekOchronny.md`, jeśli zmieni się skala ochrony).
```

## Broń wręcz

`ToDo: statystyki jeszcze są do przetestowania`

| Nazwa | Obrażenia | Zasięg | Właściwości | Wytworzenie | Zasięg (test) |
| --- | ---: | --- | --- | --- | --- |
| Nóż | 1d6 | zwarcie | @pros:Cichy @pros:Lekki | (Metal × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | @range:melee @range:short(-2) @range:medium(-2) @range:long(-2) |
| Siekiera | 1d6+2 | zwarcie | @pros:Tnący(2) @pros:Wytrzymały @cons:Ciężki | (Metal × 1, Drewno × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | @range:melee @range:short(-2) @range:medium(-2) @range:long(-2) |
| Łom | 1d6+2 | zwarcie | @pros:Wytrzymały(2) @pros:Wielofunkcyjny @cons:Ciężki | (Metal × 2) + [Kowalstwo](../Umiejętności.md#kowalstwo) | @range:melee @range:short(-2) @range:medium(-2) @range:long(-2) |
| Kij bejsbolowy | 1d6 | zwarcie | @pros:Wyważony @cons:Rozpoznawalny | (Drewno × 1) | @range:melee @range:short(-2) @range:medium(-2) @range:long(-2) |
| Maczeta | 1d6+1 | zwarcie | @pros:Tnący(2) @pros:Wielofunkcyjny @pros:Wyważony | (Metal × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | @range:melee @range:short(-2) @range:medium(-2) @range:long(-2) |
| Młotek | 1d6 | zwarcie | @pros:Wielofunkcyjny @cons:Krótki | (Metal × 1, Drewno × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | @range:melee @range:short(-2) @range:medium(-2) @range:long(-2) |
| Kilof | 1d6+2 | zwarcie | @pros:Potężny @pros:Wytrzymały @cons:Ciężki | (Metal × 2, Drewno × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | @range:melee @range:short(-2) @range:medium(-2) @range:long(-2) |
| Włócznia | 1d6+1 | zwarcie | @pros:Zasięgowy @pros:Precyzyjny @cons:Nieporęczny | (Drewno × 1, Metal × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | @range:melee @range:short(-1) @range:medium(-2) @range:long(-2) |
| Pałka | 1d6 | zwarcie | @pros:Ogłuszający @cons:Krótki | (Drewno × 1) | @range:melee @range:short(-2) @range:medium(-2) @range:long(-2) |
| Miecz | 1d6+2 | zwarcie | @pros:Tnący(2) @pros:Wyważony @cons:Trudny-do-zdobycia | (Metal × 3) + [Kowalstwo](../Umiejętności.md#kowalstwo) | @range:melee @range:short(-2) @range:medium(-2) @range:long(-2) |
| Tasak | 1d6+1 | zwarcie | @pros:Tnący @cons:Ciężki | (Metal × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | @range:melee @range:short(-2) @range:medium(-2) @range:long(-2) |
| Piła łańcuchowa | 2d6+1 | zwarcie | @pros:Potężny(2) @pros:Krwawiący(2) @cons:Głośny(4) @cons:Paliwo @cons:Ciężki(2) | (Metal × 3) + [Mechanika](../Umiejętności.md#mechanika) | @range:melee @range:short(-2) @range:medium(-2) @range:long(-2) |

## Broń dystansowa

`ToDo: zasięgi i statystyki jeszcze są do przetestowania`

```ai
Projekt broni palnej opiera się na dwóch nowych, symetrycznych Wadach ograniczających zasięg skuteczny:
- @cons:Lunetowy — celownik optyczny uniemożliwia zwarcie i utrudnia bliski dystans (karabin myśliwski, karabin wyborowy).
- @cons:Niecelny-na-dystansie — konstrukcja faworyzuje bliższe starcia, utrudnia daleki dystans (karabinek szturmowy).
Atrybut Zasięg pokazuje maksymalny fizyczny zasięg (więc karabinek szturmowy ma `daleki`, mimo że tam traci), a wymienione Wady są wyjątkami od reguły „wyższy obejmuje bliższe” z `Walka.wip.md`.
Rozróżnienie karabinów: myśliwski = specjalista średniego dystansu i polowań (Łowiecki), wyborowy = specjalista średniego i dalekiego dystansu, precyzja + przebicie pancerza (Przebijający), za cenę rzadkiej amunicji.
Pistolet dostał Atut Podręczny (błyskawiczne dobycie, użycie w zaskoczeniu/ciasnocie) by odróżnić go od Pistoletu maszynowego, który tego nie ma (świadomie pominięte, nie Wada).
Niezawodny i Dostępna amunicja z `Lista Atutów i Wad.md` (osierocone po unifikacji pistoletów) zostały przywrócone do użycia na Pistolecie / Karabinku szturmowym / Strzelbie.

@pros:Modyfikowalny (Pistolet i Kusza(2), Karabinek szturmowy i Karabin wyborowy(1)) oznacza, że dana broń łatwo przyjmuje modyfikacje/doposażenie. Sama mechanika systemu modyfikacji broni nie istnieje jeszcze — zasygnalizowano ją w `DoZrobienia.wip.md`, do zaprojektowania później.
```

| Nazwa | Obrażenia | Zasięg | Właściwości | Wytworzenie | Zasięg (test) |
| --- | ---: | --- | --- | --- | --- |
| Pistolet | 1d6+1 | bliski | @pros:Podręczny @pros:Niezawodny @pros:Dostępna-amunicja @pros:Modyfikowalny(2) @cons:Głośny @cons:Naboje | (Metal × 2) + [Rusznikarstwo](../Umiejętności.md#rusznikarstwo) | @range:melee(-2) @range:short @range:medium(-2) @range:long(-2) |
| Pistolet maszynowy | 1d6+2 | średni | @pros:Szybkostrzelny(2) @cons:Głośny(2) @cons:Naboje(3) | (Metal × 2) + [Rusznikarstwo](../Umiejętności.md#rusznikarstwo) | @range:melee(-2) @range:short @range:medium @range:long(-2) |
| Strzelba | 2d6+2 | bliski | @pros:Rozpryskowy(3) @pros:Dostępna-amunicja @cons:Głośny(3) @cons:Mocny-odrzut @cons:Naboje(2) | (Metal × 2, Drewno × 1) + [Rusznikarstwo](../Umiejętności.md#rusznikarstwo) | @range:melee(-2) @range:short @range:medium(-2) @range:long(-2) |
| Karabin myśliwski | 2d6 | średni | @pros:Precyzyjny(2) @pros:Potężny(2) @pros:Łowiecki @cons:Lunetowy @cons:Wolny(2) @cons:Naboje | (Metal × 2, Drewno × 1) + [Rusznikarstwo](../Umiejętności.md#rusznikarstwo) | @range:melee(-2) @range:short(-1) @range:medium @range:long(-2) |
| Karabinek szturmowy | 2d6 | daleki | @pros:Wszechstronny @pros:Niezawodny @pros:Bagnet @pros:Szybkostrzelny(2) @pros:Modyfikowalny @cons:Głośny(3) @cons:Niecelny-na-dystansie @cons:Rzadka-amunicja @cons:Naboje(4) | (Metal × 3) + [Rusznikarstwo](../Umiejętności.md#rusznikarstwo) | @range:melee @range:short @range:medium @range:long(-1) |
| Karabin wyborowy | 2d6+1 | daleki | @pros:Precyzyjny(3) @pros:Potężny(2) @pros:Przebijający(2) @pros:Modyfikowalny @cons:Lunetowy @cons:Długi(2) @cons:Wolny(2) @cons:Rzadka-amunicja(2) @cons:Naboje | (Metal × 3, Szkło × 1) + [Rusznikarstwo](../Umiejętności.md#rusznikarstwo) | @range:melee(-2) @range:short(-1) @range:medium @range:long |
| Ciężki karabin maszynowy | 2d6+2 | średni | @pros:Szybkostrzelny(3) @pros:Potężny(2) @pros:Rozpryskowy(2) @cons:Głośny(4) @cons:Bardzo-ciężki @cons:Długi(2) @cons:Naboje(5) | (Metal × 5) + [Rusznikarstwo](../Umiejętności.md#rusznikarstwo) | @range:melee(-2) @range:short @range:medium @range:long(-2) |
| Kusza | 1d6+2 | średni | @pros:Cichy(3) @pros:Możliwość-odzysku-amunicji(2) @pros:Modyfikowalny(2) @cons:Wolny(2) @cons:Skomplikowany @cons:Strzały | (Drewno × 2, Metal × 1, Spoiwa × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | @range:melee(-2) @range:short @range:medium @range:long(-2) |
| Łuk | 1d6+1 | średni | @pros:Cichy(2) @pros:Możliwość-odzysku-amunicji @cons:Wolny @cons:Strzały | (Drewno × 1, Tkanina × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo) | @range:melee(-2) @range:short @range:medium @range:long(-2) |
| Proca | 1d6 | średni | @pros:Cichy(2) @pros:Lekki @cons:Słaby | (Tkanina × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo) | @range:melee(-2) @range:short @range:medium @range:long(-2) |
| Miotacz ognia | 2d6 (+ płonięcie) | bliski | @pros:Obszarowy(2) @pros:Podpalający(3) @cons:Ciężki(2) @cons:Łatwopalny(2) @cons:Paliwo(2) | (Metal × 2, Chemia × 2) + [Mechanika](../Umiejętności.md#mechanika) | @range:melee(-1) @range:short @range:medium(-2) @range:long(-2) |

## Granaty i materiały wybuchowe

| Nazwa | Obrażenia | Właściwości | Wytworzenie |
| --- | ---: | --- | --- |
| Granat odłamkowy | 2d6 | @pros:Obszarowy(3) @pros:Rozpryskowy(2) @cons:Głośny(3) @cons:Jednorazowy | (Metal × 1, Chemia × 2) + [Chemia](../Umiejętności.md#chemia) |
| Granat hukowy | 1d6 | @pros:Obszarowy(2) @pros:Ogłuszający(3) @cons:Głośny(3) @cons:Jednorazowy | (Metal × 1, Chemia × 2) + [Chemia](../Umiejętności.md#chemia) |
| Granat dymny | — | @pros:Obszarowy(3) @pros:Zasłaniający(3) @cons:Jednorazowy | (Metal × 1, Chemia × 1) + [Chemia](../Umiejętności.md#chemia) |
| Granat zapalający | 1d6 (+ płonięcie) | @pros:Obszarowy(3) @pros:Podpalający(3) @cons:Jednorazowy | (Metal × 1, Chemia × 2) + [Chemia](../Umiejętności.md#chemia) |
| Ładunek wybuchowy | 3d6 | @pros:Potężny(4) @pros:Obszarowy(3) @cons:Głośny(3) @cons:Jednorazowy @cons:Skomplikowany | (Metal × 1, Chemia × 3) + [Chemia](../Umiejętności.md#chemia) |
| Mina improwizowana | 2d6 | @pros:Zasadzka(3) @pros:Obszarowy(2) @cons:Niestabilny(3) @cons:Jednorazowy | (Metal × 1, Chemia × 2) + [Chemia](../Umiejętności.md#chemia) |
| Koktajl Mołotowa | 1d6+1 (+ płonięcie) | @pros:Obszarowy(3) @pros:Prowizorka(2) @cons:Łatwopalny(2) @cons:Jednorazowy @cons:Niestabilny | (Szkło × 1, Chemia × 1) + [Chemia](../Umiejętności.md#chemia) |
