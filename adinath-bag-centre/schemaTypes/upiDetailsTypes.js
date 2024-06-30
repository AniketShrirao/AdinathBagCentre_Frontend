// schemas/upiDetails.js

import { defineField, defineType } from 'sanity';

export default defineType({
    name: 'upiDetails',
    title: 'UPI Details',
    type: 'document',
    fields: [
        defineField({
            name: 'qrCodeImage',
            title: 'QR Code Image',
            type: 'image',
            options: {
                hotspot: true, // Enable hotspot for image
            },
        }),
        defineField({
            name: 'upiId',
            title: 'UPI ID',
            type: 'string',
        }),
    ],
});
