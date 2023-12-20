import Vue from 'vue'
import formatter from '../plugins/formatter'

Vue.filter('datetime', (date) => {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
});

Vue.filter('date', (date) => {
    return date.toLocaleDateString();
});

Vue.filter('time', (date) => {
    return date.toLocaleTimeString();
});

Vue.filter("decimal", (value) => {
    return formatter.decimalToString(value);
});

Vue.filter("decimalNoTrim", (value) => {
    return formatter.decimalNoTrim(value);
});

Vue.filter("ceilDecimal", (value) => {
    return formatter.ceilDecimalToString(value);
});