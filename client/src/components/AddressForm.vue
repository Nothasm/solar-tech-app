<template>
  <v-form ref="form">
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="Rua"
          :rules="[v => !!v || 'Campo obrigatório']"
          v-model="address.street"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          label="Número"
          :rules="[v => !!v || 'Campo obrigatório']"
          v-model="address.number"
          v-mask="'#######'"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4">
        <v-text-field
          label="Bairro"
          :rules="[v => !!v || 'Campo obrigatório']"
          v-model="address.district"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-select
          v-model="address.addressType"
          :items="['Comercial', 'Residencial', 'Rural', 'Casa de Praia']"
          :rules="[v => !!v || 'Campo obrigatório']"
          label="Tipo da Residência"
          required
        ></v-select>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          label="Complemento"
          v-model="address.complement"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6">
        <v-text-field
          v-model="address.city"
          label="Cidade"
          :rules="[v => !!v || 'Campo obrigatório']"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="address.zipCode"
          label="CEP"
          v-mask="'#####-###'"
          :rules="[v => !!v || 'Campo obrigatório']"
        ></v-text-field>
      </v-col>

      <v-col cols="12" sm="6" md="4">
        <v-text-field
          v-model="address.state"
          label="Estado"
          :rules="[v => !!v || 'Campo obrigatório']"
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="6" md="4" class="mt-5">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="success" v-on="on" @click="newAddress">
              <v-icon>mdi-plus</v-icon>
            </v-btn>
          </template>
          <span>Clique para adicionar um endereço</span>
        </v-tooltip>

        <v-btn color="primary" class="ml-5" @click="reset">
          <v-icon color="white">mdi-refresh</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { mask } from "vue-the-mask";

export default {
  data: () => ({
    address: {
      street: "",
      zipCode: "",
      city: "",
      state: "",
      district: "",
      number: "",
      complement: "",
      addressType: ""
    }
  }),
  directives: {
    mask
  },
  props: {
    value: Array,
    id: String
  },
  computed: {
    ...mapGetters(["client"]),
    addresses: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("input", value);
      }
    }
  },
  methods: {
    ...mapActions(["pushAddress"]),
    newAddress() {
      if (!this.$refs.form.validate()) return;
      const address = Object.assign({}, this.address);
      this.pushAddress(address);
      this.$refs.form.reset();
    },
    reset() {
      this.$refs.form.reset();
    }
  }
};
</script>
