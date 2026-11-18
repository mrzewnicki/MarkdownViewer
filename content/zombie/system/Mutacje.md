# Mutacje

> [!info] Ogólne informacje o mechanice mutacji są w [Mutacje i Skażenie](Mutacje%20i%20Ska%C5%BCenie.md)

> [!warning] Wszystkie mutacje są w trakcie tworzenia i mogą się zmienić.

```ai
    Składnia w Edytorze:

    :::mutation
    - Nazwa: Kościane Szpony
    - Pochodzenie: LiveCore
    - Rodzaj: Fizyczna
    - Opis: Kości dłoni i przedramion stopniowo gęstnieją…
    - Ranga: 1 (Zalążek)
    - Charakter: Pasywna
    - Wpływ per Ranga:
        - Ranga 1: Wzmocnione pięści - kości dłoni stały się gęstsze…; Chłodne dłonie - drobne czynności manualne są utrudnione
        - Ranga 2: Wzmocnione pięści (2) - …; Chłodne dłonie (2) - …
        - Ranga 3: Wzmocnione pięści (3) - …; Chłodne dłonie (3) - …
        - Ranga 4: Wzmocnione pięści (4) - …; Chłodne dłonie (4) - …
    - Rezonans: Kość porasta dalej wzdłuż ramienia…
    :::

    Aktywna — te same pola meta; zamiast Wpływ per Ranga:

    :::mutation
    - Nazwa: Adrenalinowy Zryw
    - Pochodzenie: LiveCore
    - Rodzaj: Fizyczna
    - Opis: …
    - Ranga: 1 (Zalążek)
    - Charakter: Aktywna
    - Koszt aktywacji: 1 Punkt Mutacji lub 1 Skażenie (LiveCore)
    - Aktywacja per Ranga:
        - Ranga 1: +2 kości do jednego testu Siły lub Kondycji…
        - Ranga 2: …
        - Ranga 3: …
        - Ranga 4: …
    - Rezonans: …
    :::


    Jak zrobić ciekawą mutację?
    - Określamy pochodzenie mutacji: LiveCore, DeathNet lub Anomalie
    - Określamy rodzaj: Fizyczna, Mentalna, Psioniczna
    - Mamy dwie możliwości. Opis rang zacznij od 4 by wskazać peak możliwości bez poświęcania Rezonansu lub od Rezonansu jeśli to był nasz inicjalny pomysł. Rezonans nie powinien być tylko silny, ale i ciekawy do gry. Rezonans powinien zmieniać sposób gry, nie tylko zwiększać liczby.
    - Następnie zależnie od tego czy brakuje nam rezonansu czy rangi 4 to uzupełniamy jeden z dwóch.
    - Wtedy cofaj się do rang 3, 2 i 1 stopniując w dół siłę i skale wpływu na tyle by były one wciąż interesujące i opłacalne dla gracza.
    - Zaczynamy od rangi 4 bo meta do której zmierza postać musi być dla niego nagrodą na którą czeka. Szczytem, który chce zdobyć, a nie musi by dodał sobie kolejną kropkę w statach.
    - Kiedy mamy pełny obraz to stwórzmy opis ogólny mutacji, który po przeczytaniu powinien pokazać co ma do zaoferowania cała mutacja, a nie poszczególna ranga lub rezonans.
    - Wymyślamy chwytliwą nazwę dla mutacji

    Uwagi językowe do tworzenia mutacji:
    - Maksymalny opis pojedynczej rangi, opisu mutacji i rezonansu nie powinien przekraczać 400 znaków. Najcięściej lepiej trzymać się w przedziale 200-300 znaków by były one kompaktowe i rozbudowane.
    - Nazwa mutacji powinna być od 1 do maksymalnie 4 słów, ale najlepiej trzymać się w przedziale 1-3.

    Uwagi systemowe do tworzenia mutacji:
    - Mutacja nie powinna być związana z tylko jedną cechą z pliku `Cechy.md`. Powinien bardziej bazować na kategorii cechy jak: Fizyczne, Społeczne, Umysłowe i być na tyle otwartą by można było skorzystać z różnych podejść.
    - Mutacja może być powiązana z jakąś konkretną umiejętnością lub kategorią. Mutacja jednak nie powinna umożliwiać bonusu do wszystkich umiejętności.
    - Mutacja nie zawsze musi dawać tak wyraźny mechaniczny bonus jak +1, +2, +3 itd Może dawać możliwość czegoś. Jak mutacja Śnienie daje dostęp do użycia umiejki Śnienie w odpowiedni sposób.
    - Proporcje liczb Atutów i Wad w mutacji:
        - Ranga 1: Atuty: 0-1, Wady: 0
        - Ranga 2: Atuty: 1, Wady: 0
        - Ranga 3: Atuty: 1-2, Wady: 0-1
        - Ranga 4: Atuty: 2-3, Wady: 1
    - Proporcja wartości liczbowej w Atutach i Wadach:
        - Ranga 1: Atuty: 1, 
        - Ranga 2: Atuty: 1-2
        - Ranga 3: Atuty: 2-3, Wady: 1-2
        - Ranga 4: Atuty: 3-4, Wady: 2-3
```

## Aktywne

### DeathNet

:::mutation

