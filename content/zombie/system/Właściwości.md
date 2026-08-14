# Właściwości

To narracyjne określenia z wartością liczbową umożliwiającą wpłynięcie na różne elementy gry dodając pozytywne lub negatywne modyfikatory. Każda właściwość pozytywna to `Atut`, a negatywna to `Wada`.

Każdy atut i wada ma domyślną wartość 1, którą można zwiększyć. W zapisie tagów wartość 1 pomija się (`@pros:Cichy`), a od 2 wzwyż podaje się w nawiasie (`@pros:Cichy(2)`). Skala wartości to **1–5**. MG może wyjść poza nią w wyjątkowych przypadkach (np. liczba sojuszników). Ostatecznie każdy atut i wada podlegają narracyjnej interpretacji.

Właściwości może mieć niemal każdy element gry by opisać w tym świecie. Najczęściej spotyka się je przy postaciach i NPC, ekwipunktu, pojazdach, mutacjach i zaklęciach.

Każdy atut i wada może mieć też opis rozszerzający jego znaczenie. Dlatego dopuszcza się, że będzie istniał atut lub wada o takiej samej nazwie dla różnych kategorii, ale będzie różniła się opisem.

Przykład: Atut `Cichy` dla noża i dla pojazdu może różnić sie skalą wpływu.

Wartość liczbowa atutów i wad jest modyfikatorem rzutu do których się go aplikuje.

Pełny rejestr wszystkich Atutów i Wad używanych w systemie znajduje się w [Liście Atutów i Wad](Lista%20Atutów%20i%20Wad.md).

## Koszt i przychód z przedmiotów

`Paliwo` i `Energia` mogą występować jako Atut albo jako Wada. To nie jest ten sam efekt ze znakiem plus/minus — Atut mówi, ile zasobu przedmiot **trzyma albo wytwarza**, Wada mówi, ile **zużywa** przy normalnym użytkowaniu w scenie. Jednostki są abstrakcyjne, tak jak [Naboje i Strzały](Ekwipunek/Broń.md).

Nazw nie scala się z innymi wadami o podobnym temacie. `Spalanie` zostaje `Spalaniem`, `Paliwo` zostaje `Paliwem`, `Energia` zostaje `Energią`.

### Wada — zużycie na scenę

Jeśli przedmiot ma Wadę `Paliwo` o wartości 1, przy zwykłym użyciu w scenie spala 1 jednostkę paliwa. Wyższa wartość to większy apetyt: miotacz ognia z @cons:Paliwo(4) zużywa 4 na scenę.

Jeśli przedmiot ma Wadę `Energia` o wartości 1, przy zwykłym użyciu w scenie zużywa 1 jednostkę energii. Dron z @cons:Energia spala 1 na zwiad; noktowizor z @cons:Energia(2) spala 2.

Bez zapasu, z którego da się to opłacić, przedmiot w tej scenie nie działa albo działa tylko tyle, na ile starczy jednostek.

### Forsowanie zużycia

Na początku lub w trakcie sceny można zadeklarować, że forsuje się użycie przedmiotu z Wadą @cons:Energia, @cons:Paliwo, @cons:Naboje lub @cons:Strzały. Zużycie w tej scenie wynosi **dwa razy** normalną wartość Wady, w zamian otrzymuje się bonus **+2 kości** do końca sceny.

Nie da się forsować, jeśli zapasu nie starcza na podwójne zużycie. Wada @cons:Jednorazowy też to uniemożliwia przedmiot i tak znika po jednym użyciu.

Przykład: pistolet z @cons:Naboje zwykle spala 1 nabój na scenę. Forsowanie spala 2 i daje +2 kości do strzałów do końca starcia. Dron z @cons:Energia przy forsowaniu spala 2 z akumulatora, ale zwiad jest wyraźnie sprawniejszy.

### Atut — przechowanie albo wytwarzanie

Jeśli przedmiot ma Atut `Paliwo` lub `Energia`, wartość mówi, ile jednostek ten przedmiot **może przechować** albo **wytworzyć**. Które z tych dwóch — wynika z natury przedmiotu, nie z osobnej nazwy Atutu.

- Kanister z @pros:Paliwo(5) **przechowuje** do 5 jednostek paliwa.
- Rafineria z Atutem `Paliwo` **wytwarza** paliwo (tyle, ile wynosi Atut, w czasie ustalonym przez MG).
- Akumulator albo baterie z @pros:Energia **przechowują** ładunek.
- Generator z @pros:Energia(5) **wytwarza** energię.

Przykład: grupa tankuje samochód z kanistra (@pros:Paliwo(5)). Jeśli pojazd w tej scenie zużywa 2 jednostki, z kanistra ubywa 2 — zostaje 3. Dron (@cons:Energia) leci na zwiad; ładunek schodzi z akumulatora (@pros:Energia(3)), zostaje 2. Generator w obozie napełnia ten sam akumulator z powrotem.
