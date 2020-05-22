export const AddItemForm = [
    {
        name: 'title',
        label: 'Title',
        elementType: 'input',
        config: { 
            type: 'input',
            placeholder: 'Title'
        }
    },
    {
        name: 'description',
        label: 'Description',
        elementType: 'textarea',
        config: {
            placeholder: 'Add some description about the file'
        }
    },
    {
        name: 'tag',
        label: 'Tag',
        elementType: 'input',
        config: {
            type: 'text',
            placeholder: 'Tag'
        }
    },
    {
        name: 'dueDate',
        label: 'Due Date',
        elementType: 'date',
        config: {
            type: 'date',
            placeholder: 'mm / dd / yyyy'
        },
        value: '',
        validation: {
           required: true,
        //   isDate: true
        }, 
    },
    {
        name: 'member',
        label: 'Member E-mail',
        elementType: 'input',
        config: {
          type: 'email',
          placeholder: 'Your E-Mail'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        }
    }  
] 