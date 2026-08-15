# Transport

Każdy pojazd i element wyposażenia transportowego opisywany jest przez następujące atrybuty:
- Nazwa
- Opis
- Ilość
- Wartość (skala 1–5, rzadkość / cena barterowa)
- [Właściwości](../Właściwości.md)

`ToDo: rozbudowa o więcej pojazdów, ładowność, zużycie paliwa i uszkodzenia`

## Pojazdy

| Nazwa | Wartość | Właściwości | Opis |
|---|:---:|---|---|
| Wóz pociągowy | 1 | @pros:Niezależny(2) @pros:Ładowność(2) @cons:Wolny(3) | Ręcznie lub zwierzęco ciągnięty wóz. Bez paliwa, przyzwoita ładowność — wolny i męczący w użyciu. |
| Rower | 2 | @pros:Niezależny(2) @pros:Cichy @pros:Manewrowość(2) | Transport bez paliwa i hałasu. Wytrzymały i łatwy w naprawie. Ograniczona ładowność. |
| Motocykl | 3 | @pros:Szybki(3) @pros:Manewrowość @cons:Paliwo @cons:Mały-ładowność(2) | Szybki transport dla jednej lub dwóch osób. Wymaga benzyny i podstawowej wiedzy mechanicznej. |
| Samochód spalinowy | 4 | @pros:Szybki(2) @pros:Ładowność(2) @pros:Wytrzymały(2) @cons:Paliwo(2) @cons:Głośny(2) | Osobowy lub dostawczy na benzynie/oleju. Szybki transport grupy i ekwipunku — wymaga paliwa i przejezdnych dróg. |
| Samochód elektryczny | 4 | @pros:Szybki(2) @pros:Ładowność(2) @pros:Cichy(2) @pros:Wytrzymały(2) @cons:Energia(2) | Osobowy lub dostawczy na prąd. Cichy i bez spalania — bez ładowania lub sprawnego akumulatora staje się bezużyteczny. |
| Ciężarówka | 4 | @pros:Ładowność(4) @pros:Wytrzymały(2) @cons:Paliwo(3) @cons:Głośny(3) @cons:Ciężki | Średni lub ciężki pojazd użytkowy. Duża ładowność przy umiarkowanej manewrowości — paliwożerna i głośna. |
| Tir | 5 | @pros:Ładowność(5) @pros:Wytrzymały(3) @cons:Paliwo(4) @cons:Głośny(3) @cons:Ciężki(2) | Ciężarówka dalekobieżna z naczepą. Ogromna ładowność, trudna w manewrach i żarłoczna na paliwo. Przyciąga uwagę. |

## Zwierzęta

Żywy transport. Nie wymaga paliwa ani części zamiennych, ale potrzebuje paszy, wody i opieki ([Jeździectwo](../Umiejętności.md#jeździectwo), [Hodowla](../Umiejętności.md#hodowla)).

| Nazwa | Wartość | Właściwości | Opis |
|---|:---:|---|---|
| Koń | 3 | @pros:Niezależny(2) @pros:Szybki(2) @pros:Manewrowość @pros:Cichy @pros:Ładowność @cons:Konsumpcja(2) | Wierzchowiec. Szybki i cichy transport bez paliwa — wymaga paszy, wody i regularnej opieki. Może też ciągnąć [Wóz pociągowy](#pojazdy). |

## Wyposażenie

| Nazwa | Wartość | Właściwości | Opis |
|---|:---:|---|---|
| Kanister na paliwo | 3 | @pros:Paliwo(5) @pros:Wybuchowy(2) @cons:Łatwopalny(2) | Pojemnik do magazynowania benzyny lub oleju. Zwiększa zasięg pojazdów, ale jest niebezpieczny przy pożarze. |
| Bateria samochodowa | 8 | @pros:Energia(5) | Akumulator 12 V. Magazynuje ładunek do rozruchu i zasilania pojazdów elektrycznych oraz urządzeń. |
