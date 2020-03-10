<template>
  <v-user :data="$store.state.AuthUser" />
</template>

<script>
import VUser from "./User.vue";

export default {
  name: "v-auth-user",
  components: {
    VUser
  }
};
</script>
