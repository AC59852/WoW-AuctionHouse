<script>
  // import the page store
  import { page } from '$app/stores';
  import {goto} from '$app/navigation';
  import { onMount } from 'svelte';
  import { getSearchResults, getServerSideProps, searchResults, token } from '../getToken.svelte';
  import Navigation from '../../components/Navigation.svelte';

  // get the query
  const query = $page.url.searchParams.get('q')
  let filteredResults = [];
  let totalResults = 0;

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
      totalResults = value.length;
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

  // push to the auction page
  function pushToAuction(id) {
    return () => {
      goto(`/auctions/${id}`);
    }
  }
</script>
<Navigation />
<section class="search">
<h1 class="search__result">Search results for: {query}</h1>
<p class="search__result search__result--small">Total Results: {totalResults}</p>
  <table class="search__table">
    <colgroup>
      <col span="1" style="background-color: blue;">
      <col span="1" style="width: 65%; background-color: red;">
      <col span="4" style="background-color: green;">
    </colgroup>
    <thead hidden>
      <tr>
        <th>Icon</th>
        <th>Name</th>
        <th>Item Level</th>
        <th>Quality</th>
        <th>Class</th>
        <th>Subclass</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredResults as item}
        <tr class="search__row" on:click={pushToAuction(item.data.id)}>
          <td class="search__icon"><img src={item.data.media} alt="Icon for the Item: {item.data.name.en_US}"></td>
          <td class="search__name">{item.data.name.en_US}</td>
          <div class="search__stats">
            <td class="search__level">Item Lvl {item.data.level}</td>
            <td class="search__quality">{item.data.quality.name.en_US}</td>
            <td class="search__class">{item.data.item_class.name.en_US}</td>
            <td class="search__subclass">{item.data.item_subclass.name.en_US}</td>
          </div>
        </tr>
      {/each}
    </tbody>
  </table>
</section>
<!-- {#each filteredResults as item}
<a href="auctions/{item.data.id}">
    <h2>{item.data.name.en_US}</h2>
    image 
    {#if item.data.media}
      <img src={item.data.media} alt="Icon for {item.data.name.en_US}" />
    {/if}
</a>
{/each} -->
<style>
  .search {
    width: 85%;
    margin: 0 auto;
  }

  .search__result {
    font-family: 'Montserrat', sans-serif;
    color: white;
    font-weight: 800;
    font-size: 36px;
    margin: 75px 30px 0 30px;
    hyphens: auto;
  }

  .search__result--small {
    font-weight: 600;
    font-size: 15px;
    color: #7E7E7E;
    margin: 25px 30px 80px 30px;
  }

  .search__table {
    border-collapse: collapse;
    width: 100%;
  }

  .search__table {
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 500px;
    font-family: 'Montserrat', sans-serif;
    margin-top: auto;
  }

  tbody {
    flex: 1 1 auto;
    overflow-y: auto;
    display: block;
    scrollbar-width: thin;
  }

  tr {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .search__table td {
    vertical-align: middle;
  }

  .search__icon {
    padding: 12px;
    line-height: 17px;
    margin-right: 10px;
  }

  .search__icon img {
    width: 65px;
    height: 65px;
    border-radius: 4px;
    color: white;
  }

  .search__name {
    color: white;
    font-weight: bold;
    font-size: 21px;
  }

  .search__stats {
    display: flex;
    gap: 25px;
    height: 93px;
    justify-content: flex-end;
    align-items: center;
    margin-left: auto;
    color: #7E7E7E;
    font-weight: 600;
    font-size: 14px;
  }

  .search__level, .search__quality, .search__class, .search__subclass {
    text-align: center;
  }

  .search__subclass {
    padding-right: 45px;
  }

  .search__row:nth-child(odd) {
    background-color: #292929;
  }

  .search__row:nth-child(even) {
    background-color: #171717;
  }

  @media screen and (min-width: 1600px) {
    .search__result {
      margin: 35px 30px 0 30px;
      font-size: 42px;
    }

    .search__result--small {
      margin: 15px 30px 50px 30px;
      font-size: 16px;
    }

    .search__table {
      height: 600px;
    }
  }
</style>