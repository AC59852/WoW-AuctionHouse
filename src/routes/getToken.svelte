<script context="module">
  import axios from 'axios';
  import { writable, readable } from 'svelte/store';

  export const token = writable('');
  export const auctions = writable([]);
  export const item = writable({});

  export async function getServerSideProps() {
    const response = await axios.get('https://wow-ah-server.onrender.com/');
    token.set(response.data.access_token);
    return {
      props: {
        token: response.data.access_token,
      },
    };
  }

  export async function getItem(value, slug) {
    await fetch(`https://us.api.blizzard.com/data/wow/item/${slug.slug}?namespace=static-classic-us&locale=en_US&access_token=${value}`)
    .then(response => response.json())
    .then(data => {
      item.set(data)
      getMedia(value, data.media.id)
    })
  }

  export async function getMedia(value, id) {
    await fetch(`https://us.api.blizzard.com/data/wow/media/item/${id}?namespace=static-classic-us&locale=en_US&access_token=${value}`)
    .then(response => response.json())
    .then(data => {
      item.update(n => {
        n.media = data.assets[0].value;
        return n;
      })
    })
  }

  export async function getAuctions(value, slug) {
    await fetch(`https://us.api.blizzard.com/data/wow/connected-realm/4738/auctions/2?namespace=dynamic-classic-us&locale=en_US&orderby=buyout:desc&access_token=${value}`)
    .then(response => response.json())
    .then(data => {
      auctions.set(data.auctions.filter(auction => auction.item.id === parseInt(slug.slug)));
    })
    
  }
</script>