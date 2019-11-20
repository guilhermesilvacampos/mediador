export default class Dictionary {

    constructor() {
        return {
            custom: {
                nome:{
                    required: () => "O campo Nome do Tópico não pode ser vazio",
                    max: () => "O campo Nome do Tópico  não pode ter mais que 100 caracteres"
                },

                
                



            }
        }
    }
}