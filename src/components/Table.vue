<template>
  <div>
    
    <div class="container tablita">
      <v-toolbar flat color="white">
      <v-toolbar-title>Libro Diario</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn @click="getTransacciones()">Get</v-btn>
      <v-dialog v-model="dialogo" max-width="500px">
        <v-btn
          slot="activator"
          color="primary"
          @click="getCuentas()"
          dark
          class="mb-2"
        >Nueva Transaccion</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Nueva Transaccion</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-form ref="form" lazy-validation id="formu">
                  <v-text-field
                    name="descripcion"
                    label="Descripcion"
                    :rules="[codigo => !!codigo || 'Este campo es obligatorio']"
                    required
                  ></v-text-field>

                    <v-menu
                      :close-on-content-click="false"
                      :nudge-right="40"
                      v-model="menu"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <v-text-field
                      name="fecha" 
                      label="Fecha "
                        slot="activator"
                        v-model="date"
                        prepend-icon="event"
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="date" @input="menu = false" ></v-date-picker>
                    </v-menu>

                  <v-combobox
                    name="idAbono"
                    return-object
                    v-model="cuentaAbono"
                    :items="cuentas"
                    item-text="nombre"
                    label="Cuenta Abono"
                  ></v-combobox>
                  <v-combobox
                    name="idCargo"
                    return-object
                    v-model="cuentaCargo"
                    :items="cuentas"
                    item-text="nombre"
                    label="Cuenta Cargo"
                  ></v-combobox>
                  <v-text-field
                    name="monto"
                    label="Monto"
                    :rules="[nombre => !!nombre || 'Este campo es obligatorio']"
                    required
                  ></v-text-field>
                </v-form>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
            <v-btn color="blue darken-1" flat @click="postTransaccion()">Guardar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-card ripple="true">
      <table class="table  table-hover">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Cuentas</th>
            <th>Cargo</th>
            <th>Abono</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(transaccion, index) in transacciones">
            <tr :key="index">
              <td>{{transaccion.fecha}}</td>
              <td>{{transaccion.cargo}}</td>
              <td>{{transaccion.monto}}</td>
              <td></td>
            </tr>
            <tr :key="index+485325.59123354885">
              <td>{{transaccion.descripcion}}</td>
              <td>{{transaccion.abono}}</td>
              <td></td>
              <td>{{transaccion.monto}}</td>
            </tr>
            <tr class="success" :key="index+16486464651313468.0235164848">
              <td colspan="4"></td>
            </tr>
          </template>
        </tbody>
      </table>
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
      transacciones: null,
      transaccion: null,
      dialogo: false,
      cuentas: null,
      cuentaC: null,
      cuentaA: null,
      idCargo: null,
      idAbono: null,
     date: new Date().toISOString(),
     menu: false
    };
  },
  created() {
    this.getTransacciones();
    this.getCuentas();
  },
  computed: {
    cuentaCargo: {
      get: function() {
        return this.cuentaC;
      },
      set: function(valor) {
        this.cuentaC = valor;
        this.idCargo = JSON.stringify(valor);
      }
    },
    cuentaAbono: {
      get: function() {
        return this.cuentaA;
      },
      set: function(valor) {
        this.cuentaA = valor;
        this.idAbono = JSON.stringify(valor);
      }
    }
  },
  methods: {
    getTransacciones() {
      this.transacciones = rest.getJson("transaccion/short");
    },
    getCuentas() {
      this.cuentas = rest.getJson("cuenta/ultimas");
    },
    postTransaccion() {
      if (this.$refs.form.validate()) {
        let formData = new FormData(document.getElementById("formu"));
        let json = {};
        formData.forEach((value, key) => {
          if (key === "idAbono") {
            json[key] = JSON.parse(this.idAbono);
          } else if(key === 'idCargo'){
             json[key] = JSON.parse(this.idCargo);
          } else {
            json[key] = value;
          }
        });
        console.log(json);
        this.close();
        if (json != null) {
          rest.postJson('transaccion', json)
        }
        
      }
    },
    close() {
      this.dialogo = false;
      setTimeout(() => {}, 300);
      this.$refs.form.reset();
    }
  },
  watch: {
    dialogo(val) {
      val || this.close();
    }
  }
};
</script>

<style scoped>
.tablita {
  font-size: 120%;
}
</style>
