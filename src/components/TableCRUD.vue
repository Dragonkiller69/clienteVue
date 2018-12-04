<template>
  <div class="container">
      <v-toolbar flat color="white">
        <v-toolbar-title>Catalogo Contable</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-btn @click="getCuentas()">get</v-btn>
        <v-dialog v-model="dialog" max-width="500px">
          <v-btn slot="activator" color="primary" dark class="mb-2" value="post" v-model="putPost" >Agregar Cuenta</v-btn>
          <v-card>
            <v-card-title>
              <span class="headline">Nueva Cuenta</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-form ref="form" lazy-validation id="formulario">
                    <v-text-field
                      name="codigoCuenta"
                      label="Codigo Cuenta"
                      :rules="[codigo => !!codigo || 'Este campo es obligatorio']"
                      required
                      v-model="editedItem.codigoCuenta"
                    ></v-text-field>
                    <v-text-field
                      name="descripcion"
                      label="Descripcion"
                      v-model="editedItem.descripcion"
                    ></v-text-field>
                    <v-combobox
                      name="cuentaPadre"
                      return-object
                      v-model="cuentaPadre"
                      :items="cuentas"
                      item-text="nombre"
                      label="Cuenta Padre"
                    ></v-combobox>
                    <v-text-field
                      name="nombre"
                      label="Nombre"
                      :rules="[nombre => !!nombre || 'Este campo es obligatorio']"
                      required
                      v-model="editedItem.nombre"
                    ></v-text-field>
                  </v-form>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click="postCuentas()">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>

      <v-data-table :headers="headers" :items="cuentas" class="elevation-1 ">
        <template slot="no-data">
          <v-alert :value="true" color="error" icon="warning">Sorry, nothing to display here :(</v-alert>
        </template>
        <template slot="items" slot-scope="props" >
          <td><h4>{{ props.item.codigoCuenta }}</h4></td>
          <td class="text-xs"><h4>{{ props.item.nombre }}</h4></td>
          <td class="text-xs"><h4>{{ props.item.descripcion }}</h4></td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">delete</v-icon>
          </td>
        </template>
      </v-data-table>
  </div>
</template>

<script>
import RestMethods from "../RestMethods.js";
const rest = new RestMethods();

function isJson(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export default {
  data: () => ({
    cuentas: null,
    cuenta: null,
    cuentaParent: null,
    dialog: false,
    headers: [
      { text: "Codigo de Cuenta", value: "codigoCuenta" },
      { text: "Nombre", value: "nombre" },
      { text: "Descripcion", value: "descripcion" }
    ],
    putPost: 'post',
    editedItem: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    cuentaPadre: {
      get: function() {
        return this.cuenta;
      },
      set: function(valor) {
        this.cuenta = valor;
        this.cuentaParent = JSON.stringify(valor);
      }
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.getCuentas();
    this.cuentas = [];
  },
  methods: {
    getCuentas() {
      this.cuentas = rest.getJson("cuenta");
    },
    postCuentas() {
      if (this.$refs.form.validate()) {
        let formData = new FormData(document.getElementById("formulario"));
        let json = {};
        formData.forEach((value, key) => {
          
          if (key === "cuentaPadre" ) {
            console.log(this.cuentaParent)
            json[key] = JSON.parse(this.cuentaParent);
          } else {
            json[key] = value;
          }
        });
        console.log(json);
        this.close();
        if (json != null && this.putPost === 'post') {
            rest.postJson('cuenta', json)
        } else if(json != null && this.putPost === 'put'){
          rest.putJson('cuenta', json)
        }
      }
    },

    editItem(item) {
      this.editedIndex = this.cuentas.indexOf(item);
      console.log(this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.cuenta = this.editedItem.cuentaPadre;
      this.dialog = true;
      this.putPost = 'put';
      console.log(this.putPost)
    },

    deleteItem(item) {
      const index = item.codigoCuenta
      console.log(index)
      confirm("Are you sure you want to delete this item?") &&
        rest.deleteJson('cuenta/', index);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedIndex = -1;
      }, 300);
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped>
  .tablacrud{
    font-size-adjust: inherit;
    font-size: 10px;
  }
</style>
