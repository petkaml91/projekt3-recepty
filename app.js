/*
Co je za úkol v tomto projektu:

1) Do prvku s id="recepty" vygeneruj z dat seznam všech receptů z naší "databáze".
HTML vzor, jak vygenerovaný recept vypadá, je zakomentovaný v index.html.*/

let receptyHTML, receptHTML, receptInfo, obrazek, nadpis, indexReceptu
let zobrazovaneRecepty = recepty;

function loadList(recept, index) {
    let receptyHTML = document.querySelector('#recepty');
    let receptHTML = document.createElement('div');
    let receptInfo = document.createElement('div');
    let obrazek = document.createElement('img');
    receptHTML.classList.add('recept');
    receptInfo.classList.add('recept-info');
    obrazek.classList.add('recept-obrazek');
    obrazek.alt ='Obrazek';
    obrazek.src = recept.img;
    receptyHTML.appendChild(receptHTML);
    receptHTML.appendChild(obrazek);
    receptHTML.appendChild(receptInfo);  
    receptInfo.innerHTML = '<h3 data-poradi="' + index + '">' + recept.nadpis + '<h3>';
    receptHTML.setAttribute('data-poradi', index);
    receptInfo.setAttribute('data-poradi', index);
    obrazek.setAttribute('data-poradi', index);
}

recepty.forEach(loadList);

// 5) Na recepty v seznamu by mělo jít kliknout a na pravé polovině, se objeví detail receptu.
// Doplň patričné údaje receptu do HTML prvků s ID recept-foto, recept-kategorie,
// recept-hodnoceni, recept-nazev, recept-popis.


function loadRecipe() {
    let nadpisReceptu = document.getElementById('recept-nazev');
    let popisReceptu = document.getElementById('recept-popis');
    let receptFoto = document.getElementById('recept-foto');
    let receptKategorie = document.getElementById('recept-kategorie');
    let receptHodnoceni = document.getElementById('recept-hodnoceni');
    let indexReceptu = event.target.dataset.poradi;
    if (!indexReceptu) {
        return;
    }
    nadpisReceptu.textContent = zobrazovaneRecepty[indexReceptu].nadpis;
    popisReceptu.textContent = zobrazovaneRecepty[indexReceptu].popis;
    receptFoto.src = zobrazovaneRecepty[indexReceptu].img;
    receptKategorie.textContent = zobrazovaneRecepty[indexReceptu].kategorie;
    receptHodnoceni.textContent = zobrazovaneRecepty[indexReceptu].hodnoceni;
    localStorage.recept = JSON.stringify(zobrazovaneRecepty[indexReceptu]);
}



document.addEventListener('click', loadRecipe);


// 2) Doplň hledání - v hlavičce odkomentuj pole pro hledání. Pri kliknutí na tlačítko Hledat
// by se měl seznam receptů vyfiltrovat podle hledaného slova.
// 3) Doplň filtrovanání receptů podle kategorie.
// 4) Doplň řazení receptů podle hodnocení.


function porovnejOdNejlepsich(recept1, recept2) {
    if (recept1.hodnoceni < recept2.hodnoceni) {
        return 1; 
    } else {
        return -1;
    }        
}

function porovnejOdNejhorsich(recept1, recept2) {
    if (recept1.hodnoceni > recept2.hodnoceni) {
        return 1; 
    } else {
        return -1;
    }        
}

function filter() {
    let stitek = document.getElementById('kategorie').value;
    let hledanyPojem = document.getElementById('hledat').value;
    let filtrovaneRecepty = [];
    recepty.forEach(function(recept){
        if (stitek !== '' && hledanyPojem !== '') {
            if (recept.stitek === stitek) {
                if (recept.nadpis.indexOf(hledanyPojem) > -1) {
                    filtrovaneRecepty.push(recept);
                }
            }
        }
        else if (stitek !== '') {
            if (recept.stitek === stitek) {
                filtrovaneRecepty.push(recept);
            }
        }
        else if (hledanyPojem !== '') {
            if (recept.nadpis.indexOf(hledanyPojem) > -1) {
                filtrovaneRecepty.push(recept);
            }
        } else {
            filtrovaneRecepty.push(recept);
        }
    });
    if (document.querySelector('#razeni').value == 1) {
        filtrovaneRecepty.sort(porovnejOdNejlepsich);
    } else if (document.querySelector('#razeni').value == 2) {
        filtrovaneRecepty.sort(porovnejOdNejhorsich);
    }
    zobrazovaneRecepty = filtrovaneRecepty;
    document.querySelector('#recepty').innerHTML = '';
    filtrovaneRecepty.forEach(loadList);
}

let vyberKategorie = document.querySelector('.kategorie');
let hledani = document.querySelector('#hledat');
let razeni = document.querySelector('#razeni');
vyberKategorie.addEventListener('change', filter);
hledani.addEventListener('change', filter);
razeni.addEventListener('change', filter);




// 6) Poslední vybraný recept ulož do Local Storage, aby se při novém otevření aplikace načetl.



function loadRecipeZObjektu(recept) {
    let nadpisReceptu = document.getElementById('recept-nazev');
    let popisReceptu = document.getElementById('recept-popis');
    let receptFoto = document.getElementById('recept-foto');
    let receptKategorie = document.getElementById('recept-kategorie');
    let receptHodnoceni = document.getElementById('recept-hodnoceni');
    nadpisReceptu.textContent = recept.nadpis;
    popisReceptu.textContent = recept.popis;
    receptFoto.src = recept.img;
    receptKategorie.textContent = recept.kategorie;
    receptHodnoceni.textContent = recept.hodnoceni;
}

loadRecipeZObjektu(function() {
    let recept;
    try {
        recept = JSON.parse(localStorage.recept);
    }
    catch (e) {
        recept = recepty[0];
    }
    return recept;
}());