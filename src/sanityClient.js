// src/sanityClient.js
import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const client = sanityClient({
    projectId: 'jittt5bd', // replace with your project ID
    dataset: 'development', // replace with your dataset name
    useCdn: true,
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);


export default client;
