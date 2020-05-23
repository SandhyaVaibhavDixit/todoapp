import { update, remove } from '../_services/ToDoItemServices'

export const UpdateToDoItems = (action, toDoItems, checkedItems) => {
    const selectedToDoItems = toDoItems.filter(todoItem => checkedItems.includes(todoItem.id) );
    
    switch(action){
        case 'delete' : MarkToDoItemsAsDeleted(selectedToDoItems);
                        break;
        default:
        case 'done' : MarkTodoItemAsDone(selectedToDoItems);
                        break;
                
    }
}

const MarkToDoItemsAsDeleted = (selectedToDoItems) => {
    selectedToDoItems.map(({id}) => {
        
        return remove(id);
    })
}

const MarkTodoItemAsDone = (selectedToDoItems) => {
    selectedToDoItems.map(({id, title, description, tag, dueDate, member }) => {

        const data ={
            id: id,
            title: title,
            description: description,
            tag: tag,
            dueDate: dueDate,
            member: member,
            isActive: false
        }
        
        return updateToDoItem(id, data);
    })
}

const updateToDoItem = async(id, data) => {
    await update(id, data)
            .then(resonse => {
                console.log(resonse);
            })
            .catch(error =>{
                console.log(error);
            });
}