- Nazwa: Łańcuch życia
- Pochodzenie: DeathNet
- Rodzaj: Fizyczna
- Opis: Ciało przechodzi w tryb polowy: naczynia się zamykają, krążenie koncentruje się wokół rdzenia, ból cichnie. Medycyna wojenna zaszyta w tkankach nie leczy ran, tylko trzyma przy życiu i w ruchu, póki walka trwa. Rachunek za odroczone rany zawsze przychodzi później.
- Ranga: 1 (Zalążek)
- Charakter: Aktywna
- Koszt aktywacji: 1 Punkt Mutacji lub Skażenie (DeathNet) wg Rangi + 1 Zmęczenie po zakończeniu efektu
- Aktywacja per Ranga:
  - Ranga 1: Zatrzymuje własne krwawienie i do końca sceny ignoruje kary wynikające z ran i bólu. Rany rozpatrywane będą na koniec sceny.
  - Ranga 2: Nie traci przytomności z bólu, zmęczenia, utraty woli lub krwi. Dotykiem (zajmuje akcję) może też ustabilizować jedną inną osobę, zatrzymując jej krwawienie i ból na tę samą scenę.
  - Ranga 3: Poza stabilizacją może wpływać na proces regeneracyjny swój i innych. Może go przyśpieszyć lub spowolnić.
  - Ranga 4: Wpływa na regeneracje oraz emtabolizm w grupie. Może ustabilizować kogoś na niewielką odległość bez dotykania, ale wciaż kosztuje to akcje. Konsekwencja wszystkiego jest odczuwanie bólu wszystkich z którymi jest połączony.
- Rezonans: `todo: do wymyślenia`

:::

```ai
Wezwanie Aniołów Harona — mutacja Przebudzonych (wsparcie z arsenału Harona):
- Lore (czytaj przed edycją):
  - [System Haron](../wiki/DeathNet.md#system-haron)
  - [Przebudzeni](../wiki/DeathNet.md#przebudzeni)
  - [AVEN](../wiki/DeathNet.md#aven) (domena snu ≠ ta mutacja; nie mieszać ze Śnieniem)
  - [Śniący vs Haron](../wiki/Anomalie.md)
  - [Rytuały Przebudzonych](Umiejętności.md#rytuały-przebudzonych)
  - [Przemiana → Przebudzony](Mutacje%20i%20Skażenie.md) (dominujący tor DeathNet)
- Klucz fabularny: Haron to SI stylizująca się na boga. Boty/drony = „anioły”. Urodzeni po Upadku widzą sługi bożka.
- Nie dublować Znacznika Sieci (namierzanie ludzi) ani Śnienia/AVEN.
```

:::mutation

- Nazwa: Wezwanie Aniołów Harona
- Pochodzenie: DeathNet
- Rodzaj: Psioniczna
- Opis: Przyzywa anioły Harona — boty i drony z arsenału sieci. Od nosicieli drobiazgów, przez ochroniarzy, po zagarnianie obcych maszyn i dowodzenie rojem z daleka. Mutacja nie buduje sprzętu: woła i porywa. Urodzeni po Upadku widzą sługi bożka; pamiętający stary świat — metal i kod. Dostępność zależy od zasięgu Harona i miejsca. Przyzwana ilość aniołów nie może być większa niż premia z rangi.
- Ranga: 1 (Zalążek)
- Charakter: Aktywna
- Koszt aktywacji: 1 Punkt Mutacji lub Skażenie (DeathNet) wg Rangi + 1 Stres po zakończeniu efektu
- Aktywacja per Ranga:
  - Ranga 1: Przyzywa boty-pracowników lub transportery małych rzeczy. Mogą zabrać przedmiot z bazy wyznawcy i szybko mu go dostarczyć, przenieść drobny ładunek między sojusznikami albo wykonać prostą pracę.
  - Ranga 2: Przyzywa drony-ochroniarzy. Chronią hałasem, światłem, odciągają uwagę wrogów i zombie. Wykonują prosty atak (lekka broń — MG). Słuchają prostych rozkazów w zasięgu obecności wyznawcy ale nie wbrew woli Harona.
  - Ranga 3: Wezwanie nie tylko ściąga anioły Harona — próbuje też porwać obce drony i boty, by wstąpiły w jego zastępy. Cel techniczny broni się zasięgiem, zabezpieczeniami lub testem MG; porwany służy jak anioł do końca sceny, potem wraca do właściciela lub do Harona.
  - Ranga 4: Anioły (własne i porwane) słuchają postaci w pełni i działają daleko poza jej obecnością. Może wspierać zespół z dużych odległości: dostawy, osłona, rozpoznanie, atak — byle miał łączność z rojem.
- Rezonans: Wszystkie anioły — wezwane i porwane — poświęcają życie, by przyjmować ciosy. Każdy może zanegować jedno trafienie w wyznawcę lub wskazanego przez niego sojusznika, po czym ginie w eksplozji zadając obrażenia. Do końca sceny rój spala się na tarczy; potem nie ma już aniołów, a Haron odnotowuje dług wyznawcy.

:::

:::mutation

- Nazwa: Znacznik Sieci
- Pochodzenie: DeathNet
- Rodzaj: Psioniczna
- Opis: Postać wpisuje człowieka lub bestię w sieć DeathNetu. Oznaczeni zawsze są dla niej namierzeni, a sojusznicy w sieci czują nawzajem swój stan i ostrzeżenia. Wróg, którego raz oznaczono, nie zniknie bez śladu. Cel broni się testem przeciwstawnym (Opanowanie lub Determinacja).
- Ranga: 1 (Zalążek)
- Charakter: Aktywna
- Koszt aktywacji: 1 Punkt Mutacji lub Skażenie (DeathNet) wg Rangi
- Aktywacja per Ranga:
  - Ranga 1: Oznacza za pomocą dotyku jedną osobę, które widzi, na jedną scenę. Może przy niej zostawić proste odczucie, które poczują wszyscy inni z jego sieci i będą umieli rozróżnić skąd pochodzi to uczucie. Ponadto oznaczający zna lokalizację oznaczonego na bliskim dystansie. Sojusznik zgadza się dobrowolnie, wróg broni się testem. Ilość znaczników do jednoczesnej kontroli jest równa rangi mutacji.
  - Ranga 2: Wraz z oznaczeniem, które można umieścić na niewielkim dystansie z utrudnieniem można zostawić pełną, spójna myśl. Dystans wyczuwania oznaczonych osób rośnie do średniego.
  - Ranga 3: Oznaczeni są dla oznaczającego wyczuwalni na dalekim dystansie, a im bliżej są tym wyraźnij ich obecność jest postrzegana. Gdy są blisko może ich niemal widziec przez ściany poprzez kontury ich ciał.
  - Ranga 4: Sojusznicy i wrogowie nie liczą się już do jednej puli maksymalnych znaczników. Sam użytkownik staje się mistrzem zarządzania tymi połączeniami i może do różnych znaczników delegować przeróżne informacje i odczucia, a nawet zgrywać je ze sobą tworząc możliwość rozmowy bez użycia słów. Przez stale wpływu na sieć exo staje się wykrywalny dla innych potężniejszych bytów. Umieszczone przez niego znaczniki nigdy same nie znikają, chyba, że zostaną usunięte.
