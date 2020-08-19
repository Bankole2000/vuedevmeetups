<template>
  <div class="signup">
    <v-container>
      <v-row v-if="error" cols="12" sm10 class=" mt-6">
        <v-col class="d-flex mx-auto justify-center">
          <app-alert @dismissed="onDismissed" :text="error.message"></app-alert>
        </v-col>
      </v-row>
      <v-row cols="12" sm="10">
        <v-col class="d-flex mx-auto justify-center">
          <v-card
            class="px-6 pb-6 mx-auto"
            max-width="700"
            style="width: 100%;"
          >
            <v-card-title>Sign Up to Dev Meetups</v-card-title>
            <v-form @submit.prevent="onSignin">
              <v-text-field
                autofocus
                v-model="email"
                label="Email"
                required
                outlined
                hint="e.g. youremail@host.com"
                type="email"
                :success="checkEmail"
                loading="orange"
                loader-height="4"
              >
              </v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                required
                outlined
                hint="e.g. My Awesome Meetup"
                type="password"
              >
              </v-text-field>
              <v-btn
                class="primary"
                type="submit"
                :disabled="!formIsValid"
                block
                large
                :loading="loading"
                >Sign In</v-btn
              >
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: null
    };
  },
  methods: {
    onSignin() {
      // vuex
      let email = this.email;
      let password = this.password;
      console.table({ email, password, confirmPassword: this.confirmPassword });
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password
      });
    },
    onDismissed() {
      console.log("Dismissed Alert");
      this.$store.dispatch("clearError");
    }
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword && this.password !== null
        ? "Passwords do not match"
        : "";
    },
    passwordsMatch() {
      return this.password === this.confirmPassword && this.password != null;
    },
    formIsValid() {
      return (
        this.email !== "" ||
        this.password !== "" ||
        this.confirmPassword !== "" ||
        this.password !== this.confirmPassword
      );
    },
    checkEmail() {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.email);
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if (value !== null && value !== undefined) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style></style>
