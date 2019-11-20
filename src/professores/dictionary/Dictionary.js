export default class Dictionary {

    constructor() {
        return {
            custom: {
                nome:{
                    required: () => "O campo Nome não pode ser vazio",
                    max: () => "O campo Nome não pode ter mais que 300 letras."
                },

                descricao: {
                    required: () => "O campo Descrição não pode ser vazio"
                },
                
                



            }
        }
    }
}