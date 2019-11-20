export default class Dictionary {

    constructor() {
        return {
            custom: {
                username:{
                    required: () => "O campo Nome de Usuário não pode ser vazio",
                   
                },

                senha: {
                    required: () => "O campo Senha não pode ser vazio"
                },
                
                



            }
        }
    }
}