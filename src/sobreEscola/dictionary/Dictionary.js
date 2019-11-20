export default class Dictionary {

    constructor() {
        return {
            custom: {
                nome: {
                    required: () => "O campo Nome não pode ser vazio",
                },
                descricao: {
                    required: () => "O campo Descrição não pode ser vazio",
                },


            }
        }
    }
}