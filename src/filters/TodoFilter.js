export const filterTodos = (showCompleted, searchTerm) => todo => {

    if (!showCompleted) {
        if (todo.completed)
            return false;
    }

    return todo.title.toLowerCase().includes(searchTerm);

}