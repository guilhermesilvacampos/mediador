<template>
<div class="cadastrarTopico">
	
	<box />
	
<side-bar/>

</div>
	
</template>
<script>
import SideBar from "@/shared/sideBar/SideBar.vue";
import BoxCadastrarTopico from "@/biblioteca/topico/components/box/BoxCadastrarTopico.vue";

export default {
	components:{
		'side-bar' : SideBar,
		'box' : BoxCadastrarTopico,
	},	
}
</script>
<style scoped>

</style>