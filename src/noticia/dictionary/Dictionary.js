export default class Dictionary {

    constructor() {
        return {
            custom: {
                titulo: {
                    required: () => "O campo Titulo não pode ser vazio",
                    max: () => "O campo Título não pode ter mais que 300 letras."
                },

                descricao: {
                    required: () => "O campo Descrição não pode ser vazio"
                },
                links: {
                    required: () => "O campo Link não pode ser vazio"
                }
            }
        }
    }
}