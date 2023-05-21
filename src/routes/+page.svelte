<script>
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import Arrow from '$lib/assets/arrow-right.svg'
  import Card from '../components/Card.svelte';
  import RandomItem from '../components/RandomItem.svelte';
  import Navigation from '../components/Navigation.svelte';
  import { getServerSideProps, getAllAuctions, token, auctionAmount, randomItemHighQuant, getHomeItem, homeItem, } from './getToken.svelte';

  // define searchQuery
  let searchQuery = '',
      auctionCount = 0,
      totalAuctions = 0,
      tokenItem,
      randomItem = {};

  export let card = {}

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

  onMount(async () => {
    await getServerSideProps()
    .then(() => {
      token.subscribe((value) => {
        tokenItem = value;
        getAllAuctions(value);
      });

      auctionAmount.subscribe((value) => {
        auctionCount = value;

        animateValue('hero__number', 0, auctionCount, 2500);
      })

      randomItemHighQuant.subscribe((value) => {
        randomItem = value;

        if(Object.keys(randomItem).length !== 0) {
          getHomeItem(tokenItem, randomItem.item.id);
        }
      })

      homeItem.subscribe((value) => {
        if(Object.keys(value).length !== 0) {
          // format the buyout price gold silver and copper
          let gold = Math.floor(randomItem.buyout / 10000);
          let silver = Math.floor((randomItem.buyout - (gold * 10000)) / 100);
          let copper = randomItem.buyout - (gold * 10000) - (silver * 100);

          let parsedPrice = `${gold.toLocaleString()}g ${silver.toLocaleString()}s ${copper.toLocaleString()}c`;
          card = {
            itemId: value.id,
            icon: value.media,
            name: value.name,
            listings: randomItem.quantity,
            buyout: parsedPrice,
            time_left: randomItem.time_left,
          }
        }
      })
    })

    function animateValue(id, start, end, duration) {
      var range = end - start;
      var current = start;
      var obj = document.getElementById(id);
      var starttime;
      var fn = (ms) => {
          let progress = 0;
          if(starttime === undefined) {
              starttime = ms;
          } else {
              progress = ms - starttime;
              if (progress >= duration) {
                  // the `+ ' ' + progress + 'ms';` is just to show the duration, wouldn't use that in final code
                  current = end.toLocaleString()
              } else {
                  current = start + Math.floor(progress/duration * range);
              }
          }
          obj.innerHTML = current.toLocaleString();
          if (progress < duration) {
              requestAnimationFrame(fn);
          }
      };
      requestAnimationFrame(fn);
    }
  });
