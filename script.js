let ul = document.getElementsByTagName("ul")[0];
let search = document.querySelector(".search");
let timer;
async function getPokemon(query) {
    if (query.length < 3) {
        ul.style.background = "none";
        ul.innerHTML = "";
        return;
    }
    let a = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1350");
    let b = await a.json();
    let results = b.results.filter(poke =>
        poke.name.includes(query)
    );
    showSuggestions(results);
}

function showSuggestions(list) {
    ul.innerHTML = "";
    list.forEach(item => {
        let li = document.createElement("li");
        li.innerText = item.name;
        ul.append(li);
        li.addEventListener("click", () => {
            search.value = li.innerText;
        });
    });
}
search.addEventListener("input", () => {
    if (search.value.length > 2) {
        ul.style.backgroundColor = "#252525";
    }
    clearTimeout(timer);
    timer = setTimeout(() => {
        getPokemon(search.value);
    }, 500);
});