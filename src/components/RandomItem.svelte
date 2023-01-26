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