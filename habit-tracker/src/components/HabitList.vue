<template>
  <div>
    <ul>
      <li v-for="habit in habits" :key="habit.id">
        <input
          type="checkbox"
          :id="habit.id"
          :disabled="isFutureDay"
          :checked="isCompleted(habit.id)"
          @change="toggle(habit.id)"
        />
        <label :for="habit.id">
          {{ habit.name }}
          <button @click="editHabit(habit.id)">Edit</button>
          <button @click="deleteHabit(habit.id)">Delete</button>
        </label>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    habits: Array,
    completedHabits: Array,
    isFutureDay: Boolean,
  },
  methods: {
    isCompleted(habitId) {
      return this.completedHabits.includes(habitId);
    },
    toggle(habitId) {
      this.$emit('toggle-habit', habitId);
    },
    editHabit(habitId) {
      this.$emit('edit-habit', habitId);
    },
    deleteHabit(habitId) {
      this.$emit('delete-habit', habitId);
    },
  },
};
</script>

<style scoped>
.habit-list {
  width: 100%;
  max-width: 500px; /* Match width with input and button */
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
}

button {
  margin-left: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.edit {
  background-color: #007bff;
  color: white;
}

button.edit:hover {
  background-color: #0056b3;
}

button.delete {
  background-color: #dc3545;
  color: white;
}

button.delete:hover {
  background-color: #c82333;
}
</style>
