import Axios from 'axios'

export default class RestMethods {
    constructor() {
        this.baseUri = 'http://localhost:8080/server/resources/'
        this.json = null
    }

    getJson(resource) {
        if (resource != null) {
            Axios.get(this.baseUri + resource)
            .then(response => {
                this.json = response.data;

                console.log(this.json);
            });
        return this.json;
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

    deleteJson(resource, id){
        if (resource != null && id != null) {
            Axios.delete(this.baseUri + resource, {data: id})
            .then( response => {
                console.log(response);
            })
        }
    }
}
