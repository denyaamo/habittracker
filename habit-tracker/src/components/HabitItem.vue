<template>
  <div>
    <input
      type="checkbox"
      :checked="completed"
      @change="toggleCompletion"
      :disabled="isFutureDay"
    />
    {{ habit.name }}
  </div>
</template>

<script>
export default {
  props: {
    habit: Object,
    completed: Boolean,
    isFutureDay: Boolean,
  },
  methods: {
    toggleCompletion() {
      this.$emit('toggle', this.habit.id);
    },
  },
};
</script>

<style scoped>
.habit-item {
  display: flex;
  align-items: center;
  margin: 0.5rem 0;
}

input {
  margin-right: 0.5rem;
}
</style>
