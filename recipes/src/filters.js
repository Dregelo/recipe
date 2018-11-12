const filters = {
    searchText: "",
    hideMissing: false
}

const setFilters = ({ searchText, hideMissing }) => {
    if(typeof searchText === "string") {
        filters.searchText = searchText
    }

    if(typeof hideMissing === "boolean") {
        filters.hideMissing = hideMissing
    }
}

const getFilters = () => filters

export { setFilters, getFilters }