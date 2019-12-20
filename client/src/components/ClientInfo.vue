<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="show = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-row>
          <v-col cols="4">
            <v-subheader>Informações Básicas</v-subheader>
            <div class="ml-5">
              <p><span class="font-weight-medium">Nome:</span> {{ client.name }}</p>
              <p><span class="font-weight-medium">CPF:</span> {{ client.cpf }}</p>
              <p><span class="font-weight-medium">Email:</span> {{ client.email }}</p>
              <p><span class="font-weight-medium">Telefone:</span> {{ client.phoneNumber }}</p>
            </div>
          </v-col>

          <v-col cols="8">
            <v-subheader>Endereços</v-subheader>
            <ClientAddresses></ClientAddresses>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters } from "vuex";
import ClientAddresses from "./ClientAddresses";

export default {
  data() {
    return {
      notifications: false,
      sound: true,
      widgets: false
    };
  },
  props: {
    value: Boolean,
    id: String
  },
  computed: {
    ...mapGetters(["client"]),
    show: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  components: {
    ClientAddresses
  }
};
</script>
