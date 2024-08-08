<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <input v-model="editedHabitName" placeholder="Edit Habit Name" />
      <button @click="save">Save</button>
      <button @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    habit: Object,
    show: Boolean,
  },
  data() {
    return {
      editedHabitName: this.habit.name,
    };
  },
  methods: {
    save() {
      this.$emit('save', { id: this.habit.id, name: this.editedHabitName });
    },
    cancel() {
      this.$emit('cancel');
    },
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 1rem;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
}

input {
  width: calc(100% - 2rem);
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:first-of-type {
  background-color: #007bff;
  color: white;
  margin-right: 0.5rem;
}

button:first-of-type:hover {
  background-color: #0056b3;
}

button:last-of-type {
  background-color: #dc3545;
  color: white;
}

button:last-of-type:hover {
  background-color: #c82333;
}
</style>
