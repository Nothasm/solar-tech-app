<template>
  <v-card class="mt-0">
    <v-card-title>
      Clientes
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            @click="
              () => {
                clientForm = true;
                selectedId = null;
              }
            "
            rounded
            class="ml-5"
            color="success"
            v-on="on"
          >
            <v-icon>
              mdi-plus
            </v-icon>
          </v-btn>
        </template>
        <span>Clique para adicionar um novo cliente</span>
      </v-tooltip>

      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Pesquisar"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="clients" :search="search">
      <template slot="item" slot-scope="props">
        <tr>
          <td class="text-left">{{ props.item.name }}</td>
          <td class="text-left">{{ props.item.cpf }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              @click="
                () => {
                  clientForm = true;
                  selectedId = props.item._id;
                }
              "
              class="mr-2"
              >mdi-pencil</v-icon
            >
            <v-icon
              small
              @click="
                () => {
                  clientInfo = true;
                  getClient(props.item._id);
                }
              "
              class="mr-2"
              >mdi-magnify</v-icon
            >
            <v-icon
              small
              @click="
                () => {
                  removeClient = true;
                  selectedId = props.item._id;
                }
              "
              >mdi-trash-can</v-icon
            >
          </td>
        </tr>
      </template>
    </v-data-table>
    <RemoveClient v-model="removeClient" :id="selectedId"></RemoveClient>
    <ClientInfo v-model="clientInfo"></ClientInfo>
    <ClientForm v-model="clientForm" :id="selectedId"></ClientForm>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RemoveClient from "./RemoveClient";
import ClientInfo from "./ClientInfo";
import ClientForm from "./ClientForm";

export default {
  data() {
    return {
      search: "",
      headers: [
        {
          text: "Nome",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "CPF",
          align: "left",
          sortable: false,
          value: "cpf"
        },
        {
          align: "center",
          sortable: false
        }
      ],
      clientForm: false,
      removeClient: false,
      clientInfo: false,
      selectedId: ""
    };
  },
  computed: {
    ...mapGetters(["clients"])
  },
  methods: {
    ...mapActions(["fetchClients", "getClient"])
  },
  created() {
    this.fetchClients();
  },
  components: {
    RemoveClient,
    ClientInfo,
    ClientForm
  },
  watch: {
    clientForm: function(val) {
      if (!val) this.selectedId = null;
    },
    removeClient: function(val) {
      if (!val) this.selectedId = null;
    }
  }
};
</script>
