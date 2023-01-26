<script>
  import { goto } from '$app/navigation';
  import Card from '../components/Card.svelte';
  import RandomItem from '../components/RandomItem.svelte';
  import Navigation from '../components/Navigation.svelte';
  // define searchQuery
  let searchQuery = '';

  export let card = {
    itemId: 45085,
    name: 'Titansteel Spellblade',
    icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_sword_73.jpg',
    listings: 46,
    minGold: 6,
    maxGold: 300,
  }

  export let randomItems = [
    {id: 0, itemId: 45085, name: 'Titansteel Spellblade', price: 14989979, icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_sword_73.jpg'},
    {id: 1, itemId: 45085, name: 'Titansteel Spellblade', price: 14989979, icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_sword_73.jpg'},
    {id: 2, itemId: 45085, name: 'Titansteel Spellblade', price: 14989979, icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_sword_73.jpg'},
    {id: 3, name: 'Titansteel Spellblade', price: 14989979, icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_sword_73.jpg'},
    {id: 4, itemId: 45085, name: 'Titansteel Spellblade', price: 14989979, icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_sword_73.jpg'},
    {id: 5, itemId: 45085, name: 'Titansteel Spellblade', price: 14989979, icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_sword_73.jpg'},
    {id: 6, itemId: 45085, name: 'Titansteel Spellblade', price: 14989979, icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_sword_73.jpg'},
    {id: 7, itemId: 45085, name: 'Titansteel Spellblade', price: 14989979, icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_sword_73.jpg'},
    {id: 8, itemId: 45085, name: 'Titansteel Spellblade', price: 14989979, icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_sword_73.jpg'},
  ]

  export let expensiveItems = [
    {id: 0, itemId: 45085, name: 'Titansteel Spellblade', listings: 3, minGold: 1600, maxGold: 4817, icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_sword_73.jpg'},
    {id: 1, itemId: 45085, name: 'Titansteel Spellblade', listings: 6, minGold: 1600, maxGold: 4817, icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_sword_73.jpg'},
    {id: 2, itemId: 45085, name: 'Titansteel Spellblade', listings: 4, minGold: 1600, maxGold: 4817, icon: 'https://render.worldofwarcraft.com/classic-us/icons/56/inv_sword_73.jpg'},
  ]

  // if the keydown was enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {

      // send the user to the search page with the search query
      goto('/search/?q=' + searchQuery);
    }
  };
</script>
<Navigation />
<section class="home__hero">
  <!-- replace 10k with real data later -->
  <div class="hero__splash">
    <div class="hero__text">
      <h1>Explore 10,487 Listings on Atiesh</h1>
      <h2>Auctions listed are for Wrath of the Lich King Classic. Updated every hour, freely discover every listing on the server!</h2>
      <input
      type="search"
      name="search"
      placeholder="Search"
      bind:value={searchQuery}
      on:keydown={handleKeyDown}
      >
    </div>
    <Card card={card} />
  </div>
  <section>
    <ul class="hero__info">
      <li class="hero__items"><span class="hero__data">200K+</span> Items</li>
      <li class="hero__cheapest"><span class="hero__data">30<span class="hero__copper">c</span></span> Cheapest</li>
      <li class="hero__expensive"><span class="hero__data">16,000<span class="hero__gold">g</span></span> Most Expensive</li>
      <li class="hero__time"><span class="hero__data">3,264</span> Short Time Left</li>
      <li class="hero__explore"><button class="hero__button">Explore Below</button></li>
    </ul>
  </section>
</section>
<section class="home__categories">
  <h2>Categories</h2>
  <ul class="home__categoryList">
    <li class="home__category"><a href="/">Weapons</a></li>
    <li class="home__category"><a href="/">Armor</a></li>
    <li class="home__category"><a href="/">Gems</a></li>
    <li class="home__category"><a href="/">Trade</a></li>
    <li class="home__category"><a href="/">More</a></li>
  </ul>
</section>
<section class="home__random">
  <h2>Random</h2>
  <ul>
    {#each randomItems as item}
      <RandomItem item={item} />
    {/each}
  </ul>
</section>
<section class="home__expensive">
  <h2>Most Expensive</h2>
  <ul>
    {#each expensiveItems as item}
      <Card card={item} />
    {/each}
  </ul>
</section>
<section class="home__cta">
  <h2>Continue Exploring</h2>
  <input
    type="search"
    name="search"
    placeholder="Search"
    bind:value={searchQuery}
    on:keydown={handleKeyDown}
  >
</section>
