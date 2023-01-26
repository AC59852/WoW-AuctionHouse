<script>
  import { onMount } from 'svelte';
  import { items, getServerSideItems } from '../getToken.svelte';
  import Navigation from '../../components/Navigation.svelte';

  onMount(async () => {
    getServerSideItems()
    .then(() => {
      items.subscribe((value) => {
        console.log(value);
      })
    })
  })
</script>
<Navigation />