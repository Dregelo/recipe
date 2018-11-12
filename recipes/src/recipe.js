import { getFilters } from "./filters"
import uuid4 from "uuid/v4"
import { createIngridientDOM, addIngridient } from "./ingridients";
let recipes = []

const loadRecipes = () => {
    const recipesJSON = localStorage.getItem("recipes")
    try {
        recipes = recipesJSON ? JSON.parse(recipesJSON) : []
    } catch(e) {
        recipes = []
    }
}

const getRecipes = () => recipes

const createRecipe = ( description, img ) => {
    const id = uuid4()
    recipes.push({
        id,
        name: "Default Recipe Name",
        description,
        img: "",
        ingridients: []
    })
    saveRecipe()
    return id
}

const updateRecipe = (recipeId, updates) => {
    const recipe = recipes.find(recipe => recipe.id === recipeId)

    if (!recipe) {
        return
    }
    if (typeof updates.name === "string") {
        updates.name = updates.name === "" ? "Default Recipe Name" : updates.name
        recipe.name = updates.name
    }
    if (typeof updates.description === "string") {
        recipe.description = updates.description
    }
    if (typeof updates.img === "string") {
        recipe.img = updates.img
    }
    saveRecipe()
    return recipe
}

const removeRecipe = recipeId => {
    recipes.splice(recipeId, 1)
    saveRecipe()
    location.assign("index.html")
}

const saveRecipe = () => localStorage.setItem("recipes", JSON.stringify(recipes))

const filteredRecipes = () => {
    const filters = getFilters()
    const matchSearch = recipes.filter(recipe => recipe.name.toLowerCase().includes(filters.searchText.toLocaleLowerCase()))
    return matchSearch
}


const render = (recipe, recipeId) => {
    if(recipe) {
        const recipeDiv = document.querySelector("#recipes")
        recipeDiv.innerHTML = "";
        filteredRecipes().forEach(recipe => {
            createRecipeDOM(recipe)
        })   
    }
    if(recipeId) {
      createIngridientDOM(recipeId)
    }
}

const createRecipeDOM = (recipe) => {
    const recipeDiv = document.querySelector("#recipes")
    const column = document.createElement("div")
    column.classList.add("col-md-4", "col-lg-3", "col-xs-6")

    const card = document.createElement("div")
    card.classList.add("card")

    const imgEl = document.createElement("img")
    imgEl.classList.add("card-img-top")
    imgEl.setAttribute("src", recipe.img)
    card.appendChild(imgEl)

    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")

    const recipeName = document.createElement("h5")
    recipeName.classList.add("card-title")
    recipeName.textContent = recipe.name
    cardBody.appendChild(recipeName)
    
    const recipeDescription = document.createElement("p")
    recipeDescription.classList.add("card-text")
    recipeDescription.textContent = recipe.description ? recipe.description.substring(0, 100) : ""
    cardBody.appendChild(recipeDescription)

    const recipeButton = document.createElement("button")
    recipeButton.classList.add("btn", "btn-primary")
    recipeButton.textContent = "Continue"
    cardBody.appendChild(recipeButton)

    recipeButton.addEventListener("click", () => {
        location.assign(`edit.html#${recipe.id}`)
    })
    
    card.appendChild(cardBody)
    column.appendChild(card)

    recipeDiv.appendChild(column)

    return recipeDiv
}

const initRecipeEdit = (recipeId) => {
    const recipeName = document.querySelector("#nameInput")
    const recipeDescription = document.querySelector("#descriptionInput")
    const recipeURL = document.querySelector("#imgInput")
    let recipe = recipes.find(recipe => recipe.id === recipeId)  

    recipeDescription.value = !recipe.description ? "" : recipe.description
    recipeName.value = !recipe.name ? "" : recipe.name 
    recipeURL.value = !recipe.img ? "" : recipe.img
    render(undefined, recipeId)
}


loadRecipes()

export { createRecipe, getRecipes, render, loadRecipes, updateRecipe, initRecipeEdit, removeRecipe, saveRecipe, addIngridient }