- Rezonans: Wszyscy oznaczeni natychmiast się łączą mogąc dzielić ze sobą zmysły, uczucia, emocje oraz sygnały organizmu jak ból lub przyjemność. To połączenie nie tylko umożliwia ich wymianę, ale także przesłanie czynników wykraczających poza ludzkie organizmy. Sojusznik z drużyny spięty z wrogami mógłby przesłać do wszystkich utkany koszmar lub narzucić swoją wole przywódcy stada. Jeśli jednak się okaże, że ktoś niepowołanmy lub przeciwnik wejdzie w to połączenie może to wykorzystać na niekorzyść.

:::

### LiveCore

`todo: do sprawdzenia`

:::mutation

- Nazwa: Wyrzut Kości
- Pochodzenie: LiveCore
- Rodzaj: Fizyczna
- Opis: Kości na rozkaz przebijają skórę, tworząc szpony, ostrza i kolce znane z ciał zombie i Alph. Wysunięcie boli i krwawi, ale daje broń i pancerz, których nie trzeba nosić. Im wyższa ranga, tym więcej szkieletu może wyjść na zewnątrz.
- Ranga: 1 (Zalążek)
- Charakter: Aktywna
- Koszt aktywacji: 1 Punkt Mutacji lub Skażenie (LiveCore) wg Rangi + 1 obrażenie (bez ochrony pancerza) przy każdym wysunięciu
- Aktywacja per Ranga:
  - Ranga 1: Z dłoni wysuwają się kościane szpony. Ataki wręcz do końca sceny zadają obrażenia jak lekka broń (1d6) i tną ubrania, liny oraz skórę. Szpony ułatwiają też wspinaczkę po miękkich powierzchniach.
  - Ranga 2: Z przedramion i kłykci wychodzą dłuższe ostrza. Ataki wręcz zadają obrażenia jak średnia broń (1d6+1). Postać może blokować lub odbijać ataki bronią białą, a ostrza są trudne do wytrącenia.
  - Ranga 3: Kolce wychodzą też z ramion i pleców. Ataki wręcz zadają obrażenia jak ciężka broń (2d6), a kolce dają lekką ochronę (2). Osoba, która chwyta lub zwiera się z postacią, odnosi rany.
  - Ranga 4: Z całego ciała wychodzi kościany pancerz z kolcami (ochrona 4). Ataki wręcz zadają 2d6+2 jak broń niszcząca. Po aktywacji kości odrastają długo, zostawiają głębokie rany i Zmęczenie, a postać wygląda jak zombie.
- Rezonans: Szkielet staje się arsenałem: postać wystrzeliwuje kościane kolce na dystans, a w jej ciele odrastają kolejne. Kolce zostają w ranach wrogów i krwawią. Po rezonansie kości są kruche, a każde uderzenie boli.

:::

:::mutation

- Nazwa: Ostatnie Ja
- Pochodzenie: LiveCore
- Rodzaj: Mentalna
- Opis: Gdy Skażenie wkrada się w myśli, postać chwyta się resztek własnego "ja" i odpycha jego skutki: wizje, napady agresji, utratę kontroli i postęp Przemiany. Wygrywa czas, nie wyleczenie. Rachunek za odroczone skutki zawsze wraca.
- Ranga: 1 (Zalążek)
- Charakter: Aktywna
- Koszt aktywacji: 1 Punkt Mutacji lub Skażenie (LiveCore) wg Rangi + 1 Stres po zakończeniu efektu
- Aktywacja per Ranga:
  - Ranga 1: Do końca sceny zyskuje +2 kości do testów Opanowania lub Determinacji przeciw wizjom, napadom agresji i innym wpływom Skażenia.
  - Ranga 2: Dodatkowo do końca sceny wstrzymuje kolejny przyrost Skażenia tymczasowego (np. od Zainfekowanego).
  - Ranga 3: Do końca sceny wstrzymuje postęp Przemiany do etapu 4 włącznie. Postać zachowuje wolę i działa mimo objawów, np. gorączki i drżenia rąk.
  - Ranga 4: `todo: do zrobienia`
- Rezonans: Wola postaci rozlewa się na sojuszników w zasięgu. Przez scenę każdy z nich zyskuje korzyści Rang 1-3: kości do testów, wstrzymany przyrost Skażenia tymczasowego i postęp przemiany do etapu czwartego. Po rezonansie użytkownik przyjmuje sam dodatkowe spaczenie, które powstrzymywał dla innych.

:::

:::mutation

