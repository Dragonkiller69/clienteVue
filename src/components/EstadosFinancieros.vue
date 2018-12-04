<template>
  <div>
    <div class="container">
      <v-toolbar flat color="white">
        <v-toolbar-title>Estado de Resultados</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn @click="getEstadosFinancieros() , calcularTotales()">Get</v-btn>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="estadoResultados"
        class="elevation-1"
        v-if="estadoResultados"
      >
        <template slot="items" slot-scope="props">
          <td class="text-capitalize">
            <h4>{{ props.item.cuenta }}</h4>
          </td>
          <td>
            <h4>{{ props.item.saldo ? props.item.saldo.toFixed(2) : props.item.saldo }}</h4>
          </td>
        </template>
      </v-data-table>
    </div>
    <div class="container">
      <v-toolbar flat color="white">
        <v-toolbar-title>Estado de Variacion de Capital</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table
        :headers="headers"
        :items="estadoVariacion"
        class="elevation-1"
        v-if="estadoVariacion"
      >
        <template slot="items" slot-scope="props">
          <td class="text-capitalize">
            <h4>{{ props.item.cuenta }}</h4>
          </td>
          <td>
            <h4>{{ props.item.saldo.toFixed(2) }}</h4>
          </td>
        </template>
      </v-data-table>
    </div>

    <div class="container text-capitalize">
      <v-toolbar flat color="white">
        <v-toolbar-title>Balance General</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card>
        <div class="container ">
          <div class="container-fluid  balance">
            <h4>Activos</h4>
            <table class="table table-hover" v-if="balanceGeneral">
              <thead>
                <tr>
                  <th>Cuenta</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(activo, index) in balanceGeneral[0].activos">
                  <tr :key="index+485325.59123354885">
                    <td>{{activo.cuenta}}</td>
                    <td>{{activo.saldo.toFixed(2)}}</td>
                  </tr>
                </template>
                <tr>
                    <td>Total</td>
                    <td>{{totalActivos.toFixed(2)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="container-fluid balance">
            <div class="">
              <h4>Pasivos</h4>
              <table class="table table-hover" v-if="balanceGeneral">
                <thead>
                  <tr>
                    <th>Cuenta</th>
                    <th>Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-for="(pasivo, index) in balanceGeneral[1].pasivos">
                    <tr :key="index+485325.59123354885">
                      <td>{{pasivo.cuenta}}</td>
                      <td>{{pasivo.saldo.toFixed(2)}}</td>
                    </tr>
                  </template>
                  <h4>Capital</h4>
                  <tr>
                    <th>Cuenta</th>
                    <th>Saldo</th>
                  </tr>
                  <template v-for="(capital, index) in balanceGeneral[2].patrimonio">
                    <tr :key="index+485325.59123354885">
                      <td>{{capital.cuenta}}</td>
                      <td>{{capital.saldo.toFixed(2)}}</td>
                    </tr>
                  </template>
                   <tr>
                    <td>Total</td>
                    <td>{{totalPasCap.toFixed(2)}}</td>
                </tr>
                </tbody>
              </table>
            </div>
            
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import RestMethods from "../RestMethods.js";
const rest = new RestMethods();
export default {
  data() {
    return {
      headers: [
        { text: "Cuentas", value: "cuenta" },
        { text: "Saldo", value: "saldo" }
      ],
      estadosFinancieros: null,
      estadoResultados: null,
      estadoVariacion: null,
      balanceGeneral: null,
      totalActivos: 0,
      totalPasCap: 0
    };
  },
  created() {
    this.getEstadosFinancieros();
  },
  methods: {
    getEstadosFinancieros() {
      this.estadosFinancieros = rest.getJson("cuenta/estados");
      this.estadoResultados = this.estadosFinancieros[0].EstadoResultados;
      this.estadoVariacion = this.estadosFinancieros[1].EstadoVariacionCapital;
      this.balanceGeneral = this.estadosFinancieros[2].BalanceGeneral;
      
    },
    calcularTotales(){
        this.balanceGeneral[0].activos.forEach(activo => {
            this.totalActivos += activo.saldo;
        })
        console.log(this.totalActivos)

        this.balanceGeneral[1].pasivos.forEach(pasivo => {
            this.totalPasCap += pasivo.saldo;
        })

        this.balanceGeneral[2].patrimonio.forEach(capital => {
            this.totalPasCap += capital.saldo;
        })
        console.log(this.totalPasCap)
    }
  }
};
</script>

<style scoped>
.balance {
  display: inline-table;
  width: 50%;
  font-size: 120%;
}
</style>
