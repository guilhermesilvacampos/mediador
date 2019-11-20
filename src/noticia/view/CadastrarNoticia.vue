<template>
<div class="cadastrarNoticia">
	
	<box />
	
<side-bar/>

</div>
	
</template>
<script>
import SideBar from "@/shared/sideBar/SideBar.vue";
import BoxCadastrarNoticia from "@/noticia/components/box/BoxCadastrarNoticia.vue";

export default {
	components:{
		'side-bar' : SideBar,
		'box' : BoxCadastrarNoticia,
	},
}
</script>
<style scoped>

</style>