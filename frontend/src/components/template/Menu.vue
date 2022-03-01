<template>
  <aside class="menu" v-show="isMenuVisible">
    <ul>
      <router-link to="/"><li>Dashboard</li></router-link>
      <router-link to="/links"><li>Links</li></router-link>
    </ul>
  </aside>
</template>

<script>
import { mapState } from "vuex";
import Tree from "liquor-tree";


export default {
  name: "Menu",
  components: { Tree },
  computed: mapState(["isMenuVisible"]),
  data() {
    return {
      treeData: [{ text: "Dashboard" }, { text: "Links" }],
      treeOptions: {
        propertyname: {
          text: "name",
        },
      },
    };
  },
  methods: {},
};
</script>

<style>
.menu {
  grid-area: menu;
  background: linear-gradient(to right, #19191a, #314950);

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.menu a {
  font-size: 2rem;
}
.menu a,
.menu a:hover {
  color: #ffffff;
  text-decoration: none;
}
.menu ul li:hover {
  background-color: rgba(255, 255, 255, 0.2);
}
.menu ul li {
  background-color: rgb(3, 15, 20);
  margin-top:1rem;
  width: 80%;
  list-style-type: none;
  display: flex;
  justify-content: center;
  border-radius: 8px;
}
.menu ul{
  margin-top:2rem;
}



</style>