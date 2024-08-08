<template>
  <div class="home">
    <AddHabit @add-habit="addHabit" />
    <HabitList
      :habits="habits"
      :completed-habits="completedHabits"
      :is-future-day="isFutureDay"
      @toggle-habit="toggleHabit"
      @edit-habit="startEditing"
      @delete-habit="deleteHabit"
    />
    <Datepicker :model-value="currentDate" @update:modelValue="onDateChange" />

    <HabitEditor
      v-if="editingHabit"
      :habit="editingHabit"
      :show="!!editingHabit"
      @save="saveEditedHabit"
      @cancel="stopEditing"
    />
  </div>
</template>

<script>
import AddHabit from '../components/AddHabit.vue';
import HabitList from '../components/HabitList.vue';
import HabitEditor from '../components/HabitEditor.vue';
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Datepicker from 'vue3-datepicker';

export default {
  components: { AddHabit, HabitList, Datepicker, HabitEditor },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const habits = ref([]);
    const completedHabits = ref([]);
    const currentDate = ref(new Date());
    const editingHabit = ref(null);

    const isFutureDay = computed(() => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return currentDate.value > today;
    });

    function addHabit(name) {
      if (name.trim()) {
        const newHabit = { id: Date.now(), name };
        habits.value.push(newHabit);
        saveHabits();
      } else {
        alert('Habit name cannot be empty.');
      }
    }

    function toggleHabit(habitId) {
      const index = completedHabits.value.indexOf(habitId);
      if (index === -1) {
        completedHabits.value.push(habitId);
      } else {
        completedHabits.value.splice(index, 1);
      }
      saveCompletedHabits();
    }

    function startEditing(habitId) {
      const habit = habits.value.find((h) => h.id === habitId);
      if (habit) {
        editingHabit.value = habit;
      }
    }

    function saveEditedHabit(updatedHabit) {
      const index = habits.value.findIndex((h) => h.id === updatedHabit.id);
      if (index !== -1) {
        habits.value[index].name = updatedHabit.name;
        saveHabits();
      }
      stopEditing();
    }

    function stopEditing() {
      editingHabit.value = null;
    }

    function deleteHabit(habitId) {
      habits.value = habits.value.filter((h) => h.id !== habitId);
      completedHabits.value = completedHabits.value.filter(
        (id) => id !== habitId
      );
      saveHabits();
      saveCompletedHabits();
    }

    function formatDateToYYYYMMDD(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }

    function saveHabits() {
      const dateKey = formatDateToYYYYMMDD(currentDate.value);
      localStorage.setItem(`habits-${dateKey}`, JSON.stringify(habits.value));
    }

    function saveCompletedHabits() {
      const dateKey = formatDateToYYYYMMDD(currentDate.value);
      localStorage.setItem(
        `completed-${dateKey}`,
        JSON.stringify(completedHabits.value)
      );
    }

    function loadHabits() {
      const dateKey = formatDateToYYYYMMDD(currentDate.value);
      const storedHabits = localStorage.getItem(`habits-${dateKey}`);
      habits.value = storedHabits ? JSON.parse(storedHabits) : [];

      const storedCompleted = localStorage.getItem(`completed-${dateKey}`);
      completedHabits.value = storedCompleted
        ? JSON.parse(storedCompleted)
        : [];
    }

    function getCurrentDate() {
      return route.params.date || new Date().toISOString().split('T')[0];
    }

    function onDateChange(newDate) {
      const adjustedDate = new Date(newDate);
      adjustedDate.setHours(0, 0, 0, 0);

      const year = adjustedDate.getFullYear();
      const month = String(adjustedDate.getMonth() + 1).padStart(2, '0');
      const day = String(adjustedDate.getDate()).padStart(2, '0');
      const newDateString = `${year}-${month}-${day}`;

      currentDate.value = adjustedDate;
      router.push(`/day/${newDateString}`);
      loadHabits();
    }

    function initializeDate() {
      const dateFromParams = route.params.date;
      if (dateFromParams) {
        const parsedDate = new Date(dateFromParams);
        parsedDate.setHours(0, 0, 0, 0);
        currentDate.value = parsedDate;
      } else {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        currentDate.value = today;
      }
      loadHabits();
    }

    onMounted(() => {
      initializeDate();
    });

    watch(
      () => route.params.date,
      (newDate) => {
        if (newDate) {
          const newDateObj = new Date(newDate);
          newDateObj.setHours(0, 0, 0, 0);
          if (newDateObj.getTime() !== currentDate.value.getTime()) {
            currentDate.value = newDateObj;
            loadHabits();
          }
        }
      }
    );

    return {
      habits,
      completedHabits,
      isFutureDay,
      addHabit,
      toggleHabit,
      onDateChange,
      currentDate,
      startEditing,
      saveEditedHabit,
      stopEditing,
      deleteHabit,
      editingHabit,
    };
  },
};
</script>

<style scoped>
.home {
  padding: 1rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

/* Header section with habit input and date picker aligned */
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.add-habit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.add-habit input,
.add-habit button {
  width: 100%;
  max-width: 500px; /* Wider input and button */
}

.datepicker {
  width: 100%;
  max-width: 500px; /* Same width as input and button */
}

/* Habit List */
ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
  max-width: 500px; /* Align with input and button */
}

li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem 0;
}

/* Make sure buttons align properly */
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

/* Modal */
.modal-content {
  max-width: 500px; /* Match the width of other elements */
  width: 100%;
}
</style>
