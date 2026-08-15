# Konstrukcje

Materiały wymagane do budowy są opisane w [Materiałach](Materiały.md).

Każda konstrukcja opisywana jest przez następujące atrybuty:
- Nazwa
- Opis
- Złożoność
- Czas
- Materiały
- [Właściwości](../Właściwości.md)

**Złożoność** określa trudność testu Budowania. Im wyższa wartość, tym trudniejsza jest konstrukcja.

**Czas** określa orientacyjny czas potrzebny na wykonanie konstrukcji:
- 1 — kilka minut
- 2 — do godziny
- 3 — kilka godzin
- 4 — jeden dzień
- 5 — kilka dni
- 6 — tydzień lub więcej

**Materiały** określają podstawowe zasoby wymagane do wykonania konstrukcji. Podana ilość jest abstrakcyjną jednostką materiału i nie musi odpowiadać konkretnej jednostce masy lub objętości.

Właściwość @cons:Skomplikowany(0) oznacza, że konstrukcja wymaga specjalistycznej wiedzy. W przypadku braku odpowiedniej wiedzy jej wartość może stanowić ujemny modyfikator testu Budowania.

| Nazwa | Złożoność | Czas | Materiały | Właściwości | Opis |
|---|:---:|:---:|---|---|---|
| Barykada | 1 | 1 | Drewno × 3, Spoiwa × 1 | - | Prosta przeszkoda blokująca przejście i utrudniająca przedostanie się przez zabezpieczony otwór. |
| Palenisko | 1 | 1 | Kamień × 2 | - | Miejsce do rozpalania ognia, gotowania i ogrzewania. |
| Prowizoryczne drzwi | 1 | 2 | Drewno × 3, Spoiwa × 1 | - | Proste drzwi wykonane z dostępnych materiałów, pozwalające zamknąć istniejący otwór. |
| Półka | 1 | 1 | Drewno × 2, Spoiwa × 1 | - | Prosta konstrukcja do przechowywania wyposażenia i zapasów. |
| Regał | 1 | 2 | Drewno × 4, Spoiwa × 1 | - | Większa konstrukcja do uporządkowanego przechowywania wyposażenia i zapasów. |
| Rygiel | 1 | 1 | Drewno × 1, Metal × 1, Spoiwa × 1 | @pros:Obronny | Proste mechaniczne zamknięcie wzmacniające drzwi lub bramę. |
| Stojak | 1 | 1 | Drewno × 2, Spoiwa × 1 | - | Prosta konstrukcja do przechowywania lub eksponowania wyposażenia. |
| Stół roboczy | 1 | 2 | Drewno × 4, Spoiwa × 1 | @pros:Warsztat | Proste stanowisko umożliwiające wykonywanie podstawowych prac i craftingu. |
| Suszarnia | 1 | 2 | Drewno × 2, Spoiwa × 1 | - | Prosta konstrukcja umożliwiająca suszenie żywności, ziół i innych materiałów. |
| Zadaszenie | 1 | 2 | Drewno × 2, Spoiwa × 1 | - | Prosta konstrukcja chroniąca przed deszczem, śniegiem i słońcem. |
| Zbiornik na wodę | 1 | 1 | Drewno × 1, Spoiwa × 1 | @pros:Pojemny | Prosta konstrukcja umożliwiająca gromadzenie i przechowywanie wody. |

## Schronienia i obóz

