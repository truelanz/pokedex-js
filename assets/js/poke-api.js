
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon //?
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    

    return fetch(url) //Buscando pokemons na url
        .then(response => response.json()) //convertendo busca html para .json.
        .then(jsonBody => jsonBody.results) //retornando somente os 'results' do body do json (somente a lista de pokemons).
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail)) //mapeando lista de pokemons em uma lista de requisição dos detalhes.
        .then((detailRequest) => Promise.all(detailRequest)) //esperando que todas as requisições do detailRequest terminem.
        .then((PokemonsDetails) => PokemonsDetails) //retornando os detalhes da pokemon list.
}
