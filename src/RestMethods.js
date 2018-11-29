import Axios from 'axios'

export default class RestMethods {
    constructor() {
        this.baseUri = 'http://localhost:8080/server/resources/'
        this.cuentas = null
    }

    getJson(resource) {
        console.log(this.baseUri + resource);
        if (resource != null) {
            Axios.get(this.baseUri + resource)
            .then(response => {
                this.cuentas = response.data;

                console.log(this.cuentas);
            });
        return this.cuentas;
        }
       

    }

    postJson(resource, registro) {
        if (resource != null && registro != null) {
            Axios.post(this.baseUri + resource, registro)
              .then( response => {
                console.log(response);
              })
        }
       

    }
}
