import { sveltekit } from '@sveltejs/kit/vite';

const config = {
	plugins: [sveltekit()],

  pwa: {
    workboxPluginMode: "GenerateSW",
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    }
  },
};

export default config;
