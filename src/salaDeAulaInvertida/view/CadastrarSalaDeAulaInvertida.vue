<template>
<div class="cadastrarSalaDeAulaInvertida">
	
	<box :idTurma="idTurma"/>
	
<side-bar/>

</div>
	
</template>
<script>
import SideBar from "@/shared/sideBar/SideBar.vue";
import BoxCadastrarSalaDeAulaInvertida from "@/salaDeAulaInvertida/components/box/BoxCadastrarSalaDeAulaInvertida.vue";

export default {
	components:{
		'side-bar' : SideBar,
		'box' : BoxCadastrarSalaDeAulaInvertida,
    },
    data: () => ({
        idTurma: '',
    }),
    created() {
    this.idTurma = this.$route.query.idTurma;
  }
}
</script>
<style scoped>

</style>