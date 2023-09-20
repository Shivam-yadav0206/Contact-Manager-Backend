const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//@desc Get all contacts
//@route GET/api/contacts
//@access private
const getContacts = asyncHandler(async (req,res) => {
    const contancts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contancts);
});

//@desc Create contact
//@route POST/api/contacts
//@access private
const createContact = asyncHandler(async (req,res) => {
    console.log(req.body);
    const {name, email, phone} =req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All field are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id,  
    });
    res.status(201).json(contact);
});

//@desc Remove one contact
//@route DELETE/api/contacts/:id
//@access private
const delContact = asyncHandler(async (req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User cant delete other user contact");
    }
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});

//@desc Update one contact
//@route PUT/api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req,res) =>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User cant update other user contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact );
});

//@desc Get one contacts
//@route POST/api/contacts/:id
//@access private
const getContact = asyncHandler(async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});


module.exports = {getContacts,getContact,createContact,delContact,updateContact};