<script  lang="ts">
import { Form, getError } from "@/plugins/form";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
import TermAndCondition from "./components/register/TermAndCondition.vue";
import AlreadyAccount from "./components/register/AlreadyAccount.vue";

export default {
  middleware: ["guest"],
  components: { TermAndCondition, AlreadyAccount },
  setup() {
    const { saveToken, token, fetchUser } = useAuthStore();
    const router = useRouter();

    const form = new Form({
      first_name: "dqw",
      last_name: "dqw",
      email: "dqw@cew.omc",
      password: "123456",
      password_confirmation: "123456",
    });

    const onSubmit = async () => {
      try {
        const { data } = await form.post("/api/auth/register");
        saveToken(data.results.token.token);
        await fetchUser();
        router.push({
          name: "home",
        });
      } catch (e) {
        console.log(e);
      }
    };

    return {
      form,
      saveToken,
      token,
      fetchUser,
      onSubmit,
    };
  },
};
</script>

<template>
  <div class="registerPage">
    <div class="register-wrap">
      <div class="registerFlex">
        <form @submit.prevent="onSubmit">
          <div class="registerCard">
            <h1 class="mb-8 text-3xl text-center">Sign up</h1>

            <FormKit type="text" label="First Name" v-model="form.first_name" />
            <FormKit type="text" label="Last Name" v-model="form.last_name" />
            <FormKit type="email" label="Email" v-model="form.email" />
            <FormKit type="password" label="Password" v-model="form.password" />
            <FormKit
              type="password"
              label="Confirm Password"
              v-model="form.password_confirmation"
            />

            <button type="submit" class="submitForm">Create Account</button>
            <TermAndCondition />
          </div>
        </form>
      </div>
      <AlreadyAccount />
    </div>
  </div>
</template>

<style type="text/tailwindcss">
.submitForm {
  @apply w-full 
          text-center 
          py-3 
          rounded 
          my-1;
}
.register-wrap {
  @apply min-h-screen 
          flex 
          flex-col;
}
.registerCard {
  @apply bg-white 
          px-6 
          py-8 
          rounded 
          shadow-md 
          text-black 
          w-full;
}
.registerFlex {
  @apply container
          max-w-sm
          mx-auto
          flex-1 flex flex-col
          items-center
          justify-center
          px-2;
}
.goToLogin {
  @apply no-underline border-b;
}
</style>