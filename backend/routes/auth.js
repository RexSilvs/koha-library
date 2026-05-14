const express = require('express')
const router = express.Router()
const User = require('../models/User')

router.post('/login', async (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' })
  }

  if (username === 'admin' && password === 'admin123') {
    return res.json({
      role: 'admin',
      username: 'admin',
      name: 'Administrator'
    })
  }

  try {
    const user = await User.findOne({
      $or: [{ email: username }, { membershipId: username }]
    }).select('+password')

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password.' })
    }

    return res.json({
      _id: user._id,
      role: 'user',
      name: user.name,
      email: user.email,
      membershipId: user.membershipId
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

router.post('/register', async (req, res) => {
  const { name, email, membershipId, password } = req.body

  if (!name || !email || !membershipId || !password) {
    return res.status(400).json({ message: 'Name, email, membership ID, and password are required.' })
  }

  try {
    const existingEmail = await User.findOne({ email })
    const existingMembership = await User.findOne({ membershipId })

    if (existingEmail || existingMembership) {
      return res.status(409).json({ message: 'Email or membership ID already exists.' })
    }

    const user = new User({ name, email, membershipId, password })
    const newUser = await user.save()
    return res.status(201).json({
      _id: newUser._id,
      role: 'user',
      name: newUser.name,
      email: newUser.email,
      membershipId: newUser.membershipId
    })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
})

module.exports = router