<template>
  <v-card>
    <v-card-title>AdminLogin - 管理员登录</v-card-title>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <form @submit.prevent="handleLogin">
        <validation-provider v-slot="{ errors }" name="Name" rules="required">
          <v-text-field
            v-model="username"
            :error-messages="errors"
            label="Name"
            color="#7d73be"
            required
          ></v-text-field>
        </validation-provider>
        <validation-provider
          v-slot="{ errors }"
          name="Password"
          rules="required|min:6"
        >
          <v-text-field
            v-model="password"
            :counter="10"
            :error-messages="errors"
            label="Password"
            required
          ></v-text-field>
        </validation-provider>
        <v-btn class="mr-4" type="submit" :disabled="invalid"> submit </v-btn>
        <v-btn @click="clear"> clear </v-btn>
      </form>
    </validation-observer>
  </v-card>
</template>

<script>
import { required, max, min } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");

extend("max", {
  ...max,
  message: "{_field_} may not be greater than {length} characters",
});
extend("min", {
  ...min,
  message: "{_field_} may not be fewer than {length} characters",
});
extend("required", {
  ...required,
  message: "{_field_} can not be empty",
});

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "AdminLogin",
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      username: "admin",
      password: "111111",
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$store
        .dispatch("user/adminlogin", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ path: this.redirect || "/admin-dashboard" });
        })
        .catch(() => {
          console.log("admin login fail");
        });
    },
    clear() {
      this.username = "";
      this.password = "";
      this.$refs.observer.reset();
    },
  },
};
</script>
