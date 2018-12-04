<template>
<div class="container"> 
  <v-toolbar flat color="white">
      <v-toolbar-title>Balance de Comprobacion</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn @click="getBalance()">Get</v-btn>
      
    </v-toolbar>
  <v-data-table :headers="headers" :items="cuentas" class="elevation-1" v-if="cuentas">
    <template slot="items" slot-scope="props">
      <td><h4>{{ props.item.cuenta }}</h4></td>
      <td ><h4>{{ props.item.cargos.toFixed(2) }}</h4></td>
      <td ><h4>{{ props.item.abonos.toFixed(2) }}</h4></td>
    </template>
  </v-data-table>
</div>
</template>

<script>
import RestMethods from "../RestMethods.js";
const rest = new RestMethods();
  export default {
    data () {
      return {
        headers: [
          { text: 'Cuentas', value: 'calories' },
          { text: 'Cargo', value: 'fat' },
          { text: 'Abono', value: 'carbs' }
        ],
        cuentas: null,
        cuenta: null,
        
      }
    },
    methods: {
      getBalance(){
        this.cuentas = rest.getJson('cuenta/balance');
      }
    }
  }
</script>