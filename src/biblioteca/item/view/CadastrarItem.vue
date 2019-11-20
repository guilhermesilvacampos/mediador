<template>
<div class="cadastrarItem">
	
	<box :idTopico="idTopico"/>
	
<side-bar/>

</div>
	
</template>
<script>
import SideBar from "@/shared/sideBar/SideBar.vue";
import BoxCadastrarItem from "@/biblioteca/item/components/box/BoxCadastrarItem.vue";

export default {
	components:{
		'side-bar' : SideBar,
		'box' : BoxCadastrarItem,
    },
    data: () => ({
        idTopico: '',
    }),
    created() {
    this.idTopico = this.$route.query.idTopico;
  }
}
</script>
<style scoped>

</style>