| Nazwa | Złożoność | Czas | Materiały | Właściwości | Opis |
|---|:---:|:---:|---|---|---|
| Latryna | 1 | 2 | Drewno × 2, Spoiwa × 1 | @pros:Higieniczny | Prosta konstrukcja przeznaczona do bezpiecznego odprowadzania nieczystości. |
| Namiot | 1 | 1 | Drewno × 1, Spoiwa × 1 | @pros:Przenośny | Lekkie, tymczasowe schronienie zapewniające podstawową ochronę przed warunkami atmosferycznymi. |
| Składowisko | 1 | 1 | Drewno × 2 | @pros:Pojemny | Wyznaczone i przygotowane miejsce do przechowywania dużych ilości materiałów. |
| Szopa | 1 | 3 | Drewno × 6, Metal × 1, Spoiwa × 2 | - | Prosty zamknięty obiekt do przechowywania narzędzi, materiałów i sprzętu. |
| Wiata | 1 | 2 | Drewno × 4, Spoiwa × 1 | - | Zadaszona, otwarta konstrukcja zapewniająca miejsce do pracy lub przechowywania wyposażenia. |
| Magazyn | 2 | 4 | Drewno × 8, Metal × 3, Spoiwa × 2 | @pros:Pojemny | Zamknięty obiekt przeznaczony do bezpiecznego przechowywania zapasów i wyposażenia. |
| Piec | 2 | 3 | Kamień × 4, Metal × 1, Spoiwa × 1 | @pros:Ognioodporny | Konstrukcja umożliwiająca gotowanie, ogrzewanie oraz obróbkę materiałów wymagających wysokiej temperatury. |
| Prysznic polowy | 2 | 2 | Drewno × 2, Spoiwa × 1 | - | Prosta instalacja umożliwiająca utrzymanie higieny osobistej. |
| Spiżarnia | 2 | 3 | Drewno × 6, Metal × 1, Kamień × 1, Spoiwa × 2 | @pros:Izolowany | Pomieszczenie przeznaczone do przechowywania żywności i zapasów wymagających ochrony przed warunkami zewnętrznymi. |
| Stół warsztatowy | 2 | 3 | Drewno × 4, Metal × 2, Spoiwa × 2 | @pros:Warsztat(2) | Solidne stanowisko umożliwiające wykonywanie zaawansowanych prac mechanicznych i rzemieślniczych. |
| Warsztat | 2 | 4 | Drewno × 6, Metal × 3, Spoiwa × 2 | @pros:Warsztat | Pomieszczenie przeznaczone do naprawy, obróbki materiałów i wykonywania bardziej złożonych konstrukcji. |
| Wędzarnia | 2 | 3 | Kamień × 3, Drewno × 2 | - | Konstrukcja umożliwiająca konserwowanie żywności poprzez wędzenie. |
| Kuźnia | 3 | 5 | Kamień × 6, Metal × 3, Spoiwa × 2 | @pros:Ognioodporny(2) @pros:Produkcja(2) | Stanowisko umożliwiające obróbkę metalu przy użyciu wysokiej temperatury. |

## Urządzenia mechaniczne

| Nazwa | Złożoność | Czas | Materiały | Właściwości | Opis |
|---|:---:|:---:|---|---|---|
| Bloczek | 1 | 1 | Drewno × 1, Metal × 1, Spoiwa × 1 | @pros:Wspomagający | Proste urządzenie zmieniające kierunek działania siły i ułatwiające podnoszenie ładunków. |
| Dźwignia | 1 | 1 | Drewno × 1, Metal × 1 | @pros:Wspomagający | Proste urządzenie wykorzystujące zasadę dźwigni do przesuwania lub podnoszenia ciężkich przedmiotów. |
| Rampa | 1 | 1 | Drewno × 3, Spoiwa × 1 | @pros:Wspomagający | Pochyła konstrukcja ułatwiająca przemieszczanie ciężkich przedmiotów na inną wysokość. |
| Taczka | 1 | 2 | Drewno × 2, Metal × 1, Spoiwa × 1 | @pros:Logistyka | Proste urządzenie umożliwiające transport ciężkich materiałów przez jedną osobę. |
| Wózek transportowy | 1 | 2 | Drewno × 3, Metal × 2, Spoiwa × 1 | @pros:Logistyka | Konstrukcja umożliwiająca przemieszczanie większej ilości materiałów przy mniejszym wysiłku. |
| Kołowrót | 2 | 2 | Drewno × 2, Metal × 2, Spoiwa × 1 | @pros:Wspomagający | Mechanizm wykorzystujący obrót do podnoszenia, opuszczania lub napinania ciężkich przedmiotów. |
| Wciągarka linowa | 2 | 3 | Metal × 3, Spoiwa × 2 | @pros:Wspomagający(2) | Mechanizm umożliwiający przeciąganie ciężkich przedmiotów przy użyciu liny. |
| Wciągarka ręczna | 2 | 3 | Metal × 3, Spoiwa × 2 | @pros:Wspomagający(2) | Mechanizm umożliwiający podnoszenie lub przeciąganie ciężkich przedmiotów przy użyciu ręcznej siły. |
| Wielokrążek | 2 | 3 | Drewno × 2, Metal × 3, Spoiwa × 2 | @pros:Wspomagający(2) | Układ bloczków pozwalający znacząco zmniejszyć siłę potrzebną do podnoszenia ciężkich ładunków. |
| Prosty żuraw | 3 | 4 | Drewno × 5, Metal × 3, Spoiwa × 2 | @pros:Wspomagający(2) | Konstrukcja umożliwiająca podnoszenie i przemieszczanie ciężkich ładunków. |
| Wózek na szynach | 3 | 5 | Drewno × 4, Metal × 5, Spoiwa × 2 | @pros:Logistyka(2) | Wózek poruszający się po stałej trasie, umożliwiający transport ciężkich ładunków. |
| Żuraw obrotowy | 3 | 5 | Drewno × 5, Metal × 5, Spoiwa × 3 | @pros:Wspomagający(3) | Żuraw umożliwiający podnoszenie oraz przemieszczanie ładunków w różnych kierunkach. |

