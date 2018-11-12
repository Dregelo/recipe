import { loadRecipes, createRecipe, getRecipes, render } from "./recipe"
import { setFilters, getFilters } from "./filters"


render(getRecipes())

console.log(getRecipes())

document.querySelector("input").addEventListener("input", e => {
    setFilters({
        searchText: e.target.value
    })
    render(getRecipes())
})

document.querySelector("#addRecipe").addEventListener("click", (e) => {
    const id = createRecipe()
    location.assign(`/edit.html#${id}`)
})