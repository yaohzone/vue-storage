# vue-storage

> localStorage&sessionStorage for Vue 2.0

## How to use

### Install
```js
import Vue from 'vue'
import Storage from 'vue-storage'

Vue.use(Storage, {
  localStorage: {
    name: 'ls' 
  },
  sessionStorage: {
    name: 'session'
  }
})

Storage.VueLocalStorage === Vue.ls // true

Storage.VueSessionStorage === Vue.session // true

```

### Use by Vue property
```js
Vue.session.set('hello','world')
Vue.session.get('hello')
Vue.session.remove('hello')
Vue.session.clear()
```

### Use in vue component
```js
...
created () {
	this.$session.set('hello','world')
	this.$session.get('hello')
	this.$session.remove('hello')
	this.$session.clear()
},
...
```