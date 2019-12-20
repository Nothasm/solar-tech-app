<template>
  <v-row justify="center">
    <v-dialog v-model="show" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">{{ title }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="form">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="client.name"
                    label="Nome"
                    required
                    :rules="[v => !!v || 'Campo obrigatório']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="client.cpf"
                    label="CPF"
                    v-mask="'###.###.###-##'"
                    :rules="[v => !!v || 'Campo obrigatório']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="client.phoneNumber"
                    label="Telefone"
                    v-mask="'(##) ####-#####'"
                    :rules="[v => !!v || 'Campo obrigatório']"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="client.email"
                    label="Email"
                    :rules="[
                      v => !!v || 'E-mail is required',
                      v => /.+@.+\..+/.test(v) || 'Insira um email válido'
                    ]"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
            <v-row>
              <v-subheader>Endereço</v-subheader>
            </v-row>
            <v-row>
              <v-col>
                <v-alert v-if="addressNeeded" type="error">
                  Você deve cadastrar ao menos um endereço.
                </v-alert>
              <AddressForm v-model="client.addresses" ref="addressForm"></AddressForm>
              </v-col>
              <v-col cols="12" v-if="client.addresses.length">
                <v-chip
                  @click:close="popAddress(index)"
                  v-for="(address, index) in client.addresses"
                  :key="index"
                  class="mr-2"
                  close
                  >{{ address.street }}</v-chip
                >
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="show = false">Close</v-btn>
          <v-btn color="blue darken-1" text @click="saveClient">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { mask } from "vue-the-mask";
import AddressForm from "./AddressForm";

export default {
  data: () => ({
    addressNeeded: false
  }),
  directives: {
    mask
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
    },
    title() {
      return this.id ? "Editar Cliente" : "Novo Cliente";
    }
  },
  components: {
    AddressForm
  },
  methods: {
    ...mapActions([
      "getClient",
      "resetClient",
      "removeAddress",
      "newClient",
      "updateClient"
    ]),
    popAddress(index) {
      this.removeAddress(index);
    },
    async saveClient() {
      this.$refs.form.validate();

      if (!this.client.addresses.length) {
        this.addressNeeded = true;
        return;
      }

      this.addressNeeded = false;

      if (!this.id) {
        await this.newClient(this.client);
      } else {
        await this.updateClient(this.client);
      }
      this.show = false;
    }
  },
  watch: {
    show: async function() {
      await this.resetClient();
      await this.$refs.form.reset();
      await this.$refs.addressForm.reset();
      this.addressNeeded = false;
      if (this.id) this.getClient(this.id);
    }
  }
};
</script>