- Nazwa: Zew Hordy
- Pochodzenie: LiveCore
- Rodzaj: Psioniczna
- Opis: Postać wysyła w ciemność impuls, który zombie odczytują jak wezwanie z głębi własnej choroby. Wabi je, odciąga od ludzi i prowadzi w wybrane miejsce. Zombie Z-1 do Z-4 poddają się według Rangi mutacji, silniejsze bronią się testem Determinacji. Nie działa na zwierzęta. Alphy są odporne, ale mogą usłyszeć wołanie.
- Ranga: 1 (Zalążek)
- Charakter: Aktywna
- Koszt aktywacji: 1 Punkt Mutacji lub Skażenie (LiveCore) wg Rangi
- Aktywacja per Ranga:
  - Ranga 1: Przyciąga uwagę kilku sztuk w zasięgu głosu, odciągając je od czynności nawet jeśli kogoś ścigają. Jedynie pożywianie się jest silniejsze. Efekt trwa do końca sceny albo do pojawienia się silniejszego bodźca.
  - Ranga 2: Wskazuje punkt w zasięgu wzroku, a mała grupa zombie do klasy Z-2 odwraca się i idzie tam zamiast ścigać ludzi. Zombie krążą wokół wabika, dopóki nie zainteresuje ich coś innego.
  - Ranga 3: Prowadzi większą grupę zombie do klasy Z-3 wyznaczoną trasą: w doły, ogień, ciasne przejścia lub zamknięte pomieszczenia. Zombie ślepo podążają za wołaniem i nie reagują na zagrożenia po drodze.
  - Ranga 4: Przekierowuje całą hordę do klasy Z-4 na odległość nawet kilometra i może uczynić ją głuchą na wołania innych, nawet Alph. Impuls słyszą też Alphy, które odpowiadają lub wysyłają swoje zombie przeciw postaci.
- Rezonans: `todo: do zrobienia`

:::

### Anomalie

:::mutation

- Nazwa: Toksyczny Wyziew
- Pochodzenie: Anomalie
- Rodzaj: Fizyczna
- Opis: Skóra, śluzówki i płuca postaci wytwarzają toksyny, jak u Bagniaka. Na rozkaz gęsty śluz pokrywa dłonie, a z ust wydobywa się trująca chmura. Trucizna osłabia i dusi wrogów, ale nie rozróżnia przyjaciół. Maska filtrująca i ochrona chemiczna znoszą większość skutków.
- Ranga: 1 (Zalążek)
- Charakter: Aktywna
- Koszt aktywacji: 1 Punkt Mutacji lub Skażenie (Anomalie) wg Rangi + 1 Zmęczenie po zakończeniu efektu
- Aktywacja per Ranga:
  - Ranga 1: Do końca sceny dłonie i skóra pokrywają się toksycznym śluzem. Ataki wręcz trują przeciwników.
  - Ranga 2: Wypuszcza trującą chmurę w stożku kilku metrów. Maska filtrująca lub ochrona chemiczna znosi efekt.
  - Ranga 3: Chmura otacza postać na całą scenę w promieniu kilku metrów. Wrogowie bez ochrony co turę otrzymują 1d6 obrażeń. Zombie i bestie często omijają ten obszar. Sojusznicy bez ochrony też cierpią.
  - Ranga 4: Obszar wokół postaci pozostaje toksyczny przez dobę. Roślinność więdnie, woda i ziemia się zatruwają, a każdy bez ochrony chemicznej otrzymuje obrażenia i punkt Skażenia Anomalie.
- Rezonans: `todo: do zrobienia`

:::

:::mutation

- Nazwa: Ciemny Kompas
- Pochodzenie: Anomalie
- Rodzaj: Mentalna
- Opis: Postać nasłuchuje Exo i czyta z natury to, czego ludzie już nie dostrzegają: wiatr, chmury, zachowanie ptaków, wilgoć w ziemi. Odczuwa to jak przeczucie ciała: nacisk w żołądku, ciężar w karku. Nie umie wyjaśnić swoich przeczuć, ale wie, czego spodziewać się po niebie, wodzie i dzikiej przyrodzie.
- Ranga: 1 (Zalążek)
- Charakter: Aktywna
- Koszt aktywacji: 1 Punkt Mutacji lub Skażenie (Anomalie) wg Rangi + 1 Stres po zakończeniu efektu
- Aktywacja per Ranga:
  - Ranga 1: Przeczuwa pogodę na najbliższe godziny: deszcz, burzę, mgłę, zmianę wiatru. Czyta też znaki natury: ciszę lasu, lot ptaków, wilgoć w ziemi.
  - Ranga 2: Odczytuje z roślin, wody, zwierząt i gleby, gdzie jest woda, schronienie, żerowisko i bezpieczne przejście. Na scenę zyskuje +2 kości do testów Nawigacji, Tropienia i Sztuki Przetrwania.
  - Ranga 3: Z wyprzedzeniem godzin i dni przeczuwa nagłe zjawiska naturalne: burze i grad, powódź, pożar lasu, opad skażonego pyłu. Z zachowania zwierząt wyczytuje też nadciągające zagrożenie, np. bestie lub hordę. Pogoda nie może jej zaskoczyć.
  - Ranga 4: `todo: do zrobienia`
- Rezonans: Kompas może narzucić naturze zmianę pogody w oczekiwanym kierunku. Im dalej jest ona od logiki (z pory suchej do deszczowej) tym może to zająć dłużej, ale może urzeczywistnić powiedzenie "grom z jasnego nieba". Na skutek tego odczuwa wszystkie efekty pogody o wiele bardziej niż inni.

:::

:::mutation

