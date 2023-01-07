function getById(array, id) {
    const item = array.find(obj => obj.id === parseInt(id))
    return item
}

function getIndexById(array, id) {
    const index = array.findIndex(obj => obj.id === parseInt(id))
    return index
}

module.exports = {getById, getIndexById}