import axios from "axios";

export default {
    name: "ProductComponent",
    data() {
        return {
            isEditMode: false,
            products: {},
            search: '',
            product: new Form({
                id: '',
                name: '',
                price: ''
            }),
        };
    },
    methods: {
        view(page = 1) {
            axios.get(`http://127.0.0.1:8000/api/products?page=${page}&search=${this.search}`)
                .then((response) => {
                    this.products = response.data;
                })
                .catch(error => {
                    console.warn('Not good man :(');
                })
        },
        create() {
            this.product.clear();
            this.isEditMode = false;
            this.product.reset();
        }
        ,
        store() {
            this.product.post("http://127.0.0.1:8000/api/products").then(() => {
                this.view();
                this.product.name = '';
                this.product.price = '';
            })
            .catch(error => {
                console.warn(error.response.data.message);
            })
        },
        edit(product) {
            this.isEditMode = true;
            this.product.fill(product);
            this.product.clear();
        },
        update(product) {
            this.product.put(`http://127.0.0.1:8000/api/products/${product.id}`)
                .then(() => {
                    this.view();
                    this.isEditMode = false;
                    this.product.reset();
                }).catch(error => {
                    console.warn(error.response.data.message);
                })
        },
        destroy(id) {
            if (!confirm('Are you sure to delete?')) {
                return;
            }
            axios.delete(`http://127.0.0.1:8000/api/products/${id}`)
                .then(() => this.view())
        }
    },
    created() {
        this.view();
    },
};