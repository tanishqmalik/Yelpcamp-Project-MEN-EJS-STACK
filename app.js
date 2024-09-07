const express = require('express')
const path = require('path');
const port = 3000
const app = express();
const Campground = require('./models/CampgroundSchema');
const { default: mongoose } = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    // useNewUrlParser : true,
    // useUnifiedTopology: true 
});


app.use(express.urlencoded({extended : true}))
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database connected");
})


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req,res)=>{
    res.render('Home')
})

// app.get('/makecampground', async (req,res)=>{
//     const camp = new Campground({title:'My background'});
//     await camp.save();
//     res.send(camp);
// })

app.get('/campgrounds', async (req,res)=>{
    const campgrounds = await Campground.find({})
    res.render('campgrounds/index', {campgrounds})
})

app.get('/campgrounds/new',  (req, res)=>{
    res.render('campgrounds/new')
})

app.post('/campgrounds', async  (req, res)=>{
    await Campground.create({
        title: req.body.title,
        Location: req.body.location
    })
    res.redirect('campgrounds')
})


app.get('/campgrounds/delete/:id', async (req, res)=>{
    const id = req.params.id
    await Campground.deleteOne({_id: id})

    res.render('campgrounds/delete')
})




app.get('/campgrounds/:id', async( req,res)=>{
    const id = req.params.id;
    const foundProduct = await Campground.findById(id);
    // console.log(foundProduct)
    // res.send("okay");
    res.render('campgrounds/show', {foundProduct})
})




app.get('/campgrounds/update/:id', async(req, res)=>{
    const id = req.params.id
    const updateProduct= await Campground.findById(id)
    res.render('campgrounds/update', {updateProduct})
})

app.post('/campgrounds/:id', async(req,res)=>{
    const id = req.params.id
    await Campground.findByIdAndUpdate(id, {
        title: req.body.updatedTitle,
        Location: req.body.updatedLocation
    })
    res.redirect(`${id}`)
})


app.listen(port,()=>{
    console.log(`listening at {http://localhost:3000}`)
})