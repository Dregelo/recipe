import moment from "moment"
import { getFilters } from "./filters"
import { sortNotes, getNotes } from "./notes"

// Render app notes
const renderNotes = () => {
    const notesEl = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy);
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach(note => {
            const noteEl = generateNoteDOM(note);
            notesEl.appendChild(noteEl)
        })
    } else {
        const emptyMessage = document.createElement("p")
        emptyMessage.classList.add("empty-message")
        emptyMessage.textContent = "No notes to show!"
        notesEl.appendChild(emptyMessage)
    }

}

const initEditPage = (noteId) => {
    const noteTitle = document.querySelector("#note-title");
    const noteBody = document.querySelector("#note-body");
    const date = document.querySelector("#updated");
    const notes = getNotes();
    const note = notes.find(note => note.id === noteId);
    !note ? location.assign("/index.html") : null;

    const updateDate = () => date.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`;
    updateDate()

    noteTitle.value = note.title;
    noteBody.value = note.body;
}

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a');
    const textEl = document.createElement("p");
    const statusEl = document.createElement("p");

    // Setup the note title text, and set correct link
    (note.title.length > 0) ? textEl.textContent = note.title : textEl.textContent = "Unnamed note"
    textEl.classList.add("list-item__title")
    noteEl.appendChild(textEl)

    noteEl.setAttribute("href", `/edit.html#${note.id}`);
    noteEl.classList.add("list-item")

    statusEl.textContent = `Last edited ${moment(note.updatedAt).fromNow()}`
    statusEl.classList.add("list-item__subtitle")


    noteEl.appendChild(statusEl)

    return noteEl
}

export { generateNoteDOM, renderNotes, initEditPage }
