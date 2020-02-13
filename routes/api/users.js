const {Router} = require('express')
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const {check, validationResult} = require('express-validator')
const auth = require('../../middleware/auth')
const router = Router()
const User = require('../../models/User')

// @route POST api/users
// @desc  Register new user
// @access Public
router.post(
    '/register',
    [
        check('email', 'Некорректный email').isEmail(),
        check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 })
    ],
    async (req, res) => {
    try {
      const errors = validationResult(req)
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при регистрации'
        })
      }
  
      const {email, password} = req.body
  
      const candidate = await User.findOne({ email })
  
      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' })
      }
  
      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({email, password: hashedPassword })
  
      await user.save()

      const token = jwt.sign(
        {userId: user.id},
        config.get('jwtSecret'),
        {expiresIn: '1h'}
    )
  
      res.status(201).json({ token, message: 'Пользователь создан', user: {id: user.id, email: user.email} })
  
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  })


  router.post(
    '/login',
    [
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ],
     async (req, res) => {

    try {

        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: 'Некорректные данные при входе в систему'
            })
        }

        const {email, password} = req.body
        const user = await User.findOne({email})

        if(!user){
            return res.status(400).json({message: 'Пользователь не найден'})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(400).json({message: 'Неверный пароль, попробуйте снова'})
        }

        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtSecret'),
            {expiresIn: '1h'}
        )

        res.json({token, userId: user.id})




    } catch (error) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова.'})
        
    }

})

router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
      .select('-password')
      .then(user => res.json(user))
})


module.exports = router