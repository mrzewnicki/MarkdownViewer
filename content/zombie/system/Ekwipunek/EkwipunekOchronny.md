# Pancerze

## Ekwipunek ochronny

Rozróżnia się 3 kategorie odzieży ochronnej:
1. Odzież/Amortyzacja (2)
2. Pancerz Uzupełniający (1)
3. Pancerz Główny (1)

Istnieją specjalne właściwości umożliwiający wpłynięcie na liczbę slotów w poszczególnych kategoriach.

Wartość ochrony redukuje każdorazowo zadawane obrażenia, dopóki nie zostanie zniszczony. Jeśli obrażenia po redukcji wciąż są zbyt duże by je zaakceptować, można poświęcić punkty z wartości ochrony by zanegować uderzenie. Wtedy otrzyma wadę "Uszkodzony" z wartością numeryczną reprezentującą poświęcone punkty.

Każdy przedmiot ochrony opisywany jest przez następujące atrybuty:
- Nazwa i opis
- Wartość ochrony
- [Właściwości](../Właściwości.md)
- Kategoria
- Wytworzenie — `(Materiał, Materiał) + Umiejętność`; materiały z [Materiałów](Materiały.md), ilość jest abstrakcyjną jednostką

Wytworzenie wymaga wskazanej umiejętności i podanych materiałów. Odzież i pancerze tkaninowe: [Krawiectwo](../Umiejętności.md#krawiectwo). Pancerze metalowe (kolczuga, hełmy, płyty, zbroja): [Kowalstwo](../Umiejętności.md#kowalstwo) — osobnego Płatnerstwa nie ma. Brak umiejętności działa jak @cons:Skomplikowany przy konstrukcjach.

### Odzież

Każdy człowiek docelowo ma 2 sloty odzieżowe reprezentujace ubrania jak spodnie, buty, koszulę, płaszcz itd. Bazowo nie ma potrzeby rozróżniania poszczególnych ubrań w tych dwóch ubrań dopóki nie stają się one wyjątkowe, dlatego przyjmuje się, że każdy nosi zwykłe ubrania.  O ile zwykłe ubrania nie przyznają korzyści poza możliwością użycia ich by tamować krwawienie, to ich nie noszenie już może być bardziej problematyczne. Nawet w średniowieczu pod zbroję zakładano odpowiednie materiały by rekompensować jej problemy. Dlatego w gatunkach innych niż ludzi nazywa się ten poziom Amortyzacją.

Choć istnieją ubrania zdolne zwiększyć ochronę przed atakami fizycznymi to częściej lepszym zastosowaniem ubrań jest możliwość ochrony przed stanami. Przykłady:
- Odzież ognioodporna - może pomóc przeżyć zetknięcie się z miotaczem ognia, którego płomienie przenikają metalowe płyty.
- Ciepłe ubrania - pomagają przetrwać niskie temperatury. Przy eksploracji podziemi może zapewnić ochrone przed wyziębieniem, a w tym świecie leki nie są dostępne na każdym rogu.
- Odzież kamuflująca - może utrudnić dostrzeżenie przez przeciwników
- Odzież antyprzecięciową (cut-resistant) – wykorzystuje włókna takie jak aramid czyli kevlar, Dyneema czy stalowe mikrowłókna. Może zapewnic dodatkowy punkt pancerza.
- Skórzany obcisły kostium - bardziej prowokuje niż chroni, ale przynajmniej wyglądasz sexy, a to też da się wykorzystać!

> [!info]
> Oczywiście można nosić dużą ilość ubrań, w powyższy sloty mają jedynie na celu kontrole efektów z nich płynących.

| Nazwa | Ochrona | Właściwości | Wytworzenie |
|---|---:|---|---|
| Zwykłe ubrania | 0 | @pros:Tamujący | (Tkanina × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo) |
| Ciężka odzież | 0 | @pros:Ciepły @pros:Amortyzacja | (Tkanina × 2) + [Krawiectwo](../Umiejętności.md#krawiectwo) |
| Odzież robocza | 1 | @pros:Wytrzymały | (Tkanina × 2) + [Krawiectwo](../Umiejętności.md#krawiectwo) |
| Odzież przeciwdeszczowa | 0 | @pros:Wodoodporny | (Tkanina × 1, Chemia × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo) |
| Odzież termiczna | 0 | @pros:Ciepły(2) | (Tkanina × 2) + [Krawiectwo](../Umiejętności.md#krawiectwo) |
| Mundur wojskowy | 0 | @pros:Kamuflujący | (Tkanina × 2) + [Krawiectwo](../Umiejętności.md#krawiectwo) |
| Kombinezon antychemiczny | 0 | @pros:Ochrona-chemiczna(3) @cons:Ciężki | (Tkanina × 2, Chemia × 2) + [Krawiectwo](../Umiejętności.md#krawiectwo) |
| Odzież antyprzecięciowa | 1 | @pros:Antyprzecięciowy(2) | (Tkanina × 2, Metal × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo) |
| Odzież ognioodporna | 1 | @pros:Ognioodporny(2) @cons:Ciężki | (Tkanina × 2, Chemia × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo) |

### Pancerz Uzupełniający

Pomijając stabilne psioniczne pole siłowe nie istnieje system ochrony osobistej, który nie miałby luki. Tak jak zbroja płytowa, która musi pozwolić na ruch potrzebuje kolczugi, która ochroni miejsca nie pokryte płytą lub takie, które lepiej znoszą obuch młota. Dokłądnie to jest celem warstwy uzupełniajacej. Jeśli w ramach pancerza głónego nosi się kamizelkę kevlarową przeciw pociskom, to dobrze jest się zabezpieczyć przed bagnetami.

Ważną cechą pancerza uzupełniającego jest to, że częściej łatwiej go zdobyć niż główny i wiążę sie on z takimi ograniczeniami. Ciężka gruba płyta w podóży może okazać się balastem, a kolczuga lub skóra wystarczającym środkiem ochrony przed dotarciem do miejsca bitwy.

Przykłady:
- Kolczuga - jest dobrym balansem między pancerzem, a wygodą noszenia, ale jej waga może czasem przeszkadzać
- Kamizelka kevlarowa - świetna przeciw pociskom, ale łatwo obejść jej ochronę bronią białą
- Kamizelka taktyczna - nie zapewnia ochrony, ale umożliwia wygodne używanie dodatkowego ekwipunku jak granatym, magazynki i inne nie duże przedmioty

| Nazwa | Ochrona | Właściwości | Wytworzenie |
|---|---:|---|---|
| Kamizelka taktyczna | 0 | @pros:Pojemny(2) | (Tkanina × 2, Spoiwa × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo) |
| Kamizelka kevlarowa | 2 | @pros:Kuloodporny(2) | (Tkanina × 2, Chemia × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo) |
| Kolczuga | 1 | @pros:Antyprzebiciowy(2) @cons:Ciężki | (Metal × 3) + [Kowalstwo](../Umiejętności.md#kowalstwo) |
| Hełm stalowy | 1 | @pros:Wytrzymały @cons:Ciężki | (Metal × 2) + [Kowalstwo](../Umiejętności.md#kowalstwo) |
| Hełm taktyczny | 1 | @pros:Wytrzymały @pros:Pojemny | (Metal × 1, Tkanina × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) |
| Nakolanniki i nałokietniki | 1 | @pros:Amortyzacja | (Tkanina × 1, Spoiwa × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo) |
| Tarcza balistyczna | 2 | @pros:Kuloodporny(3) @cons:Ciężki(3) | (Metal × 3, Tkanina × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) |

### Pancerz Główny

Najwyższy poziom ochrony zapewniajacy największe wartości pancerza. Często są spadkiem upadłego świata lub najtrudniejszym do wytworzenia ekwipunkiem. Wiele z nich ma zastosowania bardziej funkcyjne ze względu na swoją wagę. Tak zbroja płytowa z muzeum będzie utrudniała wszelkie pościgi, ale w bezpośrednim starciu będzie najlepszym wyborem.

- Zbroja płytowa - wysoka ochrona w walce wręcz, lecz upał lub woda potrafi stać się zagrożeniem. Kiepska do pościgów.
- Kombinezon saperski - uniemożliwia poruszanie inne niż chód, ale niemal całkiem uodparnia na odłamki i eksplozje.

| Nazwa | Ochrona | Właściwości | Wytworzenie |
|---|---:|---|---|
| Lekki pancerz płytowy | 2 | @pros:Wytrzymały(2) @cons:Ciężki | (Metal × 4, Tkanina × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) |
| Ciężki pancerz płytowy | 3 | @pros:Wytrzymały(3) @cons:Ciężki(3) @cons:Gorący | (Metal × 6, Tkanina × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) |
| Kamizelka balistyczna z płytami | 3 | @pros:Kuloodporny(3) @cons:Ciężki(2) | (Tkanina × 2, Metal × 3, Chemia × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo), [Kowalstwo](../Umiejętności.md#kowalstwo) |
| Kombinezon saperski | 3 | @pros:Ochrona-wybuchowa(5) @pros:Wytrzymały(2) @cons:Bardzo-ciężki(3) | (Tkanina × 3, Metal × 3, Chemia × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo), [Kowalstwo](../Umiejętności.md#kowalstwo) |
| Improwizowany pancerz | 1 | @pros:Prowizorka(2) @cons:Nieporęczny | (Metal × 1, Tkanina × 1, Spoiwa × 1) |
| Zbroja historyczna | 3 | @pros:Wytrzymały(3) @cons:Ciężki(3) @cons:Gorący | (Metal × 6) + [Kowalstwo](../Umiejętności.md#kowalstwo) |
