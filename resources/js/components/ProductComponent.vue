<template>
  <div class="container">
    <div class="row my-4">
      <div class="col-8 offset-4">
        <div class="row">
          <div class="col-8">
            <button class="btn btn-primary" @click="create()">
              <i class="fa-solid fa-circle-plus"></i> Create
            </button>
          </div>
          <div class="col-4">
            <form @submit.prevent="view()">
              <div class="input-group mb-3">
                <input
                  type="text"
                  v-model="search"
                  class="form-control"
                  placeholder="Search"
                  aria-describedby="basic-addon2"
                />
                <span class="input-group-text bg-primary text-white" id="basic-addon2" @click="view()"
                  >
                  <i class="fa-solid fa-magnifying-glass"></i
                >
                  </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-4">
        <div class="card">
          <h4 class="card-header">{{ isEditMode ? "Edit" : "Create" }}</h4>
          <div class="card-body">
            <AlertError :form="product" :message="product.message" />
            <form @submit.prevent="isEditMode ? update(product) : store()" @keydown="product.onKeydown($event)">
              <div class="form-group">
                <label for="name">Name</label>
                <input
                  type="text"
                  v-model="product.name"
                  name="name"
                  id=""
                  class="form-control"
                />
                <small v-if="product.errors.has('name')" v-html="product.errors.get('name')" class="text-danger" />
              </div>
              <div class="form-group">
                <label for="price">Price</label>
                <input
                  type="number"
                  v-model="product.price"
                  name="price"
                  id=""
                  class="form-control"
                />
                <small v-if="product.errors.has('price')" v-html="product.errors.get('price')" class="text-danger" />
              </div>
              <button class="btn btn-primary mt-3" type="submit" :disabled="product.busy">
                <i class="fa-regular fa-floppy-disk"></i> Save
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="col-8">
        <table class="table">
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Price</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products.data" :key="product.id">
              <td>{{ product.id }}</td>
              <td>{{ product.name }}</td>
              <td>{{ product.price }}</td>
              <td>
                <button class="btn btn-success btn-sm" @click="edit(product)">
                  <i class="fa-solid fa-pen-to-square"></i> Edit
                </button>
                <button class="btn btn-danger btn-sm" @click="destroy(product.id)">
                  <i class="fa-solid fa-trash-can"></i> Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <pagination :data="products" @pagination-change-page="view"></pagination>
      </div>
    </div>
  </div>
</template>

<script src="../services/product.js"></script>
