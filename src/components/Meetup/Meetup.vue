<template>
  <div class="meetup mt-6 pt-8">
    <v-row class="my-16" align="center" v-if="loading" justify="center">
      <v-progress-circular
        :size="200"
        :width="7"
        color="purple"
        indeterminate
      ></v-progress-circular>
    </v-row>
    <v-app-bar
      v-else
      :color="meetup.color"
      dark
      fixed
      shrink-on-scroll
      prominent
      :src="meetup.imageUrl"
      fade-img-on-scroll
      height="220"
      scroll-threshold="500"
      class="mt-14"
      style="z-index: 1;"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          :gradient="`to top right, ${meetup.color}EE, ${meetup.color}00`"
        ></v-img>
      </template>

      <v-toolbar-title class="">{{ meetup.title }}</v-toolbar-title>

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
      <template>
        <div style="position: relative;">
          <v-btn
            fixed
            dark
            fab
            x-large
            bottom
            right
            color="pink"
            style="margin-top: 50px; bottom: -3vh;"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </template>
    </v-app-bar>

    <!-- <v-sheet
      id="scrolling-techniques-5"
      class="overflow-y-auto"
      max-height="600"
    >
      <v-container style="height: 1500px;"></v-container>
    </v-sheet> -->

    <v-container class="mt-16" style="padding-top: 160px;" v-if="!loading">
      <v-card class="mx-auto">
        <v-list-item :style="{ backgroundColor: meetup.color }" dark>
          <v-list-item-avatar
            :style="{ border: `1px solid ${invertColor(meetup.color)}` }"
            :color="invertColor(meetup.color)"
            ><img :src="meetup.creatorImage"
          /></v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title class="headline">{{
              meetup.title
            }}</v-list-item-title>
            <v-list-item-subtitle>{{
              meetup.date | date
            }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-img :src="meetup.imageUrl" height="194"> </v-img>

        <v-card-text style="position: relative">
          <app-edit-meetup-dialogue
            :meetup="meetup"
            :colorname="meetup.color"
          ></app-edit-meetup-dialogue>
          <!-- <v-btn
            v-if="userIsCreator"
            absolute
            dark
            fab
            top
            right
            color="pink"
            style="z-index: 0;"
          >
            <v-icon>mdi-comment-edit-outline</v-icon>
          </v-btn> -->
          {{ meetup.description }}
        </v-card-text>

        <v-card-actions>
          <v-btn text color="deep-purple accent-4">
            Read
          </v-btn>
          <v-btn text color="deep-purple accent-4">
            Bookmark
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn icon>
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon>mdi-share-variant</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-container v-if="!loading">
      <v-card class="mx-auto my-12" max-width="374">
        <v-img
          height="250"
          :src="meetup.imageUrl"
          :gradient="createBackgroundString(meetup.color)"
        ></v-img>

        <v-card-title style="position: relative">
          {{ meetup.title }}
          <app-edit-meetup-dialogue
            :meetup="meetup"
            :colorname="meetup.color"
          ></app-edit-meetup-dialogue
        ></v-card-title>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <v-rating
              :value="4.5"
              color="amber"
              dense
              half-increments
              readonly
              size="14"
            ></v-rating>

            <div class="grey--text ml-4">4.5 (413)</div>
          </v-row>

          <div class="my-4 subtitle-1">
            $ • Italian, Cafe
          </div>

          <div>
            Small plates, salads & sandwiches - an intimate setting with 12
            indoor seats plus patio seating.
          </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <v-card-title>Tonight's availability</v-card-title>

        <v-card-text>
          <v-chip-group
            v-model="selection"
            active-class="deep-purple accent-4 white--text"
            column
          >
            <v-chip>5:30PM</v-chip>

            <v-chip>7:30PM</v-chip>

            <v-chip>8:00PM</v-chip>

            <v-chip>9:00PM</v-chip>
          </v-chip-group>
        </v-card-text>

        <v-card-actions>
          <v-btn color="deep-purple lighten-2" text @click="reserve">
            Reserve
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-card class="mx-auto" max-width="400">
        <v-img
          class="white--text align-end"
          height="200px"
          :src="meetup.imageUrl"
          :gradient="createBackgroundString(meetup.color)"
        >
          <v-card-title>{{ meetup.title }}</v-card-title>
        </v-img>

        <v-card-subtitle class="pb-0">{{ meetup.date | date }}</v-card-subtitle>

        <v-card-text class="text--primary">
          <div>Whitehaven Beach</div>

          <div>Whitsunday Island, Whitsunday Islands</div>
        </v-card-text>

        <v-card-actions>
          <v-btn color="orange" text>
            Share
          </v-btn>

          <v-btn color="orange" text>
            Explore
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selection: 0
      // loading: true
    };
  },

  methods: {
    createBackgroundString(color) {
      // return `linear-gradient( to top, ${color}EE, ${color}00 )`;
      return `to top, ${color}EE, ${color}00`;
    },
    reserve() {
      return false;
    },
    padZero(str, len) {
      len = len || 2;
      var zeros = new Array(len).join("0");
      return (zeros + str).slice(-len);
    },
    invertColor(hex) {
      if (hex.indexOf("#") === 0) {
        hex = hex.slice(1);
      }
      // convert 3-digit hex to 6-digits.
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      if (hex.length !== 6) {
        throw new Error("Invalid HEX color.");
      }
      // invert color components
      var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
      // pad each with zeros and return
      return "#" + this.padZero(r) + this.padZero(g) + this.padZero(b);
    }
  },
  computed: {
    meetup() {
      console.log(typeof this.id);
      // console.log(this.$store.getters.loadedMeetup(parseInt(this.id, 10)));
      // return this.$store.getters.loadedMeetup(parseInt(this.id, 10));
      console.log(this.$store.getters.loadedMeetup(this.id));
      return this.$store.getters.loadedMeetup(this.id);
    },
    userIsAuthenticated() {
      return (
        this.$store.getters.user !== null &&
        this.$store.getters.user !== undefined
      );
    },
    userIsCreator() {
      if (!this.userIsAuthenticated) {
        return false;
      }
      return this.$store.getters.user.id === this.meetup.creatorId;
    },
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style></style>
