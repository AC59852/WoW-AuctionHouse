<script>
  import { goto } from '$app/navigation';
  
  let searchQuery = '';

  // if the keydown was enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {

      // send the user to the search page with the search query
      goto('/search/?q=' + searchQuery);

      // if already on the page, reload the page with the new query
      var url = window.location.href;

      // if the url already has a query and it's different from the new query
      if (url.includes('?q=') && url.split('?q=')[1] !== searchQuery) {
        url = url.split('?q=')[0] + '?q=' + searchQuery;
        window.location.href = url;
      } else {
        return
      }
    }
  };
</script>
<header class="header">
  <nav class="header__nav">
    <input
      class="header__search"
      type="search"
      name="search"
      placeholder="Search: Siren's Tear, Staff of Jordan"
      bind:value={searchQuery}
      on:keydown={handleKeyDown}
    >
    <ul class="header__list">
      <li class="header__item"><a href="/" class="header__link">Home</a></li>
      <li class="header__item"><a href="/categories" class="header__link">Categories</a></li>
    </ul>
  </nav>
</header>
<style>
  .header {
    width: 100%;
    padding: 35px 0;
    position: relative;
  }

  .header__nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .header__search {
    width: 520px;
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

  .header__search::placeholder {
    opacity: 1;
    color: rgb(153, 153, 153);
  }

  .header__list {
    display: flex;
    margin-left: auto;
    right: 95px;
    position: absolute;
    gap: 30px;
  }

  .header__link {
    color: white;
    text-decoration: none;
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    font-weight: 600;
  }
</style>