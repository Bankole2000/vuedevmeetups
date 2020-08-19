<template>
  <div class="meetup mt-6 pt-8">
    <v-app-bar
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
    <v-container class="mt-16" style="padding-top: 124px;">
      <v-card class="mx-auto">
        <v-list-item>
          <v-list-item-avatar color="grey"></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline"
              >Our Changing Planet</v-list-item-title
            >
            <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
          height="194"
        ></v-img>

        <v-card-text>
          Visit ten places on our planet that are undergoing the biggest changes
          today.
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
    <v-container>
      <v-card class="mx-auto">
        <v-list-item>
          <v-list-item-avatar color="grey"></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline"
              >Our Changing Planet</v-list-item-title
            >
            <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
          height="194"
        ></v-img>

        <v-card-text>
          Visit ten places on our planet that are undergoing the biggest changes
          today.
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
    <v-container>
      <v-card class="mx-auto">
        <v-list-item>
          <v-list-item-avatar color="grey"></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline"
              >Our Changing Planet</v-list-item-title
            >
            <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
          height="194"
        ></v-img>

        <v-card-text>
          Visit ten places on our planet that are undergoing the biggest changes
          today.
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
    <v-container>
      <v-card class="mx-auto">
        <v-list-item>
          <v-list-item-avatar color="grey"></v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title class="headline"
              >Our Changing Planet</v-list-item-title
            >
            <v-list-item-subtitle>by Kurt Wagner</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/mountain.jpg"
          height="194"
        ></v-img>

        <v-card-text>
          Visit ten places on our planet that are undergoing the biggest changes
          today.
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
  </div>
</template>

<script>
export default {
  props: ["id"],
  computed: {
    meetup() {
      console.log(typeof this.id);
      console.log(this.$store.getters.loadedMeetup(parseInt(this.id, 10)));
      // return this.$store.getters.loadedMeetup(parseInt(this.id, 10));
      return this.$store.getters.loadedMeetup(this.id);
    },
    createBackgroundString() {
      return `linear-gradient(${this.angle}deg, ${this.color1}, ${this.color2})`;
    }
  }
};
</script>

<style></style>
