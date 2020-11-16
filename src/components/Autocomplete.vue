<template>
  <v-card
    class="mx-auto"
    max-width="250"
    max-height="500"
    tile
  >
    <input
      class="rounded-md"
      placeholder="Busque por um titulo"
      autocomplete="off"
      autofocus
      :autosave="false"
      :size="25"
      @input="changeTitle"
    />
    <v-progress-circular
      v-if="requesting"
      class="my-5"
      indeterminate
      color="primary"
    />
    <v-card
      v-else
      class="mx-auto autocomplete"
      max-width="250"
      max-height="500"
      tile
    >
      <v-list-item
        class="list-movies .d-flex py-2"
        v-for="movie in listMovies"
        :key="movie.imdbID"
      >
        <v-list-item-content
          class="movie rounded"
        >
          <v-list-item-title>{{ movie.Title }}</v-list-item-title>
          <v-list-item-subtitle>{{ movie.Year }}</v-list-item-subtitle>
          <v-img
            class="rounded-xl"
            max-height="150"
            max-width="250"
            dark
            :src="resolveImage(movie.Poster)"
          />
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-card>
</template>

<script>
import fallback from '../assets/fallback.png'

export default {
  props: {
    listMovies: {
      type: Array,
      default: () => []
    },
    requesting: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    changeTitle (event) {
      this.$emit('change-title', event.target.value)
    },
    resolveImage(image) {
      return image !== 'N/A' ? image : fallback
    }
  }
}
</script>

<style scoped>
.autocomplete {
  overflow-y: auto;
}

.movie {
  background-color: #EEEEEE; 
}
</style>