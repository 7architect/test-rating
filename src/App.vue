<template>
  <div id="app">
    <header class="header">
      <div class="header__top">
        <v-heading>Рейтинг участников</v-heading>
        <button class="header__search-btn" @click="showSearch = !showSearch" />
      </div>
      <input
        class="header__search-input"
        type="search"
        placeholder="Тестер тестов"
        v-model="searchStr"
        v-show="showSearch"
      />
    </header>

    <main>
      <div class="users">
        <div class="users__sort">
          <div
            :class="{
              'users__sort-label': true,
              'users__sort-label--active': orderBy === 'rating',
              'users__sort-label--icon-desc':
                orderDir === 'desc' && orderBy === 'rating'
            }"
            @click="toggleOrder('rating')"
          >
            по рейтингу
          </div>
          <div
            :class="{
              'users__sort-label': true,
              'users__sort-label--active': orderBy === 'age',
              'users__sort-label--icon-desc':
                orderDir === 'desc' && orderBy === 'age'
            }"
            @click="toggleOrder('age')"
          >
            по возрасту
          </div>
        </div>

        <div class="users__list">
          <div class="users__list-item" v-for="(user, key) in users" :key="key">
            <div class="users__list-index">{{ ++key }}</div>
            <v-user :data="user" :leader="leader(user)" />
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="users__list-item">
        <div class="users__list-index">{{ authUserPosition }}</div>
        <v-user :data="authUser" />
      </div>
    </footer>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css?family=Oswald:300,400,600,700&display=swap&subset=cyrillic");

:root {
  --layout-w: 700px;
}

#app {
  font-family: "Oswald", sans-serif;
  margin: 0 auto;
  padding-top: 2rem;
  width: var(--layout-w);
}

.header__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__search-btn {
  border: 0;
  width: 30px;
  height: 30px;
  background-image: url("assets/search.svg");
  background-repeat: no-repeat;
  background-color: transparent;
  background-size: contain;
  background-position: center center;
}
.header__search-input {
  width: 100%;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  border-width: 1px;
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  outline: none;
}
.users {
  margin-bottom: 6rem;
}
.users__sort {
  display: flex;
  margin-bottom: 1rem;
}
.users__sort-label {
  margin-right: 2rem;
  opacity: 0.5;
  display: flex;
  align-items: center;
  transition: 0.15s linear;
  transition-property: opacity, transform;
}

.users__sort-label:hover,
.users__sort-label--active {
  transform: scale(1.1);
  cursor: pointer;
  opacity: 1;
}

.users__sort-label::after {
  content: "";
  width: 15px;
  height: 15px;
  margin-left: 5px;
  margin-top: 3px;
  background-image: url("assets/sort.svg");
  background-repeat: no-repeat;
  background-color: transparent;
  background-size: contain;
  background-position: center center;
  display: block;
  opacity: 0.8;
}
.users__sort-label--icon-desc::after {
  transform: rotate(180deg);
}

.users__list-item {
  display: grid;
  grid-template-columns: 50px 1fr;
}
.users__list-index {
  margin-right: 2rem;
  color: grey;
  display: flex;
  align-items: center;
  font-weight: 300;
}
.users__list-item:not(:last-of-type) {
  margin-bottom: 1rem;
}
.footer {
  background-color: #fff;
  position: fixed;
  bottom: 0;
  padding: 1rem 0;
  width: var(--layout-w);
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}
</style>

<script>
import VHeading from "./components/Heading";
import VUser from "./components/User";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    VHeading,
    VUser
  },

  data() {
    return {
      searchStr: "",
      showSearch: false,
      orderBy: "rating",
      orderDir: "asc"
    };
  },

  computed: {
    ...mapGetters(["authUser", "leaders"]),
    users() {
      return this.$store.getters.usersBy({
        field: this.orderBy,
        dir: this.orderDir,
        search: this.searchStr
      });
    },
    authUserPosition() {
      // const buffer = Array.from(this.users)
      return this.users.findIndex(user => {
        return user.id === this.$store.state.AuthUser.id;
      });
    }
  },

  methods: {
    ...mapActions(["loadUsers", "sort"]),
    leader(user) {
      let result = false;

      switch (true) {
        case this.leaders.Gold.id === user.id:
          result = "Gold";
          break;
        case this.leaders.Silver.id === user.id:
          result = "Silver";
          break;
        case this.leaders.Bronze.id === user.id:
          result = "Bronze";
          break;
        default:
          result = false;
      }

      return result;
    },
    toggleOrder(field) {
      if (this.orderBy !== field) {
        this.orderDir = "asc";
      } else this.orderDir = this.orderDir === "asc" ? "desc" : "asc";

      this.orderBy = field;
    }
  },

  async mounted() {
    await this.loadUsers()
      .then()
      .catch(console.log);
  }
};
</script>
