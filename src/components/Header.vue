<script>
export default {
  name: "Header",
}
</script>

<template>
  <header class="border-bottom">
    <!-- Show on small screens -->
    <div class="small-nav">
      <div class="collapse bg-dark" id="navbarHeader">
        <div class="container">
          <div class="row">
            <div class="col-sm-8 col-md-7 py-2">
              <h4 class="text-white">Secciones</h4>
              <ul class="list-unstyled">
                <li><a href="#" class="text-white">Películas</a></li>
                <li><a href="#" class="text-white">Series</a></li>
                <li><a href="#" class="text-white">Personas</a></li>
              </ul>
            </div>
            <div class="col-sm-4 offset-md-1 py-2">
              <h4 class="text-white">Account</h4>
              <ul class="list-unstyled">
                <!-- TODO: If user already signed in show settings and log out -->
                <li><a href="#" class="text-white">Log In</a></li>
                <li><a href="#" class="text-white">Register</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="navbar">
        <div class="container">
          <a href="/" class="navbar-brand d-flex align-items-center">
            <i class="bi bi-film"></i>
            <strong>&nbsp;Movi</strong>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarHeader"
            aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
        </div>
      </div>
    </div>
    <!-- Show on big screens -->
    <div class="big-nav">
      <div class="navbar">
        <div class="container">
          <div class="container d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" class="navbar-brand d-flex align-items-center">
              <i class="bi bi-film"></i>
              <strong>&nbsp;Movi</strong>
            </a>
            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="#" class="nav-link px-2 link-body-emphasis">Películas</a></li>
              <li><a href="#" class="nav-link px-2 link-body-emphasis">Series</a></li>
              <li><a href="#" class="nav-link px-2 link-body-emphasis">Personas</a></li>
              <li><a href="#" class="nav-link px-2 link-body-emphasis">Más</a></li>
            </ul>
            <!-- TODO: Implement searching -->
            <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
              <input type="search" class="form-control" placeholder="Search..." aria-label="Search">
            </form>
            <div class="dropdown text-end">
              <a href="#" class="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown"
                aria-expanded="false">
                <!-- TODO: Change image to match current user -->
                <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" class="rounded-circle">
              </a>
              <ul class="dropdown-menu text-small">
                <li><a class="dropdown-item" href="#">Settings</a></li> <!-- Decoration -->
                <li><a class="dropdown-item" href="#">Profile</a></li> <!-- Decoration -->
                <li>
                  <hr class="dropdown-divider">
                </li>
                <!-- TODO: Implement sign out -->
                <li><a class="dropdown-item" href="#">Sign out</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
  .big-nav {
    display: none;
  }

  @media (min-width: 992px) {
    .big-nav {
      display: block;
    }

    .small-nav {
      display: none;
    }
  }
</style>