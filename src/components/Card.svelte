<script>
  export let card = {};
</script>
<div class="card">
  <div class="card__image">
    <div role="img"aria-label="Item Icon for {card.name}" class="card__icon" style="background-image: linear-gradient(0deg, rgba(29, 17, 53, 0.71), rgba(29, 17, 53, 0.71)), url({card.icon});" src="{card.icon}"></div>
    <h2 class="card__name">{card.name}</h2>
  </div>
  <div class="card__info">
    <ul class="card__stats">
      <li class="card__min"><span class="card__gold">{card.buyout}</span> Buyout</li>
    </ul>
    <a href="/auctions/{card.itemId}" class="card__button">View All Listings</a>
  </div>
</div>
<style>
  .card {
    width: 310px;
    background-color: var(--purple-bck);
    border-radius: 8px 8px 0 0;
  }

  .card__image {
    width: 100%;
    padding: 5.5%;
    box-sizing: border-box;
    display: block;
    margin: 0 auto 10px;
    border-radius: 8px;
    position: relative;
  }

  .card__icon {
    width: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    border-radius: 8px;
  }

  .card__icon::after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  .card__name {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 85%;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-size: 36px;
    font-weight: bold;
    color: white;
    line-height: 130%;
  }

  .card__info {
    width: 100%;
    background-color: var(--purple-info);
    padding: 20px 0;
  }

  .card__stats {
    display: flex;
    justify-content: center;
    gap: 16px;
  }

  .card__stats li {
    color: white;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 11px;
    display: flex;
    align-items: flex-end;
    gap: 2px;
  }

  .card__gold, .card__number {
    font-weight: bold;
    font-size: 28px;
  }

  .card__button {
    width: 90%;
    display: block;
    margin: 12px auto 0;
    background-color: var(--purple-btn);
    padding: 15px 0;
    text-align: center;
    color: white;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    font-size: 13px;
    border-radius: 3px;
  }
</style>