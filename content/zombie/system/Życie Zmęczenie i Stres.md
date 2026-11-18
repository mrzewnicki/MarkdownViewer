# Życie, Zmęczenie i Stres

## Życie

Suma punktów życia, która reprezentuje jak postać blisko znajduje się śmierci. Wyliczana jest z cech: `(2×Kondycja) + Siła + Modyfikator Rasy`.

Modyfikatory rasy to stała wartość. Z poniższej tabeli:

| Rasa | Modyfikator |
| --- | --- |
| Człowiek | +3 |
| Zwierze | +3 |
| Zombie | +5 |
| Zmutowane zwierze | +5 |

### Gdy życie spada do zera

Dopóki postać ma jeszcze punkty życia, walczy jak zwykle. Gdy obrażenia albo upływ krwi sprowadzą ją **do zera albo poniżej**, wciąż może stać na nogach — ale jest na granicy. Od razu sprawdza się, czy ciało i wola to wytrzymają: rzut z **Determinacji + Kondycji**.

- Porażka oznacza utratę przytomności.
- Sukces pozwala działać dalej mimo zerowego lub ujemnego życia.

Jeśli sytuacja się nie poprawia, a postać dalej forsowuje się w walce lub działaniu, MG może znów zażądać takiego sprawdzenia.

Ześlizgnięcie poniżej zera to już **obrażenia na minusie** — ciało nie nadąża. Zwykle oznacza to nieprzytomność albo stan bliski śmierci. Bazowo człowiek znosi około **trzech punktów** poniżej zera. Mutacje, leki i okoliczności mogą ten próg przesunąć. Dalej jest śmierć

```ai
Progi (dla silnika / kalibracji; w Docs nazwa zasobu = Życie, w kodzie często HP):
- Życie > 0: walka normalnie
- Życie ≤ 0: test wytrzymałości; pula = Determinacja + Kondycja (bez umiejętności, chyba że MG inaczej); Trudność: TODO do ustalenia
- sukces → może działać; porażka → nieprzytomność
- kolejne testy gdy stan bez poprawy + obciążające działania
- limit minusów bazowo 3 (zejście do −3); poniżej → śmierć; mutacje/okoliczności/MG mogą zmienić limit
```

#### Czas na ratunek

Od utraty przytomności — albo od chwili, gdy życie idzie w minus — liczy się czas. Bazowo towarzysze mają **około trzech rund**, by zatamować krew, opatrzyć ranę i zrobić cokolwiek, co trzyma duszę w ciele. Mutacje i dramaturgia mogą ten czas wydłużyć albo skrócić.

Jeśli nikt nie ustabilizuje rannego, z każdą kolejną rundą stan może się pogarszać: krew płynie, oddech robi się płytki, zimno wchodzi w kości i wydziera dusze.

#### Stabilizacja

Opatrywanie nieprzytomnego sojusznika w zwarciu zajmuje **akcję**. Zwykle rzuca się **Inteligencję z Medycyną** — im głębiej ktoś jest na minusie, tym trudniej go uratować. Minusowe obrażenia rannego x2 wyznaczają trudność testu. Dobry opatrunek albo opaska (`@pros:Tamujący`) pomaga obniżyć trudność. Dopuszcza się inne metody stabilziacji niż Inteligencja i Medycyna, ale to zależy od sytuacji i decyzji MG, takim przykładem jest mutacja Łańcuch Życia.

```ai
Stabilizacja (silnik):
- 1 akcja, zwarcie (lub self jeśli narracja/mutacja)
- pula: Inteligencja + Medycyna (MG może dopuścić inną cechę)
- Trudność = (liczba punktów na minusie) × 2
- @pros:Tamujący(T) obniża Trudność o T
```

#### Krwawienie i inne zagrożenia w czasie

Nie każda rana sączy się tak samo. Broń i narzędzia z atutem **Krwawiący** zostawiają rany, które z rundy co rundę zabierają siły — pancerz tu nie chroni przed upływem krwi. Przedmioty **Tamujące** (opatrunki, opaski, nawet poszarpane ubranie) służą do przytrzymania tej krwi, zanim będzie za późno.

Krwawienie nie jest jedynym takim zagrożeniem. W świecie działają też inne czynniki, które **z czasem** dobijają rannego albo zdrowego: trucizny, gorączka, dym, chemia, skażenie, zimno, odwodnienie. Mechanicznie bywają bliskie krwawieniu — coś „tyka” co rundę albo co scenę, aż ktoś to przerwie, przeczeka albo opatrzy właściwym środkiem. MG dobiera tempo i sposób przerwania do tego, czym naprawdę jest zagrożenie.

```ai
Krwawienie (silnik):
- po trafieniu z ≥1 Życia po pancerzu, @pros:Krwawiący(N) → Krwawienie N (zostaje wyższa wartość)
- koniec rundy: −N Życia, omija pancerz
- tamowanie (1 akcja): Tamujący(T) → Krwawienie − T; improwizacja → test Medycyny vs N, sukces −1
- sprowadzenie do ≤0 → test wytrzymałości / minusy / okno ratunku jak wyżej
- inne DoT (trucizna, chemia, skażenie, środowisko…): ten sam wzorzec „tick w czasie + przerwanie właściwą akcją”; osobne katalogi/atuty gdy powstaną
```

#### Zombie i pomniejsi przeciwnicy

Zwykły zakażony, który padnie, często po prostu **kończy się** — bez dramatycznego wstawania z minusów i bez opatrunków. Dobicie warto zrobić, gdy scena tego wymaga. Są jednak bestie i mutantów, które zapadają w letarg albo udają padlinę; wtedy lepiej domknąć sprawę, zanim coś znów otworzy oczy.

## Zmęczenie

Reprezentuje fizyczne wycieńczenie organizmu na skutek długotrwałej aktywności lub wpływu otoczenia albo przeciwników. Maksymalny próg zmęczenia wylicza się z: `Kondycja + Determinacja`

## Stres

Reprezentuje psychiczną wyporność na zdarzenia, traumy i podejmowane ryzyko. Maksymalny próg stresu wylicza się z: `Opanowanie + Determinacja`

## Wykorzystanie Stresu i Zmęczenia

Oba zasoby służą odzwiercieldeniu tego jak bardzo w kość od świata i wrogów dostała postać. Jak trudne było dla nich wyznanie i na ile jest dobra ich sytuacja. Z obu zasobów można korzystać bardzo podobnie, ale należy rodzielic je fabularnie.

Możliwe zastosowania:

- Dodanie 2 kości do rzutu, ale deklaracja o tym musi być przed rzutem
- Przerzucenie wszystkich kości, które nie są sukcesem lub krytycznem sukcesem

W obu przypadakach powinno się powiedzieć w jaki sposób postać bardziej ryzykuje lub poświęca więcej sił by osiągnąć lepszy efekt.
