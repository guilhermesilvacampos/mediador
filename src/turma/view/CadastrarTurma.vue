<template>
<div class="cadastrarTurma">
	
	<box />
	
<side-bar/>

</div>
	
</template>
<script>
import SideBar from "@/shared/sideBar/SideBar.vue";
import BoxCadastrarTurma from "@/turma/components/box/BoxCadastrarTurma.vue";

export default {
	components:{
		'side-bar' : SideBar,
		'box' : BoxCadastrarTurma,
	},	
}
</script>
<style scoped>

</style>