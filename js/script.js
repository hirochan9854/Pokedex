const baseURL = "https://pokeapi.co/api/v2/";

async function getPokemon() {
  const PokeList = await fetch(baseURL + "pokemon?limit=151");
  if (PokeList.ok) {
    const data = await PokeList.json();
    const pokeList = document.createElement("ul");
    for (let i = 0; i < data.results.length; i++) {
      const Pokedata = await fetch(
        baseURL + `pokemon-species/${data.results[i].name}`
      );
      if (Pokedata.ok) {
        const info = await Pokedata.json();
        let Pokename;
        for (let nameInfo of info["names"]) {
          if (nameInfo["language"]["name"] == "ja-Hrkt") {
            Pokename = nameInfo["name"];
            break;
          }
        }
        const PokeDetails = await fetch(
          baseURL + `pokemon/${data.results[i].name}`
        );
        let image;
        if (PokeDetails.ok) {
          const details = await PokeDetails.json();
          image = details.sprites.front_default;
        }
        console.log(Pokename);
        console.log(image);
        const pokemon = document.createElement("li");
        pokemon.innerHTML = `<img src="${image}" alt="${Pokename}"><br>${Pokename}`;
        pokeList.appendChild(pokemon);
      }
    }
    document.body.appendChild(pokeList);
  }
}

getPokemon();
