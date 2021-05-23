const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://localhost/yelp-camp', {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`we're connected!`);
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
 
    await Campground.deleteMany({});
    for(let i=0; i<500; i++)
    {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '60a1f6da24f1bf30eceda1b0',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Beautiful Place',
            price,
            images: [
              {
                url: 'https://res.cloudinary.com/dau3wnnom/image/upload/v1621668879/YelpCamp/w9ch0ofwxafmcri9zxvt.jpg',
                filename: 'YelpCamp/w9ch0ofwxafmcri9zxvt'
              },
              {
                url: 'https://res.cloudinary.com/dau3wnnom/image/upload/v1621668888/YelpCamp/suil1ikcnrcvbgmfkild.jpg',
                filename: 'YelpCamp/suil1ikcnrcvbgmfkild'
              },
              {
                url: 'https://res.cloudinary.com/dau3wnnom/image/upload/v1621668897/YelpCamp/tqlaijffvensfz0xt43l.jpg',
                filename: 'YelpCamp/tqlaijffvensfz0xt43l'
              },
              {
                url: 'https://res.cloudinary.com/dau3wnnom/image/upload/v1621668905/YelpCamp/nlnk7pkswvuj1sscxqnd.jpg',
                filename: 'YelpCamp/nlnk7pkswvuj1sscxqnd'
              }
              ],
              geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
        })
        await camp.save();
    }
}

 seedDB().then( ()=> {
    mongoose.connection.close();
})

