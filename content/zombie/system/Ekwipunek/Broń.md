# Broń

Każdy przedmiot opisywany jest przez następujące atrybuty:
- Nazwa
- Opis
- Ilość
- Kategoria (Dystans lub Wręcz)
- Obrażenia
- [Właściwości](../Właściwości.md) (skala 1–5)
- Wytworzenie — `(Materiał, Materiał) + Umiejętność`; materiały z [Materiałów](Materiały.md), ilość jest abstrakcyjną jednostką

Wytworzenie przedmiotu wymaga wskazanej umiejętności i podanych materiałów. Osobnego Płatnerstwa nie ma — pancerze metalowe i broń biała z metalu kuje się [Kowalstwem](../Umiejętności.md#kowalstwo), broń palną [Rusznikarstwem](../Umiejętności.md#rusznikarstwo). Brak umiejętności działa jak `@cons:Skomplikowany` przy konstrukcjach: kara do testu albo niemożność wykonania.

Wady **Naboje**, **Strzały** i **Paliwo** oznaczają abstrakcyjne zużycie nabojów, strzał lub paliwa na scenę (skala 1–5). Pistolet ręczny zużywa 1 nabój, ciężki karabin maszynowy 5, miotacz ognia 4 paliwa. Granaty i ładunki wybuchowe pomijamy — są @cons:Jednorazowy.

Narzędzia używane też jako broń (siekiera, łom, młotek, piła łańcuchowa itd.) mają **tę samą listę właściwości** w [Ekwipunku ogólnym](EkwipunekOgólny.md); tu dokładane są obrażenia i wytworzenie.

## Broń wręcz

`ToDo: statystyki jeszcze są do przetestowania`

| Nazwa | Obrażenia | Właściwości | Wytworzenie |
|---|---:|---|---|
| Nóż | 1d6 | @pros:Cichy @pros:Lekki | (Metal × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) |
| Siekiera | 1d6+2 | @pros:Tnący(2) @pros:Wytrzymały @cons:Ciężki | (Metal × 1, Drewno × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) |
| Łom | 1d6+2 | @pros:Wytrzymały(2) @pros:Wielofunkcyjny @cons:Ciężki | (Metal × 2) + [Kowalstwo](../Umiejętności.md#kowalstwo) |
| Kij bejsbolowy | 1d6 | @pros:Wyważony @cons:Rozpoznawalny | (Drewno × 1) |
| Maczeta | 1d6+1 | @pros:Tnący(2) @pros:Wielofunkcyjny @pros:Wyważony | (Metal × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) |
| Młotek | 1d6 | @pros:Wielofunkcyjny @cons:Krótki | (Metal × 1, Drewno × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) |
| Kilof | 1d6+2 | @pros:Potężny @pros:Wytrzymały @cons:Ciężki | (Metal × 2, Drewno × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) |
| Włócznia | 1d6+1 | @pros:Zasięgowy @pros:Precyzyjny @cons:Nieporęczny | (Drewno × 1, Metal × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) |
| Pałka | 1d6 | @pros:Ogłuszający @cons:Krótki | (Drewno × 1) |
| Miecz | 1d6+2 | @pros:Tnący(2) @pros:Wyważony @cons:Trudny-do-zdobycia | (Metal × 3) + [Kowalstwo](../Umiejętności.md#kowalstwo) |
| Tasak | 1d6+1 | @pros:Tnący @cons:Ciężki | (Metal × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) |
| Piła łańcuchowa | 2d6+1 | @pros:Szybki(3) @pros:Potężny(2) @pros:Krwawiący(2) @cons:Głośny(5) @cons:Paliwo @cons:Ciężki(2) | (Metal × 3) + [Mechanika](../Umiejętności.md#mechanika) |

## Broń dystansowa

| Nazwa | Obrażenia | Właściwości | Wytworzenie |
|---|---:|---|---|
| Pistolet .22 | 1d6 | @pros:Lekki @pros:Cichy @cons:Słaby @cons:Naboje | (Metal × 1) + [Rusznikarstwo](../Umiejętności.md#rusznikarstwo) |
| Pistolet 9mm (Glock) | 1d6+2 | @pros:Niezawodny(2) @pros:Dostępna-amunicja @cons:Głośny(2) @cons:Naboje | (Metal × 2) + [Rusznikarstwo](../Umiejętności.md#rusznikarstwo) |
| Rewolwer | 1d6+2 | @pros:Niezawodny @pros:Prosty @cons:Wolny @cons:Naboje | (Metal × 2) + [Rusznikarstwo](../Umiejętności.md#rusznikarstwo) |
| Pistolet maszynowy | 1d6+2 | @pros:Szybkostrzelny(2) @cons:Głośny(3) @cons:Naboje(3) | (Metal × 2) + [Rusznikarstwo](../Umiejętności.md#rusznikarstwo) |
| Strzelba pompowa (12-gauge) | 2d6+2 | @pros:Rozpryskowy(3) @pros:Zastraszający(2) @cons:Głośny(3) @cons:Krótki-zasięg(2) @cons:Mocny-odrzut @cons:Naboje(2) | (Metal × 2, Drewno × 1) + [Rusznikarstwo](../Umiejętności.md#rusznikarstwo) |
| Karabin myśliwski | 2d6 | @pros:Precyzyjny(2) @pros:Potężny(2) @cons:Wolny(2) @cons:Długi @cons:Naboje | (Metal × 2, Drewno × 1) + [Rusznikarstwo](../Umiejętności.md#rusznikarstwo) |
| Karabinek szturmowy | 2d6 | @pros:Wszechstronny @pros:Szybkostrzelny(2) @cons:Głośny(3) @cons:Naboje(4) | (Metal × 3) + [Rusznikarstwo](../Umiejętności.md#rusznikarstwo) |
| Karabin wyborowy | 2d6+1 | @pros:Precyzyjny(3) @pros:Potężny(2) @cons:Długi(2) @cons:Wolny(2) @cons:Naboje | (Metal × 3, Szkło × 1) + [Rusznikarstwo](../Umiejętności.md#rusznikarstwo) |
| Ciężki karabin maszynowy | 2d6+2 | @pros:Szybkostrzelny(3) @pros:Potężny(2) @cons:Głośny(5) @cons:Ciężki(3) @cons:Długi(2) @cons:Naboje(5) | (Metal × 5) + [Rusznikarstwo](../Umiejętności.md#rusznikarstwo) |
| Kusza | 1d6+2 | @pros:Cichy(3) @pros:Możliwość-odzysku-amunicji(2) @cons:Wolny(2) @cons:Skomplikowany @cons:Strzały | (Drewno × 2, Metal × 1, Spoiwa × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) |
| Łuk | 1d6+1 | @pros:Cichy(2) @pros:Możliwość-odzysku-amunicji @cons:Wolny @cons:Strzały | (Drewno × 1, Tkanina × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo) |
| Proca | 1d6 | @pros:Cichy(2) @pros:Lekki @cons:Słaby | (Tkanina × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo) |
| Flara | 1d6 | @pros:Oślepiający @pros:Sygnalizacyjny @cons:Jednorazowy | (Chemia × 1) + [Chemia](../Umiejętności.md#chemia) |
| Miotacz ognia | 2d6 (+ płonięcie) | @pros:Obszarowy(2) @pros:Podpalający(3) @cons:Krótki-zasięg(2) @cons:Ciężki(2) @cons:Łatwopalny(2) @cons:Paliwo(4) | (Metal × 2, Chemia × 2) + [Mechanika](../Umiejętności.md#mechanika) |

## Granaty i materiały wybuchowe

| Nazwa | Obrażenia | Właściwości | Wytworzenie |
|---|---:|---|---|
| Granat odłamkowy | 2d6 | @pros:Obszarowy(3) @pros:Rozpryskowy(2) @cons:Głośny(3) @cons:Jednorazowy | (Metal × 1, Chemia × 2) + [Chemia](../Umiejętności.md#chemia) |
| Granat hukowy | 1d6 | @pros:Obszarowy(2) @pros:Ogłuszający(3) @cons:Głośny(3) @cons:Jednorazowy | (Metal × 1, Chemia × 2) + [Chemia](../Umiejętności.md#chemia) |
| Granat dymny | — | @pros:Obszarowy(3) @pros:Zasłaniający(3) @cons:Jednorazowy | (Metal × 1, Chemia × 1) + [Chemia](../Umiejętności.md#chemia) |
| Granat zapalający | 1d6 (+ płonięcie) | @pros:Obszarowy(3) @pros:Podpalający(3) @cons:Jednorazowy | (Metal × 1, Chemia × 2) + [Chemia](../Umiejętności.md#chemia) |
| Ładunek wybuchowy | 3d6 | @pros:Potężny(4) @pros:Obszarowy(3) @cons:Głośny(3) @cons:Jednorazowy @cons:Skomplikowany | (Metal × 1, Chemia × 3) + [Chemia](../Umiejętności.md#chemia) |
| Mina improwizowana | 2d6 | @pros:Zasadzka(3) @pros:Obszarowy(2) @cons:Niestabilny(3) @cons:Jednorazowy | (Metal × 1, Chemia × 2) + [Chemia](../Umiejętności.md#chemia) |
| Koktajl Mołotowa | 1d6+1 (+ płonięcie) | @pros:Obszarowy(3) @pros:Prowizorka(2) @cons:Łatwopalny(2) @cons:Jednorazowy @cons:Niestabilny | (Szkło × 1, Chemia × 1) + [Chemia](../Umiejętności.md#chemia) |
