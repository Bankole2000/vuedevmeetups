import Vue from "vue";
import App from "./App.vue";
import * as firebase from "firebase";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import DateFilter from "./filters/date";
import AlertComp from "./components/Shared/Alert";

Vue.config.productionTip = false;

Vue.filter("date", DateFilter);
Vue.component("app-alert", AlertComp);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyCP1KKInRAISG-4LZpfOxM9NAWGvSZTTD4",
      authDomain: "devmeetup-9cbb6.firebaseapp.com",
      databaseURL: "https://devmeetup-9cbb6.firebaseio.com",
      projectId: "devmeetup-9cbb6",
      storageBucket: "gs://devmeetup-9cbb6.appspot.com",
      messagingSenderId: "277171491311",
      appId: "1:277171491311:web:ed2ed32d530df63499e61a",
      measurementId: "G-YF56LPWQBR"
    });
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch("autoSignIn", user);
      }
    });
    this.$store.dispatch("loadMeetups");
  }
}).$mount("#app");
