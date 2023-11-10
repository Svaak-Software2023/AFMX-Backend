const joinService = require('../services/joinItemService');

const registerJoin = async (req, res) => {
    try {
        const joinResponse = await joinService.registerJoin(req.body, req.file.filename);
        return res.status(201).json({message: 'Join Created', joinResponse});
        
    } catch (error) {
        return res.status(500).json({error: error.message })
    }
}

const updateJoin = async (req, res) => {
    try {
        const updateResponse = await joinService.updateJoin(
            req.params.afmxJoinId,
            req.body
            );
            if(updateResponse) {
                return res.status(200).json({ message: "Updated Successfully", updateResponse })
            } else {
                return res.status(404).json({ message: "Not Updated", updateResponse});
            }
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

module.exports = {
    registerJoin,
    updateJoin
}