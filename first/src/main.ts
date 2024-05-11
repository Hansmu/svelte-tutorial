import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app')!,
  // You can set props in the insertion point, if you want
  props: {
    name: 'world',
    age: 105
  }
})

export default app
