<script>
  import { onMount } from 'svelte';
  import { auctions, getAuctions, getItem, getServerSideProps, token, item } from '../../getToken.svelte';
  import { page } from '$app/stores';
  import Arrow from '$lib/assets/arrow-right.svg'
  import Navigation from '../../../components/Navigation.svelte';

  // get the slug
  const slug = $page.params;
  let filteredAuctions = [];
  let foundItem = {};
  let loading = true;
  let colour;

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

      if(value.quality) {
        switch(value.quality.type) {
        case "POOR":
          colour = '#9d9d9d';
          break;
        case "COMMON":
          colour = '#ffffff';
          break;
        case "UNCOMMON":
          colour = '#1eff00';
          break;
        case "RARE":
          colour = '#0070dd';
          break;
        case "EPIC":
          colour = '#a335ee';
          break;
        case "LEGENDARY":
          colour = '#ff8000';
          break;
        case "ARTIFACT":
          colour = '#e6cc80';
          break;
        case "HEIRLOOM":
          colour = '#e6cc80';
          break;
        default:
          colour = '#ffffff';
      }
      }
    })

    function calculatePrice(value) {
      let gold = Math.floor(value / 10000);
      let silver = Math.floor((value - (gold * 10000)) / 100);
      let copper = value - (gold * 10000) - (silver * 100);

      return `${gold}g ${silver}s ${copper}c`
    }

    auctions.subscribe((value) => {
      console.log(value);

      loading = false;

      filteredAuctions = value

      filteredAuctions.sort((a, b) => a.buyout - b.buyout);

      filteredAuctions.forEach((auction) => {

        auction.buyoutItem = auction.buyout / auction.quantity;

        auction.bidItem = auction.bid / auction.quantity;
        
        auction.bidParsed = calculatePrice(auction.bid);
        auction.buyoutItemParsed = calculatePrice(auction.buyoutItem);
        auction.buyoutStackParsed = calculatePrice(auction.buyout);

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
<section class="auction">
  <section class="auction__item">
    <div class="auction__basic">
      {#if foundItem.media}
        <img src={foundItem.media} alt="Icon for {foundItem.name}" />
      {/if}
          {#if foundItem.name}
          <div class="auction__info">
            <h1 class="auction__name">{foundItem.name}</h1>
            <div class="auction__data">
              <h2 class="auction__quality" style="color: {colour}">{foundItem.quality.name}</h2><span>/</span>
              <h2 class="auction__class">{foundItem.item_class.name}</h2>
            </div>
          </div>
          {:else}
          <h1>Loading Item</h1>
          {/if}
    </div>
      <div class="auction__link">
        <a href="https://wowhead.com/wotlk/item={foundItem.id}" class="auction__wowhead" rel="noreferrer" target="_blank">View On WowHead</a>
        <img class="auction__arrow" src={Arrow} alt="Arrow indicating to go to link">
      </div>
  </section>
    <table class="auction__table">
      <thead>
        <tr>
          <th>Quantity</th>
          <th>Bid Price</th>
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
          <tr class="auction__row">
            <td>{auction.quantity}</td>
            <td>{auction.bidParsed}</td>
            <td>{auction.buyoutItemParsed}</td>
            <td>{auction.buyoutStackParsed}</td>
            <td>{auction.time_left}</td>
          </tr>
        {/each}
      </tbody>
    </table>
</section>
<style>
  .auction {
    width: 85%;
    margin: 0 auto;
  }

  .auction__item {
    margin: 45px 30px 60px 30px;
  }

  .auction__basic {
    display: flex;
    align-items: center;
    gap: 35px;
  }

  .auction__basic img {
    width: 160px;
    height: 160px;
    border-radius: 8px;
  }

  .auction__info {
    font-family: 'Montserrat', sans-serif;
    color: white;
    width: 400px;
  }

  .auction__link {
    display: flex;
    gap: 10px;
    align-items: center;
    margin-top: 20px;
  }

  .auction__wowhead {
    text-decoration: none;
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-size: 14px;
    font-weight: 600;
  }

  .auction__arrow {
    width: 18px;
    height: 18px;
    filter: brightness(0) invert(1);
  }

  .auction__name {
    font-size: 36px;
    font-weight: 800;
    line-height: 133%;
    margin: 15px 0;
  }

  .auction__data {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 15px;
    font-weight: 600;
  }

  .auction__table {
    border-collapse: collapse;
    width: 100%;
  }

  .auction__table {
    display: flex;
    flex-flow: column;
    width: 100%;
    height: 430px;
    font-family: 'Montserrat', sans-serif;
    margin-top: auto;
  }

  tbody {
    flex: 1 1 auto;
    overflow-y: auto;
    display: block;
    scrollbar-width: thin;
    margin-top: 23px;
  }

  thead th {
    width: 150px;
    font-weight: 600;
    color: #9A9A9A;
    font-size: 16px;
  }

  tr {
    display: flex;
    align-items: center;
    text-align: center;
    width: 100%;
    margin: 0 auto;
    justify-content: space-around;
  }

  .auction__table td {
    vertical-align: middle;
    width: 150px;
    color: #D1D1D1;
    font-size: 16px;
    font-weight: 600;
  }

  .auction__row {
    padding: 18px 0;
  }

  .auction__row:nth-child(odd) {
    background-color: #292929;
  }

  .auction__row:nth-child(even) {
    background-color: #171717;
  }
</style>