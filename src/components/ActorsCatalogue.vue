<template>
    <div class="actors">
        <header class="actors-header">
            <div class="interior"> 
                <a href="" class="logo"><img src="src/img/logo.png" alt=""></a>
                <nav class="navegacion">
                    <ul>
                        <li><a href="">Inicio</a></li>
                        <li><a href="">Acerca de</a></li>
                        <li class="submenu">
        
                            <a href="">Productos</a>
                            <ul class="hijos">
        
                                <li><a href="">Item 1</a></li>
                                <li><a href="">Item 2</a></li>
                                <li><a href="">Item 3</a></li>
                                <li><a href="">Item 4</a></li>
                                <li><a href="">Item 5</a></li>
        
                            </ul>
        
                        </li>
                    </ul>
             </nav>
            </div>
         </header>
        </div> 
</template>
<script>
</script>
<style>
    .actors{

        margin:0;
        padding: 0;
        box-sizing: border-box;
        text-decoration: none;

    }
    .actors-header{

        width: 100%;
        height: 100px;
        background-color: #0B132B;

    }
    .interior{

        max-width: 100%;
        padding: 0 10px;
        margin: auto;

    }
    .logo{

        float: left;
        padding: 0;

    }
    .logo img{

        height: 95px;

    }
    .logo img:hover{

        transform:scale(1.1);

    }
    .navegacion{

       float: left;
       display: flex;
       align-items: center;
       min-height: 100px;
       z-index: 1000; 
       height: 100px;

    }
    .navegacion ul{

        list-style: none;
        padding: 0 10px;

    }
    .navegacion ul li{

        display: inline-block;
        position: relative;
        transition: .3s linear;
        z-index: 1000;

    }
    .navegacion ul li:hover{

        transform: scale(1.1);

    }
    .navegacion ul li a{

        color: white;
        text-align: center;
        text-transform: uppercase;
        font-size: 14px;
        font-weight: bold;
        padding: 12px 20px;
        transition: 3s linear;
        text-decoration: none;

    }
    .navegacion ul li a:hover{

        color: #00C9BD;
        transform: scale(1.1);

    }
    .navegacion ul li:hover .hijos{

        display: block;

    }
    .navegacion .submenu .hijos{

        display: none;
        background: #0B132B;
        position: absolute;
        width:100%;

    }
    .navegacion .submenu .hijos li{

        display: block;
        overflow: hidden;
        border-bottom: none;


    }
    .navegacion .submenu .hijos li a{

        display: block;

    }
</style>