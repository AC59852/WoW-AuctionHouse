<script context="module">
  import axios from 'axios';
  import { writable, readable } from 'svelte/store';

  export const token = writable('');
  export const items = writable([]);
  export const auctions = writable([]);
  export const auctionAmount = writable(0);
  export const item = writable({});
  export const searchResults = writable([]);

  export async function getServerSideProps() {
    const response = await axios.get('https://wow-ah-server.onrender.com/');
    token.set(response.data.access_token);
    return {
      props: {
        token: response.data.access_token,
      },
    };
  }

  export async function getServerSideItems() {
    const response = await axios.get('https://wow-ah-server.onrender.com/items');
    items.set(response.data);
    return {
      props: {
        items: response.data,
      },
    };
  }

  export async function getSearchResults(value, query) {
    await fetch(`https://us.api.blizzard.com/data/wow/search/item?namespace=static-us&locale=en_US&orderby=id:asc&name.en_US=${query}`, {
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      // filter items with the name TEST or Test in the name
      data.results = data.results.filter((item) => {
        return !item.data.name.en_US.includes('TEST');
      })

      data.results = data.results.filter((item) => {
        return !item.data.name.en_US.includes('Test');
      })

      // if the search has more than one word, get the exact match
      if (query.split(' ').length > 1) {
        data.results = data.results.filter((item) => {
          return item.data.name.en_US.toLowerCase() === query.toLowerCase();
        })
      }

      searchResults.set(data.results);
      data.results.forEach((result) => {
        getSearchMedia(value, result.data.id);
      })
    })
  }

  export async function getSearchMedia(value, id) {
    await fetch(`https://us.api.blizzard.com/data/wow/media/item/${id}?namespace=static-us&locale=en_US&`, {
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      searchResults.update(n => {
        n.forEach((result) => {
          if (result.data.id === id) {
            result.data.media = data.assets[0].value;
          }
        })
        return n;
      })
    })
  }

  export async function getItem(value, slug) {
    await fetch(`https://us.api.blizzard.com/data/wow/item/${slug.slug}?namespace=static-us&locale=en_US`, {
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      item.set(data)
      getMedia(value, data.media.id)
    })
  }

  export async function getMedia(value, id) {
    await fetch(`https://us.api.blizzard.com/data/wow/media/item/${id}?namespace=static-us&locale=en_US`, {
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      item.update(n => {
        n.media = data.assets[0].value;
        return n;
      })
    })
  }

  export async function getAuctions(value, slug) {
    await fetch(`https://us.api.blizzard.com/data/wow/connected-realm/4372/auctions/2?namespace=dynamic-classic-us&locale=en_US&orderby=buyout:desc`, {
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      auctions.set(data.auctions.filter(auction => auction.item.id === parseInt(slug.slug)));
    })
    
  }

  export async function getAllAuctions(value) {
    await fetch(`https://us.api.blizzard.com/data/wow/connected-realm/4372/auctions/2?namespace=dynamic-classic-us&locale=en_US&orderby=buyout:desc`, {
      headers: {
        Authorization: `Bearer ${value}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      auctionAmount.set(data.auctions.length);
    })
  }
</script>