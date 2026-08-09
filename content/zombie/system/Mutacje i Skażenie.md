# Mutacje i Skażenie

## Skażenie

Skażenie odzwierciedla to jak bardzo świat zepsuł człowieka. Za pomocą genetycznych modyfikacji DeathNetu, za pomocą spaczenia zombie lub po prostu promieniowania atomowego i toksyn nowego świata.

### Tory Skażenia

Skażenie nie jest jedną wartością, a trzema odrębnie liczonymi torami odpowiadającymi jego pochodzeniu:
- `DeathNet`
- `LiveCore`
- `Anomalie`

Suma wszystkich trzech torów to **Skażenie całkowite**, porównywane z Maksymalnym Skażeniem. Dominujący tor (ten o najwyższej wartości, niezależnie od sumy) decyduje o tym, w co przemieni się postać, jeśli [Przemiana](#przemiana) dobiegnie końca.

### Maksymalne Skażenie

Maksymalne Skażenie wylicza się wzorem:

`Maksymalne Skażenie = Zdrowie + Opanowanie + Rozsądek + Modyfikator Rasy`

Wzór łączy po jednej cesze defensywnej z każdej domeny (Fizyczna / Mentalna / Umysłowa) - Maksymalne skażenie to miara oporu organizmu, psychiki i umysłu przed utratą samego siebie.

`ToDo: modyfikator rasy dla Skażenia - do ustalenia, czy rasy inne niż człowiek (zombie, zmutowane zwierzę) mają wyższy lub niższy pułap`

### Przekroczenie pułapu

Gdy Skażenie całkowite przekroczy Maksymalne Skażenie, nie następuje to od razu - rozpoczyna się [Przemiana](#przemiana), czyli wieloetapowy proces dający ostatnią szansę na reakcję. Jeśli Przemiana dobiegnie końca, postać traci całkowicie swoje "ja". Zależnie od tego, jaki tor Skażenia jest dominujący, postać podzieli poniższy los:
- Jeśli dominuje `LiveCore`, postać stanie się `Zombie` i dołączy do hord.
- Jeśli dominuje `DeathNet`, postać stanie się `Przebudzonym` i będzie narzędziem woli Harona.
- Jeśli dominuje `Anomalie`, postać stanie się `Mutantem` i będzie błąkał się po świecie, biorąc swe instynkty za pana.

### Skażenie tymczasowe

Niektóre mechaniki (np. [Zainfekowany](#zainfekowany)) nie zwiększają Skażenia od razu w całości, a rozkładają przyrost w czasie jako punkty **tymczasowe**. Skażenie tymczasowe liczy się do sumy i do Progów Mutacji na równi ze zwykłym Skażeniem, ale jego ostateczny, trwały rozmiar zależy od tego, czy proces, który je wywołał, zostanie przerwany:
- **Przerwanie procesu** (np. udane leczenie) - tymczasowe Skażenie redukuje się do ustalonego minimum.
- **Brak przerwania** (proces trwa do końca) - całość tymczasowego Skażenia staje się trwała.

Każda mechanika korzystająca ze Skażenia tymczasowego definiuje własne: tempo przyrostu, czas trwania i próg minimalny po przerwaniu.

### Skażenie jako zasób

Skażenie to nie tylko zegar zagłady, ale też zasób, po który gracz może sięgnąć w kryzysowej sytuacji. Gdy aktywacja mutacji Aktywnej (patrz [Charakter mutacji](#charakter-mutacji)) nie jest opłacana Punktami Mutacji ani Rezonansem, jej koszt spada na Skażenie - to gracz decyduje, kiedy przewaga tu i teraz jest warta przybliżenia się do przemiany. Pełne zasady wymiany opisuje [Aktywacja](#aktywacja).

- **Koszt bazowy** - aktywacja płacona Skażeniem zwiększa Skażenie jej toru pochodzenia o wartość równą Randze mutacji.
- **Koszt dodatkowy** - twórca mutacji może dopisać jej indywidualny koszt sytuacyjny, jeśli fabularnie tego wymaga, np. Zmęczenie (wysiłek fizyczny), Stres (napięcie psychiczne) lub automatyczna Komplikacja (widoczna, kompromitująca reakcja).

### Redukcja Skażenia

Skażenie można zredukować, ale rzadko i kosztownie. To nie jest zasób, który resetuje się po odpoczynku. Źródłem redukcji powinny być fabularne wydarzenia rangi przygody, nie rutynowe czynności: rytuał oczyszczenia, eksperymentalna terapia. MG decyduje o warunkach i koszcie każdej takiej okazji indywidualnie - to ma być rzadki promyk nadziei. Rozwiązanie powinno zmniejszać istniejący poziom skażenia, a nie go resetować.

## Zainfekowany

**Zainfekowany** to procedura uruchamiana przez ugryzienie zombie. Łączy natychmiastowy, trwały koszt z rozciągniętym w czasie ryzykiem korzystającym z [Skażenia tymczasowego](#skażenie-tymczasowe) - dzięki temu jedno ugryzienie nie przemienia postaci od razu, ale staje się realnym zagrożeniem, z którym trzeba się ścigać z czasem.

### Skutki ugryzienia

Ugryzienie zombie, poza obrażeniami, wywołuje natychmiastowo:
1. Trwały wzrost Skażenia `LiveCore` o wartość bazową (domyślnie **+1**; MG może zwiększyć ją dla silniejszych wariantów zombie, np. wg klasyfikacji Z z bestiariusza).
2. Przypisanie Wady `Zainfekowany (wartość)` - wartość ustala MG lub statystyki potwora.

### Przebieg infekcji

Od momentu ugryzienia, każdego dnia przez liczbę dni równą wartości Wady `Zainfekowany`, Skażenie `LiveCore` rośnie o **1 punkt tymczasowy**.

- Jeśli w trakcie tego procesu Skażenie całkowite przekroczy Maksymalne Skażenie, natychmiast rozpoczyna się [Przemiana](#przemiana).
- Jeśli gracze podejmą skuteczne działania, by powstrzymać infekcję (trucizna, leki ze starego świata, oczyszczanie rany i inne fabularne środki zaakceptowane przez MG), tymczasowe Skażenie nabyte od ugryzienia redukuje się do **1 punktu trwałego**, a Wada `Zainfekowany` zostaje zdjęta. Podczas procesu zainfekowania można podejmować wiele prób przerwania.
- Jeśli infekcja przejdzie przez cały swój cykl (wszystkie dni) bez przerwania, całość nabytego tymczasowego Skażenia staje się **trwała**, a Wada `Zainfekowany` zostaje zdjęta - infekcja rozstrzygnęła się, na dobre lub na złe.

### Przykład

Postać ma Skażenie 5 (Max 10) i zostaje ugryziona.
1. Natychmiastowy skutek: +1 Skażenia `LiveCore` (trwałe) → Skażenie 6. Postać otrzymuje Wadę `Zainfekowany (4)`.
2. Dzień 1: +1 tymczasowe → 7
3. Dzień 2: +1 tymczasowe → 8
4. Dzień 3: gracze skutecznie leczą infekcję → tymczasowe Skażenie (2 punkty) redukuje się do 1 punktu trwałego. Finalne Skażenie: 6 + 1 = **7**.

Gdyby nikt nie zareagował, po 4 dniach tymczasowe Skażenie (4 punkty) stałoby się trwałe: 6 + 4 = **10** - dotykając Maksymalnego Skażenia i uruchamiając Przemianę.

## Przemiana

**Przemiana** to wieloetapowy proces, który rozpoczyna się, gdy Skażenie całkowite przekroczy Maksymalne Skażenie (patrz [Przekroczenie pułapu](#przekroczenie-pułapu)). To ostatnia szansa, by coś zmienić - dla graczy, którzy mogą próbować ją zatrzymać, i dla samej postaci, która może jeszcze mieć coś do powiedzenia.

### Etapy Przemiany

Przemiana w Zombie (dominujący tor `LiveCore`) przebiega przez 7 etapów opisanych szczegółowo w [Przemiana w Zombie](../wiki/bestiariusz/zombie/Zombie.md#przemiana-w-zombie):
1. Zakażenie i faza inicjacji
2. Gorączkowy przełom
3. Energetyczny zastrzyk i regeneracja
4. Przejmowanie kontroli przez wirusa
5. Pełna brutalizacja i atak
6. Erozja świadomości
7. Ostateczne wymazanie

`ToDo: Przemiana w Przebudzonego (DeathNet) i w Mutanta (Anomalie) - analogiczne etapy do opracowania, obecnie mamy szczegółowo opisany tylko wariant LiveCore/Zombie`

### Zatrzymanie Przemiany

Do etapu 4 (Przejmowanie kontroli przez wirusa) Przemianę można jeszcze zatrzymać - testami Medycyny/Biologii/Chemii, rytuałem, eksperymentalną terapią lub innym fabularnym środkiem odpowiednim do dominującego toru Skażenia. MG decyduje, czy dany etap jest jeszcze odwracalny w konkretnej sytuacji i jaki koszt (czasowy, zasobowy, fabularny) niesie za sobą próba zatrzymania. Przerwanie przemiany redukuje spaczenie do maksymalnej wartości.

Od etapu 5 (Pełna brutalizacja i atak) Przemiana jest nieodwracalna - patrz Ostatni Czyn.

### Ostatni Czyn

Gdy Przemiana wchodzi w nieodwracalny etap, zanim postać zostanie ostatecznie utracona, gracz otrzymuje **Ostatni Czyn** - jedną, finalną akcję lub krótką scenę odgrywaną pomiędzy narastającą utratą kontroli. Postać może np. ostrzec sojuszników, poświęcić się dla grupy, przekazać ważną informację albo zaatakować wybrany cel z siłą, jaką daje jej rozpoczynająca się przemiana.

Mechanicznie: MG może (ale nie musi) przyznać test związany z zadeklarowanym działaniem, z premią lub utrudnieniem zależnym od etapu, na którym doszło do przemiany - im dalszy etap, tym mniejsza kontrola, ale często większa siła. Wynik tego testu jest ostatnim wpływem gracza na tę postać i ostatnim bezpośrednim wpływem postaci na świat.

## Mutacje

Mutacje opierają się o 3 kategorie pochodzenia:
- `DeathNet` - wynikające z wpływu DeathNetu na organizm człowieka.
- `LiveCore` - wynikające z wpływu LiveCore na organizm człowieka, a w tym też ugryzienia Zombie.
- `Anomalie` - wynikające z wpływu promieniowania, toksyn, potworów oraz innych mutantów na organizm człowieka.

Niezależnie od pochodzenia mutacji jej wpływ może być pozytywny lub negatywny - a często oba naraz. Czasem jej wpływ jest na pozór szkodliwy, a to gracz potrafi przebrać słabość za siłę. Zakres wpływu mutacji na organizm jest całkowity: od fizycznej siły, przez mentalizm, aż po zezwierzęcenie.

### Rodzaj mutacji

- **Fizyczna** - wpływa na ciało: siłę, zmysły, wytrzymałość, wygląd.
- **Mentalna** - wpływa na umysł, emocje i percepcję samej postaci. Efekt pozostaje wewnątrz niej.
- **Psioniczna** - wykracza poza samą postać: wpływa na innych ludzi, zwierzęta, umysły lub otoczenie. Gdy tak się dzieje, mutacja jest [Psioniką](#psionika).

### Charakter mutacji

- **Pasywna** - działa zawsze, bez świadomej decyzji gracza. Opisywana przez listę Atutów i Wad (może być ich więcej niż jedna każdego rodzaju).
- **Aktywna** - gracz decyduje, kiedy jej użyć. Nie zapewnia żadnego wpływu pasywnego - poza aktywacją mutacja nie działa. Opisywana przez Koszt aktywacji i efekty rosnące z Rangą (patrz [Aktywacja](#aktywacja)).

### Rangi i rozwój

Mutacja rozwija się w 4 rangach:
1. **Zalążek** - mutacja dopiero się objawia, efekt niewielki, wada łagodna (lub najsłabszy poziom Aktywacji).
2. **Adaptacja** - mutacja zaczyna współgrać ze swoim nosicielem, efekt zauważalnie silniejszy.
3. **Rozwinięta** - utrwalona mutacja jest w pełni funkcjonalną częścią postaci. Jest perfekcyjnie zestrojona.
4. **Dominacja** - mutacja zaburza harmonie i przejmuje znaczącą część natury postaci, efekt bardzo silny, ale poważnie wpływa na funkcjonowanie lub relacje postaci. Zawsza pojawiają sie wady lub komplikacje.

Przy każdej randze wartość Atutów (mutacje Pasywne) lub siła efektu Aktywacji (mutacje Aktywne) rośnie, a Wady się pogłębiają lub zyskują nowy aspekt - to mechaniczny wyraz tego, że mutacja daje jednocześnie większą siłę i większy problem.

### Pozyskiwanie Mutacji

`ToDo: do zrobienia - by bardziej się opłacało rozwijać posiadane mutacje niż tworzyć ciagle nowe`


### Limit mutacji

Postać może mieć do kilku mutacji na raz. Dokładna liczba zależy od Modyfikatora Rasy lub decyzji MG przy tworzeniu postaci - ma to zapewnić, że mutacje pozostają rozwijanym, rozpoznawalnym rysem postaci, a nie kolekcją dziesiątek drobnych efektów. Postaci narodzone w nowym świecie znacznie lepiej znoszą mutacje.

### Punkty Mutacji

**Punkty Mutacji** (PM) to indywidualna pula punktów, którą posiada postać - zasób, którym płaci się za "nieszkodliwe" dla organizmu aktywacje mutacji Aktywnych, bez ryzyka zwiększenia Skażenia.

- Każda mutacja Aktywna ma własny koszt w PM, który może się różnić zależnie od Rangi (wyższa Ranga = mocniejszy efekt = zwykle wyższy koszt).
- Gracz może zaproponować podniesienie kosztu aktywacji w PM w zamian za drobny, ale czasem istotny dodatkowy efekt ("przeciążenie") - takie wzmocnienie nie powinno jednak całkowicie negować żadnej Wady mutacji.

`ToDo: jak wylicza się pulę Punktów Mutacji postaci`

### Format mutacji

```markdown
**Nazwa mutacji**
- Pochodzenie: DeathNet / LiveCore / Anomalia
- Rodzaj: Fizyczna / Mentalna / Psioniczna
- Opis: [krótki, narracyjny opis tego, czym jest mutacja i jak się objawia]
- Ranga: 1 (Zalążek) / 2 (Adaptacja) / 3 (Rozwinięta) / 4 (Dominacja)
- Charakter: Pasywna / Aktywna
```

Jeśli mutacja jest **Pasywna**, dodatkowo:

```markdown
- Atuty: Nazwa (wartość) - opis narracyjny [może być więcej niż jeden]
- Wady: Nazwa (wartość) - opis narracyjny [może być więcej niż jedna]
```

Jeśli mutacja jest **Aktywna**, dodatkowo:

```markdown
- Koszt aktywacji: [Punkty Mutacji] lub Skażenie wg Rangi + ewentualny koszt dodatkowy (fabularny lub mechaniczny)
- Aktywacja per Ranga:
  - Ranga 1: opis efektu
  - Ranga 2: opis efektu
  - Ranga 3: opis efektu
  - Ranga 4: opis efektu
```

Na końcu, niezależnie od Charakteru, dodatkowo:

```markdown
- Rezonans: [przykład fabularnego rezonansu tej mutacji]
```

### Aktywacja

Mutację Aktywną można użyć w trakcie gry na 3 sposoby:
1. **Za Punkty Mutacji** - koszt PM zgodny z ceną mutacji, bez żadnego wzrostu Skażenia.
2. **Za Skażenie** - jeśli postać nie ma (lub nie chce wydać) Punktów Mutacji, może przyjąć Skażenie odpowiedniego toru w wysokości równej Randze mutacji, zgodnie z [zasadami zasobu](#skażenie-jako-zasób).
3. **Za Rezonans** - fabularna fuzja z mutacją Pasywną, patrz [Rezonans](#rezonans) poniżej.

Krytyczna porażka podczas aktywacji płaconej Skażeniem dodaje, poza standardową Komplikacją, **+1 Skażenie** jej toru pochodzenia (utrata kontroli). Krytyczna porażka podczas aktywacji płaconej Punktami Mutacji nie zwiększa Skażenia, ale MG może nałożyć dodatkową Komplikację lub utratę dodatkowych Punktów Mutacji - PM mają być bezpieczne, ale nie całkiem bez ryzyka.

### Rezonans

**Rezonans** to fabularna fuzja mutacji Aktywnej i Pasywnej. Rezonować mogą ze sobą tylko i wyłącznie mutacje o różnym Charakterze - dwie Aktywne lub dwie Pasywne nigdy nie rezonują ze sobą.

Efekt Rezonansu jest zawsze taki sam, niezależnie od sposobu użycia: obie rezonujące mutacje przechodzą w stan **hibernacji**.
- W hibernacji mutacje nie zapewniają swoich Atutów i nie mogą być aktywowane.
- Wady obu mutacji w hibernacji **wciąż działają**.
- Sam Rezonans trwa krótki okres czasu (ustala MG zależnie od sytuacji), po czym obie mutacje pozostają w hibernacji aż do regeneracji.

**Czas regeneracji** po hibernacji wylicza się, mnożąc rangi obu rezonujących mutacji: `Ranga A x Ranga B`. Przykład: mutacja Rangi 2 rezonuje z mutacją Rangi 4 → 2 x 4 = **8 dni** hibernacji. Czas ten może być zmniejszony przez fabularne zabiegi związane z mutacją oraz pielęgnację, jeśli jest to fizycznie możliwe.

Rezonans może zostawić trwały ślad wykraczający poza samą hibernację - np. jeśli w jego ramach postać nadwręża dodatkową parę kończyn, które stanowią mutacje to po jego zakończeniu mogą one zwisać bezwładnie i powodować dolegliwości bólowe. Chwilowa potrzeba wzmocnienia może w ten sposób stać się długoterminową komplikacją.

**Sposoby użycia Rezonansu:**
- Aktywacja mutacji (patrz [Aktywacja](#aktywacja)) - bez kosztu PM ani Skażenia.
- Zniwelowanie wadliwych efektów - tymczasowe zignorowanie Wad jednej z rezonujących mutacji.
- Duże wzmocnienie pozytywnych efektów - znaczące, tymczasowe podniesienie siły Atutu lub efektu Aktywacji jednej z rezonujących mutacji.

### Tworzenie mutacji

Gdy potrzebna jest nowa mutacja lub rozwój istniejącej, MG projektuje ją tak, by pasowała do fabuły i wydarzenia, które ją wywołało. Jeśli potrzebny jest szybki, losowy wynik (np. brak czasu na przygotowanie, sytuacja przy stole), można skorzystać z prostej procedury 4-osiowej:

1. **Pochodzenie** - wynika z fabuły (co spowodowało wzrost Skażenia); rzut k10 tylko jeśli fabuła nie wskazuje jasno (1-4 LiveCore, 5-7 DeathNet, 8-10 Anomalie).
2. **Rodzaj i domena** - wybór Rodzaju (Fizyczna / Mentalna / Psioniczna) oraz jednej z 12 cech, na którą mutacja wpływa.
3. **Charakter** - Pasywna / Aktywna.
4. **Polaryzacja** - dla Pasywnej: Atut-dominująca / Wada-dominująca / Zrównoważona (domyślnie najczęstsza). Dla Aktywnej: potężny efekt o wysokim koszcie / umiarkowany efekt o niskim koszcie.

Wynik tej procedury jest surowcem, nie gotową mutacją - MG ubiera go w konkretne Atuty, Wady lub efekty Aktywacji i nazwę.

> [!info]
> Wynik losowania jest tylko inspiracją. Mistrz Gry może w każdej chwili zastąpić go własnym projektem mutacji, jeśli lepiej pasuje do fabuły.

## Przykładowe mutacje

Gotowe przykłady mutacji (Pasywne, Aktywne, wspierające walkę ze zwierzęcym Stronnikiem, inspirowane Cechami i Umiejętnościami oraz nietypowe, kreatywne rozwiązania) zostały wydzielone do osobnego pliku: [Przykładowe Mutacje](Przykładowe%20Mutacje.wip.md).