</script>
<Navigation />
<section class="home__hero">
  <!-- replace 10k with real data later -->
  <div class="hero__splash">
    <div class="hero__text">
      <h1 class="hero__title">Explore <span class="hero__number" id="hero__number">0</span> Listings on Atiesh</h1>
      <h2 class="hero__subtitle">Auctions listed are for Wrath of the Lich King Classic. Updated every hour, freely discover every listing on the server!</h2>
      <input
      class="hero__search"
      type="search"
      name="search"
      placeholder="Search: Frostweave Cloth, Deathchill Cloak"
      bind:value={searchQuery}
      on:keydown={handleKeyDown}
      >
    </div>
    <!-- hide the card until its not empty -->
    {#if Object.keys(card).length !== 0}
      <Card card={card} />
    {/if}
  </div>
  <section class="hero__stats">
    <ul class="hero__info">
      <li class="hero__items hero__info--item"><span class="hero__data">200k</span> Items</li>
      <li class="hero__cheapest hero__info--item"><span class="hero__data">30<span class="hero__copper">c</span></span> Cheapest</li>
      <li class="hero__expensive hero__info--item"><span class="hero__data">16,000<span class="hero__gold">g</span></span> Most Expensive</li>
      <li class="hero__time hero__info--item"><span class="hero__data">3,264</span> Short Time Left</li>
      <li class="hero__explore hero__info--item"><button class="hero__button">Explore Below</button></li>
    </ul>
  </section>
</section>
<section class="home__categories">
  <h2 class="home__title">Categories <span><img src={Arrow} class="home__arrow" alt="Arrow pointing right"></span></h2>
  <ul class="home__categoryList">
    <li class="home__category"><a href="/">Weapons</a></li>
    <li class="home__category"><a href="/">Armor</a></li>
    <li class="home__category"><a href="/">Gems</a></li>
    <li class="home__category"><a href="/">Trade</a></li>
    <li class="home__category"><a href="/">More</a></li>
  </ul>
</section>
<section class="home__expensive">
  <h2 class="home__title">Most Expensive <span><img src={Arrow} class="home__arrow" alt="Arrow pointing right"></span></h2>
  <ul class="expensive__cards">
    {#each expensiveItems as item}
      <Card card={item}/>
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
<style>
  :root {
    --text-color-primary: #fff;
    --text-color-secondary: #7A3DFA;
    --purple-bck: #6E3ADC;
    --purple-info: #5B31BD;
    --purple-btn: #834BF8;
  }

  .home__hero {
    height: calc(100vh - 100px);
    display: flex;
    flex-direction: column;
  }

  .hero__splash {
    display: flex;
    width: 80%;
    margin: 30px auto 0;
    align-items: center;
  }

  .hero__text {
    width: 75%;
  }

  .hero__title {
    color: var(--text-color-primary);
    font-family: 'Montserrat', sans-serif;
    font-size: 84px;
    font-weight: 600;
    width: 800px;
    line-height: 120%;
  }

  .hero__number {
    font-weight: 700;
    color: var(--text-color-secondary);
  }

  .hero__subtitle {
    color: var(--text-color-primary);
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 500;
    line-height: 178%;
    width: 541px;
    margin: 12px 0 45px;
  }

  .hero__search {
    width: 500px;
    padding: 16px 25px;
    box-sizing: border-box;
    background-color: #2F2F2F;
    border: none;
    border-radius: 999999px;
    color: white;
    font-size: 14px;
    letter-spacing: 0.3px;
    font-family: 'Montserrat', sans-serif;
  }

  .hero__search::placeholder {
    opacity: 1;
    color: rgb(153, 153, 153);
  }

  .hero__stats {
    width: 80%;
    margin: auto auto 90px;
  }

  .hero__info {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
  }

  .hero__info--item {
    color: #B9B9B9;
    font-size: 22px;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    gap: 5px;
    text-align: center;
  }

  .hero__data {
    color: var(--text-color-primary);
    font-size: 40px;
    font-weight: bold;
  }

  .hero__copper { color: #DF6E1C; }

  .hero__gold { color: #FCF42E; }

  .hero__button {
    background-color: transparent;
    border: none;
    color: var(--text-color-primary);
    font-weight: bold;
    font-size: 20px;
    border-bottom: solid 5px var(--text-color-secondary);
    padding-bottom: 10px;
  }

  .home__categories, .home__random, .home__expensive {
    width: 75%;
    margin: 160px auto;
  }

  .home__title {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 40px;
    color: var(--text-color-primary);
    margin: 0 0 60px;
    display: flex;
    align-items: center;
  }

  .home__arrow {
    width: 28px;
    height: 28px;
    margin-left: 20px;
    display: block;
  }

  .home__categoryList {
    display: flex;
    justify-content: center;
    gap: 45px;
  }

  .home__category {
    width: 180px;
    height: 180px;
    border-radius: 8px;
    background-color: var(--purple-bck);
    position: relative;
  }

  .home__category a{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;
    color: var(--text-color-primary);
    font-weight: bold;
    font-size: 26px;
    text-decoration: none;
  }

  .home__randomList {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 35px;
  }

  .expensive__cards {
    display: flex;
    justify-content: center;
    gap: 70px;
  }
  

  @media screen and (min-width: 1600px) {
    .hero__title {
      font-size: 100px;
    }

    .hero__subtitle {
      width: 600px;
      font-size: 17px;
    }

    .hero__search {
      padding: 20px 25px;
      font-size: 15px;
    }

    .hero__splash {
      width: 76%;
    }

    .home__randomList {
      justify-content: center;
      gap: 55px;
    }

    .expensive__cards {
      justify-content: space-evenly;
      gap: 0;
    }
  }
</style>
