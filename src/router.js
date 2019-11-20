import Home from '@/home/view/Home.vue';
import CadastrarAviso from '@/aviso/view/CadastrarAviso.vue';
import ListagemAviso from '@/aviso/view/ListagemAviso.vue';
import CadastrarNoticia from '@/noticia/view/CadastrarNoticia.vue';
import ListagemNoticia from '@/noticia/view/ListagemNoticia.vue';

import CadastrarTurma from "@/turma/view/CadastrarTurma.vue";
import ListagemTurma from '@/turma/view/ListagemTurma.vue';
import CadastrarSalaDeAulaInvertida from '@/salaDeAulaInvertida/view/CadastrarSalaDeAulaInvertida.vue';
import ListagemSalaDeAulaInvertida from '@/salaDeAulaInvertida/view/ListagemSalaDeAulaInvertida.vue';
import ListagemAlunosTurma from '@/aluno/view/ListagemAlunosTurma.vue';
import CadastrarEditarBullying from '@/bullying/view/CadastrarEditarBullying.vue';
import CadastrarEditarGremio from '@/gremio/view/CadastrarEditarGremio.vue';
import CadastrarEditarSobreEscola from '@/sobreEscola/view/CadastrarEditarSobreEscola.vue';
import CadastrarEditarCalendario from '@/calendario/view/CadastrarEditarCalendario.vue';


import CadastrarProfessores from '@/professores/view/CadastrarProfessores.vue';

import ListagemProfessores from '@/professores/view/ListagemProfessores.vue';


import CadastrarTopico from '@/biblioteca/topico/view/CadastrarTopico.vue';
import ListagemTopico from '@/biblioteca/topico/view/ListagemTopico.vue';


import CadastrarItem from '@/biblioteca/item/view/CadastrarItem.vue';
import ListagemItem from '@/biblioteca/item/view/ListagemItem.vue';

import LoginUsuario from '@/usuario/view/LoginUsuario.vue';


export const routes = [
  { path: '/home', name: 'home', component: Home },
  { path: '/home/?:idAlert', name: 'home', component: Home },

  { path: '/cadastrarAviso', name: 'cadastrarAviso', component: CadastrarAviso },

  { path: '/listagemAviso', name: 'listagemAviso', component: ListagemAviso },
  { path: '/listagemAviso/?:idAlert', name: 'listagemAviso', component: ListagemAviso },

  { path: '/cadastrarNoticia', name: 'cadastrarNoticia', component: CadastrarNoticia },

  { path: '/listagemNoticia', name: 'listagemNoticia', component: ListagemNoticia },
  { path: '/listagemNoticia/?:idAlert', name: 'listagemNoticia', component: ListagemNoticia },

  { path: '/cadastrarTurma', name: 'cadastrarTurma', component: CadastrarTurma },

  { path: '/listagemTurma', name: 'listagemTurma', component: ListagemTurma },
  { path: '/listagemTurma/?:idAlert', name: 'listagemTurma', component: ListagemTurma },

  { path: '/listagemSalaDeAulaInvertida', name: 'listagemSalaDeAulaInvertida', component: ListagemSalaDeAulaInvertida },
  { path: '/listagemSalaDeAulaInvertida/?:idAlert&idTurma', name: 'listagemSalaDeAulaInvertida', component: ListagemSalaDeAulaInvertida },
  { path: '/listagemSalaDeAulaInvertida/?:idTurma', name: 'listagemSalaDeAulaInvertidaIdTurma', component: ListagemSalaDeAulaInvertida },

  { path: '/cadastrarSalaDeAulaInvertida', name: 'cadastrarSalaDeAulaInvertida', component: CadastrarSalaDeAulaInvertida },
  { path: '/cadastrarSalaDeAulaInvertida/?:idTurma', name: 'cadastrarSalaDeAulaInvertida', component: CadastrarSalaDeAulaInvertida },

  { path: '/listagemAlunosTurma', name: 'listagemAlunosTurma', component: ListagemAlunosTurma },
  { path: '/listagemAlunosTurma/?:idTurma', name: 'listagemAlunosTurma', component: ListagemAlunosTurma },
  { path: '/listagemAlunosTurma/?:idAlert', name: 'listagemAlunosTurma', component: ListagemAlunosTurma },
  { path: '/listagemAlunosTurma/?:idAlert&idTurma', name: 'listagemAlunosTurma', component: ListagemAlunosTurma },

  { path: '/cadastrarEditarBullying', name: 'cadastrarEditarBullying', component: CadastrarEditarBullying },

  { path: '/cadastrarEditarGremio', name: 'cadastrarEditarGremio', component: CadastrarEditarGremio },

  { path: '/cadastrarEditarSobreEscola', name: 'cadastrarEditarSobreEscola', component: CadastrarEditarSobreEscola },

  { path: '/cadastrarEditarCalendario', name: 'cadastrarEditarCalendario', component: CadastrarEditarCalendario },

  { path: '/cadastrarProfessores', name: 'cadastrarProfessores', component: CadastrarProfessores },

  { path: '/listagemProfessores', name: 'listagemProfessores', component: ListagemProfessores },
  { path: '/listagemProfessores/?:idAlert', name: 'listagemProfessores', component: ListagemProfessores },

  { path: '/cadastrarTopico', name: 'cadastrarTopico', component: CadastrarTopico },

  { path: '/listagemTopico', name: 'listagemTopico', component: ListagemTopico },
  { path: '/listagemTopico/?:idAlert', name: 'listagemTopico', component: ListagemTopico },


  { path: '/listagemItem', name: 'listagemItem', component: ListagemItem },
  { path: '/listagemItem/?:idAlert&idTopico', name: 'listagemItem', component: ListagemItem },
  { path: '/listagemItem/?:idTopico', name: 'listagemItemIdTopico', component: ListagemItem },

  { path: '/cadastrarItem', name: 'cadastrarItem', component: CadastrarItem },
  { path: '/cadastrarItem/?:idTopico', name: 'cadastrarItem', component: CadastrarItem },

  { path: '/', name: 'login', component: LoginUsuario },

  { path: '*', name: 'others', component: Home },
];

