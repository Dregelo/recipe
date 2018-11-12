import { getRecipes, saveRecipe, render } from "./recipe"
import { isContext } from "vm";

const addIngridient = (recipeId, ingridient) => {
    const recipe = getRecipes().find(recipe => recipe.id === recipeId)
    recipe.ingridients.push({
        name: ingridient,
        inStock: false
    })
    saveRecipe()
    render(undefined, recipeId)
}

const createIngridientDOM = (recipeId) => {
    let recipe = getRecipes().find(recipe => recipe.id === recipeId)
    const ingridientDiv = document.querySelector("#ingridients")

    ingridientDiv.innerHTML = ""
    recipe.ingridients.forEach(ingridient => {
        const ingridientEl = document.createElement("label")
        
        const ingridientCheckBox = document.createElement("input")
        ingridientCheckBox.setAttribute("type", "checkbox")
        ingridientCheckBox.checked = ingridient.inStock

        ingridientEl.appendChild(ingridientCheckBox)

        const ingridients = document.createElement("span")
        ingridients.textContent = ingridient.name
        ingridientEl.appendChild(ingridients)
        
        const removeButton = document.createElement("button")
        removeButton.textContent = "remove"
        removeButton.setAttribute("id", "removeIngridient")
        ingridientEl.appendChild(removeButton)

        ingridientCheckBox.addEventListener("change", e => {
            ingridient.inStock = !ingridient.inStock
            saveRecipe()
        })

        removeButton.addEventListener("click", () => {
            const findIngridient = recipe.ingridients.findIndex(ingridient => removeButton.previousSibling.value === ingridient.name)
            recipe.ingridients.splice(findIngridient, 1)
            saveRecipe()
            render(undefined, recipeId)
        })
        ingridientDiv.appendChild(ingridientEl)  
    })
}



export { addIngridient, createIngridientDOM, updateIngridient }