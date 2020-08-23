<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-on="on"
          v-bind="attrs"
          absolute
          dark
          fab
          top
          right
          :color="colorname"
          style="z-index: 0;"
        >
          <v-icon class="mdi-36px">mdi-comment-edit-outline</v-icon></v-btn
        >
      </template>
      <v-card>
        <v-card-title :style="{ backgroundColor: colorname }">
          <span class="headline white--text">Edit Meetup</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12" class="mb-0 pb-0">
                <v-text-field
                  autofocus
                  :counter="20"
                  label="Meetup Title"
                  v-model="editMeetupTitle"
                  required
                  outlined
                  hint="e.g. My Awesome Meetup"
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="my-0 py-0">
                <v-radio-group
                  row
                  mandatory
                  class="my-0 py-0"
                  v-model="useImageUrl"
                >
                  <v-radio
                    class="my-2"
                    label="Use Image Url"
                    :value="true"
                  ></v-radio>
                  <v-radio
                    class="my-2"
                    label="Upload Image File"
                    :value="false"
                  ></v-radio>
                </v-radio-group>
              </v-col>

              <v-col cols="12" v-if="useImageUrl">
                <v-text-field
                  label="Image Url"
                  append-icon="mdi-link"
                  class="mt-1"
                  required
                  v-model="editMeetupImageUrl"
                  hint="e.g. https://site.com/path/to/image.jpg"
                  outlined
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="12" v-else>
                <v-file-input
                  label="Upload Image"
                  solo
                  prepend-icon="mdi-camera"
                  accept="image/*"
                ></v-file-input>
              </v-col>
              <v-col cols="12" sm="12">
                <v-textarea
                  name="input-7-1"
                  label="Meetup Description"
                  hint="e.g. An awesome meetup. Free drinks yo!"
                  outlined
                  v-model="editMeetupDescription"
                  class="mt-1"
                  width="100%"
                  append-icon="mdi-pencil"
                ></v-textarea>
              </v-col>
              <!-- <v-col cols="12" sm="12">
                <v-autocomplete
                  :items="[
                    'Skiing',
                    'Ice hockey',
                    'Soccer',
                    'Basketball',
                    'Hockey',
                    'Reading',
                    'Writing',
                    'Coding',
                    'Basejump'
                  ]"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col> -->
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions :style="{ backgroundColor: colorname }">
          <v-spacer></v-spacer>
          <v-btn color="primary" large @click="dialog = false">Close</v-btn>
          <v-btn color="success" :loading="loading" large @click="onSaveChanges"
            >Update</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["colorname", "meetup"],
  methods: {
    onSaveChanges() {
      if (
        this.editMeetupTitle.trim() == "" ||
        this.editMeetupDescription.trim() == "" ||
        this.editMeetupImageUrl.trim() == ""
      ) {
        return false;
      }
      this.$store.dispatch("updateMeetupData", {
        id: this.meetup.id,
        title: this.editMeetupTitle,
        description: this.editMeetupDescription
      });
    }
  },
  data() {
    return {
      dialog: false,
      useImageUrl: true,
      editMeetupTitle: this.meetup.title,
      editMeetupDescription: this.meetup.description,
      editMeetupImageUrl: this.meetup.imageUrl,
      editMeetupColor: this.meetup.color
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    }
  }
};
</script>

<style></style>
