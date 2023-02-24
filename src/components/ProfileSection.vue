<template>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="bg-primary px-2 py-1">
                    <div class="mt-4 rounded-circle text-center">
                    <!-- STUB Profile Picture -->
                    <img src="
                    https://images.unsplash.com/photo-1552337557-45792b252a2e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80
                    " alt="" class="img-fluid rounded-circle" id="profilePicture">
                    <!-- STUB Profile Name -->
                    <p class="fs-3 fw-bold"><u>Hayden Liles</u></p>
                    <p>classroom 2018</p>
                </div>
                <div>
                    <div class="d-flex align-items-center ms-3">
                        <i class="mdi mdi-github fs-1"></i>
                        <p class="ms-2 fs-5">name</p>
                    </div>
                    <div class="d-flex align-items-center ms-3">
                        <i class="mdi mdi-linkedin fs-1"></i>
                        <p class="ms-2 fs-5">name</p>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    setup(){
        
        return {}
    }
}
</script>


<style lang="scss" scoped>

#profilePicture{
    height: 250px;
    width: 250px;
    object-fit: cover;
    object-position: center;
}
p{
    margin: 0;
}

</style>