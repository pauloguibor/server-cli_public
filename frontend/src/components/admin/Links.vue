<template>
  <div class="user-admin">
    <b-card>
      <b-form>
        <b-row>
          <b-col md="6">
            <b-form-group label="Url Original: " label-for="link-url">
              <b-form-input
                id="link-url"
                type="text"
                v-model="link.url"
                :readonly="mode === 'remove'"
                required
                placeholder="Informe a URL"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Nova Url: " label-for="link-new_url">
              <b-form-input
                id="link-new_url"
                type="text"
                v-model="link.new_url"
                :readonly="mode === 'remove'"
                required
                placeholder="Informe a Nova URL"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-button variant="primary" v-if="mode === 'save'" @click="save">
          Salvar
        </b-button>
        <b-button variant="danger" v-if="mode === 'remove'" @click="remove">
          Excluir
        </b-button>
        
        <b-button class="ml-2" @click="reset">Cancelar</b-button>
      </b-form>
      <hr />
    </b-card>
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
import { showError, http, userKey } from "@/global";
import authHeader from '@/AuthHeader'
export default {
  name: "UserAdmin",
  data() {
    return {
      mode: "save",
      link: {
      },
      links: [],
      fields: [
        { key: "id", label: "Código", sortable: true },
        { key: "url", label: "Link Original", sortable: true },
        { key: "new_url", label: "Novo Link", sortable: true },
        { key: "hits", label: "acessos", sortable: true },
        { key: "actions", label: "Ações", sortable: true },
      ],
    };
  },
  methods: {
    loadUrls() {
      let id = JSON.parse(localStorage._knowledge_user).user.id
      http.get("/urls/list/"+ id, { headers: authHeader() }).then((res) => {
        this.links = res.data;
      });
    },
    reset() {
      this.mode = "save";
      this.link = {};
      this.loadUrls();
    },
    save() {
      let user = JSON.parse(localStorage._knowledge_user).user.id
      const method = this.link.id ? "put" : "post";
      const id = this.link.id ? `/${this.link.id}` : "";
      http[method](`/urls/create${id}`, {
        url: this.link.url,
        new_url: this.link.new_url,
        user_id:user
      }, { headers: authHeader() })
        .then(() => {
          this.reset();
          this.loadUrls()
        })
        .catch(showError);
    },
    remove() {
      const id = this.link.id;
      http
        .delete("/urls/delete/" + id, { headers: authHeader() })
        .then(() => {
          this.reset();
          this.loadUrls()
        })
        .catch(showError);
    },
    loadUrl(url, mode = "save") {
      this.mode = mode;
      this.link = { ...url };
    },
  },
  created() {
    this.loadUrls();
  },
};
</script>

<style>
</style>