## Pułapki i alarmy

| Nazwa | Złożoność | Czas | Materiały | Właściwości | Opis |
|---|:---:|:---:|---|---|---|
| Alarm na sznurku | 1 | 1 | Spoiwa × 1 | @pros:Głośny | Prosty mechanizm uruchamiający sygnał po naruszeniu napiętej linki. |
| Dzwonki alarmowe | 1 | 1 | Metal × 1, Spoiwa × 1 | @pros:Głośny | Mechanizm wydający głośny dźwięk po naruszeniu zabezpieczenia. |
| Przeszkoda | 1 | 1 | Drewno × 2, Spoiwa × 1 | @pros:Ukryty | Prosta przeszkoda umieszczona w sposób utrudniający lub spowalniający przejście. |
| Pułapka na drzwi | 1 | 1 | Metal × 1, Spoiwa × 1 | @pros:Głośny | Prosty mechanizm informujący o otwarciu zabezpieczonych drzwi. |
| Ukryta linka | 1 | 1 | Spoiwa × 1 | @pros:Ukryty | Niewidoczna lub trudna do zauważenia linka uruchamiająca przygotowany mechanizm po jej naruszeniu. |
| Alarm mechaniczny | 2 | 2 | Metal × 1, Spoiwa × 2 | @pros:Głośny(2) | Bardziej złożony mechanizm uruchamiający sygnał alarmowy po wykryciu naruszenia. |
| Kolczasta przeszkoda | 2 | 2 | Drewno × 2, Metal × 2, Spoiwa × 1 | @pros:Ciernie | Konstrukcja z wystającymi ostrymi elementami utrudniająca przejście przez zabezpieczony obszar. |
| Mechanizm blokujący | 2 | 2 | Metal × 2, Spoiwa × 2 | - | Mechanizm automatycznie blokujący przejście lub element konstrukcji po jego uruchomieniu. |
| Pułapka na pojazdy | 2 | 2 | Drewno × 2, Metal × 2, Spoiwa × 1 | @pros:Unieruchamiający | Konstrukcja przeznaczona do zatrzymywania lub utrudniania przejazdu pojazdom. |
| Pułapka zaciskowa | 2 | 3 | Metal × 2, Spoiwa × 2 | @pros:Unieruchamiający | Mechanizm zaciskający się po uruchomieniu i ograniczający możliwość ruchu celu. |
| Rów | 2 | 4 | - | @pros:Spowalniający | Wykopana przeszkoda terenowa utrudniająca przejście lub przejazd. |
| Zapadnia | 2 | 3 | Drewno × 4, Metal × 1, Spoiwa × 2 | @pros:Ukryty | Mechanizm otwierający przygotowany otwór po uruchomieniu. |
| Strefa pułapek | 3 | 5 | Drewno × 4, Metal × 2, Spoiwa × 3 | @pros:Ciernie(2) | Obszar wyposażony w kilka współdziałających pułapek utrudniających lub uniemożliwiających przejście. |
| System kierowania ruchu | 3 | 4 | Drewno × 5, Metal × 2, Spoiwa × 3 | - | Układ przeszkód i mechanizmów zmuszający osoby lub stworzenia do poruszania się określoną trasą. |

## Obrona i fortyfikacje