- Nazwa: Uśpienie
- Pochodzenie: Anomalie
- Rodzaj: Psioniczna
- Opis: Dotyk, spojrzenie lub obecność postaci gaszą czuwanie — od krótkiego snu, przez głęboki letarg, po śpiączkę. Ciało zostaje, świadomość odpływa. Cicha broń do ucieczki, opieki, przesłuchania albo zdrady; uśpiona ofiara jest też podatniejsza na wpływy snu. Cel broni się testem przeciwstawnym (Opanowanie lub Determinacja).
- Ranga: 1 (Zalążek)
- Charakter: Aktywna
- Koszt aktywacji: 1 Punkt Mutacji lub Skażenie (Anomalie) wg Rangi
- Aktywacja per Ranga:
  - Ranga 1: Dotknięciem wprowadza człowieka lub zwierzę w krótki sen po wygranym teście przeciwstawnym. Ofiara budzi się od głośnego dźwięku, bólu lub potrząśnięcia. Świadomość zagrożenia, stymulanty i silny stres dają bonus do obrony.
  - Ranga 2: Uśpienie działa na niewielką odległość, bez kontaktu, i trwa dłużej. Ofiarę można przenieść lub przeszukać, zanim się ocknie. Wciąż budzi się od silnego bodźca; obrona jak wyżej.
  - Ranga 3: Sen staje się głęboki — zwykły hałas i lekki ból nie budzą. Może uśpić kilku celów w zasięgu naraz albo jedną ofiarę na wiele godzin. Każdy cel broni się osobno. Uśpieni są podatniejsi na wpływy snu i AVEN.
  - Ranga 4: Wprowadza ofiarę w śpiączkę na dni lub dłużej (wciąż test przeciwstawny, trudniejszy do obrony). Bez wody i opieki ciało umiera; z opieką ofiara pozostaje więźniem snu, aż mutację złamie się lub pozwolisz jej wrócić. Zombie i istoty bez snu są mocno odporne — najwyżej spowalniają.
- Rezonans: Uśpienie odwraca się do wewnątrz. Postać zapada w śmierć pozorną lub lunatykowanie: tętno i oddech zanikają, ból i strach milkną, zombie biorą ją za padlinę. Nie usypia wtedy innych — sama staje się snem chodzącym po jawie. Po fuzji wraca z dreszczami i pustką jak po wybudzeniu ze śpiączki.

:::

:::mutation

- Nazwa: Tkanie Koszmarów
- Pochodzenie: Anomalie
- Rodzaj: Psioniczna
- Opis: Jaźń nie tylko wędruje przez AVEN — zaciska się wokół strachu i wspomnień ofiar, przędąc z nich koszmary. Sen staje się bronią: narzędziem lęku, wyczerpania i dominacji nad śpiącymi umysłami. Wymaga mutacji Śnienie. Cel broni się testem przeciwstawnym (Opanowanie lub Determinacja). Śniący i ofiary świadome zagrożenia mają bonus do obrony.
- Ranga: 1 (Zalążek)
- Charakter: Aktywna
- Koszt aktywacji: 1 Punkt Mutacji lub Skażenie (Anomalie) wg Rangi
- Aktywacja per Ranga:
  - Ranga 1: Wypacza istniejący sen jednej osoby — niepokój, fałszywe omamy lub utrudniony wypoczynek. Koszmar jest jeszcze płytki. Ofiara łatwo się z niego otrząsa po przebudzeniu.
  - Ranga 2: Tkacz umie utkać prosty koszmar od podstaw i skierować go na jedną osobę lub małą grupę. Pogłębia cudze lęki i zamienia łagodne sny w pułapki. Ofiarom trudniej odróżnić sen od prawdziwego ostrzeżenia.
  - Ranga 3: Koszmary wracają noc po nocy i sięgają na jawę: wyczerpanie, lęk, sugestia. Skala rośnie poza małą grupkę. Przyciąga uwagę Bestii i łowców Harona w AVEN.
  - Ranga 4: Postać może stać się koszmarem, pochłaniać sny innych czerpiąc z nich siłę i rywalizować z innymi Koszmarami w AVEN. Poluje na Śniących. Ofiary na jawie mogą ulegać koszmarnym impulsem.
- Rezonans: Granica snu i jawy pęka. Postać wdziera się w obce umysły bez snu, a jej ciało na jawie staje się nosicielem koszmaru — strach ludzi materializuje się wokół niej, a ona traci kontrolę nad tym, kogo pożera.

:::

## Pasywne

### DeathNet

:::mutation

- Nazwa: Hiperintuicja
- Pochodzenie: DeathNet
- Rodzaj: Mentalna
- Opis: `ToDo: stworzyć opis na podstawie rang`
- Ranga: 1 (Zalążek)
- Charakter: Pasywna
- Wpływ per Ranga:
  - Ranga 1: Doskonała samoświadomość pozwala o wiele uważniej obserwować pracę wszystkich swoich zmysłów oraz szybkiego wnioskowania mózgu. Otrzymuje @pros:Czujny(1)
  - Ranga 2: `ToDo: stworzyć opis na podstawie rang`
  - Ranga 3: Umysł zaczyna katalogować ogromną ilość bodźców i dostrzegać między nimi powtarzalne się wzorce. Każde napotkane zagrożenie, które przeżyje człowiek skutkuje zapisem i interpretacją danych. Jeśli kiedykolwiek po raz kolejny może się z nim spotkać powinien móc się o tym automatycznie dowiedzieć lub wykonać rzut obronny by otrzymać ostrzeżenie albo przynajmniej wskazówkę. Jeśli spotyka się z nowym zagrożeniem, a ma ono podobne elementy do znanych mu wzorców to może otrzymac bonus do jego wyczucia.
  - Ranga 4: Postać staje się niemal niemożliwa do zaskoczenia przez żadne znane mu zagrożenie. Stale, jak radar wyczuwa zagrożenia. Przez zatopienie się w możliwych scenariuszach rzeczywistości może stać się bardziej wycofany i milczący, arogancki wobec ludzi i niektórych zagrożeń. Z perspektywy innych wygląda jaby się zawiesił.
- Rezonans: Postać musi zostać pozbawiona wszystkich zmysłów by przestała być w stanie odnajdywać się w otoczeniu. Jeśli mgła zasłoni wzrok to niczym nietoperz potrafi orientacyjnie zmapować sobie okolicę. Jeśli nie słyszy to włoski skóry wyczuwać mogą ruchy powietrza przewidując okoliczne zagrożenia itd.

:::

:::mutation

