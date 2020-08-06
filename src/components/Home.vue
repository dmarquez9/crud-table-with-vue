<template>
  <div>
    <div class="table-header">
      <div class="title">
        <h1>Personas</h1>
      </div>
      <div class="buttons">
        <span>Pagina {{pagination.page}} - {{pagination.totalPages}}</span>
        <button @click="handleCreate">
          Crear persona
        </button>
        <button :disabled="pagination.page === 1" @click="prevPage">
          Anterior
        </button>
        <select @change="changePage" v-model="selectedPage">
          <option
            v-for="index in pagination.totalPages"
            :value="index"
            :key="'page-' +index"
          >
            {{index}}
          </option>
        </select>
        <button :disabled="pagination.page === pagination.totalPages" @click="nextPage">
          Siguiente
        </button>
      </div>
    </div>
    <div class="table">
      <div class="row header">
        <div>ID</div>
        <div>Nombre</div>
        <div>Apellido</div>
        <div>Email</div>
        <div></div>
      </div>
      <div class="row" v-for="people in peopleList" :key="'people-' + people.id">
        <div>{{people.id}}</div>
        <div>{{people.first_name}}</div>
        <div>{{people.last_name}}</div>
        <div>{{people.email}}</div>
        <div><button @click="handleEdit(people)">Editar</button>
        <button @click="handleDelete(people.id)">Eliminar</button></div>
      </div>
    </div>
    <add-new-people :active="activeCreate" :page="selectedPage" @closed="closeCreate()" />
    <edit-people :active="activeEdit" :page="selectedPage" :data="selectedData" @closed="closeEdit()"/>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex';
import AddNewPeople from './AddNewPeople'
import EditPeople from './EditPeople'

export default {
  name: 'Home',
  components: {
    AddNewPeople,
    EditPeople
  },
  methods: {
    ...mapActions(['fetchPeople', 'deletePeople']),
    nextPage() {
      this.selectedPage++
      this.fetchPeople({ page: this.selectedPage })
    },
    prevPage() {
      this.selectedPage--
      this.fetchPeople({ page: this.selectedPage })
    },
    changePage() {
      this.fetchPeople({ page: this.selectedPage })
    },
    async handleDelete(id) {
      await this.deletePeople(id)
      this.fetchPeople({ page: this.selectedPage })
    },
    handleCreate() {
      document.body.classList.add('modal-open');
      this.activeCreate = true;
    },
    closeCreate() {
      this.activeCreate = false;
      document.body.classList.remove('modal-open');
    },
    handleEdit(people) {
      document.body.classList.add('modal-open');
      this.selectedData = people
      this.activeEdit = true;
    },
    closeEdit() {
      this.activeEdit = false;
      document.body.classList.remove('modal-open');
    }
  },
  computed: mapGetters(['peopleList', 'pagination']),
  created() {
    this.fetchPeople({ page: this.selectedPage })
  },
  data: () => ({
    selectedPage: 1,
    activeCreate: false,
    activeEdit: false,
    selectedData: {
      id: '',
      first_name: '',
      last_name: '',
      email: ''
    }
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-header {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 2rem;
}

.table-header > div {
  flex: 1
}

.table-header .title {
  display: flex;
  align-items: flex-end;
}

.table-header .buttons {
  text-align: right;
}

.table-header .title h1 {
  margin: 0;
}

.table-header .buttons span {
  margin-right: 12px;
}

.table {
  display: flex;
  flex-direction: column;
}

.table .row {
  display: flex;
  width: 100%;
}

.table .row > div {
  flex: 1;
  padding: 1rem;
}

.table .row:not(.header):nth-of-type(odd) {
  background-color: rgba(0,0,0, .05)
}

.table .row:not(.header):nth-of-type(even) {
  background-color: rgba(0,0,0, .1)
}

.table .header > div {
  background-color: #4299E1;
  color: #fff;
}
</style>
