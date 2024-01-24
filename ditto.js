



function checkKey(event) {
    if (event.keyCode === 13) {
        searchPokemon();
    }
}

function searchPokemon(event) {
    let del = document.getElementById("content").innerHTML = "";
    var input = document.getElementById('pokesearch');
    var search = input.value;
    pokemondatatyp(search);
}


function pokemondatatyp(poketypes) {
    fetch('https://pokeapi.co/api/v2/type/' + poketypes.toLowerCase())

        .then(res => res.json())
        
        .then(json => {

            json.pokemon.forEach(
                elem => {
                    pokemondata(elem.pokemon.name);

                }
            );
        }).catch(error => 
            pokemondata(poketypes)
        );
}


function pokemondata(elem) {
    fetch('https://pokeapi.co/api/v2/pokemon/'+ elem.toLowerCase())
        .then(res => res.json())
        .then(json => {
            getPokemonInfo(json)

        });
}

function pokemonability(abili) {
    fetch(abili)
        .then(res => res.json())
        .then(json => {
            console.log(json.effect_entries[0].effect);
        });
}

const btn = document.querySelector('.btn')
const userTags = []

function getValue(e) {

    const parent = e.target.closest('label')

    const input = parent.querySelector('input')

    const inputValue = input.value

    if (inputValue !== "") {
        userTags.push(inputValue)
    }

}



function getPokemonInfo(json) {

    var content = document.getElementById('content');

    var karte = document.createElement('div');
    karte.className = 'karte';

    var nameDiv = document.createElement('div');
    nameDiv.textContent = json.name;
    nameDiv.className = 'pokename';

    var idDiv = document.createElement('div');
    idDiv.textContent = json.id;
    idDiv.className = 'pokeid';

    var bildid = '';
    if (json.id.toString().length == 2) {
        bildid = "0" + json.id;
    }
    if (json.id.toString().length == 1) {
        bildid = "00" + json.id;
    }
    if (json.id.toString().length == 3) {
        bildid = "" + json.id;
    }

    var bild = document.createElement('img');
    bild.src = 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/' + bildid + '.png'
    bild.className = 'pokemonbild'

    var typeDiv = document.createElement('div');
    typeDiv.textContent = json.types[0].type.name;
    typeDiv.className = 'poketype';

    karte.style = 'background-image: url("./Bilder/' + json.types[0].type.name + '.png");';

    var hightDiv = document.createElement('div');
    hightDiv.innerHTML = '<b>Größe</b>: 0,' + json.height + 'm';
    hightDiv.className = 'pokehight';

    var weightDiv = document.createElement('div');
    weightDiv.innerHTML = '<b> Gewicht</b>: ' + json.weight / 10 + 'kg';
    weightDiv.className = 'pokeweight';

    var abilitydiv1 = document.createElement('div');
    abilitydiv1.innerHTML= json.abilities[0].ability.name;
    abilitydiv1.className = 'ability1';

    var abilityurldiv1 = document.createElement('div');
    abilityurldiv1.innerHTML= json.abilities[0].ability.url;
    abilityurldiv1.className = 'abilityurl1';


    var abilitdescdiv1 = document.createElement('div');
            abilitdescdiv1.className = 'abilitidesc1';

    fetch(json.abilities[0].ability.url)
        .then(res => res.json())
        .then(json => {
            abilitdescdiv1.innerHTML = json.effect_entries[0].effect;
        });
    

    var abilitydiv2 = document.createElement('div');
    abilitydiv2.innerHTML= json.abilities[1].ability.name;
    abilitydiv2.className = 'ability2';
    
    var abilitdescdiv2 = document.createElement('div');
    abilitdescdiv2.className = 'abilitidesc2';

    fetch(json.abilities[1].ability.url)
        .then(res => res.json())
        .then(json => {
            abilitdescdiv2.innerHTML = json.effect_entries[1].effect;
        });




    
    karte.appendChild(idDiv);
    karte.appendChild(nameDiv);
    karte.appendChild(typeDiv);
    karte.appendChild(hightDiv);
    karte.appendChild(abilitydiv1);
    karte.appendChild(abilitydiv2);
    karte.appendChild(bild);
    karte.appendChild(weightDiv);
    karte.appendChild(abilitdescdiv1)
    karte.appendChild(abilitdescdiv2)
    content.appendChild(karte);


}

// btn.addEventListener('click', getValue)









