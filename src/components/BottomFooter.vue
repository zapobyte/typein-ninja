<template>
    <footer class="footer p-2">
        <nav class="navbar m-o p-0 navbar-expand-lg text-center navbar-light">
          <ul class="navbar-nav m-0 p-0 text-center m-auto">
              <li class="nav-item m-0 p-0">
                  <router-link class="nav-link" to="/">home</router-link>
              </li>
              <li class="nav-item m-0 p-0">
                  <router-link class="nav-link" to="/about">about</router-link>
              </li>
          </ul>
        </nav>
        <small class="small"> <i class="far fa-copyright"></i> typein.ninja</small>
      </footer>
</template>

<script>
export default {
    name:'BottomFooter'
}
</script>