const Data = require('../models/data')


exports.getexc = async (req, res) => {
    const query = {
    new: true
  };
  
  const results = await Data.find(query)
  Data.find(query)
      .then((results) => {
          console.log(results)
      })
      .catch(err => console.log(err));
  
  res.status(200).json(results);
};

exports.getpc = async (req, res) => {
    const query = {
    category: "Workstation"
  };
  
  const results = await Data.find(query)
  Data.find(query)
      .then((results) => {
          console.log(results)
      })
      .catch(err => console.log(err));
  
  res.status(200).json(results);
};


exports.gethp = async (req, res) => {
    const query = {
    category: "Headphone"
  };
  
  const results = await Data.find(query)
  Data.find(query)
      .then((results) => {
          console.log(results)
      })
      .catch(err => console.log(err));
  
  res.status(200).json(results);
};


exports.getsw = async (req, res) => {
    const query = {
    category: "Smartwatch"
  };
  
  const results = await Data.find(query)
  Data.find(query)
      .then((results) => {
          console.log(results)
      })
      .catch(err => console.log(err));
  
  res.status(200).json(results);
};


exports.getall = async (req, res) => {
  const query = {
    
};

const results = await Data.find(query)
Data.find(query)
    .then((results) => {
        console.log(results)
    })
    .catch(err => console.log(err));

res.status(200).json(results);
};

exports.save = async (req, res) => {
  const records = new Data({
    sequence: req.body.sequence, 
    title: req.body.title,
    image: req.body.image,
    price: req.body.price,
    category: req.body.category,
    new: req.body.new,
    
   }
   );
  
  // Insert the article in MongoDB database
   await records.save();
   console.log("Inserted!!");

    res.status(200).json(records);
};

exports.getbyid = async (req, res) => {
     const data =  await Data.findById(req.params.id)
     //const data =  await Data.find( { id: req.params.id } )

     if (data) {
         res.status(200).json(data);
     }
     else {
         res.status(404).send("Not found");
     }
};

exports.delete = async (req, res) => {
  let foundItem =  await Data.find( { id: req.params.id } )
    
  if (foundItem) {
      await Data.deleteOne({ id: req.params.id });
      res.status(200).json("Deleted!");
  }
  else {
      res.status(404).send("invalid item");
  }
};

exports.update = async (req, res) => {
  let foundItem =  await Data.findById(req.params.id);

  if(foundItem){
      foundItem.title = req.body.title ?? foundItem.title;
      foundItem.price = req.body.price ?? foundItem.price;
      foundItem.category = req.body.category ?? foundItem.category;
      foundItem.image = req.body.image ?? foundItem.image;
      foundItem.addedOn = new Date();

      await foundItem.updateOne();
      res.status(200).json(foundItem);

      
  }
  else{
      res.status(404).send('invalid item');
  }
};
