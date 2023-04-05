
//---Adcionando um novo item à list HTML---\\
//atribuindo o document html pokemonList a uma const,
const pokemonList = document.getElementById('pokemonList')

const maxRecords = 151;
const limit = 10;
let offset = 0;

function loadPokemonItens(offset, limit) {
   pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
      const newHtml = pokemons.map((pokemon) =>
      `<li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
               <ol class="types">
               ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
               </ol>

               <img src="${pokemon.photo}"
                  alt="${pokemon.name}">
            </div>
         </li>`).join('')

      pokemonList.innerHTML += newHtml

   })
}

loadPokemonItens(offset, limit) //?

const loadMoreButton = document.getElementById('loadMoreButton')
loadMoreButton.addEventListener('click', () => {
   offset += limit
   const qtdRecodNextPage = offset + limit

   if(qtdRecodNextPage >= maxRecords) {
      const newLimit = maxRecords - offset
      loadPokemonItens(offset, newLimit)
      //removendo botão 'load more'.
      loadMoreButton.parentElement.removeChild(loadMoreButton) 
   } else {
      loadPokemonItens(offset, limit)
   }
})

/* const returnToInit = document.getElementById('returnToInit')
returnToInit.addEventListener('click', () => {
   offset = 0
   loadPokemonItens(offset, limit)
}) */