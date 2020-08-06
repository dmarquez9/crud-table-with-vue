<template>
  <div class="modal" v-if="active">
    <div class="modal-body">
      <form @submit.prevent="handleSubmit">
        <h3>Editar persona</h3>
        <input type="text" v-model="form.first_name" placeholder="Nombre" />
        <input type="text" v-model="form.last_name" placeholder="Apellido" />
        <input type="email" v-model="form.email" placeholder="Email" />
        <button type="button" @click="onClose">Cerrar</button>
        <button type="submit" :disabled="disableBtn()">Editar</button>
      </form>
    </div>
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex';

export default {
  name: 'EditPeople',
  methods: {
    ...mapActions(['editPeople', 'fetchPeople']),
    async handleSubmit() {
      await this.editPeople({ form: this.form, id: this.id })
      this.fetchPeople({ page: this.page })
    },
    onClose() {
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
  props: ['active', 'page', 'data'],
  data: () => ({
    form: {
      first_name: '',
      last_name: '',
      email: ''
    },
    id: ''
  }),
  watch: {
    data: function(newVal) { 
      this.form = {
        first_name: newVal.first_name,
        last_name: newVal.last_name,
        email: newVal.email
      }
      this.id = newVal.id
    }
  }
}
</script>