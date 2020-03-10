<template>
  <div class="user">
    <div
      :class="{
        user__avatar: true,
        'user__avatar--leader': this.leader !== false,
        'user__avatar--leader-gold': this.leader === 'Gold',
        'user__avatar--leader-silver': this.leader === 'Silver',
        'user__avatar--leader-bronze': this.leader === 'Bronze'
      }"
      :style="{ 'background-color': avatarColor }"
    >
      {{ initiales }}
    </div>
    <div class="user__information">
      <div class="user__name">
        {{ userFullName }}
      </div>
      <div class="user__age">Возраст: {{ data.age }}</div>
    </div>

    <div class="user__rating">
      <div class="user__rating-num">{{ data.rating }}</div>
      <div class="user__rating-label">баллов</div>
    </div>
  </div>
</template>

<style scoped>
.user {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-gap: 1rem;
  width: 100%;
}

.user__avatar {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border-radius: 100px;
}

.user__information {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.user__name {
  font-weight: bold;
}

.user__age {
  color: grey;
  margin-top: 0.25rem;
  font-weight: 400;
  font-size: 0.9rem;
}

.user__rating-num {
  text-align: right;
  font-weight: bold;
  font-size: 1.25rem;
}

.user__rating-label {
  color: grey;
  font-weight: 500;
  font-size: 0.85rem;
}

.user__avatar--leader {
  margin: 1rem 0;
}

.user__avatar--leader-gold {
  transform: scale(1.4);
  box-shadow: 0px 0px 0px 2px white, 0px 0px 0 4px gold;
}

.user__avatar--leader-silver {
  transform: scale(1.3);
  box-shadow: 0px 0px 0px 2px white, 0px 0px 0 4px silver;
}

.user__avatar--leader-bronze {
  transform: scale(1.2);
  box-shadow: 0px 0px 0px 2px white, 0px 0px 0 4px #a7730061;
}
</style>

<script>
export default {
  name: "v-user",
  props: {
    leader: {
      required: false,
      default: false
    },
    data: {
      type: Object,
      required: true
    }
  },

  computed: {
    userFullName() {
      // За это, простите, хотфикс, опаздывал на сдачу
      return this.data.name || this.data.secondName
        ? `${this.data.name} ${this.data.secondName}`
        : "";
    },
    initiales() {
      return this.data.name || this.data.secondName
        ? this.data.name[0] + this.data.secondName[0]
        : "";
    },

    avatarColor() {
      let hash = 0;
      const fullname = this.userFullName.trim();

      for (let i = 0; i < fullname.length; i++) {
        hash = fullname.charCodeAt(i) + ((hash << 5) - hash);
      }

      const h = hash % 360;
      return `hsl(${h}, 30%, 80%)`;
    }
  }
};
</script>
