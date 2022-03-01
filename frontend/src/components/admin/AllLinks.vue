<template>
  <div class="user-admin">
    <b-table hover striped :items="links" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadUrl(data.item)" class="mr-2">
          <i class="sa fa-pencil"></i>
        </b-button>
        <b-button
          variant="danger"
          @click="loadUrl(data.item, 'remove')"
          class="mr-2"
        >
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import {  http } from "@/global";
import authHeader from '@/AuthHeader'


export default {
  name: "UserAdmin",
  data() {
    return {
      mode: "save",
      link: {},
      links: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "url", label: "Link Original"},
        { key: "new_url", label: "Novo Link"},
        { key: "hits", label: "acessos", sortable: true }
      ],
    };
  },
  methods: {
    loadUrls() {
      http.get("/urls", { headers: authHeader() }).then((res) => {
        this.links = res.data;
      });
    },

  },
  created() {
    this.loadUrls();
  },
};
</script>

<style>
</style>