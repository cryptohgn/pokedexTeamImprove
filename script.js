
//logo para refrescar l pagina
const refresh = document.querySelector(".intro");
refresh.addEventListener('click', _ => {
  location.reload();
})
//Seleccionamos el header
const header$$ = document.querySelector("header");
//Seleccionamos el div search para los favoritos
const search$$ = document.querySelector(".search");


//Guardamos la URL en una variable
const URL = 'https://pokeapi.co/api/v2/pokemon/';
const allPokes = [];
//Seleccionamos donde vamos a renderizar los pokemos

const pokeShow = document.querySelector(".containerPokemon")

//Categoias de tipos de Pokemons
const selecTypesPok = document.querySelectorAll(".btn")
//console.log(selecTypesPok)
selecTypesPok.forEach(button => button.addEventListener("click", async (event) => {
let btnId = event.currentTarget.id;
    pokeShow.innerHTML=""
    for ( let i = 1; i <= 151; i++) {
      const response = await fetch(URL + i)
      const allPokes = await response.json();
      const tipoPokes = allPokes.types.map(type => type.type.name)
      if (tipoPokes.some(tipo => tipo.includes(btnId))){
        renderPokemons(allPokes);
      }
      
      }

    }))
//Buscador

let pokeSearched="";

const searchInput = document.querySelector(".searcher");

const handleInputSearch = (event) => {
  event.preventDefault();
  pokeSearched = searchInput.value.toLowerCase();
  getPokemon(pokeSearched);
};

const btnSearch = document.querySelector(".pokeBall");
btnSearch.addEventListener('click', handleInputSearch);
searchInput.addEventListener("keyup", function(e) {
  
    if (e.code === 'Enter') {
        btnSearch.click(handleInputSearch);
    }
})

const getPokemon = async () => {
  try {
    const response = await fetch(URL + pokeSearched)
    const pokemon = await response.json();
    renderPokemon(pokemon)
  } catch (error) {
    console.log("error")
    pokeShow.innerHTML="";
    const errorMsg = document.createElement("div");
    header$$.appendChild(errorMsg);
    errorMsg.innerHTML=`

    <div class="errorMsg">
       <h1>¡Error!</h1></br>
       <h2>El Pokemon buscado no se encuentra en nuestra pokedex</h2>
       <img src="./img/error404.gif">
      </div>
  `;
  }
}

// Fin BUscador

//Tomar datos de la Api y paginación
let stop=30;
const getPokemons = async () => {
    
      for ( let i = 1; i <= stop; i++) {
        const response = await fetch(URL + i)
        const allPokes = await response.json();
        //console.log(allPokes);
        renderPokemons(allPokes);
        }

        const page1 = document.querySelector("#page1");
        page1.addEventListener("click", async ()=>{
          pokeShow.innerHTML=" ";
          for ( i = 1; i <= stop; i++) {
            const response = await fetch(URL + i)
            const allPokes = await response.json();
            renderPokemons(allPokes);
          }
          })

        const page2 = document.querySelector("#page2");
        page2.addEventListener("click", async ()=>{
          pokeShow.innerHTML=" ";
          for ( let j = 33; j <= 65; j++) {
          const response = await fetch(URL + j)
          const allPokes = await response.json();
          renderPokemons(allPokes);
          }
        })
       
        const page3 = document.querySelector("#page3");
        page3.addEventListener("click", async ()=>{
          pokeShow.innerHTML=" ";
          for ( let k = 66; k <= 98; k++) {
          const response = await fetch(URL + k)
          const allPokes = await response.json();
          renderPokemons(allPokes);
          }
        })

        const page4 = document.querySelector("#page4");
        page4.addEventListener("click", async ()=>{
          pokeShow.innerHTML=" ";
          for ( let l = 99; l <= 131; l++) {
          const response = await fetch(URL + l)
          const allPokes = await response.json();
          renderPokemons(allPokes);
          }
        })

        const page5 = document.querySelector("#page5");
        page5.addEventListener("click", async ()=>{
          pokeShow.innerHTML=" ";
          for ( let m = 132; m <= 151; m++) {
          const response = await fetch(URL + m)
          const allPokes = await response.json();
          renderPokemons(allPokes);
          }
        })
    
};
// Favoritos
const pokeFavs = [];
const pokeFavSect = document.createElement("div");
pokeFavSect.classList.add("pokeRender")
search$$.appendChild(pokeFavSect);

const pokeTitle = document.createElement("div");
pokeFavSect.appendChild(pokeTitle)
const pokeFavGrpup = document.createElement("div");
pokeFavGrpup.classList.add("pokeFavGrpup")
pokeFavSect.appendChild(pokeFavGrpup)


const handleClickFavorite = async (event) => {
  pokeTitle.innerHTML=`
  <h3 class="pokeFavTile">Favorites</h3>
  </div>
  `
  //Hacemos la comparación y obtenemos el pokemon a renderizar en el area de Favs
      const pokeId = event.currentTarget.id;
      const response = await fetch(URL + pokeId)
      const pokemon = await response.json();
      pokeFavs.push(pokemon);
      console.log(pokemon)


      const findElement = pokeFavs.find(
        (pokemon) => pokemon.id === pokeId
      );
      console.log(findElement)
      const pokeClicked = allPokes.find((pokemon) => pokemon.id === pokeId);
    
      if (!findElement) {
        pokeFavs.push(pokeClicked);
      } else {
        // findIndex > busca la posición de un elemento dentro del array
        const indexElement = pokeFavs.findIndex(
          (poke) => poke.name === pokeId
        );
        pokeFavs.splice(indexElement, 1);
      }
      
      for (const pokefav of pokeFavs) {
        
      let html=""
      html+= `
      <div class="pokefavSmaller">
      <img src="${pokefav.sprites.other.home.front_default}" class="imgPoke">
      <h3>${pokefav.name}</h3>
      <h4 class="idPoke">#00${pokefav.id}</h4>
      <div class="tiposPoke">
        -
      </div>
 
    `
    pokeFavGrpup.innerHTML+=html;
        
      }
      
      
      }
    

// Renderizar Pokemons
let tipos =""
const renderPokemons = (poke) => {

    tipos = poke.types.map((type) => `
    <p class="${type.type.name}">
    ${type.type.name} </p>`);
    tipos = tipos.join('');
    //console.log(tipos)

    const pokeCard = document.createElement("div")
    pokeShow.appendChild(pokeCard)
    pokeCard.classList ="pokeCard shadow-inset-center";
    pokeCard.setAttribute("id",poke.name)
    //pokeCard.style.cssText = `background-image: url("${poke.sprites.other.dream_world.front_default}"); opacity: 0.2 `;
    let html=""
    html+= `
    
      <img src="${poke.sprites.other.home.front_default}" class="imgPoke">
      <h3>${poke.name}</h3>
      <h4 class="idPoke">#00${poke.id}</h4>
      <div class="tiposPoke">
        <strong>${tipos}</strong>
      </div>
 
    `
    pokeCard.innerHTML+=html;
    const allCards = document.querySelectorAll('.pokeCard');
    for (const card of allCards) {
    card.addEventListener('click', handleClickFavorite);
  }
   
}
    
   
    //Renderizar 1 Pokemon del buscador
  const renderPokemon = (pokemon) => {
    pokeShow.innerHTML="";
    renderPokemons(pokemon)
  }
getPokemons();
