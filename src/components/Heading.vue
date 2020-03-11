<style scoped></style>

<script>
export default {
  name: "v-heading",
  functional: true,
  props: {
    level: {
      type: Number,
      default: 1
    }
  },

  render(h, ctx) {
    return h(
      `h${ctx.props.level}`,
      {
        staticClass: "v-heading",
        class: {
          [`v-heading__level-${ctx.props.level}`]: true
        }
      },
      ctx.children
    );
  }
};
</script>
