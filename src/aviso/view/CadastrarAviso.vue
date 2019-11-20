<template>
<div class="cadastrarAviso">
	
	<box />
	
<side-bar/>

</div>
	
</template>
<script>
import SideBar from "@/shared/sideBar/SideBar.vue";
import BoxCadastrarAviso from "@/aviso/components/box/BoxCadastrarAviso.vue";

export default {
	components:{
		'side-bar' : SideBar,
		'box' : BoxCadastrarAviso,
	},
}
</script>
<style scoped>

</style>