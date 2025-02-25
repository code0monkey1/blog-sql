import ReadingList from '../models/reading.list.model.js'

const addToReadingList =async(req,res,next)=>{
    try{
        const {blogId,userId}=req.body;
        const readingList=await ReadingList.create({blogId,userId});
        res.json(readingList);
    }catch(e){
        next(e);
    }
}

//PUT /api/readinglists/:id
const updateReadingList = async (req, res, next) => {
    try {

        // make sure that the userId in the decoded token is the same as the user who added the blog to the reading list
        const decodedToken = req.decodedToken;
        const userId = decodedToken.id;

        const { id } = req.params;
        const { read } = req.body;

        const readingList = await ReadingList.findByPk(id);

        if (!readingList) {
            return res.status(404).json({ error: 'Reading list not found' });
        }

        if (readingList.userId !== userId) {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        readingList.read = read;
        await readingList.save();

        res.json(readingList);
    } catch (err) {
        next(err);
    }
}


export default {
    addToReadingList,
    updateReadingList
}