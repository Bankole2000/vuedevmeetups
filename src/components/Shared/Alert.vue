<template>
  <!-- <v-alert
    dismissible
    close-icon="mdi-delete"
    color="cyan"
    border="left"
    elevation="2"
    colored-border
    icon="mdi-twitter"
    @input="onClose"
    :value="true"
  >
    You've got <strong>5</strong> new updates on your timeline!.
  </v-alert> -->
  <v-alert
    dismissible
    prominent
    color="cyan"
    border="left"
    elevation="2"
    colored-border
    icon="mdi-twitter"
    @input="onClose"
    :value="true"
    transition="slide-y-transition"
  >
    {{ text }}
  </v-alert>
</template>

<script>
export default {
  props: ["text"],
  methods: {
    onClose() {
      this.$emit("dismissed");
    }
  }
};
</script>

<style></style>
