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
      type="search"
      name="search"
      placeholder="Search"
      bind:value={searchQuery}
      on:keydown={handleKeyDown}
    >
    <ul class="header__list">
      <li class="header__item"><a href="/" class="header__link">Home</a></li>
      <li class="header__item"><a href="/categories" class="header__link">Categories</a></li>
    </ul>
  </nav>
</header>