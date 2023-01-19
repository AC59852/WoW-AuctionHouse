<script>
  // import the page store
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { getSearchResults, getServerSideProps, searchResults, token } from '../getToken.svelte';

  // get the query
  const query = $page.url.searchParams.get('q')
  let filteredResults = [];

  // get the search results
  onMount(async () => {
    getServerSideProps()
    .then(() => {
      token.subscribe((value) => {
        getSearchResults(value, query);
      });
    })

    searchResults.subscribe((value) => {
      filteredResults = value;

      // remove anything with TEST in the name
      filteredResults = filteredResults.filter((item) => {
        return !item.data.name.en_US.includes('TEST');
      })

      // sort the results by name
      filteredResults.sort((a, b) => {
        if (a.data.name.en_US < b.data.name.en_US) {
          return -1;
        }
        if (a.data.name.en_US > b.data.name.en_US) {
          return 1;
        }
        return 0;
      })
    })
  });
</script>
{#each filteredResults as item}
<a href="auctions/{item.data.id}">
    <h1>{item.data.name.en_US}</h1>
    <!-- image -->
    {#if item.data.media}
      <img src={item.data.media} alt="Icon for {item.data.name.en_US}" />
    {/if}
</a>
{/each}