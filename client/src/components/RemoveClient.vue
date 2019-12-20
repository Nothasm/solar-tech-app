<template>
  <v-row justify="center">
    <v-dialog v-model="show" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Tem certeza que quer apagar este item?</v-card-title>
        <v-card-text>Essa ação não pode ser desfeita.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="show = false">Cancelar</v-btn>
          <v-btn color="red darken-1" text @click="deleteItem">Apagar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  import  { mapActions } from 'vuex'
  export default {
    methods: {
        ...mapActions(["deleteClient"]),
        deleteItem() {
            this.deleteClient(this.id)
            this.show = false
        }
    },
    props: {
        value: Boolean,
        id: String
    },
    computed: {
        show: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit("input", value);
            }
        }
    }
  }
</script>