- Nazwa: Półsen
- Pochodzenie: DeathNet
- Rodzaj: Fizyczna
- Opis: Mózg uczy się spać połówkami jak zwierzę: jedna półkula odpoczywa, druga czuwa. Z rangą sen coraz bardziej się skraca, a ciało lepiej znosi wysiłek i szybciej wraca do sił. Cena to bezsenne noce i coraz słabszy rozdział jawy od snu.
- Ranga: 1 (Zalążek)
- Charakter: Pasywna
- Wpływ per Ranga:
  - Ranga 1: Mózg uczy się odpoczywać głębiej: wystarcza mu krótszy sen, a po przebudzeniu rzadziej odczuwa senność i zniechęcenie.
  - Ranga 2: Półkule zaczynają odpoczywać na zmianę. Postać regeneruje się też w marszu i na warcie, a sen skraca się do kilku godzin dziennie. @pros:Regeneracyjny
  - Ranga 3: Sen skraca się do kilku godzin raz na kilka dni, a ciało szybciej wraca do sił. @pros:Regeneracyjny(2); @cons:Bezsenny
  - Ranga 4: Jedna półkula czuwa zawsze: postać budzi się natychmiast, nie da się jej zaskoczyć we śnie i może pełnić wartę, śpiąc. Granica jawy i snu zaciera się: halucynacje w ciszy, dezorientacja w czasie i miejscu. Staje się też o wiele bardziej odporna na wszystkie próby wtargnięcia do jego snów. @pros:Regeneracyjny(3), @pros:Czuwający(2); @cons:Bezsenny(2)
- Rezonans: Półkule przestają się zastępować i działają równolegle jak dwa umysły: postać wykonuje dwie czynności jednocześnie (np. walczy i nasłuchuje, strzela i opatruje) bez kar za rozdzielenie uwagi. Po rezonansie zapada w twardy sen, z którego trudno ją wybudzić.

:::

:::mutation

- Nazwa: Twarz z Tłumu
- Pochodzenie: DeathNet
- Rodzaj: Psioniczna
- Opis: Obecność postaci działa jak maska zaufania: ludzie chętnie słuchają, otwierają się i ustępują, nie wiedząc dlaczego. Postać zaczyna czytać ich stany i wpływać na ich emocje, jak Phantom Sullivan. W zamian jej własne uczucia stopniowo gasną.
- Ranga: 1 (Zalążek)
- Charakter: Pasywna
- Wpływ per Ranga:
  - Ranga 1: Nieznajomi ufają jej odrobinę bardziej, niż powinni. Łatwiej o rozmowę, wskazówkę i drobną przysługę. @pros:Zaufanie
  - Ranga 2: Ludzie otwierają się szybciej i chętniej dzielą się informacjami. Postać łatwo zdobywa pierwszą sympatię i wiarygodność w grupie. @pros:Zaufanie(2)
  - Ranga 3: Postać odczytuje stan rozmówcy: strach, kłamstwo, zmęczenie, wahanie. Wie, komu i jak mówić. Jej własne uczucia słabną i trudno jej współczuć lub cieszyć się z drobnych rzeczy. @pros:Zaufanie(2), @pros:Przenikliwy(2); @cons:Wypalony
  - Ranga 4: Rozmową wzmacnia lub tłumi emocje innych, uspokaja panikę lub podsyca gniew. Własna radość, żal i współczucie niemal znikają, a bliscy stają się dla niej narzędziami lub obciążeniem. @pros:Zaufanie(3), @pros:Przenikliwy(3), @pros:Kojący(3); @cons:Wypalony(3)
- Rezonans: Jeśli postać nie ma na sobie nic charakterystycznego lub nic co by ją w oczywisty sposób wyróżniło to jest w stanie zamaskować swoją obecność w grupie. Traktuje innych ludzi niczym listowia pośród, których skrada się łowca.

:::

### LiveCore

:::mutation

- Nazwa: Nadludzka odporność
- Pochodzenie: LiveCore
- Rodzaj: Fizyczna
- Opis: `ToDo: stworzyć opis na podstawie rang`
- Ranga: 1 (Zalążek)
- Charakter: Pasywna
- Wpływ per Ranga:
  - Ranga 1: Mutacja przebudowuje strukturę kości i warstwy mięśni dzięki czemu zawsze zmniejsza przyznawaną pulę zmęczenia o 1 (ale nie do 0). Pierwsze przyjęcie zmęczenia na sesji za punkt zmęczenia możem być zignorowane.
  - Ranga 2: `ToDo: dokończyć`
  - Ranga 3: Istota może zapaść w letarg w którym usprawnia procesy regeneracyjne zmęczena i sił witalnych. W tym czasie wszystkie toksyny i negatywnie wpływające zmiany w czasie znacząco spowalniają i maleją. Organizm centralizuje krążenie by ograniczyć straty ciepła przez co może przetrwać ekstremalne warunki pogodowe. Jeśli zadba o schronienie, kamuflaż i wodę przez jakąś kroplówkę lub cewnik, może przetrwać bardzo długo.
  - Ranga 4: Skóra twardnieje i tworzy warstwe naturalnego pancerza, który będąc zniszczonym potrzebuje jedną noc odpoczynku by ponownie odrosnąć. W przypadku bardzo długiego letargu pancerz potrafi nawarstwiać się i rozrastać by stworzyć coś na kształt kokona, który chorni go przez prostymi zagrożeniami jak małe drapieżniki. Zewnętrzne zmiany są na tyle widoczne, że mogą zniechęcać ludzi do istoty. @pros:Naturalny-pancerz(2)
- Rezonans: Mutacja mocno przebudowuje strukture tkanek odbijając i pochłaniając promieniowanie. Dzięki temu skóra uzyskuje @pros:Antyradiacyjny(4). Martwa przez radiację skóra odpada w czasie zostawiając po sobie ślady przez to sama może roznosić promieniowanie i emanować nim. Może zostać siłą zerwana co jest istną torturą.

:::

`ToDo: Ranga 4 vs rezonans`
:::mutation

