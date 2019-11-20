export default class Dictionary {

    constructor() {
        return {
            custom: {
                nome:{
                    required: () => "O campo Nome da Turma não pode ser vazio",
                    max: () => "O campo Nome da Turma não pode ter mais que 100 caracteres"
                },

                chaveDeAcesso: {
                    required: () => "O campo Chave de Acesso não pode ser vazio"
                },
                
                



            }
        }
    }
}