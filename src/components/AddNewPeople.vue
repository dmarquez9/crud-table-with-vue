<template>
  <div class="modal" v-if="active">
    <div class="modal-body">
      <form @submit.prevent="handleSubmit">
        <h3>Crear persona</h3>
        <input type="text" v-model="form.first_name" placeholder="Nombre" />
        <input type="text" v-model="form.last_name" placeholder="Apellido" />
        <input type="email" v-model="form.email" placeholder="Email" />
        <button type="button" @click="onClose">Cerrar</button>
        <button type="submit" :disabled="disableBtn()">Crear</button>
      </form>
    </div>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex';

export default {
  name: 'AddNewPeople',
  methods: {
    ...mapActions(['addPeople', 'fetchPeople']),
    async handleSubmit() {
      await this.addPeople(this.form)
      this.fetchPeople({ page: this.page })
    },
    onClose() {
      this.form = {
        first_name: '',
        last_name: '',
        email: ''
      }
      this.$emit('closed');
    },
    disableBtn() {
      return (
        this.form.first_name === '' ||
        this.form.last_name === '' ||
        this.form.email === ''
      )
    }
  },
  props: ['active', 'page'],
  data: () => ({
    form: {
      first_name: '',
      last_name: '',
      email: ''
    }
  })
}
</script>