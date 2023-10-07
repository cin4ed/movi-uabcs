<template>
    <div class="main-container">
        <button class="header-options">Inicio</button>
        <button class="header-options">Populares</button>
        <button class="header-options">Salir</button>
    </div>
</template>

<script>

</script>

<style>
    .main-container{
        background-color: black;
        display: flex;
        padding: 20px;
        gap: 15px;
        justify-content: center;
    }
    .header-options{
        padding: 5px;
        background-color: white;
        color: black;
        width: 120px;
        font-weight: bold;
        font-size: 20px;
    }

    .header-options:hover{
        transition: 0.2;
        transform: scale(1.1);
    }
</style>