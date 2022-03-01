<template>
  <div class="admin-page">
    <PageTitle
      icon="fa fa-cogs"
      main="Administraçao dos links"
      sub="Cadastros"
    />
    <div class="admin-pages-tabs">
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Top Links" active>
            <AllLinks />
          </b-tab>
          <b-tab title="Seus Links">
            <Links />
          </b-tab>
        </b-tabs>
      </b-card>
    </div>
  </div>
</template>

<script>
import PageTitle from "../template/PageTitle.vue";
import AllLinks from './AllLinks.vue';
import Links from "./Links.vue";

export default {
  name: "AdminPage",
  components: {
    PageTitle,
    Links,
    AllLinks
  },
};
</script>

<style>
</style>