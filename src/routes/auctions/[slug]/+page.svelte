<script>
  import { onMount } from 'svelte';
  import { auctions, getAuctions, getItem, getServerSideProps, token, item } from '../../getToken.svelte';
  import { page } from '$app/stores';
  import Navigation from '../../../components/Navigation.svelte';

  // get the slug
  const slug = $page.params;
  let filteredAuctions = [];
  let foundItem = {};
  let loading = true;

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

      loading = false;

      filteredAuctions = value

      filteredAuctions.sort((a, b) => a.buyout - b.buyout);

      filteredAuctions.forEach((auction) => {

        let goldStack = Math.floor(auction.buyout / 10000);
        let silverStack = Math.floor((auction.buyout - (goldStack * 10000)) / 100);
        let copperStack = auction.buyout - (goldStack * 10000) - (silverStack * 100);

        let goldItem = Math.floor(auction.buyout / auction.quantity / 10000);
        let silverItem = Math.floor((auction.buyout / auction.quantity - (goldItem * 10000)) / 100);
        // round copper to the nearest whole number, no decimals
        let copperItem = Math.round((auction.buyout / auction.quantity - (goldItem * 10000) - (silverItem * 100)));

        auction.buyoutItem = auction.buyout / auction.quantity;
        auction.buyoutItemParsed = `${goldItem}g ${silverItem}s ${copperItem}c`;

        auction.buyoutStackParsed = `${goldStack}g ${silverStack}s ${copperStack}c`;

        switch (auction.time_left) {
          case 'VERY_LONG':
            auction.time_left = 'Very Long';
            break;
          case 'LONG':
            auction.time_left = 'Long';
            break;
          case 'MEDIUM':
            auction.time_left = 'Medium';
            break;
          case 'SHORT':
            auction.time_left = 'Short';
            break;
          case 'VERY_SHORT':
            auction.time_left = 'Very Short';
            break;
        }
      })
    })
  });
</script>
<Navigation />
<section class="auction__item">
  {#if foundItem.media}
    <img src={foundItem.media} alt="Icon for {foundItem.name}" />
    <a href="https://wowhead.com/wotlk/item-{foundItem.id}">View On WowHead</a>
  {/if}
  <div class="auction__info">
    {#if foundItem.name}
      <h1 class="auction__name">{foundItem.name}</h1>
      <div class="auction__data">
        <h2 class="auction__quality auction__quality--{foundItem.quality.name}">{foundItem.quality.name}</h2><span>/</span>
        <h2 class="auction__class">{foundItem.item_class.name}</h2>
      </div>
    {:else}
      <h1>Loading Item</h1>
    {/if}
  </div>
</section>
<table>
  <thead>
    <tr>
      <th>Quantity</th>
      <th>Buyout (item)</th>
      <th>Buyout (stack)</th>
      <th>Time Left</th>
    </tr>
  </thead>
  <tbody>
    {#if loading}
      <tr>
        <td colspan="4">Loading auctions...</td>
      </tr>
    {/if}
    {#each filteredAuctions as auction}
      <tr>
        <td>{auction.quantity}</td>
        <td>{auction.buyoutItemParsed}</td>
        <td>{auction.buyoutStackParsed}</td>
        <td>{auction.time_left}</td>
      </tr>
    {/each}
  </tbody>
</table>