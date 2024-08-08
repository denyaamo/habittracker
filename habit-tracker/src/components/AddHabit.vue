<template>
  <div class="add-habit">
    <input v-model="newHabit" placeholder="New Habit" />
    <button @click="addHabit">Add Habit</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newHabit: '',
      errorMessage: '',
    };
  },
  methods: {
    addHabit() {
      if (this.newHabit.trim()) {
        this.$emit('add-habit', this.newHabit.trim());
        this.newHabit = '';
        this.errorMessage = '';
      } else {
        this.errorMessage = 'Habit name cannot be empty.';
      }
    },
  },
};
</script>

<style scoped>
.add-habit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.habit-input,
.add-button {
  width: 100%;
  max-width: 500px; /* Wider input and button */
  padding: 0.75rem; /* Increased padding for better usability */
  font-size: 1.1rem; /* Larger text */
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.add-button {
  background-color: #007bff;
  color: white;
  cursor: pointer;
}

.add-button:hover {
  background-color: #0056b3;
}

.error {
  color: #dc3545;
  font-size: 0.9rem;
}
</style>
