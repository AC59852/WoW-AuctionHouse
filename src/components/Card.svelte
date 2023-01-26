<script>
  export let card = {};
</script>
<div class="card">
  <img src="{card.icon}" alt="Item Icon for {card.name}">
  <div class="card__info">
    <ul class="card__stats">
      <li class="card__listings"><span class="card__number">{card.listings}</span> Listings</li>
      <li class="card__min"><span class="card__gold">{card.minGold}g</span> Min</li>
      <li class="card__max"><span class="card__gold">{card.maxGold}g</span> Max</li>
    </ul>
    <a href="/" class="card__button">View All Listings</a>
  </div>
</div>