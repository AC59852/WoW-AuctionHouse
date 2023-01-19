<script>
  import { onMount } from 'svelte';
  import { auctions, getAuctions, getItem, getServerSideProps, token, item } from '../../getToken.svelte';
  import { page } from '$app/stores';

  // get the slug
  const slug = $page.params;
  let filteredAuctions = [];
  let foundItem = {};

  onMount(async () => {
    getServerSideProps()
    .then(() => {
      token.subscribe((value) => {
        getItem(value, slug);
        getAuctions(value, slug);
      });
    })

    item.subscribe((value) => {
      console.log(value);
      foundItem = value;
    })

    auctions.subscribe((value) => {
      console.log(value);

      filteredAuctions = value;

      filteredAuctions.sort((a, b) => a.buyout - b.buyout);

      filteredAuctions.forEach((auction) => {
        let gold = Math.floor(auction.buyout / 10000);
        let silver = Math.floor((auction.buyout - (gold * 10000)) / 100);
        let copper = auction.buyout - (gold * 10000) - (silver * 100);

        auction.buyoutParsed = `${gold}g ${silver}s ${copper}c`;
      })
    })
  });
</script>
{#if foundItem.name}
  <h1>{foundItem.name}</h1>
  {:else}
  <h1>Loading...</h1>
{/if}
{#if foundItem.media}
    <img src={foundItem.media} alt="Icon for {foundItem.name}" />
{/if}
<ul>
  {#each filteredAuctions as auction}
    <li>
      {auction.buyoutParsed}
    </li>
  {/each}
</ul>