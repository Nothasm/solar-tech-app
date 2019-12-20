<template>
  <div>
    <v-simple-table fixed-header>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Rua</th>
            <th class="text-left">Número</th>
            <th class="text-left">Bairro</th>
            <th class="text-left">Complemento</th>
            <th class="text-left">Tipo</th>
            <th class="text-left">Cidade</th>
            <th class="text-left">CEP</th>
            <th class="text-left">Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="address in client.addresses" :key="address._id">
            <td>{{ address.street }}</td>
            <td>{{ address.number }}</td>
            <td>{{ address.district }}</td>
            <td>{{ address.complement }}</td>
            <td>{{ address.addressType }}</td>
            <td>{{ address.city }}</td>
            <td>{{ address.zipCode }}</td>
            <td>{{ address.state }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data: () => ({
    height: 300
  }),
  computed: {
    ...mapGetters(["client"])
  }
};
</script>
