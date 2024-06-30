import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'sales',
    title: 'Sales Page',
    type: 'document',
    fields: [
        defineField({
            name: 'carouselImages',
            title: 'Carousel Images',
            type: 'array',
            of: [{ type: 'image' }],
        }),
        defineField({
            name: 'brandLogos',
            title: 'Brand Logos',
            type: 'array',
            of: [{ type: 'image' }],
        }),
        defineField({
            name: 'services',
            title: 'Services',
            type: 'array',
            of: [
                defineType({
                    name: 'service',
                    title: 'Service',
                    type: 'object',
                    fields: [
                        defineField({
                            name: 'title',
                            title: 'Title',
                            type: 'string',
                        }),
                        defineField({
                            name: 'description',
                            title: 'Description',
                            type: 'text',
                        }),
                    ],
                }),
            ],
        }),
    ],
});
