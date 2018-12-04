<template>
  <div id="app">
    <v-toolbar fixed dark color="#283593">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <v-toolbar-title>Sistema Contable</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="diario = !diario">Libro Diario</v-btn>
        <v-btn flat @click="catalogo = !catalogo">Catalogo Contable</v-btn>
        <v-btn flat @click="balance = !balance">Balance de Comprobacion</v-btn>
        <v-btn flat @click="estados = !estados">Estados Financieros</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-app>
    <rest-table v-show="diario"></rest-table>
    <table-crud v-show="catalogo"></table-crud>
    <balance-comprobacion v-show="balance"></balance-comprobacion>
    <estados-financieros v-show="estados"></estados-financieros>
    </v-app>
  </div>
</template>

<script>
import RestMethods from "./RestMethods.js";
import Table from "./components/Table.vue";
import TableCRUD from "./components/TableCRUD.vue";
import BalanceComprobacion from "./components/BalanceComprobacion.vue";
import EstadosFinancieros from "./components/EstadosFinancieros.vue"
const rest = new RestMethods();
export default {
  components: {
    "rest-table": Table,
    "table-crud": TableCRUD,
    "balance-comprobacion": BalanceComprobacion,
    "estados-financieros": EstadosFinancieros
  },
  data() {
    return {
      catalogo: false,
      diario: false,
      balance: false,
      estados: false,
    };
  },
  computed: {

  },
  methods: {
    
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>