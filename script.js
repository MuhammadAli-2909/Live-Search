let ul = document.getElementsByTagName("ul")[0];
let search = document.querySelector(".search");
let timer;
async function getPokemon(query) {
    if (query.length < 3) {
        ul.style.background = "none";
        ul.innerHTML = "";
        return;
    }
        let a = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
        let b = await a.json();
        let results = b.results.filter(pokemon =>
            pokemon.name.includes(query.toLowerCase())
        );

        showSuggestions(results);

}

function showSuggestions(list) {
    ul.innerHTML = "";
    list.slice(0, 10).forEach(item => {
        let li = document.createElement("li");
        li.textContent = item.name;
        ul.appendChild(li);
    });
}
search.addEventListener("input", () => {
    ul.style.backgroundColor = "#252525";
    clearTimeout(timer);
    timer = setTimeout(() => {
        getPokemon(search.value);
    }, 500);
});

async function main() {
    await getPokemon();
}
main();