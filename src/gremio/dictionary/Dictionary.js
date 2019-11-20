export default class Dictionary {

    constructor() {
        return {
            custom: {
                descricao: {
                    required: () => "O campo Descrição não pode ser vazio",
                },

            }
        }
    }
}