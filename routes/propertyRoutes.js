const express = require('express');
const router = express.Router();
const { db } = require('../db'); // Check karo aapka db connection kahan hai
const { properties } = require('../db/schema'); // Drizzle schema
const { eq } = require('drizzle-orm');

// 1. User ki saari properties lane ke liye (GET)
router.get('/my-assets', async (req, res) => {
  try {
    // Note: req.user tabhi milega agar aapne authentication middleware lagaya hai
    // Filhal testing ke liye hum dummy user_id use kar sakte hain
    const myAssets = await db.select().from(properties).where(eq(properties.ownerId, req.user.id));
    res.json(myAssets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database se data nahi mila" });
  }
});

// 2. Ownership update karne ke liye (POST)
router.post('/transfer', async (req, res) => {
  const { propertyId, newOwnerWallet, newOwnerAadhar, relation } = req.body;
  try {
    await db.update(properties)
      .set({ 
        ownerWallet: newOwnerWallet, 
        ownerAadhar: newOwnerAadhar,
        status: 'GIFTED' // Status update
      })
      .where(eq(properties.id, propertyId));
      
    res.json({ success: true, message: "DB updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Transfer update fail ho gaya" });
  }
});

module.exports = router;