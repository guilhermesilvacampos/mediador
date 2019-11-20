export default class Dictionary {

    constructor() {
        return {
            custom: {
                nome:{
                    required: () => "O campo Nome do Item não pode ser vazio",
                    max: () => "O campo Nome do Item não pode ter mais que 100 caracteres"
                },

                linkDoItem: {
                    required: () => "O campo Link não pode ser vazio"
                },
                
                



            }
        }
    }
}