import { Blog } from "../models/index.js";
import sequelize from 'sequelize';

const getRankedAuthors=async(req,res,next)=>{
    try{
          const authors = await Blog.findAll({
                 attributes: [
                'author',
                [sequelize.fn('SUM', sequelize.col('likes')), 'likes'], // Alias the sum of likes as 'likes'
                [sequelize.fn('COUNT', sequelize.col('id')), 'articles'] // Alias the count of articles as 'articleCount'
                 ],
                group: ['author'],
                // do the ordering based on the likes column min to max
                order: [['likes','ASC']]
          })
          res.json(authors);
    }catch(e){
      next(e);
    }
       
}

export default {
    getRankedAuthors,
}