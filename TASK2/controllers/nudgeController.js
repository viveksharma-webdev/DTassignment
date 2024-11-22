const nudgeModel = require('./models/nudgeModel');
const ImgModel = require('./models/ImgModel');

exports.createNudge = async (req,res)=>{
    try{

        const{title, eventOrArticle, description, scheduledOn, timings, invitationText, imageUrl} = req.body;
        const nudge = await nudgeModel.create({
            title,
            eventOrArticle,
            description,
            scheduledOn,
            timings,
            invitationText,
            imageUrl,
        });

        res.status(201).json({
            message: 'Nudge created successfully',
            success: true,
            data: nudge,
        })

    }
    catch(err)
    {
        res.status(400).json({
            message: err.message,
            success: false,
        });
    };
};

exports.AllNudge = async (req,res)=>{
    try{
     const nudge = await nudgeModel.find({});
     res.status(200).json({
        nudge: nudge,
        message: "Here are all the nudges",
        success: true,
     });
    }catch(err){
        res.status(400).json({
            message: err.message,
            success: false,
        });
    }
};

exports.NudgeById = async (req,res)=>{
    try{
        const nudge = await nudgeModel.findOne({_id:req.params.id});
        if(!nudge) return res.status(404).json({message: "Nudge not found", success: false});
        res.status(200).json({
            nudge: nudge,
            message: "Here is the nudge",
            success: true,
        });

    }catch(err){
        console.log(err);
    }
}

exports.UpdateNudge = async (req,res)=>{
    try {
        const updatedData = req.body;
        const nudge = await nudgeModel.findOneAndUpdate({_id:req.params.id},{updatedData}, { new: true }).populate('image');
        if (!nudge) {
            return res.status(404).json({ success: false, message: 'Nudge not found' });
        }
        res.status(200).json({ success: true, nudge });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.DeleteNudge = async (req,res)=>{
    try{
        const nudge = await nudgeModel.findOneAndDelete({_id:req.params.id});
        if(!nudge) return res.status(404).json({message: "Nudge not found", success: false});
        res.status(200).json({
            message: 'Nudge deleted successfully',
            success: true,
        });

    }catch(err){
        res.status(400).json({
            message: err.message,
            success: false,
        });
    }
}