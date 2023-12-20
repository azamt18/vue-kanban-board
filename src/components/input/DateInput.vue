<template>
  <v-menu v-model="menu" :close-on-content-click="false" :min-width="minWidth" :max-width="maxWidth">
    <template v-slot:activator="{}">
      <v-text-field
          v-model="input"
          :label="label"
          :error-messages="errorMessages"
          :disabled="disabled"
          :dense="dense"
          :placeholder="placeholder"
          :clearable="clearable"
          :prepend-icon="prependIcon ? 'mdi-calendar' : null"
          :append-icon="appendIcon ? 'mdi-calendar' : null"
          hint="Нажмите на календарь или введите вручную"
          :background-color="backgroundColor"
          @change="onInputChange"
          @click:clear="onClearClicked"

          v-on:click:prepend="menu = true"
          v-on:click:append="menu = true"
      />
    </template>
    <v-date-picker
        v-model="date"
        no-title
        scrollable
        locale="ru"
        first-day-of-week="1"
        @change="onDatePickerChange"
    />
  </v-menu>
</template>

<script>
import Moment from "moment";

export default {
  name: "DateInput",

  props: {
    value: {
      type: Object,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    errorMessages: {
      type: Array,
      default: () => {
        return [];
      },
    },

    disabled: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },

    prependIcon: {
      type: Boolean,
      default: true,
    },
    appendIcon: {
      type: Boolean,
      default: false,
    },

    backgroundColor: {
      type: String,
      default: null
    },

    minWidth: {
      type: String,
      default: null
    },
    maxWidth: {
      type: String,
      default: null
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      displayFormat: "DD.MM.YYYY",
      selectorFormat: "YYYY-MM-DD",

      input: "",
      menu: false,
      date: null,

      previousValue: undefined,
    };
  },

  methods: {
    onClearClicked() {
      this.input = "";
      this.date = null;

      this.emitInput();
    },
    onInputChange() {
      this.input =
          typeof this.input === "string"
              ? (this.input = `${this.input}`.trim())
              : "";
      this.date = null;

      if (this.input) {
        const strMoment = Moment(this.input, this.displayFormat);
        if (strMoment.isValid()) {
          this.date = strMoment.format(this.selectorFormat);
          this.input = strMoment.format(this.displayFormat);
        }
      }

      this.emitInput();
    },
    onDatePickerChange() {
      this.input = Moment(this.date, this.selectorFormat).format(
          this.displayFormat
      );
      this.menu = false;
      this.emitInput();
    },

    emitInput() {
      const strMoment = Moment(this.input, this.displayFormat);
      let value = strMoment.isValid() ? strMoment : null;

      if (value !== this.previousValue) {
        this.previousValue = value;
        this.$emit("input", value);
        this.$emit("change", value);
      }
    },

    valueChanged() {
      if (this.value) {
        this.input = this.value.format(this.displayFormat);
        this.date = this.value.format(this.selectorFormat);
      } else {
        this.input = "";
        this.date = null;
      }
    },
  },

  created() {
    this.valueChanged();
  },
  watch: {
    value() {
      this.valueChanged();
    },
  },
};
</script>