| Nazwa | Złożoność | Czas | Materiały | Właściwości | Opis |
|---|:---:|:---:|---|---|---|
| Furtka | 1 | 2 | Drewno × 2, Metal × 1, Spoiwa × 1 | - | Małe, kontrolowane przejście w ogrodzeniu lub umocnieniu. |
| Okiennica | 1 | 1 | Drewno × 2, Spoiwa × 1 | @pros:Obronny | Ruchoma osłona zabezpieczająca otwór okienny. |
| Płot | 1 | 3 | Drewno × 4, Spoiwa × 1 | - | Proste ogrodzenie wyznaczające granicę i utrudniające przejście. |
| Brama | 2 | 3 | Drewno × 4, Metal × 2, Spoiwa × 2 | @pros:Obronny | Kontrolowane przejście pozwalające otwierać i zamykać ogrodzony obszar. |
| Kraty | 2 | 3 | Metal × 3, Spoiwa × 2 | @pros:Obronny(2) | Metalowa konstrukcja zabezpieczająca drzwi, okna lub inne otwory. |
| Palisada | 2 | 4 | Drewno × 8, Spoiwa × 2 | @pros:Obronny(2) | Ciężka drewniana fortyfikacja utrudniająca przedostanie się do chronionego obszaru. |
| Rów obronny | 2 | 5 | - | @pros:Obronny(2) | Głęboki wykop utrudniający dostęp do chronionego obszaru. |
| Stanowisko obserwacyjne | 2 | 3 | Drewno × 4, Spoiwa × 2 | @pros:Pozycja-obserwacyjna(2) | Podwyższone lub osłonięte miejsce umożliwiające obserwację otoczenia. |
| Wał ziemny | 2 | 4 | Kamień × 3 | @pros:Obronny(2) | Nasyp ziemny zapewniający osłonę i mogący stanowić podstawę innych umocnień. |
| Wzmocniona barykada | 2 | 2 | Drewno × 3, Metal × 2, Spoiwa × 2 | @pros:Wytrzymały(2) | Wzmocniona konstrukcja blokująca przejście i wytrzymująca większe obciążenia. |
| Wzmocniony płot | 2 | 4 | Drewno × 5, Metal × 2, Spoiwa × 2 | @pros:Wytrzymały(2) | Solidniejsze ogrodzenie przeznaczone do ochrony obozu lub posesji. |
| Brama warowna | 3 | 5 | Drewno × 6, Metal × 4, Spoiwa × 3 | @pros:Wytrzymały(3) | Silnie zabezpieczona brama przeznaczona do ochrony głównego wejścia. |
| Mur | 3 | 5 | Kamień × 8, Metal × 1, Spoiwa × 3 | @pros:Wytrzymały(3) | Trwała konstrukcja wykonana z ciężkich materiałów, zapewniająca skuteczne odgrodzenie i ochronę. |
| Stanowisko ochronne | 3 | 4 | Drewno × 3, Metal × 3, Kamień × 2, Spoiwa × 2 | @pros:Obronny(3) | Osłonięte stanowisko umożliwiające bezpieczną obserwację i obronę terenu. |
| Wieża strażnicza | 3 | 5 | Drewno × 8, Metal × 2, Spoiwa × 3 | @pros:Pozycja-obserwacyjna(3) | Wysoka konstrukcja zapewniająca szeroki widok na otoczenie i umożliwiająca wczesne wykrywanie zagrożeń. |
| Wzmocniony mur | 4 | 6 | Kamień × 10, Metal × 3, Spoiwa × 4 | @pros:Wytrzymały(4) | Solidny mur przystosowany do wytrzymywania znacznych obciążeń i ataków. |
| Mur forteczny | 5 | 6 | Kamień × 15, Metal × 5, Spoiwa × 5 | @pros:Wytrzymały(5) | Ciężkie umocnienie zaprojektowane do długotrwałej ochrony dużego obszaru. |

## Budynki

| Nazwa | Złożoność | Czas | Materiały | Właściwości | Opis |
|---|:---:|:---:|---|---|---|
| Szałas | 1 | 2 | Drewno × 3, Spoiwa × 1 | - | Minimalne, tymczasowe schronienie wykonane z łatwo dostępnych materiałów. |
| Chata | 2 | 4 | Drewno × 8, Kamień × 2, Spoiwa × 2 | @pros:Mieszkalny | Prosty, zamknięty budynek zapewniający podstawowe warunki do życia. |
| Stodoła | 2 | 5 | Drewno × 12, Metal × 3, Spoiwa × 3 | @pros:Pojemny(2) | Duży obiekt przeznaczony do przechowywania materiałów, narzędzi lub zapasów. |
| Domek | 3 | 5 | Drewno × 12, Kamień × 3, Szkło × 2, Spoiwa × 4 | @pros:Mieszkalny(2) | Pełnoprawny niewielki budynek mieszkalny zapewniający ochronę przed warunkami zewnętrznymi. |
| Garaż | 3 | 5 | Drewno × 8, Metal × 5, Spoiwa × 4 | @pros:Warsztat | Zadaszony i zamykany obiekt przeznaczony do przechowywania oraz naprawy pojazdów. |
| Rusznikarnia | 3 | 5 | Drewno × 6, Metal × 4, Chemia × 2, Spoiwa × 3 | @pros:Warsztat(2) @pros:Produkcja(2) | Stanowisko do naprawy broni oraz produkcji amunicji (wymaga Metalu i Chemii). |
| Budynek mieszkalny | 4 | 6 | Drewno × 18, Kamień × 6, Metal × 4, Szkło × 3, Spoiwa × 6 | @pros:Mieszkalny(3) | Duży budynek przeznaczony do zakwaterowania większej liczby osób. |
| Dom | 4 | 6 | Drewno × 18, Kamień × 8, Metal × 4, Szkło × 4, Spoiwa × 6 | @pros:Mieszkalny(4) | Kompletny budynek mieszkalny zapewniający przestrzeń do życia i przechowywania wyposażenia. |
| Hala | 4 | 6 | Drewno × 15, Metal × 8, Kamień × 4, Spoiwa × 6 | @pros:Pojemny(4) | Duża konstrukcja zapewniająca znaczną przestrzeń użytkową. |
| Umocniony budynek | 4 | 6 | Drewno × 10, Metal × 6, Kamień × 6, Spoiwa × 5 | @pros:Obronny(3) | Budynek przystosowany do pełnienia jednocześnie funkcji mieszkalnej i obronnej. |

