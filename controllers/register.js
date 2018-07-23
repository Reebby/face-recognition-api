const handleRegister = (db, bcrypt) => (req, res) => {
	const {name, email, password} = req.body;
	if(!name || !email || !password) {
		return res.status(400).json('incorrect form submission')
	}
	const pass = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: pass,
			email: email
		})
		.into('login')
		.returning('email')
		.then(loginEmail => {
			return trx('users').returning('*').insert({
				name: name,
				email: loginEmail[0],
				joined: new Date()
			})
			.then(user => {
				res.json(user[0])
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	.catch(err =>  res.status(400).json('Sorry, user already exits'))
}

module.exports = {
	handleRegister: handleRegister
};