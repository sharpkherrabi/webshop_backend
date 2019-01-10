module.exports = (req, res) => {
	res.status(500).json(
		{
			status: 'PAYMENT COULD\'T TAKE PLACE'
		});
};