## Infrastruktura osady

| Nazwa | Złożoność | Czas | Materiały | Właściwości | Opis |
|---|:---:|:---:|---|---|---|
| System zbierania deszczówki | 2 | 3 | Drewno × 2, Metal × 1, Spoiwa × 2 | @pros:Woda | Układ umożliwiający zbieranie i kierowanie wody opadowej do zbiornika. |
| Cysterna | 3 | 5 | Metal × 5, Spoiwa × 3 | @pros:Pojemny(3) | Duży zbiornik przeznaczony do przechowywania znacznych ilości wody. |
| Droga | 3 | 5 | Kamień × 8 | @pros:Logistyka(2) | Przygotowana trasa ułatwiająca przemieszczanie ludzi, pojazdów i ładunków. |
| Pompa wodna | 3 | 4 | Metal × 3, Spoiwa × 2 | @pros:Woda(2) | Urządzenie umożliwiające przemieszczanie wody pomiędzy zbiornikami lub instalacjami. |
| Studnia | 3 | 6 | Kamień × 8, Metal × 2, Spoiwa × 2 | @pros:Woda(3) | Konstrukcja zapewniająca dostęp do wody gruntowej. |
| Szklarnia | 3 | 5 | Drewno × 4, Metal × 2, Szkło × 6, Spoiwa × 2 | @pros:Produkcja(2) | Konstrukcja umożliwiająca uprawę roślin w kontrolowanych warunkach. |
| Wieża obserwacyjna | 3 | 5 | Drewno × 8, Metal × 2, Spoiwa × 3 | @pros:Pozycja-obserwacyjna(3) | Wysoka konstrukcja zapewniająca kontrolę nad rozległym obszarem. |
| Farma | 4 | 6 | Drewno × 8, Kamień × 3, Metal × 2, Spoiwa × 3 | @pros:Produkcja(4) | Zorganizowany obszar przeznaczony do stałej produkcji żywności. |
| Generator | 4 | 6 | Metal × 5, Kamień × 3, Elektryka × 5, Spoiwa × 4 | @pros:Energia(5) @cons:Skomplikowany(2) | Obiekt przeznaczony do produkcji i obsługi energii elektrycznej. |
| Instalacja elektryczna | 4 | 5 | Metal × 2, Elektryka × 5, Spoiwa × 3 | @pros:Energia(3) @cons:Skomplikowany(2) | System przewodów i urządzeń umożliwiający dystrybucję energii po osadzie. |
| Most | 4 | 6 | Drewno × 12, Metal × 5, Kamień × 5, Spoiwa × 5 | @pros:Logistyka(4) @cons:Skomplikowany(2) | Konstrukcja umożliwiająca przekraczanie rzek, przepaści i innych przeszkód terenowych. |
| Młyn | 4 | 6 | Drewno × 8, Metal × 4, Kamień × 4, Spoiwa × 3 | @pros:Produkcja(3) @cons:Skomplikowany | Konstrukcja umożliwiająca przetwarzanie zbóż na mąkę. |
| System kanalizacyjny | 4 | 6 | Kamień × 8, Metal × 3, Spoiwa × 5 | @pros:Higieniczny(4) @cons:Skomplikowany(2) | Rozbudowany system odprowadzania ścieków i nieczystości z osady. || Warsztat mechaniczny | 4 | 6 | Drewno × 8, Metal × 6, Elektryka × 2, Spoiwa × 5 | @pros:Produkcja(3) | Rozbudowany warsztat umożliwiający naprawę maszyn, pojazdów i urządzeń. |
