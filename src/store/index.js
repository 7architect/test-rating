import Vue from "vue";
import Vuex from "vuex";
import * as Mutations from "../store.commits";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    Users: {},
    AuthUser: {
      id: 0,
      name: null,
      secondName: null,
      rating: 0,
      age: 0
    }
  },
  mutations: {
    [Mutations.LOAD_USERS]: (store, users) => (store.Users = users),
    [Mutations.SET_AUTH_USER]: (store, user) => (store.AuthUser = user)
  },
  actions: {
    loadUsers({ commit }) {
      return new Promise((resolve, reject) => {
        import("../../users.json")
          .then(UsersData => {
            commit(Mutations.LOAD_USERS, UsersData.users);
            commit(Mutations.SET_AUTH_USER, UsersData.users[1]);

            resolve();
          })
          .catch(reject);
      });
    }
  },

  getters: {
    usersBy: state => (
      selection = { field: "rating", dir: "asc", search: "" }
    ) => {
      let buffer = Array.from(state.Users);

      const field = selection.field ? selection.field : "rating";
      const dir = selection.dir ?? "asc";

      buffer = buffer.sort((a, b) => {
        switch (dir) {
          case "asc":
            if (a[field] > b[field]) return -1;
            break;
          case "desc":
            if (a[field] < b[field]) return -1;
            break;
          default:
            return 0;
        }
      });

      // И сразу производится поиск
      return buffer.filter(user => {
        return (
          user.name.includes(selection.search) ||
          user.secondName.includes(selection.search)
        );
      });
    },

    leaders: state => {
      // Поиск трех лидеров по убыванию рейтинга
      let leaders = Array.from(state.Users)
        .sort((a, b) => (a.rating > b.rating ? -1 : 0))
        .slice(0, 3);

      return {
        Gold: leaders[0],
        Silver: leaders[1],
        Bronze: leaders[2]
      };
    },
    authUser: state => state.AuthUser
  },
  modules: {}
});
