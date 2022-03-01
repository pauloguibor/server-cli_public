<template>
  <div class="home">
    <PageTitle icon="fa fa-home" main="Dashboard" sub="Links" />
    <router-link to="/links" style="text-decoration: none; color: inherit">
      <div class="stats">
        <Stat
          title="Links Cadastrados"
          :value="size"
          icon="fa fa-folder"
          color="#d54d50"
        />
      </div>
    </router-link>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import Stat from "./Stat";
import { http } from "@/global";
import authHeader from "@/AuthHeader";

export default {
  name: "Home",
  components: { PageTitle, Stat },
  data() {
    return {
      stat: {},
      size: 0,
    };
  },
  methods: {
    getUrl() {
      let id = JSON.parse(localStorage._knowledge_user).user.id;
      http.get("/urls/list/" + id, { headers: authHeader() }).then((res) => {
        this.size = res.data.length;
      });
    },
  },
  mounted() {
    this.getUrl();
  },
};
</script>

<style>
.stats {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>