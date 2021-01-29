<template>
  <div id="wrapper" class="container">
    <nav>
      <ul>
        <li><a v-link="'home'">home</a></li>
        <li><a v-link="'users'">users</a><li>
      </ul>
    </nav>
    <div>
      <router-view></router-view>
    </div>
  </div>
</template>
