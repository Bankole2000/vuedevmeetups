<template>
  <div>
    <!-- <v-app-bar
      absolute
      color="#43a047"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      scroll-target="#scrolling-techniques-5"
      height="130"
      scroll-threshold="500"
      extended
    >
     <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab>Tab 1</v-tab>
          <v-tab>Tab 2</v-tab>
          <v-tab>Tab 3</v-tab>
        </v-tabs>
        <div style="position: relative;">
          <v-btn
            fixed
            dark
            fab
            bottom
            right
            color="pink"
            style="margin-top: 50px; bottom: -3vh;"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </template>
    </v-app-bar> -->
    <!-- <v-sheet
      id="scrolling-techniques-5"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1500px;"></v-container>
    </v-sheet>
    class="hidden-sm-and-up"
     -->
    <v-app-bar fixed color="deep-purple" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title
        ><router-link to="/" tag="span" style="cursor: pointer;"
          >DEV<span class="orange--text" style="font-weight: bold;"
            >MEETUP</span
          >
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn
          text
          v-for="item in menuItems"
          :key="item.text"
          router
          :to="item.route"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.text }}
        </v-btn>
        <v-btn text v-if="userIsAuthenticated" @click="onLogout"
          ><v-icon left>mdi-logout-variant</v-icon> Logout</v-btn
        >
      </v-toolbar-items>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      color="#673ab7"
      dark
      height="100vh"
    >
      <v-list-item two-line v-if="userIsAuthenticated">
        <v-list-item-avatar>
          <img :src="userImage" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            ><router-link to="/" tag="span" style="cursor: pointer;"
              >DEV<span class="orange--text" style="font-weight: bold;"
                >MEETUP</span
              ></router-link
            ></v-list-item-title
          >
          <v-list-item-subtitle>{{ userDetails.email }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>
      <v-list nav v-for="item in menuItems" :key="item.text">
        <v-list-item-group active-class="primary">
          <v-list-item router :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <!-- <v-list>
        <v-list-item-group active-class="deep-purple--text text--accent-4">
          <v-list-item>
            <v-list-item-icon>
              
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list> -->

      <template v-if="userIsAuthenticated" v-slot:append>
        <div class="pa-2">
          <v-btn x-large block @click="onLogout"
            ><v-icon left>mdi-logout-variant</v-icon> Logout</v-btn
          >
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import md5 from "md5-hash";

export default {
  data: () => ({
    drawer: false
  }),
  methods: {
    onLogout() {
      this.$store.dispatch("logout");
      this.$router.push("/");
    }
  },
  computed: {
    menuItems() {
      let menuItems = [
        { icon: "mdi-pencil", text: "Sign up", route: "/signup" },
        { icon: "mdi-login", text: "Log in", route: "/signin" }
      ];
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: "mdi-home", text: "Home", route: "/" },
          {
            icon: "mdi-account-supervisor",
            text: "View Meetups",
            route: "/meetups"
          },
          {
            icon: "mdi-chat-sleep",
            text: "Organize Meetup",
            route: "/meetup/new"
          },
          { icon: "mdi-account ", text: "Profile", route: "/profile" }
        ];
      }
      console.log(menuItems);
      return menuItems;
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userDetails() {
      console.log(this.$store.getters.user);
      return this.$store.getters.user ? this.$store.getters.user : null;
    },
    userImage() {
      const gravatar = md5(this.$store.getters.user.email.trim().toLowerCase());
      return `https://www.gravatar.com/avatar/${gravatar}`;
    }
  }
};
</script>
