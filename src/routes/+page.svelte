<script>
  import { goto } from '$app/navigation';
  // define searchQuery
  let searchQuery = '';

  // if the keydown was enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {

      // send the user to the search page with the search query
      goto('/search/?q=' + searchQuery);
    }
  };
</script>

<input 
  type="search" 
  name="search" 
  placeholder="Search" 
  bind:value={searchQuery}
  on:keydown={handleKeyDown}
>
