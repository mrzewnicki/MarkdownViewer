# Ogólny

Każdy przedmiot opisywany jest przez następujące atrybuty:
- Nazwa
- Opis
- Ilość
- Wartość (skala 1–5, rzadkość / cena barterowa)
- [Właściwości](../Właściwości.md)
- Wytworzenie — `(Materiał, Materiał) + Umiejętność`; materiały z [Materiałów](Materiały.md), ilość jest abstrakcyjną jednostką

Wytworzenie przedmiotu wymaga wskazanej umiejętności i podanych materiałów. Narzędzia metalowe: [Kowalstwo](../Umiejętności.md#kowalstwo). Maszyny i urządzenia mechaniczne: [Mechanika](../Umiejętności.md#mechanika). Elektronika i zasilanie: [Elektrotechnika](../Umiejętności.md#elektrotechnika). Tkaniny, linki i miękkie pojemniki: [Krawiectwo](../Umiejętności.md#krawiectwo). Żywność i napoje: [Kucharstwo](../Umiejętności.md#kucharstwo), [Hodowla](../Umiejętności.md#hodowla) lub [Sztuka Przetrwania](../Umiejętności.md#sztuka-przetrwania). Leki i chemikalia: [Chemia](../Umiejętności.md#chemia) / [Medycyna](../Umiejętności.md#medycyna) / [Zielarstwo](../Umiejętności.md#zielarstwo). Brak umiejętności działa jak @cons:Skomplikowany przy konstrukcjach: kara do testu albo niemożność wykonania. `—` oznacza przedmiot niedostępny do wytworzenia (tylko znalezisko lub pozyskanie narracyjne).

Narzędzia używane też jako broń mają **tę samą listę właściwości** i to samo wytworzenie co w [Broni](Broń.md).

> Broń opisana jest w [Broń](Broń.md), ekwipunek ochronny w [Ekwipunek ochronny](EkwipunekOchronny.md), transport w [Transport](Transport.md), materiały w [Materiały](Materiały.md), konstrukcje w [Konstrukcje](Konstrukcje.md).

## Żywność i napoje

Jeśli postać przez cały dzień nie ma możliwości zjedzenia czegokolwiek lub napicia się wody to może otrzymać 1 punkt `Stresu` lub `Zmęczenia`.

| Nazwa | Wartość | Właściwości | Wytworzenie | Opis |
|---|:---:|---|---|---|
| Zepsute jedzenie | 1 | @pros:Kaloryczny @cons:Ryzykowny | — | Nadal może dostarczyć energii, ale jego spożycie grozi zatruciem lub chorobą. Wartość głównie w sytuacji skrajnego głodu. |
| Brudna woda | 2 | @cons:Ryzykowny | — | Gasi pragnienie, ale może zawierać patogeny i toksyny. Warto ją przegotować lub przepuścić przez filtr. |
| Piwo | 2 | @pros:Relaksacyjny | (Chemia × 1) + [Kucharstwo](../Umiejętności.md#kucharstwo) | Nietrwały w porównaniu z mocnym alkoholem, ciężki do transportu i wymagający stosunkowo dużo miejsca. Mimo to może być cennym luksusem. |
| Ciepły posiłek | 3 | @pros:Kaloryczny @pros:Relaksacyjny @cons:Szybko-psujący | [Kucharstwo](../Umiejętności.md#kucharstwo) | Gotowany posiłek — dostarcza energii i poprawia morale. Jego wartość rośnie szczególnie podczas długiego pobytu w terenie. |
| Deser | 3 | @pros:Relaksacyjny(2) | [Kucharstwo](../Umiejętności.md#kucharstwo) | Słodycze i inne rzadkie przysmaki. Nie są istotne dla przetrwania, ale mogą mieć dużą wartość dla morale i wymiany. |
| Mleko | 3 | @pros:Zdrowy(2) @cons:Szybko-psujący | [Hodowla](../Umiejętności.md#hodowla) | Odżywczy napój, ale trudny do przechowywania bez chłodzenia. Dostęp do świeżego mleka może być cenny w osadach posiadających zwierzęta gospodarskie. |
| Pasza dla zwierząt | 3 | @pros:Trwały(2) | [Hodowla](../Umiejętności.md#hodowla) | Pokarm dla zwierząt gospodarskich i transportowych. Ma niewielką wartość dla samotnego wędrowca, ale dużą dla osad utrzymujących zwierzęta. |
| Surowe mięso | 3 | @pros:Kaloryczny(3) @cons:Szybko-psujący | [Sztuka Przetrwania](../Umiejętności.md#sztuka-przetrwania) | Bardzo kaloryczne i odżywcze, ale wymaga szybkiego spożycia lub przetworzenia. Jego wartość rośnie, jeśli społeczność posiada możliwość gotowania, wędzenia lub suszenia. |
| Warzywa | 3 | @pros:Zdrowy(2) @cons:Szybko-psujący | [Hodowla](../Umiejętności.md#hodowla) | Świeże warzywa są cenne ze względu na wartości odżywcze, ale ich krótka trwałość mocno ogranicza wartość w handlu i transporcie. |
| Wino | 3 | @pros:Relaksacyjny(2) @pros:Antyseptyczny | (Chemia × 1) + [Kucharstwo](../Umiejętności.md#kucharstwo) | Alkohol o umiarkowanej wartości użytkowej. Zagotowany może służyć do wypalania ran, ale przede wszystkim jest luksusem poprawiającym morale. |
| Suszone jedzenie | 4 | @pros:Kaloryczny @pros:Trwały(3) | [Kucharstwo](../Umiejętności.md#kucharstwo) | Suszone mięso, warzywa lub owoce. Lekkie, trwałe i łatwe do transportowania. Szczególnie wartościowe podczas podróży. |
| Whisky | 4 | @pros:Relaksacyjny(3) @cons:Wycieńczający | (Chemia × 2) + [Kucharstwo](../Umiejętności.md#kucharstwo) | Mocny alkohol o wysokiej wartości wymiennej. Trwały, łatwy do przechowywania i ceniony jako luksus oraz środek dezynfekujący. |
| Żywność konserwowa | 4 | @pros:Kaloryczny @pros:Trwały(2) | (Metal × 1, Chemia × 1) + [Kucharstwo](../Umiejętności.md#kucharstwo) | Puszki i konserwy. Jedzenie gotowe do spożycia, stosunkowo kaloryczne i długo zachowujące przydatność. Jeden z podstawowych zasobów handlowych. |
| Woda pitna | 5 | @pros:Zdrowy | [Sztuka Przetrwania](../Umiejętności.md#sztuka-przetrwania) | Czysta, bezpieczna woda. Jeden z najcenniejszych zasobów — niezbędna do przeżycia i trudna do zastąpienia. |

## Narzędzia

| Nazwa | Wartość | Właściwości | Wytworzenie | Opis |
|---|:---:|---|---|---|
| Drut | 2 | - | (Metal × 1) | Stalowy lub miedziany. Do napraw, pułapek, improwizacji anten i wiązania konstrukcji. |
| Kombinerki | 2 | @pros:Wielofunkcyjny @pros:Precyzyjny | (Metal × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | Cięcie, chwytanie i podstawowe naprawy techniczne. |
| Maczeta | 2 | @pros:Tnący(2) @pros:Wielofunkcyjny @pros:Wyważony | (Metal × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | Przecinanie zarośli, lin i lekkiego drewna. Statystyki bojowe: [Maczeta](Broń.md#broń-wręcz). |
| Młotek | 2 | @pros:Wielofunkcyjny @cons:Krótki | (Metal × 1, Drewno × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | Do wbijania gwoździ, wyważania i podstawowych prac ciesielskich. Statystyki bojowe: [Młotek](Broń.md#broń-wręcz). |
| Nici i igły | 2 | - | (Metal × 1, Tkanina × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo) | Do naprawy odzieży, plecaków i ekwipunku. |
| Nóż | 2 | @pros:Cichy @pros:Lekki | (Metal × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | Uniwersalny nóż do prac w terenie i walki. Statystyki bojowe: [Nóż](Broń.md#broń-wręcz). |
| Siekiera | 2 | @pros:Tnący(2) @pros:Wytrzymały @cons:Ciężki | (Metal × 1, Drewno × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | Ścinanie i przygotowanie drewna. Statystyki bojowe: [Siekiera](Broń.md#broń-wręcz). |
| Smar | 2 | @pros:Konserwujący | (Chemia × 1) + [Chemia](../Umiejętności.md#chemia) | Olej lub odpowiednik WD-40. Do konserwacji broni, narzędzi i ruchomych części mechanizmów. Zapobiega rdzy. |
| Taśma klejąca | 2 | @pros:Wielofunkcyjny(2) | (Chemia × 1) + [Chemia](../Umiejętności.md#chemia) | Mocna taśma do prowizorycznych napraw, uszczelnień i improwizacji. Traci przyczepność w wilgoci. |
| Łopata | 2 | @pros:Wielofunkcyjny @pros:Wytrzymały | (Metal × 1, Drewno × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | Kopanie, prace ziemne i improwizowane zastosowania. |
| Kilof | 3 | @pros:Potężny @pros:Wytrzymały @cons:Ciężki | (Metal × 2, Drewno × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | Kruszenie skał, betonu i twardego gruntu. Statystyki bojowe: [Kilof](Broń.md#broń-wręcz). |
| Linka stalowa | 3 | @pros:Wytrzymały(2) | (Metal × 2) + [Kowalstwo](../Umiejętności.md#kowalstwo) | Odporna na przecięcie i rozerwanie. Do zabezpieczeń, pułapek i napraw wymagających dużej nośności. |
| Multitool | 3 | @pros:Wielofunkcyjny(2) | (Metal × 2) + [Kowalstwo](../Umiejętności.md#kowalstwo) | Nóż, śrubokręt, kombinerki i więcej w jednym narzędziu. Niezastąpiony przy improwizowanych naprawach. |
| Narzędzia do drewna | 3 | @pros:Wielofunkcyjny | (Metal × 1, Drewno × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | Piła, dłuta, strug i inne podstawowe narzędzia do cięcia oraz obróbki drewna. |
| Narzędzia do elektryki | 3 | @pros:Precyzyjny @cons:Skomplikowany | (Metal × 1, Elektryka × 1) + [Elektrotechnika](../Umiejętności.md#elektrotechnika) | Śrubokręty izolowane, miernik, szczypce do przewodów i zestaw do napraw instalacji elektrycznych. |
| Narzędzia do metalu | 3 | @pros:Wielofunkcyjny @pros:Precyzyjny | (Metal × 2) + [Kowalstwo](../Umiejętności.md#kowalstwo) | Piła do metalu, klucze, imadło podręczne i narzędzia do cięcia, montażu oraz napraw elementów metalowych. |
| Narzędzia do szkła | 3 | @pros:Precyzyjny | (Metal × 1, Szkło × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | Nóż do szkła, przyssawki, szczypce i środki do bezpiecznego cięcia oraz obróbki szkła. |
| Wiertarka | 3 | @pros:Wydajny @cons:Energia | (Metal × 2, Elektryka × 1) + [Mechanika](../Umiejętności.md#mechanika) | Wiercenie w konstrukcjach i naprawach. Egzemplarz ręczny jest cichszy i wolniejszy; akumulatorowy wymaga energii. |
| Zestaw naprawczy | 3 | @pros:Wielofunkcyjny(2) | (Metal × 1, Spoiwa × 1) + [Mechanika](../Umiejętności.md#mechanika) | Zbiór podstawowych narzędzi i materiałów do napraw sprzętu. |
| Łom | 3 | @pros:Wytrzymały(2) @pros:Wielofunkcyjny @cons:Ciężki | (Metal × 2) + [Kowalstwo](../Umiejętności.md#kowalstwo) | Wyważanie, rozbieranie konstrukcji i improwizowane naprawy. Statystyki bojowe: [Łom](Broń.md#broń-wręcz). |
| Piła łańcuchowa | 4 | @pros:Szybki(3) @pros:Potężny(2) @pros:Krwawiący(2) @cons:Głośny(5) @cons:Paliwo @cons:Ciężki(2) | (Metal × 3) + [Mechanika](../Umiejętności.md#mechanika) | Szybkie cięcie drewna. Statystyki bojowe: [Piła łańcuchowa](Broń.md#broń-wręcz). |
| Wytrychy | 4 | @pros:Precyzyjny(2) @cons:Skomplikowany | (Metal × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | Umożliwiają otwieranie niektórych zamków bez klucza. |

## Gotowanie

| Nazwa | Wartość | Właściwości | Wytworzenie | Opis |
|---|:---:|---|---|---|
| Garnek | 1 | @pros:Wytrzymały | (Metal × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | Do gotowania większych ilości żywności. |
| Menażka | 1 | @pros:Wytrzymały | (Metal × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | Naczynie do gotowania i spożywania posiłków w terenie. |
| Butla gazowa | 2 | @pros:Paliwo @cons:Ciężki | (Metal × 1, Chemia × 1) + [Chemia](../Umiejętności.md#chemia) | Zapas gazu do kuchenek i innych urządzeń. |
| Kuchenka turystyczna | 2 | @pros:Lekki @cons:Paliwo | (Metal × 1) + [Mechanika](../Umiejętności.md#mechanika) | Przenośne źródło ognia do gotowania. |
| Zestaw naczyń | 2 | @pros:Wielofunkcyjny | (Metal × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | Podstawowe naczynia i sztućce do przygotowywania posiłków. |

## Higiena

| Nazwa | Wartość | Właściwości | Wytworzenie | Opis |
|---|:---:|---|---|---|
| Ręcznik | 2 | - | (Tkanina × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo) | Do osuszania ciała i wyposażenia. |
| Mydło | 3 | @pros:Higieniczny | (Chemia × 1) + [Chemia](../Umiejętności.md#chemia) | Podstawowy środek do mycia rąk i ciała. |
| Środki piorące | 3 | @pros:Higieniczny | (Chemia × 1) + [Chemia](../Umiejętności.md#chemia) | Umożliwiają pranie odzieży i utrzymanie jej w używalnym stanie. |
| Papier toaletowy | 4 | @pros:Relaksacyjny | — | Podstawowy środek higieniczny — w postapo daje też poczucie normalności i komfortu. |
| Szczoteczka i pasta | 4 | @pros:Higieniczny | (Chemia × 1) + [Chemia](../Umiejętności.md#chemia) | Podstawowa higiena jamy ustnej. |

## Eksploracja

| Nazwa | Wartość | Właściwości | Wytworzenie | Opis |
|---|:---:|---|---|---|
| Mapa | 1 | @pros:Orientacja | [Nawigacja](../Umiejętności.md#nawigacja) | Pomaga określić położenie i zaplanować trasę. |
| Kompas | 2 | @pros:Orientacja | (Metal × 1, Szkło × 1) + [Mechanika](../Umiejętności.md#mechanika) | Umożliwia określenie kierunków bez dostępu do elektroniki. |
| Latarka | 2 | @cons:Energia | (Metal × 1, Elektryka × 1) + [Elektrotechnika](../Umiejętności.md#elektrotechnika) | Niezbędna w nocy i ciemnych budynkach. Bez baterii bezużyteczna. |
| Latarka czołowa | 2 | @pros:Lekki @cons:Energia | (Tkanina × 1, Elektryka × 1) + [Elektrotechnika](../Umiejętności.md#elektrotechnika) | Oświetla miejsce pracy bez zajmowania rąk. |
| Lornetka | 2 | @pros:Dalekowzroczność | (Szkło × 2, Metal × 1) + [Mechanika](../Umiejętności.md#mechanika) | Umożliwia obserwację odległych miejsc i celów. |
| Krótkofalówka | 3 | @pros:Komunikacja @cons:Energia | (Elektryka × 2, Metal × 1) + [Elektrotechnika](../Umiejętności.md#elektrotechnika) | Pozwala komunikować się na odległość bez infrastruktury. |
| Noktowizor | 5 | @pros:Widzenie-w-ciemności @cons:Energia(2) @cons:Kruchy | (Elektryka × 3, Szkło × 2, Metal × 1) + [Elektrotechnika](../Umiejętności.md#elektrotechnika) | Umożliwia obserwację w bardzo słabym świetle. |

## Magazynowanie

| Nazwa | Wartość | Właściwości | Wytworzenie | Opis |
|---|:---:|---|---|---|
| Torba | 1 | @pros:Pojemny @pros:Lekki | (Tkanina × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo) | Prosty pojemnik na wyposażenie. |
| Worek | 1 | @pros:Pojemny @pros:Lekki | (Tkanina × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo) | Prosty i tani sposób przechowywania materiałów. |
| Kanister na wodę | 2 | @pros:Pojemny(2) @pros:Wytrzymały | (Metal × 1) + [Kowalstwo](../Umiejętności.md#kowalstwo) | Przenośny pojemnik na wodę pitną. |
| Plecak | 2 | @pros:Pojemny(2) | (Tkanina × 2, Spoiwa × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo) | Podstawowy sposób przenoszenia wyposażenia. |
| Skrzynia | 2 | @pros:Wytrzymały @pros:Pojemny(3) @cons:Ciężki | (Drewno × 2, Spoiwa × 1) + [Budownictwo](../Umiejętności.md#budownictwo) | Solidny pojemnik do przechowywania wyposażenia. |
| Pojemnik hermetyczny | 3 | @pros:Izolowany @pros:Wodoodporny | (Metal × 1, Spoiwa × 1) + [Mechanika](../Umiejętności.md#mechanika) | Chroni zawartość przed wodą, wilgocią i zanieczyszczeniami. |

## Przetrwanie

| Nazwa | Wartość | Właściwości | Wytworzenie | Opis |
|---|:---:|---|---|---|
| Zapałki | 1 | @cons:Wrażliwy-na-wilgoć | (Drewno × 1, Chemia × 1) + [Chemia](../Umiejętności.md#chemia) | Drewniane zapałki do rozpalania ognia. Przechowywać w szczelnym pojemniku — wilgoć unieszkodliwia całą paczkę. |
| Lina (10 m) | 2 | @pros:Wielofunkcyjny | (Tkanina × 2) + [Krawiectwo](../Umiejętności.md#krawiectwo) | Nylonowa lub sizalowa. Wspinaczka, pułapki, schronienia — jedno z najbardziej wielozadaniowych narzędzi przetrwania. |
| Plandeka | 2 | @pros:Lekki | (Tkanina × 2) + [Krawiectwo](../Umiejętności.md#krawiectwo) | Lekka płachta do budowy prowizorycznego schronienia lub ochrony przed deszczem. |
| Zapalniczka | 2 | - | (Metal × 1, Chemia × 1) + [Mechanika](../Umiejętności.md#mechanika) | Szybsza i wygodniejsza od zapałek. Paliwo się kończy. |
| Śpiwór | 2 | @pros:Izolowany @pros:Regeneracyjny | (Tkanina × 2) + [Krawiectwo](../Umiejętności.md#krawiectwo) | Ochrona przed zimnem i lepszy odpoczynek przy nocowaniu w terenie. |
| Filtr wody | 3 | @pros:Filtr(5) | (Chemia × 1, Spoiwa × 1) + [Chemia](../Umiejętności.md#chemia) | Przenośny filtr mechaniczny. Umożliwia bezpieczne picie z rzek i zbiorników bez gotowania. Wymaga regularnego czyszczenia. |

## Medycyna

Przedmioty z Atutem **Antyseptyczny** służą do przeciwdziałania [Skażeniu tymczasowemu](../Mutacje%20i%20Skażenie.md#przeciwdziałanie-skażeniu-tymczasowemu) - przy udanym opracowaniu rany lub leczeniu zmniejszają bieżące Skażenie tymczasowe o wartość Atutu.

| Nazwa | Wartość | Właściwości | Wytworzenie | Opis |
|---|:---:|---|---|---|
| Tabletki przeciwbólowe | 2 | @pros:Przeciwbólowy | (Chemia × 2) + [Chemia](../Umiejętności.md#chemia) | Aspiryna, ibuprofen. Zmniejszają ból i stan zapalny. Nie leczą przyczyny. |
| Apteczka | 3 | @pros:Leczniczy(2) | (Tkanina × 1, Chemia × 1) + [Medycyna](../Umiejętności.md#medycyna) | Bandaże, gaziki, opatrunki i środki dezynfekujące. Standardowe wyposażenie do opatrywania ran. |
| Maska filtrująca | 3 | @pros:Filtr(2) | (Tkanina × 1, Chemia × 1) + [Krawiectwo](../Umiejętności.md#krawiectwo) | Chroni przed pyłem, dymem i częścią patogenów. Wkłady mają ograniczoną żywotność. |
| Opaska uciskowa | 3 | @pros:Tamujący(5) @cons:Ryzykowny | (Tkanina × 1) + [Medycyna](../Umiejętności.md#medycyna) | Ostateczny środek przy silnym krwotoku z kończyny. Źle założona lub zbyt długo utrzymywana uszkadza tkanki. |
| Opatrunek kompresowy | 3 | @pros:Tamujący(2) | (Tkanina × 1) + [Medycyna](../Umiejętności.md#medycyna) | Jałowy opatrunek z bandażem. Skuteczny przy tamowaniu krwawień. |
| Antybiotyki | 4 | @pros:Antybakteryjny(3) | (Chemia × 3) + [Chemia](../Umiejętności.md#chemia) | Leczą infekcje bakteryjne. Stosować tylko przy potwierdzonym zakażeniu — nadużycie buduje oporność. |

### Środki antyseptyczne

| Nazwa | Wartość | Właściwości | Wytworzenie | Opis |
|---|:---:|---|---|---|
| Wrzątek | 1 | @pros:Antyseptyczny | [Sztuka Przetrwania](../Umiejętności.md#sztuka-przetrwania) | Gorąca woda przydatna przede wszystkim do oczyszczania ran oraz wyjaławiania narzędzi i materiałów. |
| Woda utleniona | 2 | @pros:Antyseptyczny(2) | (Chemia × 1) + [Chemia](../Umiejętności.md#chemia) | Popularny środek antyseptyczny, który pomaga oczyścić ranę z drobnoustrojów i zanieczyszczeń. |
| Miód | 3 | @pros:Antyseptyczny(3) @pros:Kaloryczny | [Hodowla](../Umiejętności.md#hodowla) | Naturalny środek o właściwościach przeciwdrobnoustrojowych, który może być stosowany jako improwizowany opatrunek. |
| Mocny alkohol | 3 | @pros:Antyseptyczny(3) @pros:Relaksacyjny(2) @cons:Wycieńczający | (Chemia × 1) + [Kucharstwo](../Umiejętności.md#kucharstwo) | Wysokoprocentowy alkohol do dezynfekcji; wypity łagodzi napięcie, ale psuje regenerację fizyczną. |
| Spirytus | 3 | @pros:Antyseptyczny(3) | (Chemia × 2) + [Chemia](../Umiejętności.md#chemia) | Bardzo wysokoprocentowy alkohol, skuteczny w dezynfekcji, choć drażniący dla uszkodzonych tkanek. |
| Jodyna | 4 | @pros:Antyseptyczny(4) | (Chemia × 2) + [Chemia](../Umiejętności.md#chemia) | Skuteczny środek o szerokim działaniu przeciwdrobnoustrojowym, ceniony za możliwość dezynfekcji ran. |
| Zestaw chirurgiczny | 4 | @pros:Antyseptyczny(3) @pros:Leczniczy(4) @cons:Specjalistyczny(2) | (Metal × 2) + [Kowalstwo](../Umiejętności.md#kowalstwo), [Medycyna](../Umiejętności.md#medycyna) | Komplet sterylnych lub możliwych do wysterylizowania narzędzi pozwalających na profesjonalne opracowanie ran. |
| Chlorheksydyna | 5 | @pros:Antyseptyczny(5) @cons:Specjalistyczny | (Chemia × 3) + [Chemia](../Umiejętności.md#chemia) | Silny i szeroko działający antyseptyk, skuteczny przeciwko wielu bakteriom i innym drobnoustrojom. |

### Zielarstwo

Rośliny zastępują rzadkie i przeterminowane leki. Zbieranie, rozpoznanie i przygotowanie wymaga [Zielarstwa](../Umiejętności.md#zielarstwo). Gatunki pochodzą z [Flory](../../wiki/flora/Flora.md); zioła mutagenne mogą też regenerować [Punkty Mutacji](../Mutacje%20i%20Skażenie.md#regeneracja-punktów-mutacji).

| Nazwa | Wartość | Właściwości | Wytworzenie | Opis |
|---|:---:|---|---|---|
| Leadplant (*Amorpha canescens*) | 3 | @pros:Antyseptyczny(2) @pros:Przeciwbólowy @pros:Antyradiacyjny(2) @cons:Skomplikowany | [Zielarstwo](../Umiejętności.md#zielarstwo) | Maść na rany; z tłuszczem bizona łagodzi zbolałe mięśnie. Wywar z fioletowych kwiatów w małym stopniu chroni przed promieniowaniem, ale wymaga dodatkowych składników. |
| Czarny klon (*Acer nigrum*) | 4 | @pros:Leczniczy(2) @pros:Mutagenny(2) @cons:Trujący(2) | [Zielarstwo](../Umiejętności.md#zielarstwo) | Syrop przyspiesza zdrowienie u osób z mutacjami i regeneruje PM. Dla niemutowanych może okazać się trucizną. |
| Pan John | 5 | @pros:Usypiający(3) @pros:Hipnotyzujący(3) @cons:Trujący(3) @cons:Ryzykowny(2) @cons:Trudny-do-zdobycia(5) | [Zielarstwo](../Umiejętności.md#zielarstwo) | Słodki syrop z jedynego drzewa Pana John. Usypia i hipnotycznie ciągnie wizjami — ofiara łatwo traci kontrolę. Zdobywany tylko przy samym pniu. |

## Elektryka i komunikacja

| Nazwa | Wartość | Właściwości | Wytworzenie | Opis |
|---|:---:|---|---|---|
| Baterie | 1 | @pros:Energia | (Chemia × 1, Elektryka × 1) + [Elektrotechnika](../Umiejętności.md#elektrotechnika) | Jednorazowe ogniwa do latarek, radia i drobnej elektroniki. Niewielki zapas — szybko się wyczerpują. |
| Przewody elektryczne | 2 | @pros:Wytrzymały | (Metal × 1) + [Elektrotechnika](../Umiejętności.md#elektrotechnika) | Miedziane lub aluminiowe kable. Do rozprowadzania prądu i napraw instalacji. |
| Akumulator | 3 | @pros:Energia(3) @cons:Ciężki(2) | (Elektryka × 2, Chemia × 1, Metal × 1) + [Elektrotechnika](../Umiejętności.md#elektrotechnika) | Magazyn energii elektrycznej. Do zasilania urządzeń gdy nie ma innego źródła prądu. |
| Radio korbowe | 3 | @pros:Niezależny @pros:Relaksacyjny | (Elektryka × 2, Metal × 1) + [Elektrotechnika](../Umiejętności.md#elektrotechnika) | Odbiornik na baterie lub korbkę. Głosy, muzyka i wiadomości — namiastka dawnego życia bez zewnętrznego zasilania. |
| Dron | 4 | @pros:Pozycja-obserwacyjna(3) @pros:Wielofunkcyjny @pros:Cichy(2) @cons:Energia @cons:Skomplikowany(2) @cons:Kruchy(2) | (Elektryka × 3, Metal × 2) + [Elektrotechnika](../Umiejętności.md#elektrotechnika), [Mechanika](../Umiejętności.md#mechanika) | Bezzałogowy aparat latający ze kamerą. Zwiad z powietrza bez narażania operatora — wymaga naładowania, wprawy w sterowaniu i łatwo ulega uszkodzeniu. |
| Panele słoneczne | 4 | @pros:Energia(2) @cons:Zależny-od-pogody(4) @cons:Ciężki | (Elektryka × 2, Szkło × 2) + [Elektrotechnika](../Umiejętności.md#elektrotechnika) | Konwertują światło słoneczne na prąd. Do ładowania akumulatorów i zasilania prostych urządzeń. |
| Turbina wiatrowa | 4 | @pros:Energia(1) @cons:Zależny-od-pogody(2) | (Metal × 3, Elektryka × 2) + [Mechanika](../Umiejętności.md#mechanika), [Elektrotechnika](../Umiejętności.md#elektrotechnika) | Poruszane wiatrem łopaty generują prąd. Do ładowania akumulatorów i zasilania prostych urządzeń. |
