<script>
  export let item = {};

  let gold = Math.floor(item.price / 10000);
  let silver = Math.floor((item.price - (gold * 10000)) / 100);
  let copper = item.price - (gold * 10000) - (silver * 100);

  item.parsedPrice = `${gold}g ${silver}s ${copper}c`;
</script>
<li>
  <a class="random__item" href="/auctions/{item.itemId}">
    <img src="{item.icon}" alt="{item.name}">
    <div class="random__info">
      <h3>{item.name}</h3>
      <span class="random__price">{item.parsedPrice}</span>
    </div>
  </a>
</li>
<style>
  .random__item {
    width: 320px;
    padding: 13px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    gap: 10px;
    background-color: var(--purple-bck);
    border-radius: 8px;
    text-decoration: none;
    height: 100%;
  }

  .random__item img {
    width: 68px;
    height: 68px;
    border-radius: 8px;
  }

  .random__info {
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    color: white;
    font-size: 16px;
    background-color: var(--purple-info);
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 10px;
    box-sizing: border-box;
    gap: 5px;
    border-radius: 8px;
  }

  .random__price {
    font-size: 12px;
    font-weight: 500;
  }

  @media screen and (min-width: 1600px) {
    .random__item {
      width: 340px;
    }
  }
</style>