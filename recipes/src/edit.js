import { updateRecipe, initRecipeEdit, removeRecipe} from "./recipe"
import { addIngridient } from "./ingridients"

const recipeName = document.querySelector("#nameInput")
const recipeDescription = document.querySelector("#descriptionInput")
const imgInput = document.querySelector("#imgInput")
const imgLocalInput = document.querySelector("#imgLocalInput")
const doneButton = document.querySelector("#done")
const removeButton = document.querySelector("#remove")
const ingridientInput = document.querySelector("#addIngridientInput")
const recipeId = location.hash.substring(1)

initRecipeEdit(recipeId)


recipeName.addEventListener("input", e => {
    updateRecipe(recipeId, {
        name: e.target.value.trim()
    })
})

recipeDescription.addEventListener("input", e => {
    updateRecipe(recipeId, {
        description: e.target.value
    })
})

imgInput.addEventListener("input", e => {
    const imgExtension = e.target.value.split('.').pop()
    const allowedExtensions = ["jpg", "jpeg", "png"]
    if(allowedExtensions.includes(imgExtension)) {
        updateRecipe(recipeId, {
        img: e.target.value
        })
    } 
})

imgLocalInput.addEventListener("input", e => {
    imgLocalInput.onchange = evt => {
        const tgt = evt.target || window.event.srcElement,
            files = tgt.files;

        if (FileReader && files && files.length) {
            const fr = new FileReader();
            fr.onload =  () => {
                updateRecipe(recipeId, {
                    img: fr.result
                })
            }
            fr.readAsDataURL(files[0]);
        }
    }
})

doneButton.addEventListener("click", e => {
    e.preventDefault()
    location.assign(`/index.html`)
})

removeButton.addEventListener("click", e => {
    removeRecipe(recipeId)
})

ingridientInput.addEventListener("submit", e => {
    e.preventDefault()
    let ingridient = e.target.elements.ingridient.value.trim()
    if(ingridient.length > 0) {
        addIngridient(recipeId, ingridient)
    }
    e.target.elements.ingridient.value = ""
})


