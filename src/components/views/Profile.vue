<template>
  <main class="profile">
    <header class="profile__header">
      <div class="header-side">
        <button @click="handleBack" class="back-button">
          <BaseIcon icon="chevron-left" />
        </button>
      </div>

      <h1 class="profile-title">Edit Profile</h1>

      <div class="header-side">
        <!-- empty div to balance layout -->
      </div>
    </header>

    <div class="profile__avatar">
      <img src="https://i.pravatar.cc/100?img=5" alt="avatar" />
      <h2>{{ form.fullName }}</h2>
      <p>{{ form.email }} | {{ form.phone }}</p>
    </div>

    <form @submit.prevent="handleSubmit" class="profile__form">
      <label>
        Full name
        <input v-model="form.fullName" :readonly="!isEditing" required />
      </label>

      <label>
        Email
        <input
          v-model="form.email"
          :readonly="!isEditing"
          required
          type="email"
        />
      </label>

      <label>
        Phone Number
        <input v-model="form.phone" :readonly="!isEditing" required />
      </label>

      <button
        type="button"
        v-if="!isEditing"
        @click="isEditing = true"
        class="edit-btn"
      >
        Edit
      </button>

      <button v-else type="submit" class="save-btn">Save</button>
    </form>

    <p v-if="toast" class="toast">{{ toast }}</p>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import BaseIcon from "@/components/common/BaseIcon.vue";

const router = useRouter();
const isEditing = ref(false);
const toast = ref("");

const saved = JSON.parse(localStorage.getItem("profile") || "{}");

const form = ref({
  fullName: saved.fullName || "Jane Doe",
  email: saved.email || "jane@gmail.com",
  phone: saved.phone || "+01 234 567 89",
});

const original = JSON.stringify(form.value);

function handleSubmit() {
  const current = JSON.stringify(form.value);

  // Validate name (letters and spaces only)
  const nameValid = /^[A-Za-z\s]+$/.test(form.value.fullName);

  // Validate email (already handled by input type="email")

  // Validate phone (digits, spaces, dashes, plus, parentheses allowed)
  const phoneValid = /^[0-9\s\-\+\(\)]+$/.test(form.value.phone);

  if (!nameValid) {
    toast.value = "Name must contain only letters";
    return;
  }

  if (!phoneValid) {
    toast.value = "Invalid phone number";
    return;
  }

  if (current === original) {
    toast.value = "No changes were made";
    isEditing.value = false; //Return to read-only mode
    setTimeout(() => (toast.value = ""), 2000);
    return;
  }

  localStorage.setItem("profile", current);
  toast.value = "Changes are saved";
  isEditing.value = false; //Return to read-only mode
  setTimeout(() => (toast.value = ""), 2000);
}

function handleBack() {
  if (!isEditing.value) {
    router.back();
  }
}
</script>

<style scoped>
.profile {
  padding: 1.5rem;
}

.profile__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.header-side {
  width: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-title {
  flex: 1;
  text-align: center;
  font-size: 1.25rem;
  font-weight: bold;
}

.back-button {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
}

.profile__avatar {
  text-align: center;
  margin: 2rem 0;
}

.profile__avatar img {
  width: 100px;
  border-radius: 50%;
}

.profile__form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border-radius: 12px;
  border: 1px solid #ccc;
}

input:read-only {
  background-color: #f9f9f9;
  cursor: default;
}

.edit-btn,
.save-btn {
  background: #2c3e50;
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  font-weight: bold;
  cursor: pointer;
}

.toast {
  margin-top: 1rem;
  text-align: center;
  color: green;
}
</style>