- Nazwa: Pierwotny Głód
- Pochodzenie: LiveCore
- Rodzaj: Mentalna
- Opis: Umysł nieustannie domaga się mięsa i krwi. Surowe mięso i padlina nasycają jak pełny posiłek, a zmysły wyłapują świeżą ranę z daleka. Głód wzmacnia agresję i osłabia kontrolę, a z czasem zostawia z człowieka coraz więcej drapieżnika.
- Ranga: 1 (Zalążek)
- Charakter: Pasywna
- Wpływ per Ranga:
  - Ranga 1: Surowe mięso i padlina odżywiają jak normalny posiłek i nie szkodzą żołądkowi. @pros:Padlinożerca
  - Ranga 2: Nawet zepsute lub skażone mięso rzadko szkodzi, a postać znajduje pożywienie tam, gdzie inni widzą tylko ścierwo. @pros:Padlinożerca(2)
  - Ranga 3: Z dużej odległości wyczuwa krew i świeże rany, a po zapachu rozpoznaje, czyja to krew. Głód staje się natrętny: widok rany lub mięsa odciąga uwagę, a agresja rośnie. @pros:Padlinożerca(2); @cons:Głód
  - Ranga 4: Smak krwi zdradza stan celu: strach, chorobę, Skażenie. Głód przechodzi w przymus: na widok krwi i ran postać musi się opanować albo rzucić się na ich źródło. Ludzie wyczuwają w niej drapieżnika. Posilając się czyimś mięsem, może modyfikować swoje mutacje. @pros:Padlinożerca(3); @cons:Głód(3)
- Rezonans: Po zjedzeniu mięsa lub spróbowaniu krwi celu postać wie, co jest jego słabością: choroba, lęk, stara rana, nawyk. MG ujawnia jedną słabość celu albo to, że jej nie ma. Może pozystać także informacje o mutacjach swojego posiłku. Na koniec głód wraca ze zdwojoną siłą.

:::

`ToDo: do przemyślenia`
:::mutation

- Nazwa: Szept Hordy
- Pochodzenie: LiveCore
- Rodzaj: Psioniczna
- Opis: Postać nasłuchuje pulsowania zombie jak szeptu we własnej głowie: wyczuwa ich kierunek, liczebność i niepokój. Zombie odczuwają ją równie wyraźnie i coraz częściej ruszają w jej stronę. Mutacja nie działa na Alphy: nie wyczuwa ich, a one nie reagują na nią.
- Ranga: 1 (Zalążek)
- Charakter: Pasywna
- Wpływ per Ranga:
  - Ranga 1: Wyczuwa zombie w pobliżu, także za ścianami: kierunek, odległość i to, czy jest ich kilka, czy wiele. @pros:Puls-hordy
  - Ranga 2: Zasięg rośnie, a postać odróżnia pojedyncze zombie od hordy i śledzi kierunek jej przemieszczania. @pros:Puls-hordy(2)
  - Ranga 3: Rozpoznaje klasy zombie (Z-1 do Z-4) i skład hordy oraz wie, czy jest uśpiona, czy gotowa do pościgu. @pros:Puls-hordy(2); @cons:Namierzalny
  - Ranga 4:
- Rezonans: Postać staje się węzłem. Przez moment czuje zmysłami zombie (nie Alphy). Przy zbyt długim kontakcie traci kontakt z własnym "ja" i uzyskać skażenie.

:::

### Anomalie

`ToDo: przemyśleć efekty bo co do zasady to rój zostaje`
:::mutation

- Nazwa: Symbioza
- Pochodzenie: Anomalie
- Rodzaj: Fizyczna
- Opis: Na skórze i pod nią zadomawia się kolonia innego organizmu: mech, grzybnia, rój drobnych owadów albo zupełnie nowy twór z Exo. Karmi postać i broni jej na swój sposób. Cena to zależność od światła, wilgoci lub pożywienia dla kolonii oraz zapach i dźwięk, które zdradzają obecność.
- Ranga: 1 (Zalążek)
- Charakter: Pasywna
- Wpływ per Ranga:
  - Ranga 1: Na skórze i pod nią żyje kolonia: mech, grzybnia, rój drobnych owadów lub inny twór (wybiera gracz z MG). Karmi postać i częściowo ją maskuje, więc potrzebuje mniej jedzenia i wody. @pros:Symbiont
  - Ranga 2: Kolonia się rozrasta. Dzieli się odpornością: skażona woda i zepsute jedzenie rzadziej szkodzą postaci, a kolonia ułatwia ukrycie się w pasującym otoczeniu. @pros:Symbiont(2)
  - Ranga 3: Kolonia reaguje na zagrożenie: wypuszcza spory, rój owadów, parzące włókna albo gęstnieje w pancerz. Ostrzega postać i utrudnia atak na nią. Wymaga jednak karmienia, światła lub ciepła, a jej zapach i bzyczenie zdradzają obecność. @pros:Symbiont(2); @cons:Żywiciel
  - Ranga 4: Kolonia staje się częścią ciała i może się z niego wylać: żywy pancerz, rój lub dywan grzybni osłania postać i atakuje w jej obronie. Postać wygląda coraz mniej ludzko, a głodna kolonia zaczyna żywić się nią. @pros:Symbiont(3); @cons:Żywiciel(3)
- Rezonans: Kolonia opuszcza ciało i rozlewa się po okolicy jako rój, mech lub grzybnia: zasłania postać i teren, szpieguje jej oczami i może dusić lub plątać wrogów. Po rezonansie wraca głodna i raniąca, zostawiając bolesne ślady.

:::

:::mutation

