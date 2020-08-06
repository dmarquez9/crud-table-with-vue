import axios from '../utils/axios'

const state = { 
  people: [],
  pagination: {
    page: 1,
    limit: 10,
    totalPages: 0
  }
};

const getters = { 
  peopleList: state => state.people,
  pagination: state => state.pagination
};

const actions = { 
  async fetchPeople({ commit }, payload){
    const { limit } = state.pagination
    const response = await axios.get(`/people?_page=${payload.page}&_limit=${limit}`);
    commit('setPeople', response.data)

    const totalPages = response.headers['x-total-count']
      ? Math.ceil(response.headers['x-total-count'] / limit)
      : 1

    commit('setPagination', {
      totalPages,
      page: payload.page,
      limit
    })
  },
  async addPeople({ commit }, newPeople){
    const response = await axios.post('/people', newPeople);
    const { people, pagination: { page, totalPages } } = state

    if (page === totalPages && people.length < 10) {
      commit('addNewPeople', response.data)
    }
  },
  async editPeople({ commit }, { id, form }) {
    const response = await axios.put(`/people/${id}`, form);
    commit('editPeople', response.data)
  },
  async deletePeople({ commit }, id) {
    await axios.delete(`/people/${id}`);
    commit('removePeople', id)
  }
};

const mutations = { 
  setPeople: (state, people) => (
    state.people = people
  ),
  addNewPeople: (state, people) => state.people.push(people),
  setPagination: (state, pagination) => (
    state.pagination = pagination
  ),
  editPeople: (state, editPeople) => {
    const peopleIndex = state.people.findIndex(people => people.id === editPeople.id)
    return (
      state.people[peopleIndex] = editPeople
    )
  },
  removePeople: (state, id) => (
    state.people = state.people.filter(people => people.id !== id)
  ),
  setTotalPages: (state, totalPages) => {
    const total = totalPages ? Math.ceil(totalPages / state.pagination.limit) : 1
    return (
      state.pagination.totalPages = total
    )
  }
};

export default {
  state,
  getters,
  actions,
  mutations
}