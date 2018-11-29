<template>
  <div id="app">
    <button @click="getCuentas()">Get</button>

    <form>
      <p>
        Codigo Cuenta:
        <input type="text" name="codigoCuenta">
        <br>Descripcion:
        <input type="text" name="descripcion">
        <br>Padre:
        <select name="cuentaPadre">
          <option v-for="(cuenta, index) in cuentas" :value="cuenta" :key="index" @click="cuentaPadre(cuenta)">{{cuenta.nombre}}</option>
        </select>
        <br>Nombre:
        <input type="text" name="nombre"><br>
        <input type="submit" @click="postCuentas($event)" value="Crear">
      </p>
    </form>
    <div v-for="(cuenta, index) in cuentas" :key="index">{{cuenta.codigoCuenta}} {{cuenta.nombre}} 
    </div>
  </div>
</template>

<script>
import RestMethods from "./RestMethods.js";
const rest = new RestMethods();
export default {
  data() {
    return {
      cuentas: null,
      cuenta: null
    };
  },
  computed: {
    
  },
  methods: {
    getCuentas() {
      this.cuentas = rest.getJson("cuenta");
      console.log(this.cuentas + "hola");
    },
    postCuentas(event) {
      event.preventDefault();
      let formData = new FormData(event.target.parentNode.parentNode);
      let json = {};
      formData.forEach((value, key) => {
        if (value === '[object Object]') {
           json[key] = JSON.parse(this.cuenta);
        }else{
          json[key] = value;
        }
      });
      console.log(json);
      if (json != null) {
        rest.postJson('cuenta', json)
      }
    },
    cuentaPadre(cuentaPadre) {
      this.cuenta = JSON.stringify(cuentaPadre);
    }
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