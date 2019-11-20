<template>
<div class="cadastrarProfessores">
	
	<box />
	
<side-bar/>

</div>
	
</template>
<script>
import SideBar from "@/shared/sideBar/SideBar.vue";
import BoxCadastrarProfessores from "@/professores/components/box/BoxCadastrarProfessores.vue";

export default {
	components:{
		'side-bar' : SideBar,
		'box' : BoxCadastrarProfessores,
	},
}
</script>
<style scoped>

</style>