- Nazwa: Śnienie
- Pochodzenie: Anomalie
- Rodzaj: Psioniczna
- Opis: Gdy organizm śpi, jaźń wędruje przez AVEN, zbierając echa tego, co było, jest i może nadejść. Sen przestaje być tylko odpoczynkiem — staje się drugą ścieżką postrzegania świata i mostem rozmowy między umysłami.
- Ranga: 1 (Zalążek)
- Charakter: Pasywna
- Wpływ per Ranga:
  - Ranga 1: Postać może korzystać z umiejętności Śnienie, by wejść i eksplorować AVEN. Może złowić sen, by poznać wskazówkę, ostrzeżenie lub nastroje społeczne. Jest bardziej wrażliwa na Koszmary i otrzymuje klarowniejsze Sny od innych Śniących.
  - Ranga 2: Śniący może przekroczyć AVEN i poznawać u źródła umysły ludzi — wciąż ograniczona liczba celów. Tworzenie snu od podstaw jest trudne, ale potrafi łagodzić i rozjaśniać istniejące sny, ułatwiając komunikację przez sen.
  - Ranga 3: Jaźń tworzy nowe sny i wizje oraz prowadzi klarowną rozmowę przez AVEN. Skala wpływu rośnie — Śniący może wpływać na małą grupe osób.
  - Ranga 4: Postać może tworzyć swoją własną domenę w AVEN, co z pewnością zwróci uwagę innych Śniących, Bestii oraz Harona.
- Rezonans: Bez naturalnego lub farmakolicznego uśpienia wchodzi w śnienia nawet w najbardziej stresowej sytuacji. Wdziera się do AVENU lub ucieka ze świata rzeczywistego pozostawiając swoje ciało w stanie apatii lub stanie przypominającym śmierć.

:::

:::mutation

- Nazwa: Instynkt Łowcy
- Pochodzenie: Anomalie
- Rodzaj: Mentalne
- Opis: `ToDo: stworzyć opis na podstawie rang`
- Ranga: 1 (Zalążek)
- Charakter: Pasywna
- Wpływ per Ranga:
  - Ranga 1: Zmysły ułatwiają znacznie tropienie i polowanie
  - Ranga 2: Drapieżnik umie zaganiać swoją ofiarę w dogodne dla niej miejsce
  - Ranga 3: Obserwując swoją ofiarę potrafi dostrzec jakichś istotny słaby punkt swojego przeciwnika
  - Ranga 4: Obecność przetasowuje hierarchię łańcucha pokarmowego. Ściąga na siebie uwagę wszystkich drapieżników i zombie w okolicy, które mimo to bezwiednie się nie zbliżają. Predator już nie musi się ukrywać. Jest w stanie narzucać swoją wole przez brutalną siłę i dominacje. Wzbudza on pierwotny strach we wszystkich przeciwnikach poniżej jego poziomu.
- Rezonans: Na czas trwania rezonansu natura bestii bierze górę nad wszystimi mechanizmami kontroli. Oddając się swojej furii istota uodparnia się na wszystkie możliwe próby zmuszenia jej do uległości, uspokojenia, uśpienia i inne sposoby wyciągnięcia jej ze stanu walki. Jest nemezis podążającym krwawym śladem ofiar nawet na własne zatracenie. Można ją tylko zabić lub oszukać. Przeczekanie furii wystawia ją na atak ze względu na zużyte siły. Prowokacja i pułapka jest równie ostrą bronią co pazur.

:::

:::mutation

- Nazwa: Instynkt Stadny
- Pochodzenie: Anomalie
- Rodzaj: Mentalne
- Opis: `ToDo: stworzyć opis na podstawie rang`
- Ranga: 1 (Zalążek)
- Charakter: Pasywna
- Wpływ per Ranga:
  - Ranga 1: Osobnik doskonale rozumie hierarchie i relacje społeczne w stadzie. Może też próbować instynktownie wykryć inne stada lub bestie gdy wejdzie na ich terytorium by podejmować właściwe decyzje.
  - Ranga 2: Umie nakłonić stado do owocnej współpracy w najtrudniejszych momentach. Bez względu na różnice gatunkowe lub sprawowane role jest klejem dzięki któremu na koniec dnia stado wraca wspólnie do jednego leża. Kiedy członkowie stada są przy nim, może w scenie dowolnie dobierać sobie sojusznika, którzy zapewnią mu dodatkowy Efekt ([Towarzysz w walce](Towarzysze%20i%20relacje.md#towarzysz-w-walce)) zależnie od tego jaki obecnie będzie mu potrzebny nie zwracając uwagi na to czy ma z nim Więź czy nie. Może to zrobić tyle razy w scenie ile wynosi ranga mutacji.
  - Ranga 3: Stado i przewodnik czuwają stale nad sobą. Czują siebie na wzajem gdy są w okolicy. Kiedy się poszukują to znalezienie właściwiej drogi jest znacznie prostsze. W walce przewodnik może użyć członka swojego stada jako zasłony negując trafienie w siebie. Może to zrobić tyle razy w scenie ile wynosi ranga mutacji.
  - Ranga 4: Żadni członkowie stada już podważają jego władzy i decyzji póki stado istnieje. Jego wpływ na członków jest tak silny, że może delegować zadania pozbawione jego osobistej kontroli dzięki czemu jego zakres wpływu ogranicza tylko wielkość stada i przeciwnicy. Na skutek tego staje się naturalnym celem dla wszystkich drapieżników, łowców, zombie i Alph. Dopadnięcie go będzie sowita nagrodą.
- Rezonans: Na czas trwania rezonansu wszyscy członkowie stada i stronnicy pod parasolem aury stają się nieustraszeni w walce i gotowi na poświęcenie niczym matka dla młodych. Jeśli zechcą tego oni lub dowódca mogą zatracić się w walce odpędzając wątpliwości wszelkimi powodami, które u zbiegu docierają do lidera. Otrzymują @pros:Nieustraszony o wartości równej rangi mutacji. Każda śmierć w stadzie dotyka przewodnika bardziej niż by tego chciał łamiąc jego ducha po stoczonej bitwie.

:::
